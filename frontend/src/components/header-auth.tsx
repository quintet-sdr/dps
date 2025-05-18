import React from 'react'
import { Github, User } from 'lucide-react'
import Link from 'next/link'
import { IUser } from '@/types/types'

function HeaderAuth({ user }: { user: IUser }) {
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
        <User size={50} />
      </div>
    </header>
  )
}

export default HeaderAuth
