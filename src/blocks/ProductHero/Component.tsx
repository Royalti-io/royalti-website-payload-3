'use client'

import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface ProductHeroProps {
  heading: string
  subheading?: string
  image: MediaType
  features?: Array<{
    title: string
    description: string
  }>
  ctaButton: {
    text: string
    url: string
  }
}

export const ProductHero: FC<ProductHeroProps> = ({
  heading,
  subheading,
  image,
  features,
  ctaButton,
}) => {
  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {subheading}
            </p>
          )}
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href={ctaButton.url}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {ctaButton.text}
            </Link>
          </div>
          {features && features.length > 0 && (
            <div className="mt-16 sm:mt-20 lg:mt-24">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10">
                {features.map((feature, index) => (
                  <div key={index} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Media
                resource={image}
                className="w-[76rem] rounded-lg shadow-2xl ring-1 ring-gray-900/10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
