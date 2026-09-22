"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpDown, LayoutGrid, List, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { AddToCartPill } from "./add-to-cart-pill";
import { BottomNav } from "./bottom-nav";
import { FavoriteButton } from "./favorite-button";
import { PhoneFrame } from "./phone-frame";
import { useFly } from "./use-fly";
import { WishlistLink } from "./wishlist-link";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import type { Collection } from "@/lib/collections";
import { discountPercent, products, type Product } from "@/lib/products";
import { AMBER_LIGHT, FOREST } from "@/lib/theme";
import { addToWishlist, removeFromWishlist, useWishlist } from "@/lib/wishlist";

const SHOW_HEADER_CART = false; // header cart icon hidden for now (bottom nav has the cart)
type Sort = "popular" | "low" | "high" | "newest";

const chipCategory: Record<string, string> = { Women: "Women's", Men: "Men's" };

export function CollectionScreen({ collection }: { collection: Collection }) {
  const router = useRouter();
  const cartCount = useCart().reduce((n, i) => n + i.qty, 0);
  const [chip, setChip] = useState("All");
  const [sort, setSort] = useState<Sort>(collection.defaultSort ?? "popular");
  const [saleOnly, setSaleOnly] = useState(false);
  const [list, setList] = useState(false);
  const wished = useWishlist();
  const heartRef = useRef<HTMLAnchorElement>(null);
  const { fly, layer } = useFly();
  const toggleLike = (p: Product, from: HTMLElement | null) => {
    if (wished.includes(p.id)) return removeFromWishlist(p.id);
    fly(from, heartRef.current, p.image, () => addToWishlist(p.id));
  };

  const items = useMemo(() => {
    const out = products.filter((p) => {
      if (collection.category && p.category !== collection.category) return false;
      if (collection.newOnly && !p.isNew) return false;
      if (chip !== "All" && (collection.chipsByCategory ? p.category !== (chipCategory[chip] ?? chip) : !p.types?.includes(chip))) return false;
      return !saleOnly || !!p.oldPrice;
    });
    if (sort === "newest") out.reverse();
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    if (sort === "popular") out.sort((a, b) => Number(!!b.popular) - Number(!!a.popular) || b.rating - a.rating);
    return out;
  }, [collection, chip, sort, saleOnly]);

  const round = "grid size-[calc(var(--u)*92)] place-items-center rounded-full";
const roundStyle = { background: AMBER_LIGHT };

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*37)] pb-[calc(var(--u)*240)] pt-[calc(var(--u)*60)]">
        <header className="flex items-center justify-between">
          <button type="button" aria-label="Back" onClick={() => router.back()} className={round} style={roundStyle}>
            <ArrowLeft className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
          </button>
          <div className="text-center">
            <h1 className="font-display text-[calc(var(--u)*54)] leading-none">{collection.title}</h1>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*25)] text-muted">{collection.subtitle}</p>
          </div>
          <div className="flex gap-[calc(var(--u)*16)]">
          <WishlistLink ref={heartRef} className="size-[calc(var(--u)*92)]" />
          {SHOW_HEADER_CART && (
          <Link href="/cart" aria-label="Cart" className={cn(round, "relative")}>
            <ShoppingCart className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
            <span className="absolute -right-[calc(var(--u)*8)] -top-[calc(var(--u)*8)] grid size-[calc(var(--u)*42)] place-items-center rounded-full text-[calc(var(--u)*22)] text-white" style={{ background: FOREST }}>
              {cartCount}
            </span>
          </Link>
          )}
          </div>
        </header>

        <section className="relative mt-[calc(var(--u)*30)] h-[calc(var(--u)*280)] overflow-hidden rounded-[calc(var(--u)*28)]" style={{ background: `linear-gradient(135deg, ${AMBER_LIGHT}, #eee2cd)` }}>
          <Image src={collection.banner} alt="" fill sizes="400px" className="!left-[40%] !w-[60%] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_25%)]" />
          <div className="absolute left-[calc(var(--u)*30)] top-[calc(var(--u)*30)]">
            <h2 className="font-display whitespace-pre-line text-[calc(var(--u)*52)] leading-[1.05]">{collection.headline}</h2>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*22)] text-muted">{collection.blurb}</p>
          </div>
          <span className="absolute bottom-[calc(var(--u)*26)] left-[calc(var(--u)*30)] flex h-[calc(var(--u)*60)] items-center gap-[calc(var(--u)*12)] rounded-full px-[calc(var(--u)*30)] text-[calc(var(--u)*23)] text-white" style={{ background: FOREST }}>
            Shop Now <ArrowRight className="size-[calc(var(--u)*24)]" />
          </span>
        </section>

        <div className="no-scrollbar mt-[calc(var(--u)*30)] flex gap-[calc(var(--u)*14)] overflow-x-auto">
          {collection.chips.map((c) => {
            const on = chip === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setChip(c)}
                className={cn("h-[calc(var(--u)*64)] shrink-0 rounded-full px-[calc(var(--u)*30)] text-[calc(var(--u)*24)]", on && "text-white")}
                style={on ? { background: FOREST } : { background: AMBER_LIGHT }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-[calc(var(--u)*28)] flex gap-[calc(var(--u)*16)]">
          <label className="flex h-[calc(var(--u)*82)] flex-1 items-center gap-[calc(var(--u)*12)] rounded-full px-[calc(var(--u)*24)] text-[calc(var(--u)*24)]" style={{ background: AMBER_LIGHT }}>
            <ArrowUpDown className="size-[calc(var(--u)*30)] shrink-0" strokeWidth={1.6} />
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by" className="w-full bg-transparent outline-none">
              {collection.defaultSort === "newest" && <option value="newest">Sort by Newest</option>}
              <option value="popular">Sort by Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
          <button
            type="button"
            aria-pressed={saleOnly}
            onClick={() => setSaleOnly((v) => !v)}
            className={cn("flex h-[calc(var(--u)*82)] items-center gap-[calc(var(--u)*12)] rounded-full px-[calc(var(--u)*28)] text-[calc(var(--u)*24)]", saleOnly && "text-white")}
            style={saleOnly ? { background: FOREST } : { background: AMBER_LIGHT }}
          >
            <SlidersHorizontal className="size-[calc(var(--u)*30)]" strokeWidth={1.6} /> On sale
          </button>
        </div>

        <div className="mt-[calc(var(--u)*26)] flex items-center justify-between">
          <p className="text-[calc(var(--u)*24)] text-muted">{items.length} Products</p>
          <div className="flex gap-[calc(var(--u)*10)]">
            {[false, true].map((isList) => {
              const on = list === isList;
              return (
                <button
                  key={String(isList)}
                  type="button"
                  aria-label={isList ? "List view" : "Grid view"}
                  aria-pressed={on}
                  onClick={() => setList(isList)}
                  className={cn("grid size-[calc(var(--u)*60)] place-items-center rounded-[calc(var(--u)*14)]", on && "text-white")}
                  style={on ? { background: FOREST } : { background: AMBER_LIGHT }}
                >
                  {isList ? <List className="size-[calc(var(--u)*30)]" /> : <LayoutGrid className="size-[calc(var(--u)*30)]" />}
                </button>
              );
            })}
          </div>
        </div>

        {items.length === 0 ? (
          <p className="mt-[calc(var(--u)*80)] text-center text-[calc(var(--u)*28)] text-muted">No products found.</p>
        ) : (
          <div className={cn("mt-[calc(var(--u)*20)] grid gap-[calc(var(--u)*14)]", list ? "grid-cols-1" : "grid-cols-3")}>
            {items.map((p) => {
              const off = discountPercent(p);
              return (
                <article key={p.id} data-card className={cn("relative overflow-hidden rounded-[calc(var(--u)*22)] bg-white shadow-[0_4px_24px_rgba(35,45,25,0.06)]", list && "flex")}>
                  <div className={cn("relative bg-card", list ? "h-[calc(var(--u)*260)] w-[calc(var(--u)*220)] shrink-0" : "h-[calc(var(--u)*300)]")}>
                    <Link href={`/product/${p.id}`} aria-label={p.name} className="absolute inset-0">
                      <Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover object-top" />
                    </Link>
                    {off > 0 && (
                      <span className="absolute left-[calc(var(--u)*10)] top-[calc(var(--u)*10)] rounded-full px-[calc(var(--u)*12)] py-[calc(var(--u)*6)] text-[calc(var(--u)*18)] text-white" style={{ background: FOREST }}>{off}% Off</span>
                    )}
                    <FavoriteButton liked={wished.includes(p.id)} label={p.name} onClick={(e) => toggleLike(p, (e.currentTarget.closest("[data-card]")?.querySelector("img") as HTMLElement) ?? e.currentTarget)} className="absolute right-[calc(var(--u)*10)] top-[calc(var(--u)*10)] !size-[calc(var(--u)*48)]" />
                  </div>
                  <div className={cn("p-[calc(var(--u)*14)]", list && "flex min-w-0 flex-1 flex-col")}>
                    <h3 className="truncate text-[calc(var(--u)*22)]"><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                    <p className="mt-[calc(var(--u)*4)] flex flex-wrap items-baseline gap-x-[calc(var(--u)*8)]">
                      <b className="text-[calc(var(--u)*26)]">${p.price.toFixed(0)}</b>
                      {p.oldPrice && <s className="text-[calc(var(--u)*18)] text-muted">${p.oldPrice.toFixed(0)}</s>}
                    </p>
                    <div className="mt-[calc(var(--u)*10)] flex gap-[calc(var(--u)*8)]">
                      {p.colors.slice(0, 4).map((c) => (
                        <span key={c} className="size-[calc(var(--u)*22)] rounded-full ring-1 ring-black/10" style={{ background: c }} />
                      ))}
                    </div>
                    <AddToCartPill product={p} color={FOREST} className="mt-[calc(var(--u)*14)] h-[calc(var(--u)*56)] w-full text-[calc(var(--u)*19)]" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <BottomNav active="/categories" cartCount={cartCount} />
      </main>
      {layer}
    </PhoneFrame>
  );
}
