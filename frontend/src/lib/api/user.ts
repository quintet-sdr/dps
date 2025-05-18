import { ApiError, IUser } from '@/types/types'

export async function getOneUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/profile`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    throw new Error(error.message || 'Failed to fetch user')
  }

  return (await res.json()) as IUser
}
