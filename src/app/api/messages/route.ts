import { NextRequest, NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const beforeRowId = searchParams.get('beforeRowId');

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid parameters. Page must be >= 1, limit must be between 1 and 100.' },
        { status: 400 }
      );
    }

    let result;
    if (beforeRowId) {
      // Load messages before a specific rowId (for search continuation)
      const rowId = parseInt(beforeRowId);
      result = await dbManager.getMessagesBefore(rowId, limit);
    } else {
      // Normal pagination
      result = await dbManager.getMessages(page, limit);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
