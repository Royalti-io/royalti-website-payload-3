"use client"

import React from "react"
import { cn } from "../../utilities/cn"
import type { FC, ReactNode } from "react"

interface ContainerProps {
  children: ReactNode,
  className?: string,
  as?: React.ElementType,
  size?: "default" | "sm" | "lg" | "xl" | "full",
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
  size = "default",
}) => {
  const sizes = {
    default: "max-w-7xl",
    sm: "max-w-5xl",
    lg: "max-w-8xl",
    xl: "max-w-[90rem]",
    full: "max-w-full",
  }
  
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </Component>
  )
}
