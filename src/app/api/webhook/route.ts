import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { simpleParser } from "mailparser";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "@/functions/aws/ses";
import { logEmail } from "@/functions/logic/ingest";

export async function POST(request: NextRequest) {

    const h = await headers();
    const signature = h.get("x-signature");

    if (!signature || signature !== process.env.AWS_ENCRYPTED_KEY) {
        return NextResponse.json({ error: "Missing or invalid signature" }, { status: 400 });
    }

    const { url } = await request.json();
    if (!url) {
        return NextResponse.json({ error: "Missing or invalid url" }, { status: 400 });
    }

    const body = await (await fetch(url)).text();
    const parsed = await simpleParser(body);

    const html = parsed.html ? { Data: parsed.html } : undefined;
    const text = parsed.text ? { Data: parsed.text } : undefined;


    try {
        const logged = await logEmail(parsed);

        if (text) text.Data += `\n\n\n\nForwarded by opacity.email. manage this relay: https://opacity.email/email/${logged.login}`;
        if (html) html.Data += `<br><br><hr><p style="color: #666; font-size: 0.9em; display: flex; justify-content: space-between; width: 100%;"><span>forwarded by opacity.email</span><a href="https://opacity.email/email/${logged.login}" style="color: #666; text-decoration: underline;">manage this relay</a></p>`;

        console.log(logged);
        const command = new SendEmailCommand({
            Source: `${logged.sender} [via opacity.email] <${process.env.EMAIL_FROM}>`,
            
            Destination: {
                ToAddresses: [logged.sendTo],
            },
            Message: {
                Subject: {
                    Data: logged.subject,
                },
                Body: {
                    Html: html,
                    Text: text,
                },
            },
        });

        const result = await sesClient.send(command);

        if (result.MessageId) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Error sending email" }, { status: 400 });
        }
        
    } catch (e) {

        return NextResponse.json({ error: "Email not allowed. Disabled by recipient or not found." }, { status: 400 });

    }
}
