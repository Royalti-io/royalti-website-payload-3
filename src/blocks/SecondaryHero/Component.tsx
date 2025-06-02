'use client'

import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

interface SecondaryHeroProps {
  heading: string
  subheading?: string
  backgroundPattern: 'dots' | 'grid' | 'none'
  showBreadcrumbs: boolean
  breadcrumbs?: Array<{
    label: string
    href: string
  }>
}

export const SecondaryHero: FC<SecondaryHeroProps> = ({
  heading,
  subheading,
  backgroundPattern,
  showBreadcrumbs,
  breadcrumbs,
}) => {
  const patterns = {
    dots: 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]',
    grid: 'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]',
    none: '',
  }

  return (
    <div className={cn('relative bg-white dark:bg-gray-900', patterns[backgroundPattern])}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-8 flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              {breadcrumbs.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    {index > 0 && (
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    )}
                    <Link
                      href={item.href}
                      className={cn(
                        'ml-4 text-sm font-medium',
                        index === breadcrumbs.length - 1
                          ? 'text-gray-500 dark:text-gray-400'
                          : 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                      )}
                      aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
