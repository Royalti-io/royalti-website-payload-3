"use client"

import React from "react"
import { motion } from "framer-motion"
import type { FC } from "react"
import { cn } from "../../../utilities/cn"

interface GradientTextProps {
  children: string,
  className?: string,
  animate?: boolean,
}

export const GradientText: FC<GradientTextProps> = ({ 
  children, 
  className = "", 
  animate = true,
}) => {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-royal-600 via-royal-500 to-royal-400 bg-clip-text text-transparent",
        animate && "bg-[length:200%_auto] animate-gradient-x",
        className,
      )}
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  )
}
