import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import BackgroundWrapper from '@/components/particle-background'
import { QueryProvider } from '@/lib/providers/QueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Distributed PDF Filesystem',
  description: 'Created by SDR'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark-high-contrast antialiased`}
      >
        <BackgroundWrapper />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
