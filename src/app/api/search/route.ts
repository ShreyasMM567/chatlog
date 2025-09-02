import { NextRequest, NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const result = await dbManager.searchMessages(query.trim());

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error searching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
