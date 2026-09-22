"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import { ArrowRight, ChevronRight, Footprints, Menu, PersonStanding, ScanLine, Search, Shirt, ShoppingBag, Smile, X } from "lucide-react";
import { AddToCartPill } from "./add-to-cart-pill";
import { BottomNav } from "./bottom-nav";
import { FavoriteButton } from "./favorite-button";
import { MenuDrawer } from "./menu-drawer";
import { PhoneFrame } from "./phone-frame";
import { ProfileAvatar } from "./profile-bits";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { categories, discountPercent, products, type Category, type Product } from "@/lib/products";
import { AMBER, AMBER_LIGHT, FOREST } from "@/lib/theme";

const categoryIcons: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  All: Shirt,
  "Men's": Shirt,
  "Women's": PersonStanding,
  Kids: Smile,
  Shoes: Footprints,
  Accessories: ShoppingBag,
};

function ProductCard({ product, liked, onToggleLike }: { product: Product; liked: boolean; onToggleLike: (id: string) => void }) {
  const off = discountPercent(product);
  return (
    <article className="w-[calc(var(--u)*287)] shrink-0 snap-start overflow-hidden rounded-[calc(var(--u)*30)] bg-white shadow-[0_4px_20px_rgba(35,45,25,0.08)]">
      <div className="relative h-[calc(var(--u)*300)] bg-card">
        <Link href={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill sizes="140px" className="object-cover object-top" />
        </Link>
        {off > 0 && (
          <span className="absolute left-[calc(var(--u)*14)] top-[calc(var(--u)*14)] rounded-full bg-white px-[calc(var(--u)*16)] py-[calc(var(--u)*7)] text-[calc(var(--u)*18)]">{off}% Off</span>
        )}
        <FavoriteButton liked={liked} label={product.name} onClick={() => onToggleLike(product.id)} className="absolute right-[calc(var(--u)*14)] top-[calc(var(--u)*14)] !size-[calc(var(--u)*54)]" />
      </div>
      <div className="p-[calc(var(--u)*20)]">
        <h3 className="truncate text-[calc(var(--u)*25)]"><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*29)] font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-[calc(var(--u)*14)] flex gap-[calc(var(--u)*14)]">
          {product.colors.slice(0, 4).map((c) => (
            <span key={c} className="size-[calc(var(--u)*28)] rounded-full ring-1 ring-black/5" style={{ background: c }} />
          ))}
        </div>
        <AddToCartPill product={product} className="mt-[calc(var(--u)*18)] h-[calc(var(--u)*66)] w-full text-[calc(var(--u)*23)]" />
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
          <button type="button" aria-label="Menu" aria-haspopup="dialog" onClick={() => setMenuOpen(true)} className="grid size-[calc(var(--u)*92)] place-items-center rounded-full shadow-[0_4px_20px_rgba(60,45,20,0.06)]" style={{ background: AMBER_LIGHT }}>
            <Menu className="size-[calc(var(--u)*44)]" strokeWidth={1.7} />
          </button>
          <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className="h-[calc(var(--u)*82)] w-auto" />
          <Link href="/profile" aria-label="Profile" className="relative block rounded-full bg-white p-[calc(var(--u)*4)] shadow-[0_4px_20px_rgba(60,45,20,0.1)]">
            <ProfileAvatar className="size-[calc(var(--u)*88)] rounded-full object-cover" />
            <span className="absolute bottom-[calc(var(--u)*2)] right-[calc(var(--u)*2)] size-[calc(var(--u)*20)] rounded-full border-[calc(var(--u)*3)] border-white bg-[#3a9a4a]" />
          </Link>
        </header>
        </section>

        {/* 2. hero banner: image + heading + paragraph */}
        <section className="relative h-[calc(var(--u)*400)] mt-[calc(var(--u)*24)]">
          <div className="pointer-events-none absolute -right-[calc(var(--u)*60)] top-[calc(var(--u)*10)] size-[calc(var(--u)*300)] rounded-full opacity-60" style={{ background: "#e9edda" }} aria-hidden />
          <Image
            src="/images/home-hero-2.jpg"
            alt=""
            width={355}
            height={1070}
            priority
            className="pointer-events-none absolute -right-[calc(var(--u)*10)] top-[calc(var(--u)*20)] h-[calc(var(--u)*400)] w-[calc(var(--u)*360)] object-cover [mask-image:linear-gradient(to_right,transparent,#000_32%)]"
          />
          <p className="font-script absolute right-[calc(var(--u)*30)] top-[calc(var(--u)*30)] text-[calc(var(--u)*34)] italic leading-[1.1]" style={{ color: AMBER }}>
            Style<br />Lives<br />Here
          </p>
          <div className="relative pt-[calc(var(--u)*10)]">
            <p className="flex items-center gap-[calc(var(--u)*14)] text-[calc(var(--u)*22)] tracking-[0.18em] text-muted">
              NEW SEASON <span className="h-px w-[calc(var(--u)*60)] bg-muted/60" />
            </p>
            <h1 className="mt-[calc(var(--u)*10)] w-[calc(var(--u)*380)] font-display text-[calc(var(--u)*62)] leading-[1.06]">
              Find the one<br />
              <span style={{ color: AMBER }}>you prefer.</span>
            </h1>
            <p className="mt-[calc(var(--u)*20)] w-[calc(var(--u)*320)] text-[calc(var(--u)*26)] leading-[1.4] text-muted">
              Discover stylish outfits for every version of you.
            </p>
            <Link
              href="/categories"
              className="mt-[calc(var(--u)*24)] flex h-[calc(var(--u)*86)] w-fit items-center gap-[calc(var(--u)*20)] rounded-full pl-[calc(var(--u)*36)] pr-[calc(var(--u)*10)] text-[calc(var(--u)*27)] font-medium text-white shadow-md transition-transform active:scale-95"
              style={{ background: FOREST }}
            >
              Shop Now
              <span className="grid size-[calc(var(--u)*66)] place-items-center rounded-full bg-page" style={{ color: FOREST }}>
                <ArrowRight className="size-[calc(var(--u)*30)]" strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </section>

        {/* 3. search */}
        <section aria-label="Search" className="mt-[calc(var(--u)*20)]">
          <label className="flex h-[calc(var(--u)*86)] items-center gap-[calc(var(--u)*24)] rounded-full border border-black/[0.06] bg-white px-[calc(var(--u)*34)] shadow-[0_4px_24px_rgba(60,45,20,0.06)]">
            <Search className="size-[calc(var(--u)*40)] shrink-0 text-muted" strokeWidth={1.6} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, brands and more..."
              aria-label="Search products"
              className="w-full min-w-0 bg-transparent text-[calc(var(--u)*25)] outline-none placeholder:text-muted"
            />
            {query ? (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")}>
                <X className="size-[calc(var(--u)*34)] text-muted" />
              </button>
            ) : (
              <span className="grid size-[calc(var(--u)*56)] shrink-0 place-items-center rounded-[calc(var(--u)*16)] border border-black/10 text-muted">
                <ScanLine className="size-[calc(var(--u)*28)]" strokeWidth={1.6} />
              </span>
            )}
          </label>
        </section>

        {/* 4. category slider */}
        <section aria-label="Categories" className="no-scrollbar mt-[calc(var(--u)*30)] flex gap-[calc(var(--u)*17)] overflow-x-auto -mx-[calc(var(--u)*40)] px-[calc(var(--u)*40)]">
          {categories.map((c) => {
            const Icon = categoryIcons[c] ?? Shirt;
            const on = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c)}
                className={cn(
                  "flex h-[calc(var(--u)*66)] shrink-0 items-center gap-[calc(var(--u)*14)] rounded-full px-[calc(var(--u)*30)] text-[calc(var(--u)*26)] transition-colors",
                  on && "text-white",
                )}
                style={on ? { background: FOREST } : { background: AMBER_LIGHT, color: "#3a3a2e" }}
              >
                <Icon className="size-[calc(var(--u)*30)]" strokeWidth={1.6} />
                {c}
              </button>
            );
          })}
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
              <ProductCard key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} />
            ))}
          </div>
        )}
        </section>

        {/* 6. special offer banner */}
        <section className="relative mt-[calc(var(--u)*28)] h-[calc(var(--u)*227)] overflow-hidden rounded-[calc(var(--u)*30)]" style={{ background: "#efe7d6" }}>
          <Image
            src="/images/home-offer.jpg"
            alt="White sneakers and a cap"
            width={428}
            height={224}
            className="absolute right-[calc(var(--u)*104)] top-0 h-full w-[calc(var(--u)*428)] object-cover [mask-image:linear-gradient(to_right,transparent,#000_18%)]"
          />
          <div className="absolute left-[calc(var(--u)*30)] top-[calc(var(--u)*26)]">
            <p className="text-[calc(var(--u)*19)] tracking-[0.14em]" style={{ color: AMBER }}>SPECIAL OFFER</p>
            <h2 className="mt-[calc(var(--u)*6)] font-display text-[calc(var(--u)*50)] leading-[1.03]">Upgrade Your<br />Wardrobe</h2>
            <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*25)] text-muted">Get up to <b className="font-semibold" style={{ color: AMBER }}>40% Off</b></p>
            <Link href="/categories" className="mt-[calc(var(--u)*18)] inline-flex h-[calc(var(--u)*62)] items-center gap-[calc(var(--u)*14)] rounded-full px-[calc(var(--u)*30)] text-[calc(var(--u)*24)] font-medium text-white shadow-md" style={{ background: AMBER }}>
              Shop Now <ArrowRight className="size-[calc(var(--u)*26)]" />
            </Link>
          </div>
          <span className="absolute right-[calc(var(--u)*24)] top-[calc(var(--u)*44)] grid size-[calc(var(--u)*140)] place-items-center rounded-full text-center text-[calc(var(--u)*24)] leading-[1.25] text-white" style={{ background: FOREST }}>
            Style<br />More<br />You
          </span>
        </section>
        <div className="mt-[calc(var(--u)*18)] flex justify-center gap-[calc(var(--u)*12)]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("size-[calc(var(--u)*14)] rounded-full", i === 0 ? "bg-ink" : "bg-dot")} />
          ))}
        </div>

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
                  <ProductCard key={p.id} product={p} liked={liked.has(p.id)} onToggleLike={toggleLike} />
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
