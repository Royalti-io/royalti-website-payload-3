import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  variant?: 'horizontal' | 'stacked'
}

export const LogoText = (props: Props) => {
  const { className, variant = 'horizontal' } = props

  return (
    <div className={clsx('transition-colors duration-200', className)}>
      <span 
        className={clsx(
          'font-bold tracking-tight text-royal-600 dark:text-white',
          variant === 'horizontal' ? 'text-2xl' : 'text-lg'
        )}
        style={{ 
          fontFamily: 'Tomato Grotesk, Red Hat Display, sans-serif' 
        }}
      >
        Royalti.io
      </span>
    </div>
  )
}
