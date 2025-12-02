import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const rows = await query(`
      SELECT
        s.spot_id,
        s.building_id,
        s.name AS spot_name,
        s.floor,
        s.seat_count,
        s.has_outlets,
        s.is_quiet_zone,
        b.name AS building_name,
        b.campus,
        COALESCE(AVG(r.quiet_score), 0) AS avg_quiet_score,
        COUNT(r.rating_id) AS rating_count
      FROM spot s
      JOIN building b ON s.building_id = b.building_id
      LEFT JOIN rating r ON r.spot_id = s.spot_id
      GROUP BY s.spot_id, s.building_id, s.name, s.floor, s.seat_count, s.has_outlets, s.is_quiet_zone, b.name, b.campus
      ORDER BY b.name, s.name;
    `)

    return NextResponse.json(rows, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error fetching spots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch spots' },
      { status: 500 }
    )
  }
}

