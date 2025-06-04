'use client'

import clsx from 'clsx'
import React from 'react'
import { useTheme } from '@/providers/Theme'

interface Props {
  className?: string
  variant?: 'horizontal' | 'stacked' | 'icon-only'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * Royalti.io Logo Component
 * 
 * Features:
 * - Original Royalti.io SVG design with geometric shapes
 * - Theme-aware colors (dark text in light mode, white text in dark mode)
 * - Multiple size options with proper text/icon proportions
 * - Red Hat Display font
 * 
 * Size Guide:
 * - xs: Header/Footer usage (24px icon, text-xl)
 * - sm: Standard usage (28px icon, text-2xl) 
 * - md: Hero sections (32px icon, text-3xl)
 * - lg: Prominent display (40px icon, text-4xl)
 */

export const Logo = (props: Props) => {
  const { className, variant = 'horizontal', size = 'sm' } = props
  const { theme } = useTheme()

  const isDark = theme === 'dark'
  
  // Size configurations - adjusted to match your design
  const sizeConfig = {
    xs: { icon: 24, text: 'text-xl', gap: 'gap-2' },       // Extra small for tight spaces
    sm: { icon: 28, text: 'text-2xl', gap: 'gap-2' },      // Small - good for headers
    md: { icon: 32, text: 'text-3xl', gap: 'gap-3' },      // Medium - good for hero sections
    lg: { icon: 40, text: 'text-4xl', gap: 'gap-4' }       // Large - for prominent display
  }
  
  const config = sizeConfig[size]
  
  // Your original SVG logo with theme-aware colors
  const LogoIcon = () => (
    <svg 
      width={config.icon} 
      height={config.icon} 
      viewBox="0 0 330 330" 
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <path 
        d="M235.21,0H94.76C42.43,0,0,42.43,0,94.76c0,.01,0,.02,0,.03v140.45C0,287.57,42.43,330,94.76,330h235.24V94.79C330,42.44,287.56,0,235.21,0ZM271.11,227.67c-10.64,18.41-25.93,33.7-44.35,44.32l-60.55-105.15v121.37c-67.07,0-121.43-54.37-121.43-121.43s54.37-121.43,121.43-121.43,121.43,54.37,121.43,121.43v.03h-121.59l105.06,60.85Z"
        fill={isDark ? '#ffffff' : '#006666'}
        className="transition-colors duration-200"
      />
    </svg>
  )
  if (variant === 'icon-only') {
    return (
      <div className={clsx('flex items-center', className)}>
        <LogoIcon />
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={clsx('flex flex-col items-center', className)}>
        <LogoIcon />
        <span 
          className={clsx(
            'font-bold leading-none tracking-tight mt-1',
            'text-foreground transition-colors duration-200',
            config.text
          )}
        >
          Royalti.io
        </span>
      </div>
    )
  }

  // Default horizontal layout
  return (
    <div className={clsx('flex items-center', config.gap, className)}>
      <LogoIcon />
      <span 
        className={clsx(
          'font-bold leading-none tracking-tight',
          'text-foreground transition-colors duration-200',
          config.text
        )}
      >
        Royalti.io
      </span>
    </div>
  )
}
