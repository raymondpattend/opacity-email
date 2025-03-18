# Amazon Setup

## S3

Create a s3 bucket, remember the name

## Lambda

Create a new lambda in the same region as your s3 bucket, paste the `index.js` code, set the environment to NodeJS 20 and ensure the timeout time is 30s. 

Add environment variables (see `.env.template`) and ensure the lambda can read your s3 bucket.

## SES (Simple Email Service)
Ensure you have a verified identity, have enabled rules for recieving emails, and set the `EMAIL_FROM` env var (parent `.env`) to your from email.

Receiving email rules (SES):
- Go to "Email receiving" tab
- Create new rule
- Recipient conditions can be left empty
- Spam and virus scanning: disabled (optional)
- Create new action
    - bucket: the s3 bucket you created earlier
    - object key prefix: `ingest/`
    - iam role: make a iam role that can access the s3 bucket (write & read)
    - sns topic: blank for now


Now you're all set. Make sure your server is accessable on the internet (via Localcan, Nginx, port forward, e.t.c.)