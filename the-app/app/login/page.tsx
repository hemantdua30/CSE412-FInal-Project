import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Sign in to Quiet Study Spot Finder
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Use your student email to log in.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

