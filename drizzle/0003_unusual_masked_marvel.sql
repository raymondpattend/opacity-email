DROP INDEX "email_addresses_address_unique";--> statement-breakpoint
DROP INDEX "email_addresses_login_token_unique";--> statement-breakpoint
ALTER TABLE `email_logs` ALTER COLUMN "sender_email" TO "sender_email" text NOT NULL DEFAULT '';--> statement-breakpoint
CREATE UNIQUE INDEX `email_addresses_address_unique` ON `email_addresses` (`address`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_addresses_login_token_unique` ON `email_addresses` (`login_token`);