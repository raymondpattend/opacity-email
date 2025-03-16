CREATE TABLE `email_addresses` (
	`id` text PRIMARY KEY NOT NULL,
	`address` text NOT NULL,
	`login_token` text NOT NULL,
	`master_token` text,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`disabled` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_addresses_address_unique` ON `email_addresses` (`address`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_addresses_login_token_unique` ON `email_addresses` (`login_token`);--> statement-breakpoint
CREATE TABLE `email_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`email_address_id` text NOT NULL,
	`event` text NOT NULL,
	`metadata` text,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`email_address_id`) REFERENCES `email_addresses`(`id`) ON UPDATE no action ON DELETE no action
);
