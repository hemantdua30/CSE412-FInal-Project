'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  spotId: number
  initialIsFavorited: boolean
}

export default function FavoriteButton({
  spotId,
  initialIsFavorited,
}: FavoriteButtonProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsFavorited(initialIsFavorited)
  }, [initialIsFavorited])

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spotId,
          isFavorite: !isFavorited,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite')
      }

      setIsFavorited(!isFavorited)
      router.refresh()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isFavorited
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Heart
        className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
        strokeWidth={2}
      />
      <span>{isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
    </button>
  )
}

