import { NextRequest, NextResponse } from "next/server";
import { emailAddresses, generateEmailAddress, generateToken } from "@/functions/db/schema";
import drizzleDB from "@/functions/db/drizzle";
import { v4 as uuidv4 } from 'uuid';
import { validateTurnstileToken } from "next-turnstile";
import { ipAddress, geolocation } from "@vercel/functions";
import { EMAIL_CREATE_RATELIMIT } from "./ratelimit";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {

    const { email, turnstileToken } = await request.json();

    if (!email || !turnstileToken || !emailRegex.test(email)) {
        return NextResponse.json({ error: 'Fields missing that are required, please refresh the page and try again.' }, { status: 400 });
    }

    const validationResponse = await validateTurnstileToken({
        token: turnstileToken,
        secretKey: process.env.TURNSTILE_SECRET_KEY!,
        idempotencyKey: uuidv4(),
        sandbox: process.env.NODE_ENV === 'development',
    });

    if (!validationResponse.success) {
        return NextResponse.json({ error: 'Invalid captcha token, refresh the page and try again.' }, { status: 400 });
    }

    // fingerprint ip address or geolocation
    const ip = ipAddress(request) || geolocation(request).latitude+":"+geolocation(request).longitude;
    const { success } = await EMAIL_CREATE_RATELIMIT.limit(ip);

    if (!success) {
        return NextResponse.json({ error: 'Too many requests, try again in 5 minutes.' }, { status: 429 });
    }

    const randomEmail = generateEmailAddress(); // email 0x@opacity.email
    const token = generateToken(); // token 

    const newEmail = (await drizzleDB.insert(emailAddresses).values({
        address: randomEmail,
        loginToken: token,
        id: uuidv4(),
        recipient: email,
    }).returning())[0];
    

    
    return NextResponse.json({
        address: newEmail.address,
        token: newEmail.loginToken,
    });

}
