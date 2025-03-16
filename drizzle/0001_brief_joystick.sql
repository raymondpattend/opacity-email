ALTER TABLE `email_logs` ADD `sender` text NOT NULL;--> statement-breakpoint
ALTER TABLE `email_logs` ADD `subject` text NOT NULL;--> statement-breakpoint
ALTER TABLE `email_logs` DROP COLUMN `event`;--> statement-breakpoint
ALTER TABLE `email_logs` DROP COLUMN `metadata`;