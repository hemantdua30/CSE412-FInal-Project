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
        s.spot_id,
        s.building_id,
        s.name AS spot_name,
        s.floor,
        s.seat_count,
        s.has_outlets,
        s.is_quiet_zone,
        b.building_id AS building_building_id,
        b.name AS building_name,
        b.campus AS building_campus,
        b.longitude AS building_longitude,
        b.latitude AS building_latitude
      FROM spot s
      JOIN building b ON s.building_id = b.building_id
      WHERE s.spot_id = $1;
    `,
      [spotIdNum]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Spot not found' }, { status: 404 })
    }

    const row = rows[0]
    return NextResponse.json({
      spot_id: row.spot_id,
      building_id: row.building_id,
      name: row.spot_name,
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
    })
  } catch (error) {
    console.error('Error fetching spot details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch spot details' },
      { status: 500 }
    )
  }
}

