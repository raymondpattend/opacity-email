import drizzleDB from "@/functions/db/drizzle";
import { emailAddresses } from "@/functions/db/schema";
import { obfuscateEmail } from "@/lib/utils";
import { eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function DisablePage({ params }: { params: Params }) {
    const { id } = await params;

    const emailAddress = await drizzleDB.query.emailAddresses.findFirst({
        where: or(eq(emailAddresses.id, id), eq(emailAddresses.loginToken, id)),
    });

    if (!emailAddress) return notFound();

    return (
        <div className="flex flex-col items-center h-full justify-center text-white">
            <h1 className="text-2xl font-bold">{emailAddress.disabled == 1 ? 'already disabled' : 'disabled'}</h1>
            <p className="text-sm text-white">
                { 
                    emailAddress.disabled == 1 ? (
                        <>
                            this relay has already been disabledd
                        </>
                    ) : (
                        <>
                            you will no longer receive emails to {obfuscateEmail(emailAddress.recipient)}.
                        </>
                    )
                }
            </p>
        </div>
    );
}
