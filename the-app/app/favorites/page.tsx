import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'
import SpotCard from '@/components/ui/SpotCard'
import type { SpotWithSummary } from '@/types/database'

async function fetchFavorites(userId: number) {
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
  interface FavoriteRow {
    spot_id: number
    building_id: number
    name: string
    floor: number
    seat_count: number
    has_outlets: boolean
    is_quiet_zone: boolean
    building_building_id: number
    building_name: string
    building_campus: string
    building_longitude: number
    building_latitude: number
    created_at: string
  }

  return (rows as FavoriteRow[]).map((row) => ({
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
      longitude: row.building_longitude,
      latitude: row.building_latitude,
    },
    created_at: row.created_at,
  }))
}

async function fetchSpotsSummary() {
  const rows = await query(`
    SELECT
      s.spot_id,
      COALESCE(AVG(r.quiet_score), 0) AS avg_quiet_score,
      COUNT(r.rating_id) AS rating_count
    FROM spot s
    LEFT JOIN rating r ON r.spot_id = s.spot_id
    GROUP BY s.spot_id;
  `)
  return rows
}

export default async function FavoritesPage() {
  const userId = await getCurrentUserId()
  if (!userId) {
    redirect('/login')
  }

  const [favorites, spotsSummary] = await Promise.all([fetchFavorites(userId), fetchSpotsSummary()])

  interface FavoriteRow {
    spot_id: number
    building_id: number
    name: string
    floor: number
    seat_count: number
    has_outlets: boolean
    is_quiet_zone: boolean
    building: {
      building_id: number
      name: string
      campus: string
      longitude: number
      latitude: number
    }
    created_at: string
  }

  interface SpotSummaryRow {
    spot_id: number
    avg_quiet_score: number | null
    rating_count: number
  }

  const favoriteSpots: SpotWithSummary[] = (favorites as FavoriteRow[]).map((fav) => {
    const summary = (spotsSummary as SpotSummaryRow[]).find((s) => s.spot_id === fav.spot_id)
    return {
      spot_id: fav.spot_id,
      building_id: fav.building_id,
      name: fav.name,
      floor: fav.floor,
      seat_count: fav.seat_count,
      has_outlets: fav.has_outlets,
      is_quiet_zone: fav.is_quiet_zone,
      building: {
        name: fav.building.name,
        campus: fav.building.campus,
      },
      avg_quiet_score: summary?.avg_quiet_score ? Number(summary.avg_quiet_score) : undefined,
      rating_count: summary?.rating_count ? Number(summary.rating_count) : undefined,
    }
  })

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">My Favorites</h1>
          <p className="mt-1 text-sm text-gray-500">
            Spots you&apos;ve saved to come back to later.
          </p>
        </div>

        {favoriteSpots.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              You haven&apos;t favorited any spots yet.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Browse spots and tap the heart icon on places you like.
            </p>
            <Link
              href="/spots"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Browse study spots →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoriteSpots.map((spot) => (
              <SpotCard key={spot.spot_id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

