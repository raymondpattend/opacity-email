import { AddressObject, ParsedMail } from "mailparser";
import drizzleDB from "../db/drizzle";
import { emailAddresses, emailLogs } from "../db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function logEmail(mail: ParsedMail) {

    const { from, to: internal__addy, subject } = mail;

    const toAddress = () =>{
        if (Array.isArray(internal__addy)) return (internal__addy as AddressObject[])[0].value[0].address;
        return (internal__addy as AddressObject).value[0].address;
    }

    if (!from || !internal__addy || !toAddress() || !subject) {
        throw new Error("Missing required fields");
    }

    const sender = from.value?.[0].name || "Unknown Sender";
    const senderEmail = from.value?.[0].address || "";
    const emailAddress = await drizzleDB.query.emailAddresses.findFirst({
        where: eq(emailAddresses.address, toAddress()!.replace("@opacity.email", "")),
    });

    //todo custom email error, catch log and ignore -> bounce
    if (!emailAddress) {
        throw new Error("Email address not found or is disabled by recipient");
    }
    
    await drizzleDB.insert(emailLogs).values({
        id: uuidv4(),
        emailAddressId: emailAddress.id,
        sender,
        subject,
        senderEmail,
        createdAt: new Date().toISOString(),
        declined: emailAddress.disabled == 1 ? 1 : 0,
    });

    // disable email address if it is disabled by recipient
    if (emailAddress.disabled == 1) {
        throw new Error("Email address is disabled by recipient");
    }

    return {
        emailAddressId: emailAddress.id,
        sender: senderEmail,
        subject,
        createdAt: new Date().toISOString(),
        sendTo: emailAddress.recipient,
        login: emailAddress.loginToken,
    }
}
