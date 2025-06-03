"use client";

import React from "react";
import type { FC } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";

export const HeroSectionDemo: FC = () => {
  return (
    <HeroSection
      badge={{
        text: "Introducing our new components",
        action: {
          text: "Learn more",
          href: "/docs",
        },
      }}
      title="Build faster with beautiful components"
      description="Premium UI components built with React and Tailwind CSS. Save time and ship your next project faster with our ready-to-use components."
      actions={[
        {
          text: "Get Started",
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: "GitHub",
          href: "https://github.com/your-repo",
          variant: "glow",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1248&auto=format&fit=crop",
        dark: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1248&auto=format&fit=crop",
        alt: "UI Components Preview",
      }}
    />
  );
}
