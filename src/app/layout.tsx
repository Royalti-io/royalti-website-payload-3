import type { Metadata } from 'next'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simply return children - let route group layouts handle their own HTML structure
  return children
}

export const metadata: Metadata = {
  title: 'Royalti.io',
  description: 'Music Business Workspace',
}
