import { NextRequest, NextResponse } from 'next/server';

import { createItem, getItems, parseInsertData } from '@/lib/services/items';

export async function GET(_request: NextRequest) {
  return NextResponse.json(await getItems());
}

export async function POST(request: NextRequest) {
  const item = await request.json();
  const zodResponse = await parseInsertData(item);

  if (!zodResponse.success) {
    return NextResponse.json({
      success: false,
      error: zodResponse.error.errors,
    });
  }

  await createItem(zodResponse.data);

  return NextResponse.json({ success: true, item: zodResponse.data });
}
