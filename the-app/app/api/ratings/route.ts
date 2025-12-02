import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { spotId, quietScore, comment } = await request.json()

    if (!spotId || quietScore === undefined) {
      return NextResponse.json(
        { error: 'spotId and quietScore are required' },
        { status: 400 }
      )
    }

    await query(
      `DELETE FROM rating WHERE user_id = $1 AND spot_id = $2;`,
      [userId, spotId]
    )

    const rows = await query(
      `
      INSERT INTO rating(user_id, spot_id, quiet_score, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [userId, spotId, quietScore, comment || '']
    )

    return NextResponse.json({ success: true, rating: rows[0] })
  } catch (error) {
    console.error('Error creating rating:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create rating' },
      { status: 500 }
    )
  }
}

