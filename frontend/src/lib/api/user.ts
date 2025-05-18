import { ApiError, IUser } from '@/types/types'

export async function getOneUser() {
  const res = await fetch(`http://localhost:8000/api/auth/profile`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    console.log(error)
    throw new Error(error.message || 'Failed to fetch user')
  }
  const data = await res.json()
  console.log(data)
  return data
}
