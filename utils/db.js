import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

if (!connectionString) {
	throw new Error('Missing DATABASE_URL (or NEXT_PUBLIC_DRIZZLE_DB_URL) in environment variables');
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });