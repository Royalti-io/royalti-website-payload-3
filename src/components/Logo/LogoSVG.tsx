import clsx from 'clsx'
import React from 'react'
import { useTheme } from '@/providers/Theme'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'horizontal' | 'stacked'
}

export const Logo = (props: Props) => {
  const { className, variant = 'horizontal' } = props
  const { theme } = useTheme()

  const isDark = theme === 'dark'
  const primaryColor = isDark ? '#ffffff' : '#006666' // White in dark mode, Royalti Blue in light
  const accentColor = '#f3784e' // Orange accent from brand guidelines

  if (variant === 'stacked') {
    return (
      <div className={clsx('flex flex-col items-center', className)}>
        {/* Icon */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          className="mb-1"
          aria-hidden="true"
        >
          <rect 
            width="32" 
            height="32" 
            rx="6" 
            fill={primaryColor}
          />
          <circle 
            cx="16" 
            cy="16" 
            r="8" 
            fill={accentColor}
          />
          <path 
            d="M12 12 L20 16 L12 20 Z" 
            fill={isDark ? '#006666' : '#ffffff'}
          />
        </svg>        {/* Text */}
        <span 
          className="font-bold text-lg leading-none tracking-tight"
          style={{ 
            fontFamily: 'Tomato Grotesk, Red Hat Display, sans-serif',
            color: primaryColor
          }}
        >
          Royalti.io
        </span>
      </div>
    )
  }

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {/* Icon */}
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <rect 
          width="32" 
          height="32" 
          rx="6" 
          fill={primaryColor}
        />
        <circle 
          cx="16" 
          cy="16" 
          r="8" 
          fill={accentColor}
        />
        <path 
          d="M12 12 L20 16 L12 20 Z" 
          fill={isDark ? '#006666' : '#ffffff'}
        />
      </svg>
      {/* Text */}
      <span 
        className="font-bold text-xl leading-none tracking-tight"
        style={{ 
          fontFamily: 'Tomato Grotesk, Red Hat Display, sans-serif',
          color: primaryColor
        }}
      >
        Royalti.io
      </span>
    </div>
  )
}
