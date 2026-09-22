"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, Heart, Search, ShoppingCart, Trash2, X } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { useFly } from "./use-fly";
import { cn } from "@/lib/utils";
import { addToCart, useCart } from "@/lib/cart";
import { COLOR_NAMES, sizesFor } from "@/lib/product-options";
import { discountPercent, products, type Product } from "@/lib/products";
import { AMBER, AMBER_LIGHT, FOREST } from "@/lib/theme";
import { removeFromWishlist, useWishlist } from "@/lib/wishlist";

type Sort = "newest" | "oldest" | "low" | "high";

export function WishlistScreen() {
  const router = useRouter();
  const ids = useWishlist();
  const cartCount = useCart().reduce((n, i) => n + i.qty, 0);
  const [sort, setSort] = useState<Sort>("newest");
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const cartRef = useRef<HTMLAnchorElement>(null);
  const { fly, layer } = useFly();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = ids.flatMap((id) => products.find((p) => p.id === id) ?? []).filter((p) => !q || p.name.toLowerCase().includes(q));
    if (sort === "newest") out.reverse();
    if (sort === "oldest") return out;
    if (sort === "low") out.sort((a, b) => a.price - b.price);
    if (sort === "high") out.sort((a, b) => b.price - a.price);
    return out;
  }, [ids, sort, query]);

  const moveToCart = (p: Product, delay = 0) => {
    const commit = () => {
      addToCart({ productId: p.id, size: sizesFor(p)[0], color: 0, colorName: COLOR_NAMES[p.colors[0]] ?? "Custom", qty: 1 });
      removeFromWishlist(p.id);
    };
    const from = document.querySelector<HTMLElement>(`[data-wish="${p.id}"] img`);
    setTimeout(() => fly(from, cartRef.current, p.image, commit), delay);
  };

  const round = "grid size-[calc(var(--u)*92)] place-items-center rounded-full";
  const roundStyle = { background: AMBER_LIGHT };

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*40)] pb-[calc(var(--u)*240)] pt-[calc(var(--u)*60)]">
        <header className="flex items-center justify-between">
          <button type="button" aria-label="Back" onClick={() => router.back()} className={round} style={roundStyle}>
            <ChevronLeft className="size-[calc(var(--u)*46)]" strokeWidth={1.6} />
          </button>
          <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className="h-[calc(var(--u)*72)] w-auto" />
          <div className="flex gap-[calc(var(--u)*16)]">
            <button type="button" aria-label="Search wishlist" aria-pressed={searching} onClick={() => { setSearching((v) => !v); setQuery(""); }} className={round} style={roundStyle}>
              <Search className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
            </button>
            <Link ref={cartRef} href="/cart" aria-label={`Cart, ${cartCount} items`} className={cn(round, "relative")} style={roundStyle}>
              <ShoppingCart className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="absolute -right-[calc(var(--u)*6)] -top-[calc(var(--u)*6)] grid min-w-[calc(var(--u)*38)] place-items-center rounded-full px-[calc(var(--u)*8)] text-[calc(var(--u)*23)] leading-[calc(var(--u)*38)] text-white animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ background: AMBER }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {searching && (
          <label className="mt-[calc(var(--u)*24)] flex h-[calc(var(--u)*80)] items-center gap-[calc(var(--u)*20)] rounded-full px-[calc(var(--u)*30)]" style={{ background: AMBER_LIGHT }}>
            <Search className="size-[calc(var(--u)*36)] shrink-0" strokeWidth={1.6} />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your wishlist..." aria-label="Search wishlist" className="w-full min-w-0 bg-transparent text-[calc(var(--u)*27)] outline-none placeholder:text-muted" />
            {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X className="size-[calc(var(--u)*30)] text-muted" /></button>}
          </label>
        )}

        <section className="mt-[calc(var(--u)*40)] flex items-start justify-between gap-[calc(var(--u)*16)]">
          <div>
            <h1 className="font-display text-[calc(var(--u)*76)] leading-none">
              My <span style={{ color: AMBER }}>Wishlist</span>
            </h1>
            <p className="mt-[calc(var(--u)*14)] flex items-center gap-[calc(var(--u)*16)] text-[calc(var(--u)*27)] text-muted">
              Your favourite picks, saved for later
              <svg className="size-[calc(var(--u)*38)] shrink-0" viewBox="0 0 40 34" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M20 30 C4 20 2 8 10 4 C16 1 20 6 20 12 C20 6 24 1 30 4 C38 8 36 20 20 30Z" />
              </svg>
            </p>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => items.forEach((p, i) => moveToCart(p, i * 150))}
            className="mt-[calc(var(--u)*6)] flex h-[calc(var(--u)*88)] shrink-0 items-center gap-[calc(var(--u)*14)] rounded-full px-[calc(var(--u)*26)] text-[calc(var(--u)*24)] text-white transition-opacity disabled:opacity-40"
            style={{ background: FOREST }}
          >
            <ShoppingCart className="size-[calc(var(--u)*36)]" strokeWidth={1.5} /> Move All to Cart
          </button>
        </section>

        <div className="mt-[calc(var(--u)*30)] flex items-center justify-between text-[calc(var(--u)*26)]">
          <p className="text-muted">{items.length} {items.length === 1 ? "Item" : "Items"}</p>
          <label className="relative flex items-center gap-[calc(var(--u)*14)]">
            <span className="text-muted">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by" className="appearance-none bg-transparent pr-[calc(var(--u)*40)] font-medium outline-none">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 size-[calc(var(--u)*34)]" />
          </label>
        </div>

        {items.length === 0 ? (
          <div className="mt-[calc(var(--u)*200)] flex flex-col items-center gap-[calc(var(--u)*24)] text-muted">
            <Heart className="size-[calc(var(--u)*110)]" strokeWidth={1.2} />
            <p className="text-[calc(var(--u)*28)]">{ids.length ? "No matches in your wishlist." : "Your wishlist is empty."}</p>
            <Link href="/categories" className="rounded-full px-[calc(var(--u)*40)] py-[calc(var(--u)*20)] text-[calc(var(--u)*26)] text-white" style={{ background: FOREST }}>Browse categories</Link>
          </div>
        ) : (
          <div className="mt-[calc(var(--u)*24)] grid grid-cols-3 gap-[calc(var(--u)*12)]">
            {items.map((p) => {
              const off = discountPercent(p);
              return (
                <article key={p.id} data-wish={p.id} className="overflow-hidden rounded-[calc(var(--u)*22)] bg-white pb-[calc(var(--u)*14)] shadow-[0_4px_24px_rgba(35,45,25,0.06)]">
                  <div className="relative h-[calc(var(--u)*285)] bg-card">
                    <Link href={`/product/${p.id}`} aria-label={p.name} className="absolute inset-0">
                      <Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover object-top" />
                    </Link>
                    {off > 0 && (
                      <span className="absolute left-[calc(var(--u)*12)] top-[calc(var(--u)*12)] rounded-full bg-[#f9d9df] px-[calc(var(--u)*14)] py-[calc(var(--u)*6)] text-[calc(var(--u)*19)]">{off}% OFF</span>
                    )}
                    <button
                      type="button"
                      aria-label={`Remove ${p.name} from wishlist`}
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute right-[calc(var(--u)*12)] top-[calc(var(--u)*12)] grid size-[calc(var(--u)*52)] place-items-center rounded-full bg-white transition-transform active:scale-90"
                    >
                      <Heart className="size-[calc(var(--u)*28)] text-[#e0334c]" fill="currentColor" />
                    </button>
                  </div>
                  <div className="px-[calc(var(--u)*14)] pt-[calc(var(--u)*14)]">
                    <h3 className="truncate text-[calc(var(--u)*23)]"><Link href={`/product/${p.id}`}>{p.name}</Link></h3>
                    <p className="mt-[calc(var(--u)*4)] flex flex-wrap items-baseline gap-x-[calc(var(--u)*8)]">
                      <b className="text-[calc(var(--u)*27)]">${p.price.toFixed(0)}</b>
                      {p.oldPrice && <s className="text-[calc(var(--u)*19)] text-muted">${p.oldPrice.toFixed(0)}</s>}
                    </p>
                    <div className="mt-[calc(var(--u)*10)] flex items-center gap-[calc(var(--u)*8)]">
                      {p.colors.slice(0, 4).map((c, i) => (
                        <span key={`${c}${i}`} className="size-[calc(var(--u)*22)] rounded-full ring-1 ring-black/10" style={{ background: c }} />
                      ))}
                      {p.colors.length > 4 && <span className="text-[calc(var(--u)*17)] text-muted">+{p.colors.length - 4}</span>}
                    </div>
                    <div className="mt-[calc(var(--u)*14)] flex gap-[calc(var(--u)*8)]">
                      <button type="button" onClick={() => moveToCart(p)} className="flex h-[calc(var(--u)*58)] min-w-0 flex-1 items-center justify-center gap-[calc(var(--u)*6)] rounded-[calc(var(--u)*14)] text-[calc(var(--u)*18)] text-white transition-transform active:scale-95" style={{ background: FOREST }}>
                        <ShoppingCart className="size-[calc(var(--u)*24)] shrink-0" strokeWidth={1.5} /> Move to Cart
                      </button>
                      <button type="button" aria-label={`Remove ${p.name}`} onClick={() => removeFromWishlist(p.id)} className="grid h-[calc(var(--u)*58)] w-[calc(var(--u)*58)] shrink-0 place-items-center rounded-[calc(var(--u)*14)] transition-transform active:scale-95" style={{ background: AMBER_LIGHT }}>
                        <Trash2 className="size-[calc(var(--u)*26)]" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <BottomNav active="/wishlist" cartCount={cartCount} />
      </main>
      {layer}
    </PhoneFrame>
  );
}
