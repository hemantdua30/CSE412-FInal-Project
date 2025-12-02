import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

interface RouteParams {
  params: Promise<{ spotId: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { spotId } = await params
    const spotIdNum = parseInt(spotId, 10)

    if (isNaN(spotIdNum)) {
      return NextResponse.json({ error: 'Invalid spot ID' }, { status: 400 })
    }

    const rows = await query(
      `
      SELECT
        r.rating_id,
        r.user_id,
        r.spot_id,
        r.quiet_score,
        r.comment,
        r.created_at,
        u.name AS user_name
      FROM rating r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.spot_id = $1
      ORDER BY r.created_at DESC;
    `,
      [spotIdNum]
    )

    return NextResponse.json(
      rows.map((row) => ({
        rating_id: row.rating_id,
        user_id: row.user_id,
        spot_id: row.spot_id,
        quiet_score: row.quiet_score,
        comment: row.comment,
        created_at: row.created_at,
        users: {
          name: row.user_name,
        },
      }))
    )
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}

