import { NextRequest, NextResponse } from 'next/server';
import { dbManager } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const currentMinRowId = parseInt(searchParams.get('minRowId') || '0');
    const currentMaxRowId = parseInt(searchParams.get('maxRowId') || '0');
    const direction = searchParams.get('direction') as 'up' | 'down';

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    if (!currentMinRowId || !currentMaxRowId || !direction) {
      return NextResponse.json(
        { error: 'Missing required parameters: minRowId, maxRowId, direction' },
        { status: 400 }
      );
    }

    if (direction !== 'up' && direction !== 'down') {
      return NextResponse.json(
        { error: 'Direction must be "up" or "down"' },
        { status: 400 }
      );
    }

    const result = await dbManager.loadMoreAroundSearch(
      query.trim(),
      currentMinRowId,
      currentMaxRowId,
      direction
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error loading more search results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
