import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'

interface RouteParams {
  params: Promise<{ ratingId: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { ratingId } = await params
    const { quietScore, comment } = await request.json()

    if (quietScore === undefined) {
      return NextResponse.json({ error: 'quietScore is required' }, { status: 400 })
    }

    const ratingRows = await query(
      `SELECT user_id FROM rating WHERE rating_id = $1;`,
      [parseInt(ratingId, 10)]
    )

    if (ratingRows.length === 0) {
      return NextResponse.json({ error: 'Rating not found' }, { status: 404 })
    }

    if (ratingRows[0].user_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Update rating
    const rows = await query(
      `
      UPDATE rating
      SET quiet_score = $1, comment = $2
      WHERE rating_id = $3
      RETURNING *;
    `,
      [quietScore, comment || '', parseInt(ratingId, 10)]
    )

    return NextResponse.json({ success: true, rating: rows[0] })
  } catch (error) {
    console.error('Error updating rating:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update rating' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { ratingId } = await params

    const ratingRows = await query(
      `SELECT user_id FROM rating WHERE rating_id = $1;`,
      [parseInt(ratingId, 10)]
    )

    if (ratingRows.length === 0) {
      return NextResponse.json({ error: 'Rating not found' }, { status: 404 })
    }

    if (ratingRows[0].user_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Delete rating
    await query(`DELETE FROM rating WHERE rating_id = $1;`, [parseInt(ratingId, 10)])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting rating:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete rating' },
      { status: 500 }
    )
  }
}

