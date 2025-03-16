import {
	emailAddresses,
	emailLogs,
} from './schema';
import { relations } from 'drizzle-orm/relations';

export const emailAddressRelations = relations(emailAddresses, ({ many }) => ({
	emailLogs: many(emailLogs),	
}));

export const emailLogRelations = relations(emailLogs, ({ one }) => ({
	emailAddress: one(emailAddresses, {
		fields: [emailLogs.emailAddressId],
		references: [emailAddresses.id],
	}),
}));