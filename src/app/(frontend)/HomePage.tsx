import React from 'react'
import {
  // HeroSection,
  SocialProofBar,
  ProblemSolution,
  CoreValuePillars,
  ProductDemo,
  CustomerSuccessStories,
  FeatureComparison,
  PricingSection,
  TrustSecuritySection,
  FAQSection,
  FinalCTASection
} from '@/components/sections'
import { MainHero } from '@/components/heroes/MainHero'
import { HeroSection } from '@/components/ui/hero-section'
import { Icons } from '@/components/ui/icons'
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";
import { cn } from "src/utilities/cn";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Container } from "@/components/ui/container";
import Image from 'next/image'

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};


const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Image
        src="/api/media/file/royalti-io-home-hero-image.png"
        alt="Calendar"
        width={900}
        height={506}
        // className="w-[2400px] h-[1450px]"
        priority
      />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Image
        src="/api/media/file/royalti-io-home-hero-image.png"
        alt="Calendar"
        width={300}
        height={300}
        // className="w-[2400px] h-[1450px]"
        priority
      />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Image
        src="/api/media/file/royalti-io-home-hero-image.png"
        alt="Calendar"
        width={900}
        height={506}
        // className="w-[2400px] h-[1450px]"
        priority
      />
    ),
  },
];

export const HomePage: React.FC = () => {
  return (
    <>      
      <HeroSection
        // badge={{
        //   text: "Introducing our new components",
        //   action: {
        //     text: "Learn more",
        //     href: "/docs",
        //   },
        // }}
        title="Cloud Workspace for Streamlined Music Business"
        description="Say goodbye to intricate spreadsheets and confusing reports. Royalti.io streamlines catalog management, royalty analyses, splits, and accounting, making it a breeze for today’s artists and music companies."
        actions={[
          {
            text: "Get Started",
            href: "/docs/getting-started",
            variant: "default",
          },
          {
            text: "Watch Demo",
            href: "/demo",
            variant: "glow",
            // icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1248&auto=format&fit=crop",
          dark: "/api/media/file/royalti-io-home-hero-image.png",
          alt: "UI Components Preview",
        }}
      />
      
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
    </div>
      <SocialProofBar />
      <ProblemSolution />
      <section className="py-20 bg-gray-50 dark:bg-black">
        <Container>
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </Container>
      </section>
      <section className="py-20 bg-white dark:bg-black">
        <Container>
          <NeonGradientCard
            className="items-center justify-center text-center"
            borderSize={1}
            borderRadius={10}
            neonColors={{
              firstColor: "#ff00aa",
              secondColor: "#006666",
            }}
          >
            <BentoGrid>
              {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </NeonGradientCard>
        </Container>
      </section>
      <CoreValuePillars />
      <ProductDemo />
      <PricingSection />
      <TrustSecuritySection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
