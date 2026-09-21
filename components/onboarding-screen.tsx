"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PaginationDots } from "./pagination-dots";

// All positions are in design pixels (941 x 1672), scaled by --u.
const abs = "absolute";
const INTERVAL_MS = 4000;

const slides = [
  {
    photos: [
      { src: "/images/slide1-photo-1.jpg", alt: "Model in burgundy shirt" },
      { src: "/images/slide1-photo-2.jpg", alt: "Woman in knit sweater" },
    ],
    words: ["Find", "new season", "Fresh Looks", "for every", "Mood"],
  },
  {
    photos: [
      { src: "/images/onboarding-photo-1.jpg", alt: "Model in olive shirt and cream trousers" },
      { src: "/images/onboarding-photo-2.jpg", alt: "Model in white linen shirt" },
    ],
    words: ["Start", "finding your", "Version the", "best fashion", "Style"],
  },
  {
    photos: [
      { src: "/images/slide3-photo-1.jpg", alt: "Model in blue shirt and chinos" },
      { src: "/images/slide3-photo-2.jpg", alt: "Child in cream sweatshirt" },
    ],
    words: ["Shop", "your favorite", "Timeless Fit", "made for", "You"],
  },
];

const cardBase = `${abs} overflow-hidden rounded-[calc(var(--u)*50)] bg-card`;

export function OnboardingScreen() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((a) => (a + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div className="flex min-h-dvh justify-center bg-page">
      <main
        className="relative w-full max-w-[430px] overflow-hidden bg-page [container-type:inline-size]"
        style={{ ["--u" as string]: "calc(100cqw / 941)", aspectRatio: "941 / 1672" }}
      >
        {/* background blobs */}
        <div className={`${abs} rounded-[50%] bg-blob left-[calc(var(--u)*-140)] top-[calc(var(--u)*1160)] h-[calc(var(--u)*520)] w-[calc(var(--u)*380)] rotate-[-12deg]`} />
        <div className={`${abs} rounded-[50%] bg-blob left-[calc(var(--u)*770)] top-[calc(var(--u)*1360)] h-[calc(var(--u)*420)] w-[calc(var(--u)*330)]`} />

        {/* scribble */}
        <svg className={`${abs} left-0 top-[calc(var(--u)*1180)] w-[calc(var(--u)*250)]`} viewBox="0 0 250 500" fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M0 105 C60 100 130 70 100 25 C70 -10 20 40 60 75 C100 100 130 60 100 30 C80 10 60 20 90 40 C130 70 110 110 60 130 C40 140 15 145 0 150" />
          <path d="M0 180 C60 200 130 230 190 290 C240 350 240 440 170 470 C130 490 100 470 110 440" />
          <path d="M0 230 C60 260 120 330 130 420 C135 460 120 490 100 500" />
        </svg>

        {/* content is shifted down to make room for the logo */}
        <div className="absolute inset-0 translate-y-[calc(var(--u)*80)]">
        {/* slides: photo cards */}
        {slides.map((slide, i) => (
          <div key={i} className={`transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== active}>
            <div className={`${cardBase} left-[calc(var(--u)*-20)] top-[calc(var(--u)*100)] h-[calc(var(--u)*545)] w-[calc(var(--u)*415)] rotate-[-8deg]`}>
              <Image src={slide.photos[0].src} alt={slide.photos[0].alt} fill sizes="430px" priority={i < 2} className={i === 1 ? "object-cover object-[35%_50%]" : "object-cover object-top"} />
            </div>
            <div className={`${cardBase} left-[calc(var(--u)*390)] top-[calc(var(--u)*230)] h-[calc(var(--u)*545)] w-[calc(var(--u)*470)] rotate-[8deg]`}>
              <Image src={slide.photos[1].src} alt={slide.photos[1].alt} fill sizes="430px" priority={i < 2} className="object-cover" />
            </div>
          </div>
        ))}

        {/* dashes */}
        <svg className={`${abs} left-[calc(var(--u)*735)] top-[calc(var(--u)*170)] w-[calc(var(--u)*130)]`} viewBox="0 0 130 100" stroke="var(--color-dash)" strokeWidth="6" strokeLinecap="round" aria-hidden>
          <path d="M22 6h26M56 6h6M12 30h16M40 28h24M70 26h30M8 50h20M40 52h20M76 50h30M30 72h28M68 72h24M56 94h16M84 94h12" />
        </svg>

        {/* headline */}
        {slides.map((slide, i) => {
          const [w1, w2, w3, w4, w5] = slide.words;
          return (
            <h1
              key={i}
              aria-hidden={i !== active}
              className={`font-display text-ink absolute left-0 top-[calc(var(--u)*780)] w-full font-normal leading-none transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              <span className={`${abs} left-[calc(var(--u)*175)] top-[calc(var(--u)*10)] whitespace-nowrap text-[calc(var(--u)*118)]`}>{w1}</span>
              <span className={`${abs} left-[calc(var(--u)*492)] top-[calc(var(--u)*75)] whitespace-nowrap text-[calc(var(--u)*56)]`}>{w2}</span>
              <span className={`${abs} left-[calc(var(--u)*105)] top-[calc(var(--u)*150)] whitespace-nowrap text-[calc(var(--u)*118)]`}>{w3}</span>
              <span className={`${abs} left-[calc(var(--u)*248)] top-[calc(var(--u)*318)] whitespace-nowrap text-[calc(var(--u)*56)]`}>{w4}</span>
              <span className={`${abs} left-[calc(var(--u)*578)] top-[calc(var(--u)*275)] whitespace-nowrap text-[calc(var(--u)*118)]`}>{w5}</span>
            </h1>
          );
        })}

        {/* dots */}
        <div className={`${abs} left-[calc(var(--u)*408)] top-[calc(var(--u)*1307)]`}>
          <PaginationDots count={slides.length} active={active} onSelect={setActive} />
        </div>

        {/* CTA */}
        <Link
          href="/home"
          className={`${abs} left-[calc(var(--u)*290)] top-[calc(var(--u)*1400)] block h-[calc(var(--u)*170)] w-[calc(var(--u)*360)] transition-transform active:scale-95`}
        >
          <svg className="absolute inset-0 size-full" viewBox="0 0 360 170" aria-hidden>
            <path d="M10 60 C10 20 120 5 200 8 C290 10 350 30 350 85 C350 130 280 150 190 152 C90 155 10 130 10 60Z" fill="var(--color-cta)" />
            <path d="M28 85 C20 30 110 15 220 20 C320 24 350 40 342 80" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M28 85 C30 130 60 150 100 152" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M28 160 C90 168 180 166 245 150" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="font-display text-ink absolute inset-0 flex items-center justify-center pb-[calc(var(--u)*12)] text-[calc(var(--u)*50)]">
            Get Started
          </span>
        </Link>
        </div>

        {/* logo */}
        <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className={`${abs} left-1/2 top-[calc(var(--u)*30)] z-10 h-[calc(var(--u)*150)] w-auto -translate-x-1/2`} />
      </main>
    </div>
  );
}
