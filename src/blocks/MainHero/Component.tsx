'use client'

import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface MainHeroProps {
  announcement?: string
  heading: string
  subheading?: string
  ctaButton: {
    text: string
    url: string
  }
  secondaryButton?: {
    text: string
    url: string
  }
  backgroundImage?: MediaType
  features?: Array<{
    feature: string
  }>
  statistics?: Array<{
    value: string
    label: string
  }>
}

export const MainHero: FC<MainHeroProps> = ({
  announcement,
  heading,
  subheading,
  ctaButton,
  secondaryButton,
  backgroundImage,
  features,
  statistics,
}) => {
  // Split heading to highlight last two words
  const words = heading.split(' ')
  const regularWords = words.slice(0, -2).join(' ')
  const highlightedWords = words.slice(-2).join(' ')

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-10">
          <Media
            resource={backgroundImage}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {announcement && (
          <div className="mb-8 text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/10 dark:text-blue-400">
              {announcement}
            </span>
          </div>
        )}
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {regularWords}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {highlightedWords}
            </span>
          </h1>
          {subheading && (
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              {subheading}
            </p>
          )}
          <div className="mb-12 flex justify-center gap-4">
            <Link
              href={ctaButton.url}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {ctaButton.text}
            </Link>
            {secondaryButton && (
              <Link
                href={secondaryButton.url}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
          {features && features.length > 0 && (
            <div className="mb-12">
              <dl className="flex flex-wrap justify-center gap-x-8">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <dt className="flex">
                      <span className="sr-only">Feature</span>
                      <svg
                        className="h-4 w-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </dt>
                    <dd className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {item.feature}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {statistics && statistics.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800">
              <dl className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <dt className="text-base font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 text-3xl font-bold tracking-tight">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
