"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "../../../src/utilities/cn"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TextReveal({ 
  children, 
  className = "",
  delay = 0
}: TextRevealProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, child => (
        <motion.span className="inline-block" variants={item}>
          {child}
        </motion.span>
      ))}
    </motion.div>
  )
}
