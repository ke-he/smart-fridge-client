import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  expirationDate: timestamp('expiration_date').notNull(),
});
