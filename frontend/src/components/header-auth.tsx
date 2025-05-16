import React from 'react'
import { Github, User } from 'lucide-react'
import Link from 'next/link'

function HeaderAuth() {
  return (
    <header className="text-background flex w-screen flex-row items-center justify-between px-30 py-6">
      <address>
        <Link href="https://github.com/quintet-sdr/dps">
          <Github size={50} />
        </Link>
      </address>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-lg font-semibold">Username</span>
        <User size={50} />
      </div>
    </header>
  )
}

export default HeaderAuth
