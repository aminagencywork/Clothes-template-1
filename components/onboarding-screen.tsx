"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PaginationDots } from "./pagination-dots";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 5000;
const FOREST = "#3a4a2e";

const slides = [
  {
    id: "men",
    image: "/images/onb-men.jpg",
    alt: "Men's Collection — Style Moves With You",
    href: "/collection/men",
  },
  {
    id: "women",
    image: "/images/onb-women.jpg",
    alt: "Women's Collection — Confidence Looks Good On You",
    href: "/collection/women",
  },
  {
    id: "new",
    image: "/images/onb-new.jpg",
    alt: "New Arrivals — Fresh Styles New Stories",
    href: "/collection/new",
  },
];

export function OnboardingScreen() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((a) => (a + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="flex min-h-dvh justify-center bg-page">
      <main
        className="relative w-full max-w-[430px] bg-page pb-[calc(var(--u)*60)] [container-type:inline-size]"
        style={{ ["--u" as string]: "calc(100cqw / 941)" }}
      >
        {/* background blobs */}
        <div className="pointer-events-none absolute -left-[calc(var(--u)*90)] top-[calc(var(--u)*120)] size-[calc(var(--u)*260)] rounded-full opacity-70" style={{ background: "#eef1e4" }} aria-hidden />
        <div className="pointer-events-none absolute -right-[calc(var(--u)*70)] top-[calc(var(--u)*700)] size-[calc(var(--u)*220)] rounded-full opacity-60" style={{ background: "#eef1e4" }} aria-hidden />

        {/* header */}
        <header className="relative flex items-center justify-center px-[calc(var(--u)*36)] pt-[calc(var(--u)*36)]">
          <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className="h-[calc(var(--u)*96)] w-auto" />
          <Link href="/home" className="absolute right-[calc(var(--u)*36)] border-b border-ink/50 pb-[calc(var(--u)*2)] text-[calc(var(--u)*26)] text-ink">
            Skip
          </Link>
        </header>

        {/* slides: card artwork (photo + copy baked in from the design) */}
        <div className="relative mx-auto mt-[calc(var(--u)*110)] w-[calc(var(--u)*760)] overflow-hidden rounded-[calc(var(--u)*46)] shadow-[0_20px_50px_rgba(35,45,25,0.18)]" style={{ aspectRatio: "41 / 63" }}>
          {slides.map((s, i) => (
            <Link
              key={s.id}
              href={s.href}
              className={cn("absolute inset-0 block transition-opacity duration-700", i === active ? "opacity-100" : "pointer-events-none opacity-0")}
              tabIndex={i === active ? 0 : -1}
              aria-hidden={i !== active}
            >
              <Image src={s.image} alt={s.alt} fill sizes="(min-width: 430px) 400px, 90vw" priority={i === 0} className="object-cover" />
            </Link>
          ))}
        </div>

        {/* dots */}
        <div className="mt-[calc(var(--u)*28)] flex justify-center">
          <PaginationDots count={slides.length} active={active} onSelect={setActive} />
        </div>

        {/* CTA */}
        <Link
          href="/home"
          className="mx-auto mt-[calc(var(--u)*120)] flex h-[calc(var(--u)*100)] w-fit items-center gap-[calc(var(--u)*26)] rounded-full pl-[calc(var(--u)*48)] pr-[calc(var(--u)*10)] shadow-[0_10px_26px_rgba(58,74,46,0.28)] transition-transform active:scale-[0.98]"
          style={{ background: FOREST }}
        >
          <span className="font-display text-[calc(var(--u)*32)] text-page">Get Started</span>
          <span className="grid size-[calc(var(--u)*80)] shrink-0 place-items-center rounded-full bg-page" style={{ color: FOREST }}>
            <ArrowRight className="size-[calc(var(--u)*32)]" strokeWidth={1.8} />
          </span>
        </Link>

        {/* footer */}
        <div className="mt-[calc(var(--u)*90)] flex items-end justify-between px-[calc(var(--u)*34)]">
          <div className="flex items-center gap-[calc(var(--u)*10)]">
            <svg className="size-[calc(var(--u)*46)]" viewBox="0 0 46 46" fill="none" style={{ color: FOREST }} aria-hidden>
              <path d="M23 42 C23 26 15 18 6 14 C14 16 22 22 23 34 C24 22 32 16 40 14 C31 18 23 26 23 42Z" fill="currentColor" opacity="0.85" />
            </svg>
            <p className="font-script text-[calc(var(--u)*34)] leading-[0.9] text-ink">More Than<br />Fashion</p>
          </div>
          <p className="pb-[calc(var(--u)*4)] text-right text-[calc(var(--u)*17)] leading-[1.5] tracking-[0.14em] text-muted">STYLE TODAY<br />A BRIGHTER TOMORROW</p>
        </div>
      </main>
    </div>
  );
}
