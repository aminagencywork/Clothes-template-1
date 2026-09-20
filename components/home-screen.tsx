"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Bell, ChevronRight, LayoutGrid, Search, X } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { ProductCard } from "./product-card";
import { ProductTile } from "./product-tile";
import { cn } from "@/lib/utils";
import { categories, products, type Category } from "@/lib/products";

const px = "px-[calc(var(--u)*50)]";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className={cn("flex items-center justify-between", px)}>
      <h2 className="font-display text-[calc(var(--u)*46)]">{title}</h2>
      <a href="#" className="flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*24)] text-muted">
        View All <ChevronRight className="size-[calc(var(--u)*28)]" />
      </a>
    </div>
  );
}

export function HomeScreen() {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState<Set<string>>(new Set(["formal-shirt"]));
  const [cart, setCart] = useState<string[]>([]);

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const addToCart = (id: string) => setCart((c) => [...c, id]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => (category === "All" || p.category === category) && (!q || p.name.toLowerCase().includes(q)),
    );
  }, [category, query]);
  const popular = visible.filter((p) => p.popular);
  const arrivals = visible.filter((p) => p.isNew);

  return (
    <PhoneFrame>
      <main className="pb-[calc(var(--u)*180)] pt-[calc(var(--u)*97)]">
        {/* header */}
        <header className={cn("flex items-center justify-between", px)}>
          <div className="flex items-center gap-[calc(var(--u)*28)] rounded-full bg-pill/70 p-[calc(var(--u)*8)] pr-[calc(var(--u)*18)] shadow-[0_4px_20px_rgba(60,45,20,0.06)]">
            <Image src="/images/avatar.jpg" alt="Profile" width={105} height={105} className="size-[calc(var(--u)*105)] rounded-full object-cover" />
            <button type="button" aria-label="Menu" className="grid size-[calc(var(--u)*105)] place-items-center rounded-full bg-white">
              <LayoutGrid className="size-[calc(var(--u)*40)]" strokeWidth={1.5} />
            </button>
          </div>
          <button type="button" aria-label="Notifications" className="relative grid size-[calc(var(--u)*120)] place-items-center rounded-full bg-pill/70">
            <Bell className="size-[calc(var(--u)*46)]" strokeWidth={1.5} />
            <span className="absolute right-[calc(var(--u)*28)] top-[calc(var(--u)*24)] size-[calc(var(--u)*16)] rounded-full bg-gold" />
          </button>
        </header>

        {/* title + search */}
        <section className={cn("mt-[calc(var(--u)*30)] flex items-start justify-between", px)}>
          <div className="w-[calc(var(--u)*400)]">
            <h1 className="font-display text-[calc(var(--u)*68)] leading-[1.06]">Find the one you prefer.</h1>
            <p className="mt-[calc(var(--u)*22)] text-[calc(var(--u)*27)] leading-[1.4] text-muted">Discover stylish outfits for every version of you.</p>
          </div>
          <label className="mt-[calc(var(--u)*56)] flex h-[calc(var(--u)*115)] w-[calc(var(--u)*439)] items-center gap-[calc(var(--u)*24)] rounded-full bg-pill/70 px-[calc(var(--u)*40)]">
            <Search className="size-[calc(var(--u)*46)] shrink-0" strokeWidth={1.6} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              aria-label="Search products"
              className="w-full min-w-0 bg-transparent text-[calc(var(--u)*27)] outline-none placeholder:text-muted"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X className="size-[calc(var(--u)*34)] text-muted" />
              </button>
            )}
          </label>
        </section>

        {/* category chips */}
        <div className="no-scrollbar mt-[calc(var(--u)*36)] flex gap-[calc(var(--u)*12)] overflow-x-auto px-[calc(var(--u)*40)]">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-[calc(var(--u)*72)] shrink-0 rounded-full px-[calc(var(--u)*33)] text-[calc(var(--u)*26)] transition-colors",
                category === c ? "bg-gold-dark text-white" : "bg-pill/70",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-[calc(var(--u)*120)] text-center text-[calc(var(--u)*28)] text-muted">
            No products found. Try another search or category.
          </p>
        )}

        {/* popular */}
        {popular.length > 0 && (
          <>
            <div className="mt-[calc(var(--u)*50)]">
              <SectionHeader title="Popular Collection" />
            </div>
            <div className="no-scrollbar mt-[calc(var(--u)*24)] flex snap-x items-end gap-[calc(var(--u)*32)] overflow-x-auto px-[calc(var(--u)*15)]">
              {popular.map((p) => (
                <ProductCard key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} />
              ))}
            </div>
          </>
        )}

        {/* special offer */}
        <section className="relative mx-[calc(var(--u)*33)] mt-[calc(var(--u)*40)] h-[calc(var(--u)*251)] overflow-hidden rounded-[calc(var(--u)*30)] bg-banner">
          <div className="absolute left-[calc(var(--u)*47)] top-[calc(var(--u)*34)]">
            <p className="text-[calc(var(--u)*19)] tracking-[0.14em] text-gold-dark">SPECIAL OFFER</p>
            <h2 className="font-display mt-[calc(var(--u)*8)] text-[calc(var(--u)*48)] leading-[1.03]">Upgrade Your<br />Wardrobe</h2>
            <p className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*24)] text-muted">Get up to <b className="text-ink">40% Off</b></p>
          </div>
          <button type="button" className="absolute bottom-[calc(var(--u)*27)] left-[calc(var(--u)*270)] flex h-[calc(var(--u)*56)] items-center gap-[calc(var(--u)*12)] rounded-full bg-gold-dark px-[calc(var(--u)*24)] text-[calc(var(--u)*22)] font-medium text-white">
            Shop Now <ArrowRight className="size-[calc(var(--u)*22)]" />
          </button>
          <Image src="/images/banner-model.jpg" alt="Model in sunglasses" width={280} height={242} className="absolute bottom-0 left-[calc(var(--u)*487)] h-full w-[calc(var(--u)*300)] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_15%)]" />
          <p className="font-display absolute right-[calc(var(--u)*30)] top-[calc(var(--u)*56)] text-[calc(var(--u)*25)] leading-[1.35] text-muted">Style<br />More<br />You</p>
        </section>

        {/* new arrivals */}
        {arrivals.length > 0 && (
          <>
            <div className="mt-[calc(var(--u)*56)]">
              <SectionHeader title="New Arrivals" />
            </div>
            <div className="mt-[calc(var(--u)*28)] grid grid-cols-2 gap-[calc(var(--u)*22)] px-[calc(var(--u)*33)]">
              {arrivals.map((p) => (
                <ProductTile key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} onAdd={addToCart} />
              ))}
            </div>
          </>
        )}

        <BottomNav active="/home" cartCount={cart.length} />
      </main>
    </PhoneFrame>
  );
}
