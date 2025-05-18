import React, { useState } from 'react'
import { Github, User } from 'lucide-react'
import Link from 'next/link'
import { IUser } from '@/types/types'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@/lib/api/auth'
import { useQueryClient } from '@tanstack/react-query'

function HeaderAuth({ user }: { user: IUser }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    setError(null)
    try {
      await logoutUser()
      queryClient.removeQueries({ queryKey: ['user'] })
      router.push('/auth')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка логаута')
    }
  }

  return (
    <header className="text-background flex w-screen flex-row items-center justify-between px-30 py-6">
      <address>
        <div className="flex h-16 w-16 items-end justify-center rounded-full transition-colors duration-300 ease-in-out hover:bg-white">
          <Link href="https://github.com/quintet-sdr/dps">
            <Github size={50} />
          </Link>
        </div>
      </address>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-lg font-semibold">{user.username}</span>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center rounded-full transition-colors hover:bg-white"
          title="Log out"
          type="button"
        >
          <User size={50} />
        </button>
        {error && <span className="ml-2 text-sm text-red-500">{error}</span>}
      </div>
    </header>
  )
}

export default HeaderAuth
