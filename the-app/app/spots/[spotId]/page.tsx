import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, getCurrentUserId } from '@/lib/auth'
import { query } from '@/lib/db'
import SpotDetails from '@/components/ui/SpotDetails'
import RatingForm from '@/components/ui/RatingForm'
import RatingList from '@/components/ui/RatingList'
import FavoriteButton from '@/components/ui/FavoriteButton'

interface SpotPageProps {
  params: Promise<{ spotId: string }>
}

async function fetchSpotDetails(spotId: number) {
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
    [spotId]
  )
  if (rows.length === 0) return null
  const row = rows[0]
  return {
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
  }
}

async function fetchRatings(spotId: number) {
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
    [spotId]
  )
  interface RatingRow {
    rating_id: number
    user_id: number
    spot_id: number
    quiet_score: number
    comment: string
    created_at: string
    user_name: string
  }

  return (rows as RatingRow[]).map((row) => ({
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
}

async function fetchUserRating(userId: number, spotId: number) {
  const rows = await query(
    `
    SELECT rating_id, user_id, spot_id, quiet_score, comment, created_at
    FROM rating
    WHERE user_id = $1 AND spot_id = $2
    LIMIT 1;
  `,
    [userId, spotId]
  )
  return rows.length > 0 ? rows[0] : null
}

async function fetchIsFavorited(userId: number, spotId: number) {
  const rows = await query(
    `
    SELECT EXISTS(
      SELECT 1 FROM favorite
      WHERE user_id = $1 AND spot_id = $2
    ) AS is_favorited;
  `,
    [userId, spotId]
  )
  return rows[0]?.is_favorited || false
}

async function fetchSpotSummary(spotId: number) {
  const rows = await query(`
    SELECT
      s.spot_id,
      COALESCE(AVG(r.quiet_score), 0) AS avg_quiet_score,
      COUNT(r.rating_id) AS rating_count
    FROM spot s
    LEFT JOIN rating r ON r.spot_id = s.spot_id
    WHERE s.spot_id = $1
    GROUP BY s.spot_id;
  `, [spotId])
  return rows.length > 0 ? rows[0] : null
}

export default async function SpotPage({ params }: SpotPageProps) {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const { spotId } = await params
  const spotIdNum = parseInt(spotId, 10)

  if (isNaN(spotIdNum)) {
    notFound()
  }

  const userId = await getCurrentUserId()
  if (!userId) {
    redirect('/login')
  }

  const [spot, ratings, userRating, favorited, spotSummary] = await Promise.all([
    fetchSpotDetails(spotIdNum),
    fetchRatings(spotIdNum),
    fetchUserRating(userId, spotIdNum),
    fetchIsFavorited(userId, spotIdNum),
    fetchSpotSummary(spotIdNum),
  ])

  if (!spot) {
    notFound()
  }

  const avgQuietScore = spotSummary?.avg_quiet_score ? Number(spotSummary.avg_quiet_score) : undefined
  const ratingCount = spotSummary?.rating_count ? Number(spotSummary.rating_count) : undefined

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="mb-4">
          <Link
            href="/spots"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to all spots
          </Link>
        </div>

        <div className="space-y-6">
          <SpotDetails spot={spot} avgQuietScore={avgQuietScore} ratingCount={ratingCount} />

          <div>
            <FavoriteButton spotId={spotIdNum} initialIsFavorited={favorited} />
          </div>

          <RatingForm
            spotId={spotIdNum}
            userId={userId}
            existingRating={userRating}
          />

          <RatingList ratings={ratings} />
        </div>
      </div>
    </div>
  )
}

