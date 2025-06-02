import type { Metadata } from 'next'
import { cn } from '../utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { headers } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''
  const isAdminRoute = pathname.startsWith('/admin')

  // For admin routes, let PayloadCMS handle the layout
  if (isAdminRoute) {
    return children
  }

  // For frontend routes, use our custom layout
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Royalti.io',
  description: 'Music Business Workspace',
}
