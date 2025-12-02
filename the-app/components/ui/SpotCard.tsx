import Link from 'next/link'
import { Zap, VolumeX, ChevronRight, Star } from 'lucide-react'
import type { SpotWithSummary } from '@/types/database'

interface SpotCardProps {
  spot: SpotWithSummary
}

export default function SpotCard({ spot }: SpotCardProps) {
  const avgScore = spot.avg_quiet_score
  const ratingCount = spot.rating_count || 0

  return (
    <Link
      href={`/spots/${spot.spot_id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md md:p-5"
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-900">
          {spot.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          {spot.building.name} • {spot.building.campus}
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="text-xs text-gray-600">Floor {spot.floor}</span>
        <span className="text-xs text-gray-600">{spot.seat_count} seats</span>
        {spot.is_quiet_zone ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            <VolumeX className="h-3 w-3" />
            Quiet Zone
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600">
            General area
          </span>
        )}
        {spot.has_outlets && (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
            <Zap className="h-3 w-3" />
            Outlets
          </span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="flex items-center gap-2">
          {avgScore !== undefined && avgScore !== null ? (
            <>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-900">
                {avgScore.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">
                ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-500">No ratings yet</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
          <span>View details</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}

