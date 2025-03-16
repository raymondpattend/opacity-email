import {
	emailAddresses,
	emailLogs,
} from './schema';

export type EmailAddress = typeof emailAddresses.$inferSelect;
export type EmailLog = typeof emailLogs.$inferSelect;

