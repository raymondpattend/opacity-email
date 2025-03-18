import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import https from "https";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const handler = async (event) => {
  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    // Generate 6h pre-signed URL (todo ensure its lower)
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 21600 });

    // Prepare POST data
    const postData = JSON.stringify({ url: signedUrl });

    // Send POST request
    const options = {
      hostname: process.env.HOSTNAME,
      path: "/api/webhook",
      method: "POST",
      headers: {
        "x-signature": process.env.AWS_ENCRYPTED_KEY,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => { body += chunk; });
        res.on("end", () => {
          console.log("POST Response:", res.statusCode, body);
          resolve();
        });
      });

      req.on("error", (e) => {
        console.error("POST request error:", e);
        reject(e);
      });

      req.write(postData);
      req.end();
    });

    return { statusCode: 200, body: "Success" };
  } catch (err) {
    console.error("Lambda error:", err);
    return { statusCode: 500, body: "Error" };
  }
};