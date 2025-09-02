import { NextRequest, NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rowId = parseInt(searchParams.get('rowId') || '0');
    const context = parseInt(searchParams.get('context') || '5');

    if (!rowId) {
      return NextResponse.json(
        { error: 'rowId parameter is required' },
        { status: 400 }
      );
    }

    const result = await dbManager.getMessagesAround(rowId, context);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error loading messages around:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
