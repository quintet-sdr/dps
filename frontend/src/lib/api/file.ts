import { ApiError, File } from '@/types/types'

export async function getFiles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/file`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    throw new Error(error.message || 'Failed to fetch files')
  }

  const data = await res.json()
  return data.files as File[]
}

export async function getUsersFile(userId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/file/${userId}`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include'
  })

  if (!res.ok) {
    const error: ApiError = await res.json()
    throw new Error(error.message || 'Failed to fetch files')
  }

  const data = await res.json()
  return data as File[]
}

export async function uploadFile(file: globalThis.File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('filename', file.name)

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/file`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to upload file')
  }

  return await res.json()
}
