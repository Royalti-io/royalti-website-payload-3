"use client"

import React from "react"
import { motion } from "framer-motion"
import type { FC } from "react"

interface TextRevealProps {
  children: string,
  className?: string,
  delay?: number,
}

export const TextReveal: FC<TextRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
}) => {
  const words = children.split(" ")

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            y: prefersReducedMotion ? 0 : 20,
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
