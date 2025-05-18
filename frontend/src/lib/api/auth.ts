import { ApiError, IUser } from '@/types/types'

export async function registerUser(data: IUser) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/register`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    throw new Error(error.message || 'Registration failed')
  }

  return await loginUser({ email: data.email, password: data.password })
}

export async function loginUser(data: IUser) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    throw new Error(error.message || 'Login failed')
  }

  return res.json()
}

export async function logoutUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  if (!res.ok) {
    throw new Error('Logout failed')
  }
}
