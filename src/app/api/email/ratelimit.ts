import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";


const EMAIL_CREATE_RATELIMIT = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.tokenBucket(3, "1 m", 5), // 3 requests per minute, 5 max tokens
    prefix: 'email-create',
})

export { EMAIL_CREATE_RATELIMIT };