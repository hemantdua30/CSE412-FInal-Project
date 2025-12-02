import { Zap, VolumeX } from 'lucide-react'
import type { Spot, Building } from '@/types/database'

interface SpotDetailsProps {
  spot: Spot & { building: Building }
  avgQuietScore?: number
  ratingCount?: number
}

export default function SpotDetails({ spot, avgQuietScore, ratingCount }: SpotDetailsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-slate-900">{spot.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {spot.building.name} • {spot.building.campus}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
          Floor {spot.floor}
        </span>
        <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
          {spot.seat_count} seats
        </span>
        {spot.is_quiet_zone && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <VolumeX className="h-3 w-3" />
            Quiet Zone
          </span>
        )}
        {spot.has_outlets && (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            <Zap className="h-3 w-3" />
            Outlets
          </span>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {avgQuietScore !== undefined && avgQuietScore !== null ? (
            <div>
              <div className="text-xs uppercase text-gray-500">Avg quiet score</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {avgQuietScore.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">
                {ratingCount || 0} {ratingCount === 1 ? 'rating' : 'ratings'}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs uppercase text-gray-500">Ratings</div>
              <div className="mt-1 text-sm text-gray-500">No ratings yet</div>
            </div>
          )}
          <div>
            <div className="text-xs uppercase text-gray-500">Seats</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">
              {spot.seat_count}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">Power Outlets</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              {spot.has_outlets ? 'Yes' : 'No'}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-gray-500">Quiet Zone</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              {spot.is_quiet_zone ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

