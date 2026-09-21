"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Menu, Search, X } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { FavoriteButton } from "./favorite-button";
import { MenuDrawer } from "./menu-drawer";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { categories, products, type Category, type Product } from "@/lib/products";

function CollectionCard({ product, liked, onToggleLike }: { product: Product; liked: boolean; onToggleLike: (id: string) => void }) {
  return (
    <article className="w-[calc(var(--u)*287)] shrink-0 snap-start overflow-hidden rounded-[calc(var(--u)*34)] bg-white pb-[calc(var(--u)*28)] shadow-[0_4px_24px_rgba(60,45,20,0.06)]">
      <div className="relative h-[calc(var(--u)*342)] bg-card">
        <Link href={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill sizes="140px" className="object-cover object-top" />
        </Link>
        <FavoriteButton
          liked={liked}
          label={product.name}
          onClick={() => onToggleLike(product.id)}
          className="absolute right-[calc(var(--u)*16)] top-[calc(var(--u)*16)]"
        />
      </div>
      <div className="px-[calc(var(--u)*22)]">
        <h3 className="mt-[calc(var(--u)*18)] truncate text-[calc(var(--u)*24)]">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*31)] font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-[calc(var(--u)*16)] flex gap-[calc(var(--u)*16)]">
          {product.colors.slice(0, 3).map((c) => (
            <span key={c} className="size-[calc(var(--u)*34)] rounded-full ring-1 ring-black/5" style={{ background: c }} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function HomeScreen() {
  const [category, setCategory] = useState<"All" | Category>("Men's");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const cartCount = useCart().reduce((n, i) => n + i.qty, 0);

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      products.filter(
        (p) => (category === "All" || p.category === category) && (q ? p.name.toLowerCase().includes(q) : p.popular),
      ),
    [category, q],
  );

  const extraSections = [
    { title: "New Arrivals", items: products.filter((p) => p.isNew) },
    { title: "Kids Collection", items: products.filter((p) => p.category === "Kids") },
    { title: "Accessories", items: products.filter((p) => p.category === "Accessories") },
    { title: "Women's Collection", items: products.filter((p) => p.category === "Women's") },
  ];

  return (
    <PhoneFrame>
      <main className="pb-[calc(var(--u)*240)]">
        <div className="px-[calc(var(--u)*40)]">
        {/* 1. nav bar */}
        <section aria-label="Top bar" className="sticky top-0 z-30 bg-page/90 py-[calc(var(--u)*10)] backdrop-blur-md mt-[calc(var(--u)*15)] -mx-[calc(var(--u)*40)] px-[calc(var(--u)*40)]">
          <header className="relative flex items-center justify-between">
          <button type="button" aria-label="Menu" aria-haspopup="dialog" onClick={() => setMenuOpen(true)} className="grid size-[calc(var(--u)*92)] place-items-center rounded-full bg-pill/80 shadow-[0_4px_20px_rgba(60,45,20,0.06)]">
            <Menu className="size-[calc(var(--u)*44)]" strokeWidth={1.7} />
          </button>
          <Image src="/images/home-logo.jpg" alt="Vyntra – wear a brighter you" width={290} height={135} priority className="h-[calc(var(--u)*92)] w-auto mix-blend-multiply" />
          <Link href="/profile" aria-label="Profile" className="block rounded-full bg-white p-[calc(var(--u)*4)] shadow-[0_4px_20px_rgba(60,45,20,0.1)]">
            <Image src="/images/home-avatar.jpg" alt="" width={92} height={92} className="size-[calc(var(--u)*88)] rounded-full object-cover" />
          </Link>
        </header>
        </section>

        {/* 2. hero banner: image + heading + paragraph */}
        <section className="relative h-[calc(var(--u)*330)] mt-[calc(var(--u)*20)]">
          <Image
            src="/images/home-hero.jpg"
            alt=""
            width={541}
            height={300}
            priority
            className="pointer-events-none absolute -right-[calc(var(--u)*40)] top-0 w-[calc(var(--u)*541)] [mask-image:linear-gradient(to_right,transparent,#000_30%),linear-gradient(to_top,transparent,#000_12%)] [mask-composite:intersect]"
          />
          <div className="relative pt-[calc(var(--u)*24)]">
            <h1 className="w-[calc(var(--u)*420)] font-display text-[calc(var(--u)*68)] leading-[1.06]">Find the one you prefer.</h1>
            <p className="mt-[calc(var(--u)*22)] w-[calc(var(--u)*340)] text-[calc(var(--u)*27)] leading-[1.4] text-muted">
              Discover stylish outfits for every version of you.
            </p>
          </div>
        </section>

        {/* 3. search */}
        <section aria-label="Search" className="mt-[calc(var(--u)*10)]">
          <label className="flex h-[calc(var(--u)*86)] items-center gap-[calc(var(--u)*28)] rounded-full border border-black/[0.06] bg-white/90 px-[calc(var(--u)*34)] shadow-[0_4px_24px_rgba(60,45,20,0.06)]">
            <Search className="size-[calc(var(--u)*44)] shrink-0" strokeWidth={1.6} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              aria-label="Search products"
              className="w-full min-w-0 bg-transparent text-[calc(var(--u)*26)] outline-none placeholder:text-muted"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X className="size-[calc(var(--u)*34)] text-muted" />
              </button>
            )}
          </label>
        </section>

        {/* 4. category slider */}
        <section aria-label="Categories" className="no-scrollbar mt-[calc(var(--u)*34)] flex gap-[calc(var(--u)*17)] overflow-x-auto -mx-[calc(var(--u)*40)] px-[calc(var(--u)*40)]">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "h-[calc(var(--u)*66)] shrink-0 rounded-full px-[calc(var(--u)*36)] text-[calc(var(--u)*26)] transition-colors",
                category === c ? "bg-gold-dark text-white" : "bg-pill/80",
              )}
            >
              {c}
            </button>
          ))}
        </section>

        {/* 5. popular collection + product grid */}
        <section aria-label="Collection">
        <div className="mt-[calc(var(--u)*50)] flex items-center justify-between">
          <h2 className="font-display text-[calc(var(--u)*46)]">{q ? "Search Results" : "Popular Collection"}</h2>
          <Link href="/categories" className="flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*26)] text-muted">
            View All <ChevronRight className="size-[calc(var(--u)*30)] text-ink" />
          </Link>
        </div>

        {visible.length === 0 ? (
          <p className="mt-[calc(var(--u)*80)] text-center text-[calc(var(--u)*28)] text-muted">
            No products found. Try another search or category.
          </p>
        ) : (
          <div className="no-scrollbar mt-[calc(var(--u)*24)] flex snap-x scroll-px-[calc(var(--u)*40)] gap-[calc(var(--u)*22)] overflow-x-auto -mx-[calc(var(--u)*40)] px-[calc(var(--u)*40)] pb-[calc(var(--u)*8)]">
            {visible.map((p) => (
              <CollectionCard key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} />
            ))}
          </div>
        )}
        </section>

        {/* 6. special offer banner */}
        <section className="relative mt-[calc(var(--u)*28)] h-[calc(var(--u)*227)] overflow-hidden rounded-[calc(var(--u)*30)] bg-banner">
          <Image
            src="/images/home-offer.jpg"
            alt="White sneakers and a cap"
            width={428}
            height={224}
            className="absolute right-[calc(var(--u)*104)] top-0 h-full w-[calc(var(--u)*428)] object-cover [mask-image:linear-gradient(to_right,transparent,#000_18%)]"
          />
          <div className="absolute left-[calc(var(--u)*30)] top-[calc(var(--u)*26)]">
            <p className="text-[calc(var(--u)*19)] tracking-[0.14em] text-gold-dark">SPECIAL OFFER</p>
            <h2 className="mt-[calc(var(--u)*6)] font-display text-[calc(var(--u)*50)] leading-[1.03]">Upgrade Your<br />Wardrobe</h2>
            <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*25)] text-muted">Get up to <b className="font-semibold text-ink">40% Off</b></p>
          </div>
          <Link href="/categories" className="absolute bottom-[calc(var(--u)*24)] left-[calc(var(--u)*270)] flex h-[calc(var(--u)*62)] items-center gap-[calc(var(--u)*14)] rounded-full bg-gold-dark px-[calc(var(--u)*30)] text-[calc(var(--u)*24)] font-medium text-white shadow-md">
            Shop Now <ArrowRight className="size-[calc(var(--u)*26)]" />
          </Link>
          <p className="absolute right-[calc(var(--u)*26)] top-[calc(var(--u)*62)] font-display text-[calc(var(--u)*30)] leading-[1.3] text-muted">Style<br />More<br />You</p>
        </section>

        {/* 7+. more collections */}
        {extraSections.map(({ title, items }) =>
          items.length > 0 ? (
            <section key={title} aria-label={title} className="mt-[calc(var(--u)*50)]">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-[calc(var(--u)*46)]">{title}</h2>
                <Link href="/categories" className="flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*26)] text-muted">
                  View All <ChevronRight className="size-[calc(var(--u)*30)] text-ink" />
                </Link>
              </div>
              <div className="no-scrollbar mt-[calc(var(--u)*24)] flex snap-x scroll-px-[calc(var(--u)*40)] gap-[calc(var(--u)*22)] overflow-x-auto -mx-[calc(var(--u)*40)] px-[calc(var(--u)*40)] pb-[calc(var(--u)*8)]">
                {items.map((p) => (
                  <CollectionCard key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} />
                ))}
              </div>
            </section>
          ) : null,
        )}

        </div>

        <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
        <BottomNav active="/home" cartCount={cartCount} />
      </main>
    </PhoneFrame>
  );
}
