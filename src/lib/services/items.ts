'use server';

import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { db } from '@/lib/db';
import * as schema from '@/schema';

export type Item = InferSelectModel<typeof schema.items>;

const insertUserSchema = createInsertSchema(schema.items, {
  expirationDate: z.preprocess(
    (value) => (typeof value === 'string' ? new Date(value) : value),
    z.date(),
  ),
});

export const getItems = async () => db.query.items.findMany();

export const parseInsertData = async (
  item: Partial<Record<keyof Item, unknown>>,
) => insertUserSchema.safeParse(item);

export const createItem = async (item: InferInsertModel<typeof schema.items>) =>
  db.insert(schema.items).values(item);
