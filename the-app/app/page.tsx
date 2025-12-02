import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Welcome back, {user.name} 👋
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Find a quiet spot to study or jump to your favorites.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/spots"
              className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Browse Spots
            </Link>
            <Link
              href="/favorites"
              className="flex h-12 items-center justify-center rounded-lg border border-blue-600 bg-white px-8 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              My Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
