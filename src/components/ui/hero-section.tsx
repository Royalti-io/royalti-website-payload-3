"use client";

import React from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/utilities/cn";
import { Particles } from "@/components/magicui/particles";
import { useEffect, useState } from "react";
interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export const HeroSection: FC<HeroProps> = ({
  badge,
  title,
  description,
  actions,
  image,
}) => {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;

  const [color, setColor] = useState("#006666");

useEffect(() => {
  setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
}, [resolvedTheme]);

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-3 sm:py-6 md:py-8 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-3 text-center sm:gap-6">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-2xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight max-w-[750px]">
            {title}
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-4">
            {actions.map((action, index) => (
              <Button key={index} variant={action.variant} size="lg" asChild>
                <a href={action.href} className="flex items-center gap-2">
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Image with Glow */}
          <div className="relative pt-12">
            <div className="relative z-10">
              <MockupFrame
                className="animate-appear"
                size="medium"
              >
                <Mockup type="responsive">
                  <Image
                    src={imageSrc}
                    alt={image.alt}
                    width={900}
                    height={506}
                    // className="w-[2400px] h-[1450px]"
                    priority
                  />
                </Mockup>
              </MockupFrame>
            </div>
            <div className="absolute inset-0 -z-10">
              <Glow
                variant="top"
                className="animate-appear-zoom bg-brand"
              />
              <Glow
                variant="bottom"
                className="animate-appear-zoom bg-primary/50 delay-300"
              />
            </div>
          </div>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
        </div>
      </div>
    </section>
  );
}
