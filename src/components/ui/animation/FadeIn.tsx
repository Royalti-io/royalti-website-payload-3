"use client"

import React from "react"
import { motion } from "framer-motion"
import type { FC, ReactNode } from "react"

interface FadeInProps {
  children: ReactNode,
  delay?: number,
  direction?: "up" | "down" | "left" | "right" | "none",
  className?: string,
  duration?: number,
}

export const FadeIn: FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "",
  duration = 0.6,
}) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: -20 },
    right: { y: 0, x: 20 },
    none: { y: 0, x: 0 },
  }

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...(prefersReducedMotion ? {} : directions[direction]),
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
