"use client";

import React from "react";
import type { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/cn";

// Glow variants
const glowVariants = cva("absolute blur-[100px] opacity-70", {
  variants: {
    variant: {
      primary: "bg-primary",
      brand: "bg-brand",
      top: "w-[100%] h-[60%] -top-[10%] left-[0%] rotate-[5deg]",
      bottom: "w-[100%] h-[60%] -bottom-[10%] left-[0%] -rotate-[5deg]",
      left: "w-[60%] h-[100%] -left-[10%] top-[0%] rotate-[5deg]",
      right: "w-[60%] h-[100%] -right-[10%] top-[0%] -rotate-[5deg]",
      center: "w-[80%] h-[80%] top-[10%] left-[10%]",
    },
    size: {
      sm: "max-w-sm max-h-sm",
      md: "max-w-md max-h-md",
      lg: "max-w-lg max-h-lg",
      xl: "max-w-xl max-h-xl",
      "2xl": "max-w-2xl max-h-2xl",
      "3xl": "max-w-3xl max-h-3xl",
      "4xl": "max-w-4xl max-h-4xl",
      "5xl": "max-w-5xl max-h-5xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

// Glow component
export interface GlowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glowVariants> {}

export const Glow: FC<GlowProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <div
      className={cn(glowVariants({ variant, size }), className)}
      {...props}
    />
  );
};
