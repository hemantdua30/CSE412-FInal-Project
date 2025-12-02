import { Star } from 'lucide-react'
import type { RatingWithUser } from '@/types/database'

interface RatingListProps {
  ratings: RatingWithUser[]
}

export default function RatingList({ ratings }: RatingListProps) {
  if (ratings.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">No one has rated this spot yet. Be the first!</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-900">
        All ratings ({ratings.length})
      </h3>
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div
            key={rating.rating_id}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900">
                    {rating.users.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-slate-900">
                      {rating.quiet_score}
                    </span>
                    <span className="text-xs text-gray-500">/ 5</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(rating.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {rating.comment && (
                  <p className="mt-2 text-sm text-gray-700">
                    {rating.comment}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

