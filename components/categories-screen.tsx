"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import { ArrowRight, Footprints, PersonStanding, Search, ShoppingBag, ShoppingCart, Shirt, SlidersHorizontal, Smile, X } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { categoryCards, categoryFilters, type CategoryFilter } from "@/lib/categories";
import { AMBER, AMBER_LIGHT, FOREST } from "@/lib/theme";

const icons: Record<CategoryFilter, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  All: Shirt,
  Men: Shirt,
  Women: PersonStanding,
  Kids: Smile,
  Shoes: Footprints,
  Accessories: ShoppingBag,
};

const CART_COUNT = 3; // dummy

export function CategoriesScreen() {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categoryCards.filter(
      (c) => (filter === "All" || c.group === filter) && (!q || c.title.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*37)] pb-[calc(var(--u)*180)] pt-[calc(var(--u)*88)]">
        {/* header */}
        <header className="flex items-start justify-between">
          <div>
            <p className="text-[calc(var(--u)*20)] tracking-[0.24em] text-muted">DISCOVER MORE</p>
            <h1 className="mt-[calc(var(--u)*6)] font-display text-[calc(var(--u)*72)] leading-none">Categories</h1>
            <p className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*27)] text-muted">Find your style, in every detail.</p>
          </div>
          <div className="mt-[calc(var(--u)*6)] flex items-start gap-[calc(var(--u)*20)]">
            <p className="font-script mt-[calc(var(--u)*4)] text-[calc(var(--u)*30)] italic leading-[1.1]" style={{ color: AMBER }}>
              Good<br />Style<br />Everyday
            </p>
            <Link href="/cart" aria-label="Cart" className="relative grid size-[calc(var(--u)*96)] shrink-0 place-items-center rounded-full" style={{ background: AMBER_LIGHT }}>
              <ShoppingCart className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
              <span className="absolute -right-[calc(var(--u)*10)] -top-[calc(var(--u)*8)] grid size-[calc(var(--u)*40)] place-items-center rounded-full text-[calc(var(--u)*21)] text-white" style={{ background: FOREST }}>
                {CART_COUNT}
              </span>
            </Link>
          </div>
        </header>

        {/* search */}
        <label className="mt-[calc(var(--u)*30)] flex h-[calc(var(--u)*84)] items-center gap-[calc(var(--u)*22)] rounded-full bg-white px-[calc(var(--u)*30)] shadow-[0_4px_20px_rgba(35,45,25,0.06)]">
          <Search className="size-[calc(var(--u)*38)] shrink-0 text-muted" strokeWidth={1.6} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for categories, products..."
            aria-label="Search categories"
            className="w-full min-w-0 bg-transparent text-[calc(var(--u)*26)] outline-none placeholder:text-muted"
          />
          {query ? (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
              <X className="size-[calc(var(--u)*32)] text-muted" />
            </button>
          ) : (
            <span className="grid size-[calc(var(--u)*54)] shrink-0 place-items-center rounded-full" style={{ background: AMBER_LIGHT }}>
              <SlidersHorizontal className="size-[calc(var(--u)*26)]" strokeWidth={1.6} />
            </span>
          )}
        </label>

        {/* filter icons */}
        <div className="no-scrollbar mt-[calc(var(--u)*30)] flex justify-between gap-[calc(var(--u)*16)] overflow-x-auto">
          {categoryFilters.map((f) => {
            const Icon = icons[f];
            const on = filter === f;
            return (
              <button key={f} type="button" aria-pressed={on} onClick={() => setFilter(f)} className="flex shrink-0 flex-col items-center gap-[calc(var(--u)*10)]">
                <span
                  className="grid size-[calc(var(--u)*112)] place-items-center rounded-full transition-colors"
                  style={{ background: on ? FOREST : AMBER_LIGHT, color: on ? "#ffffff" : AMBER }}
                >
                  <Icon className="size-[calc(var(--u)*48)]" strokeWidth={1.6} />
                </span>
                <span className={cn("text-[calc(var(--u)*23)] text-ink", on && "font-semibold")}>{f}</span>
                <span className={cn("h-[calc(var(--u)*3)] w-[calc(var(--u)*44)] rounded-full", on ? "bg-ink" : "bg-transparent")} />
              </button>
            );
          })}
        </div>

        {/* cards */}
        <div className="mt-[calc(var(--u)*24)] grid grid-cols-2 gap-x-[calc(var(--u)*11)] gap-y-[calc(var(--u)*13)]">
          {cards.map((c) => (
            <Link
              key={c.id}
              href={`/collection/${c.id}`}
              className="relative block h-[calc(var(--u)*238)] overflow-hidden rounded-[calc(var(--u)*26)] shadow-[0_4px_18px_rgba(35,45,25,0.08)] transition-transform active:scale-[0.98]"
            >
              <Image src={c.image} alt={c.title} fill sizes="460px" className="object-cover" />
            </Link>
          ))}
        </div>
        {cards.length === 0 && (
          <p className="mt-[calc(var(--u)*100)] text-center text-[calc(var(--u)*28)] text-muted">No categories found.</p>
        )}

        {/* offer */}
        <section className="relative mt-[calc(var(--u)*20)] h-[calc(var(--u)*206)] overflow-hidden rounded-[calc(var(--u)*26)]" style={{ background: FOREST }}>
          <div className="absolute left-[calc(var(--u)*34)] top-[calc(var(--u)*22)] text-white">
            <p className="text-[calc(var(--u)*16)] tracking-[0.16em]" style={{ color: AMBER }}>SPECIAL OFFER</p>
            <h2 className="font-display mt-[calc(var(--u)*4)] text-[calc(var(--u)*42)] leading-[1.05]">Upgrade<br />Your Style</h2>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*22)] text-white/90">
              Get up to <b className="font-semibold" style={{ color: AMBER }}>40% Off</b>
            </p>
            <Link href="/home" className="mt-[calc(var(--u)*16)] inline-flex h-[calc(var(--u)*50)] items-center gap-[calc(var(--u)*10)] rounded-full bg-white px-[calc(var(--u)*24)] text-[calc(var(--u)*20)] font-medium text-ink">
              Shop Now <ArrowRight className="size-[calc(var(--u)*18)]" />
            </Link>
          </div>
          <Image src="/images/cat-banner.jpg" alt="Model in olive jacket" width={255} height={198} className="absolute bottom-0 left-[calc(var(--u)*462)] h-full w-[calc(var(--u)*255)] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_18%)]" />
          <p className="font-script absolute right-[calc(var(--u)*30)] top-[calc(var(--u)*36)] text-[calc(var(--u)*26)] italic leading-[1.35] text-white/90">Style<br />More<br />You</p>
        </section>

        <BottomNav active="/categories" cartCount={CART_COUNT} />
      </main>
    </PhoneFrame>
  );
}
