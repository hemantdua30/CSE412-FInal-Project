import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'

interface RouteParams {
  params: Promise<{ spotId: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { spotId } = await params
    const spotIdNum = parseInt(spotId, 10)

    if (isNaN(spotIdNum)) {
      return NextResponse.json({ error: 'Invalid spot ID' }, { status: 400 })
    }

    const rows = await query(
      `
      SELECT EXISTS(
        SELECT 1 FROM favorite
        WHERE user_id = $1 AND spot_id = $2
      ) AS is_favorited;
    `,
      [userId, spotIdNum]
    )

    return NextResponse.json({ isFavorited: rows[0].is_favorited })
  } catch (error) {
    console.error('Error checking favorite:', error)
    return NextResponse.json(
      { error: 'Failed to check favorite' },
      { status: 500 }
    )
  }
}

