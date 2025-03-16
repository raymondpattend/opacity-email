import { sql } from 'drizzle-orm';
import { sqliteTable, text, numeric, integer } from 'drizzle-orm/sqlite-core';
import crypto from 'crypto';


export const generateToken = () => '0x' + crypto.randomBytes(32).toString("hex");
export const generateEmailAddress = () => '0x' + crypto.randomBytes(8).toString("hex");


export const emailAddresses = sqliteTable("email_addresses", {
  id: text("id").primaryKey(),
  address: text("address").notNull().unique().$default(generateEmailAddress), // e.g., fox@email.redir
  loginToken: text("login_token").notNull().unique().$default(generateToken), // magic login token
  masterToken: text("master_token"), // optional: groups under a "user"
  createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  disabled: integer("disabled").default(0),
  recipient: text("recipient").notNull().default(""),
});

export const emailLogs = sqliteTable("email_logs", {
  id: text("id").primaryKey(),
  emailAddressId: text("email_address_id").references(() => emailAddresses.id).notNull(),
  sender: text("sender").notNull(),
  senderEmail: text("sender_email").notNull().default(""),
  subject: text("subject").notNull(),
  createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  declined: integer("declined").default(0),
});


export default {
	emailAddresses,
	emailLogs,
};