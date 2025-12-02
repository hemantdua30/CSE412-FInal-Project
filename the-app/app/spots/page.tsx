import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { query } from '@/lib/db'
import SpotsList from '@/components/spots/SpotsList'

async function fetchSpots() {
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
  return rows
}

async function fetchBuildings() {
  const rows = await query(`
    SELECT building_id, name, campus, longitude, latitude
    FROM building
    ORDER BY name;
  `)
  return rows
}

export default async function SpotsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const [spotsData, buildingsData] = await Promise.all([fetchSpots(), fetchBuildings()])

  interface SpotRow {
    spot_id: number
    building_id: number
    spot_name: string
    floor: number
    seat_count: number
    has_outlets: boolean
    is_quiet_zone: boolean
    building_name: string
    campus: string
    avg_quiet_score: number | null
    rating_count: number
  }

  const spots = (spotsData as SpotRow[]).map((row) => ({
    spot_id: row.spot_id,
    building_id: row.building_id,
    name: row.spot_name,
    floor: row.floor,
    seat_count: row.seat_count,
    has_outlets: row.has_outlets,
    is_quiet_zone: row.is_quiet_zone,
    building: {
      name: row.building_name,
      campus: row.campus,
    },
    avg_quiet_score: row.avg_quiet_score ? Number(row.avg_quiet_score) : undefined,
    rating_count: Number(row.rating_count) || 0,
  }))

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Browse Study Spots</h1>
          <p className="mt-1 text-sm text-gray-500">
            Filter by building, quietness, outlets, and more.
          </p>
        </div>

        <SpotsList spots={spots} buildings={buildingsData} />
      </div>
    </div>
  )
}

