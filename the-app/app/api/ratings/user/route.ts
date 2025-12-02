import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const spotId = searchParams.get('spotId')

    if (!spotId) {
      return NextResponse.json({ error: 'spotId is required' }, { status: 400 })
    }

    const spotIdNum = parseInt(spotId, 10)
    if (isNaN(spotIdNum)) {
      return NextResponse.json({ error: 'Invalid spot ID' }, { status: 400 })
    }

    const rows = await query(
      `
      SELECT
        rating_id,
        user_id,
        spot_id,
        quiet_score,
        comment,
        created_at
      FROM rating
      WHERE user_id = $1 AND spot_id = $2
      LIMIT 1;
    `,
      [userId, spotIdNum]
    )

    if (rows.length === 0) {
      return NextResponse.json(null)
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Error fetching user rating:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user rating' },
      { status: 500 }
    )
  }
}

