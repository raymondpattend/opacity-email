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

### Amazon SES
Ensure you have a verified identity, have enabled rules for recieving emails, and set the `EMAIL_FROM` env var to your from email.

> Note: the repo is currently missing the aws lambda code

## Running locally
1. Clone the repository
2. Run `npm i` to install all dependencies (you may need to include flags like `--peer-legacy-deps`)
3. Run `npm run dev` and visit on localhost:3000


## Contributions
This repo will accept bug fixes and feature requests as PRs. 

