import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import LogoutButton from '@/components/auth/LogoutButton'

export default async function Navigation() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-lg font-semibold text-slate-900"
            >
              Quiet Study Spot Finder
            </Link>
            <div className="hidden gap-6 md:flex">
              <Link
                href="/spots"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-slate-900"
              >
                Browse Spots
              </Link>
              <Link
                href="/favorites"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-slate-900"
              >
                My Favorites
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-600 sm:inline">
              {user.name}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

