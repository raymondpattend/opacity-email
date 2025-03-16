import 'dotenv/config';
import * as relations from './relations';
import * as schema from './schema';
import { createClient } from '@libsql/client/web';
import dotenv from 'dotenv';
import { drizzle as drizzleWeb } from 'drizzle-orm/libsql';

dotenv.config();

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL as string,
	authToken: process.env.TURSO_AUTH_TOKEN as string,
});

const drizzleDB = drizzleWeb(client, { schema: { ...schema, ...relations } });

export default drizzleDB;
