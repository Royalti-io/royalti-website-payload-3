"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "../../../src/utilities/cn"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function GradientText({ 
  children, 
  className = "",
  animate = true
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-royal-600 via-royal-500 to-royal-400 bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-gradient-x",
        className
      )}
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  )
}
