import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rows = await query(
      `
      SELECT
        s.spot_id,
        s.building_id,
        s.name,
        s.floor,
        s.seat_count,
        s.has_outlets,
        s.is_quiet_zone,
        b.building_id AS building_building_id,
        b.name AS building_name,
        b.campus AS building_campus,
        b.longitude AS building_longitude,
        b.latitude AS building_latitude,
        f.created_at
      FROM favorite f
      JOIN spot s ON f.spot_id = s.spot_id
      JOIN building b ON s.building_id = b.building_id
      WHERE f.user_id = $1
      ORDER BY f.created_at DESC;
    `,
      [userId]
    )

    return NextResponse.json(
      rows.map((row) => ({
        spot_id: row.spot_id,
        building_id: row.building_id,
        name: row.name,
        floor: row.floor,
        seat_count: row.seat_count,
        has_outlets: row.has_outlets,
        is_quiet_zone: row.is_quiet_zone,
        building: {
          building_id: row.building_building_id,
          name: row.building_name,
          campus: row.building_campus,
          longitude: Number(row.building_longitude),
          latitude: Number(row.building_latitude),
        },
        created_at: row.created_at,
      }))
    )
  } catch (error) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { spotId, isFavorite } = await request.json()

    if (spotId === undefined || isFavorite === undefined) {
      return NextResponse.json(
        { error: 'spotId and isFavorite are required' },
        { status: 400 }
      )
    }

    if (isFavorite) {
      await query(
        `
        INSERT INTO favorite(user_id, spot_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, spot_id) DO NOTHING;
      `,
        [userId, spotId]
      )
    } else {
      await query(
        `DELETE FROM favorite WHERE user_id = $1 AND spot_id = $2;`,
        [userId, spotId]
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error toggling favorite:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update favorite' },
      { status: 500 }
    )
  }
}
