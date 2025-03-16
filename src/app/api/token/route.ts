import drizzleDB from "@/functions/db/drizzle";
import { emailAddresses } from "@/functions/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { token, active } = await request.json();

    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const email = await drizzleDB.query.emailAddresses.findFirst({
        where: eq(emailAddresses.loginToken, token),
    });

    if (!email) {
        return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
    
    await drizzleDB.update(emailAddresses).set({
        disabled: active ? 1 : 0,
    }).where(eq(emailAddresses.loginToken, token));

    return NextResponse.json({ success: true }, { status: 200 });
}