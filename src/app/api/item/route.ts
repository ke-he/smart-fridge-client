import { getItems } from '@/app/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(await getItems());
}
