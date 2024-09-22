import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '../schema';
import { env } from './env';

const pg = postgres(env.DATABASE_URL);

const db = drizzle(pg, { schema });

export { db, pg };
