import { cookies } from 'next/headers'
import { query } from './db'
import type { SessionUser } from '@/types/database'

const SESSION_COOKIE_NAME = 'study-spot-session'

export async function authenticateUser(email: string, password: string): Promise<SessionUser | null> {
  try {
    const rows = await query(
      `
      SELECT user_id, name, email, password
      FROM users
      WHERE email = $1 AND password = $2
      LIMIT 1;
    `,
      [email, password]
    )

    if (!rows || rows.length === 0) {
      return null
    }

    const user = rows[0]
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get(SESSION_COOKIE_NAME)

    if (!userCookie?.value) {
      return null
    }

    const user = JSON.parse(userCookie.value) as SessionUser
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getCurrentUserId(): Promise<number | null> {
  const user = await getCurrentUser()
  return user?.user_id ?? null
}

export async function setUserSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearUserSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

