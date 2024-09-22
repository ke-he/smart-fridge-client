'use server';

import { createItem, parseInsertData } from '@/lib/services/items';
import { revalidatePath } from 'next/cache';

export async function addItem(formData: FormData) {
  const zodResponse = await parseInsertData(
    Object.fromEntries(formData.entries()),
  );
  if (!zodResponse.success) {
    return {
      success: false,
      error: zodResponse.error.errors,
    };
  }

  await createItem(zodResponse.data);
  revalidatePath('/api/items');
  revalidatePath('/');
  return { success: true };
}
