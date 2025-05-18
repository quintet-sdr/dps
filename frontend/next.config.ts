import type { NextConfig } from 'next'
import * as dotenv from 'dotenv'

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER
  }
}

export default nextConfig
