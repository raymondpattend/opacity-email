'use server'

import drizzleDB from "@/functions/db/drizzle";
import { desc, eq, or } from "drizzle-orm";
import { emailAddresses, emailLogs } from "@/functions/db/schema";
import { notFound } from "next/navigation";
import moment from "moment";
import { Data } from "@/components/email-table";
import Link from "next/link";
import { obfuscateEmail } from "@/lib/utils";
import { ActivateButton } from "@/components/buttons/activate";
import { CopyButton } from "@/components/buttons/copy";
type Parmas = Promise<{ id: string }>;

export default async function EmailPage({ params }: { params: Parmas }) {

    const { id } = await params;

    const email = await drizzleDB.query.emailAddresses.findFirst({
        where: or(eq(emailAddresses.loginToken, id)),
        with: {
            emailLogs: {
                orderBy: [desc(emailLogs.createdAt)],
                limit: 5000,
            },
        },
    });

    if (!email) {
        return notFound();
    }




    return (
        <>

            <div className="lg:absolute lg:top-0 lg:-translate-y-full lg:left-0 lg:p-3 flex gap-2">
                <Link href='/' className="border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer bg-white/20 text-white/40 rounded-xl p-2">new relay</Link>
            </div>


            <div className="flex flex-col lg:max-h-[50%] lg:h-full gap-2 bg-white/10 text-white rounded-xl p-3 overflow-y-auto overflow-x-clip">
                <p>{email.address}@opacity.email ➜ {obfuscateEmail(email.recipient)}</p>
                <p title={moment(email.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>created {moment(email.createdAt).format('LL')}</p>
                <p>{email.disabled ? "disabled" : "active"}</p>
                <p>{email.emailLogs.length} emails received</p>
            </div>
            
            <Data data={email.emailLogs} />



            <div className="lg:absolute lg:bottom-0 lg:translate-y-full lg:right-0 lg:p-3 flex gap-2">
                <CopyButton text={email.address + '@opacity.email'} />
                <ActivateButton loginToken={email.loginToken} state={email.disabled === 1} />
            </div>
        </>
    );
}
