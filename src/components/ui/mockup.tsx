"use client";

import React from "react";
import type { FC, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utilities/cn";

// Frame variants
const frameVariants = cva(
  "relative rounded-xl border bg-background shadow-lg overflow-hidden",
  {
    variants: {
      size: {
        small: "max-w-[640px]",
        medium: "max-w-[960px]",
        large: "max-w-[1280px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

// Mockup variants
const mockupVariants = cva("relative", {
  variants: {
    type: {
      browser: "rounded-md border bg-card shadow-sm overflow-hidden",
      responsive: "rounded-md overflow-hidden",
      phone: "rounded-[2.5rem] border-[14px] border-foreground/10 bg-card shadow-sm overflow-hidden",
      window: "rounded-md border bg-card shadow-sm overflow-hidden",
    },
  },
  defaultVariants: {
    type: "browser",
  },
});

// Browser bar variants
const browserBarVariants = cva(
  "flex items-center gap-2 border-b bg-muted/40 p-3",
  {
    variants: {
      size: {
        small: "p-2",
        medium: "p-3",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

// Window bar variants
const windowBarVariants = cva(
  "flex items-center justify-between border-b bg-muted/40 p-3",
  {
    variants: {
      size: {
        small: "p-2",
        medium: "p-3",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

// MockupFrame component
export interface MockupFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {}

export const MockupFrame: FC<MockupFrameProps> = ({
  className,
  size,
  children,
  ...props
}) => {
  return (
    <div className={cn(frameVariants({ size }), className)} {...props}>
      {children}
    </div>
  );
};

// Mockup component
export interface MockupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mockupVariants> {
  children: ReactNode;
}

export const Mockup: FC<MockupProps> = ({
  className,
  type,
  children,
  ...props
}) => {
  return (
    <div className={cn(mockupVariants({ type }), className)} {...props}>
      {type === "browser" && (
        <div className={browserBarVariants()}>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
        </div>
      )}
      {type === "window" && (
        <div className={windowBarVariants()}>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
