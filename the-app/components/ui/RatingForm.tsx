'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Rating } from '@/types/database'

interface RatingFormProps {
  spotId: number
  userId: number
  existingRating: Rating | null
}

export default function RatingForm({
  spotId,
  userId,
  existingRating,
}: RatingFormProps) {
  const router = useRouter()
  const [quietScore, setQuietScore] = useState(existingRating?.quiet_score ?? 3)
  const [comment, setComment] = useState(existingRating?.comment ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (existingRating) {
      setQuietScore(existingRating.quiet_score)
      setComment(existingRating.comment ?? '')
    } else {
      setQuietScore(3)
      setComment('')
    }
  }, [existingRating])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const url = existingRating
        ? `/api/ratings/${existingRating.rating_id}`
        : '/api/ratings'
      const method = existingRating ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotId,
          userId,
          quietScore,
          comment: comment.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Failed to save rating')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!existingRating) return

    if (!window.confirm('Are you sure you want to delete your rating?')) {
      return
    }

    setError(null)
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/ratings/${existingRating.rating_id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Failed to delete rating')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-900">Your rating</h3>

      {!existingRating && (
        <p className="mb-4 text-sm text-gray-500">
          You haven&apos;t rated this spot yet. How quiet did it feel?
        </p>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Quiet Score
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setQuietScore(score)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  quietScore === score
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-slate-700 hover:bg-gray-50'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Comment (optional)
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Optional: share any details (time of day, crowd level, etc.)"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : existingRating ? 'Update rating' : 'Save rating'}
          </button>

          {existingRating && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-500 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

