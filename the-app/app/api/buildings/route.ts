import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const rows = await query(`
      SELECT building_id, name, campus, longitude, latitude
      FROM building
      ORDER BY name;
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching buildings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch buildings' },
      { status: 500 }
    )
  }
}

