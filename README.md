# opacity.email
securely mask your email address for free

preview on [opacity.email](https://opacity.email)


## Preamble 

This was made in 6 total dev hours on a Saturday evening, and is aimed to be a free alternative for services like iCloud Private Relay and Firefox Relay. You can access the [live site](https://opacity.email) and test it for yourself.

## Prerequisites
- AWS Account with SES access (development or production)
- Turso account for SQLite database
- Upstash Redis account
- Cloudflare Turnstile account

### Environment Variables
Copy `.env.template` to `.env` and fill in the variables.

### Amazon Lambda && SES

[Follow these instructions](https://github.com/Rayrnond/opacity-email/blob/main/lambda/README.md)

### Turso + Drizzle
Turso is basically free and Drizzle is superior to prisma.

- Create a turso.tech db, copy and paste token and url to `.env`.
- Run `npx drizzle-kit generate` and `npx drizzle-kit migrate` to save database

## Running locally
1. Clone the repository
2. Follow previous instructions for setup.
3. Run `npm i --peer-legacy-deps`
4. Run `npm run dev` and visit on localhost:3000

> Note: localhost doesn't support receiving emails, you will need a public url on the internet to do so.

## Contributions
This repo will accept bug fixes and feature requests as PRs. 

