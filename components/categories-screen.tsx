"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import { ArrowRight, ChevronRight, Footprints, PersonStanding, Search, ShoppingBag, ShoppingCart, Shirt, Smile, User, X } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { WishlistLink } from "./wishlist-link";
import { cn } from "@/lib/utils";
import { categoryCards, categoryFilters, type CategoryFilter } from "@/lib/categories";

const icons: Record<CategoryFilter, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  All: Shirt,
  Men: User,
  Women: PersonStanding,
  Kids: Smile,
  Shoes: Footprints,
  Accessories: ShoppingBag,
};

const CART_COUNT = 3; // dummy
const SHOW_FILTER_ICONS = false; // category icon row hidden for now

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
        <header className="flex items-start justify-between px-[calc(var(--u)*15)]">
          <div>
            <h1 className="font-display text-[calc(var(--u)*72)] leading-none">Categories</h1>
            <p className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*27)] text-muted">Explore our wide range of collections</p>
          </div>
          <div className="mt-[calc(var(--u)*10)] flex gap-[calc(var(--u)*16)]">
            <WishlistLink className="size-[calc(var(--u)*96)]" />
          <Link href="/cart" aria-label="Cart" className="relative grid size-[calc(var(--u)*96)] place-items-center rounded-full bg-pill/80">
            <ShoppingCart className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
            <span className="absolute -right-[calc(var(--u)*10)] -top-[calc(var(--u)*8)] grid size-[calc(var(--u)*44)] place-items-center rounded-full bg-gold-dark text-[calc(var(--u)*22)] text-white">
              {CART_COUNT}
            </span>
          </Link>
          </div>
        </header>

        {/* search */}
        <label className="mx-[calc(var(--u)*15)] mt-[calc(var(--u)*34)] flex h-[calc(var(--u)*80)] items-center gap-[calc(var(--u)*24)] rounded-full bg-pill/80 px-[calc(var(--u)*30)]">
          <Search className="size-[calc(var(--u)*40)] shrink-0" strokeWidth={1.6} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for categories..."
            aria-label="Search categories"
            className="w-full min-w-0 bg-transparent text-[calc(var(--u)*27)] outline-none placeholder:text-muted"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
              <X className="size-[calc(var(--u)*32)] text-muted" />
            </button>
          )}
        </label>

        {/* filter icons */}
        <div hidden={!SHOW_FILTER_ICONS} className="no-scrollbar mt-[calc(var(--u)*30)] flex justify-between gap-[calc(var(--u)*16)] overflow-x-auto px-[calc(var(--u)*15)]">
          {categoryFilters.map((f) => {
            const Icon = icons[f];
            const on = filter === f;
            return (
              <button key={f} type="button" aria-pressed={on} onClick={() => setFilter(f)} className="flex shrink-0 flex-col items-center gap-[calc(var(--u)*12)]">
                <span className={cn("grid size-[calc(var(--u)*110)] place-items-center rounded-full transition-colors", on ? "bg-gold-dark text-white" : "bg-pill/80")}>
                  <Icon className="size-[calc(var(--u)*50)]" strokeWidth={1.5} />
                </span>
                <span className={cn("text-[calc(var(--u)*24)]", on ? "font-semibold text-gold-dark" : "text-ink")}>{f}</span>
              </button>
            );
          })}
        </div>

        {/* cards */}
        <div className="mt-[calc(var(--u)*32)] grid grid-cols-2 gap-x-[calc(var(--u)*12)] gap-y-[calc(var(--u)*13)]">
          {cards.map((c) => (
            <Link
              key={c.id}
              href={`/collection/${c.id}`}
              className="relative block h-[calc(var(--u)*255)] overflow-hidden rounded-[calc(var(--u)*28)] bg-gradient-to-br from-[#f4efe6] to-[#e7dfd0] shadow-[0_2px_12px_rgba(60,45,20,0.05)] transition-transform active:scale-[0.98]"
            >
              <Image src={c.image} alt="" fill sizes="220px" className="!left-[36%] !w-[64%] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_22%)]" />
              {c.badge && (
                <span className="absolute right-[calc(var(--u)*24)] top-[calc(var(--u)*18)] rounded-full bg-gold-dark px-[calc(var(--u)*22)] py-[calc(var(--u)*8)] text-[calc(var(--u)*23)] text-white">{c.badge}</span>
              )}
              <div className="absolute left-[calc(var(--u)*25)] top-[calc(var(--u)*38)] w-[45%]">
                <h2 className="font-display text-[calc(var(--u)*36)] leading-[1.12]">{c.title}</h2>
                <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*21)] text-muted">Explore Now</p>
              </div>
              <span className="absolute bottom-[calc(var(--u)*22)] left-[calc(var(--u)*25)] grid size-[calc(var(--u)*50)] place-items-center rounded-full bg-white">
                <ChevronRight className="size-[calc(var(--u)*26)]" />
              </span>
            </Link>
          ))}
        </div>
        {cards.length === 0 && (
          <p className="mt-[calc(var(--u)*100)] text-center text-[calc(var(--u)*28)] text-muted">No categories found.</p>
        )}

        {/* offer */}
        <section className="relative mt-[calc(var(--u)*24)] h-[calc(var(--u)*206)] overflow-hidden rounded-[calc(var(--u)*24)] bg-[#857a55]">
          <div className="absolute left-[calc(var(--u)*34)] top-[calc(var(--u)*26)] text-white">
            <p className="text-[calc(var(--u)*17)] tracking-[0.14em] text-white/80">SPECIAL OFFER</p>
            <h2 className="font-display mt-[calc(var(--u)*6)] text-[calc(var(--u)*48)] leading-[1.05]">Upgrade<br />Your Style</h2>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*23)] text-white/90">Get up to 40% Off</p>
          </div>
          <Link href="/home" className="absolute bottom-[calc(var(--u)*24)] left-[calc(var(--u)*259)] flex h-[calc(var(--u)*50)] items-center gap-[calc(var(--u)*10)] rounded-full bg-white px-[calc(var(--u)*22)] text-[calc(var(--u)*21)] font-medium">
            Shop Now <ArrowRight className="size-[calc(var(--u)*20)]" />
          </Link>
          <Image src="/images/cat-banner.jpg" alt="Model in olive jacket" width={255} height={198} className="absolute bottom-0 left-[calc(var(--u)*462)] h-full w-[calc(var(--u)*255)] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_18%)]" />
          <p className="font-display absolute right-[calc(var(--u)*30)] top-[calc(var(--u)*56)] text-[calc(var(--u)*24)] leading-[1.35] text-white/85">Style<br />More<br />You</p>
        </section>

        <BottomNav active="/categories" cartCount={CART_COUNT} />
      </main>
    </PhoneFrame>
  );
}
