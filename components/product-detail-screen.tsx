"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, Heart, Leaf, Minus, PackageCheck, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { addToCart, useCart } from "@/lib/cart";
import { COLOR_NAMES, sizesFor } from "@/lib/product-options";
import { discountPercent, galleryFor, similarProducts, type Product } from "@/lib/products";
import { AMBER_LIGHT, FOREST } from "@/lib/theme";

const px = "px-[calc(var(--u)*55)]";
const round = "grid place-items-center rounded-full bg-white/95 shadow-[0_2px_10px_rgba(35,45,25,0.1)]";

const PERKS = [
  { Icon: Truck, label: "Free\nShipping" },
  { Icon: PackageCheck, label: "Easy\nReturns" },
  { Icon: ShieldCheck, label: "Secure\nPayment" },
  { Icon: Leaf, label: "Premium\nQuality" },
];

export function ProductDetailScreen({ product }: { product: Product }) {
  const router = useRouter();
  const goBack = () => (window.history.length > 1 ? router.back() : router.push("/home"));
  const gallery = galleryFor(product);
  const similar = similarProducts(product);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const toggleLike = (id: string) =>
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const sizes = sizesFor(product);
  const off = discountPercent(product);
  const reviews = Math.round(product.rating * 250);

  const [image, setImage] = useState(0);
  const [size, setSize] = useState(sizes[0]);
  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const cart = useCart();
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const addBtn = useRef<HTMLButtonElement>(null);
  const cartBtn = useRef<HTMLAnchorElement>(null);
  const [bump, setBump] = useState(0);
  const [likeBump, setLikeBump] = useState(0);
  const heartBtn = useRef<HTMLButtonElement>(null);
  const galleryBox = useRef<HTMLDivElement>(null);
  type Flyer = { id: number; x: number; y: number; dx: number; dy: number; done: () => void };
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  /** Fly a product thumbnail from one element to another, then run `done`. */
  const fly = (from: HTMLElement | null, to: HTMLElement | null, done: () => void) => {
    const a = from?.getBoundingClientRect();
    const c = to?.getBoundingClientRect();
    if (!a || !c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    setFlyers((f) => [
      ...f,
      {
        id: Date.now() + Math.random(),
        x: a.left + a.width / 2 - 22,
        y: a.top + a.height / 2 - 22,
        dx: c.left + c.width / 2 - (a.left + a.width / 2),
        dy: c.top + c.height / 2 - (a.top + a.height / 2),
        done,
      },
    ]);
  };

  const commit = () => {
    addToCart({ productId: product.id, size, color, colorName: COLOR_NAMES[product.colors[color]] ?? "Custom", qty });
    setBump((b) => b + 1);
  };

  const add = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    fly(addBtn.current, cartBtn.current, commit);
  };

  const buyNow = () => {
    addToCart({ productId: product.id, size, color, colorName: COLOR_NAMES[product.colors[color]] ?? "Custom", qty });
    router.push("/checkout/address");
  };

  const toggleSave = () => {
    if (liked) return setLiked(false);
    fly(galleryBox.current, heartBtn.current, () => {
      setLiked(true);
      setLikeBump((b) => b + 1);
    });
  };

  const flyRef = (el: HTMLDivElement | null, f: Flyer) => {
    if (!el || el.dataset.started) return;
    el.dataset.started = "1";
    const anim = el.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1, offset: 0 },
        { transform: `translate(${f.dx * 0.5}px, ${f.dy * 0.15 - 60}px) scale(0.85)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${f.dx}px, ${f.dy}px) scale(0.3)`, opacity: 0.9, offset: 1 },
      ],
      { duration: 800, easing: "cubic-bezier(0.55, 0, 0.35, 1)", fill: "forwards" },
    );
    anim.onfinish = () => {
      setFlyers((all) => all.filter((x) => x.id !== f.id));
      f.done();
    };
  };

  return (
    <PhoneFrame>
      <main className="pb-[calc(var(--u)*230)]">
        {/* gallery */}
        <div ref={galleryBox} className="relative h-[calc(var(--u)*700)] w-full overflow-hidden bg-card">
          <Image key={gallery[image]} src={gallery[image]} alt={product.name} fill sizes="450px" priority className="object-cover object-top" />

          {/* tap zones to step through the gallery */}
          {gallery.length > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={() => setImage((i) => (i - 1 + gallery.length) % gallery.length)} className="absolute inset-y-0 left-0 w-1/3" />
              <button type="button" aria-label="Next photo" onClick={() => setImage((i) => (i + 1) % gallery.length)} className="absolute inset-y-0 right-0 w-1/3" />
            </>
          )}

          {/* header, overlaid on the photo */}
          <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-[calc(var(--u)*36)] pt-[calc(var(--u)*30)]">
            <button type="button" aria-label="Back" onClick={goBack} className={cn(round, "pointer-events-auto size-[calc(var(--u)*88)]")}>
              <ChevronLeft className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
            </button>
            <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className="h-[calc(var(--u)*72)] w-auto" />
            <div className="pointer-events-auto flex gap-[calc(var(--u)*16)]">
              <button ref={heartBtn} type="button" aria-label="Save" aria-pressed={liked} onClick={toggleSave} className={cn(round, "size-[calc(var(--u)*88)]")}>
                <Heart key={likeBump} className={cn("size-[calc(var(--u)*40)]", liked && "text-[#b23a48] animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]")} fill={liked ? "currentColor" : "none"} strokeWidth={1.6} />
              </button>
              <Link ref={cartBtn} href="/cart" aria-label={`Cart, ${cartCount} items`} className={cn(round, "relative size-[calc(var(--u)*88)]")}>
                <ShoppingCart className="size-[calc(var(--u)*40)]" strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span
                    key={bump}
                    className="absolute -right-[calc(var(--u)*6)] -top-[calc(var(--u)*6)] grid min-w-[calc(var(--u)*36)] place-items-center rounded-full px-[calc(var(--u)*7)] text-[calc(var(--u)*21)] leading-[calc(var(--u)*36)] text-white animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ background: FOREST }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </header>

          <p className="font-script pointer-events-none absolute right-[calc(var(--u)*36)] top-[calc(var(--u)*160)] text-right text-[calc(var(--u)*36)] italic leading-[1.15]" style={{ color: FOREST }}>
            Style For<br />Every Day
          </p>

          {gallery.length > 1 && (
            <span className="pointer-events-none absolute bottom-[calc(var(--u)*30)] left-[calc(var(--u)*36)] rounded-full bg-black/45 px-[calc(var(--u)*22)] py-[calc(var(--u)*10)] text-[calc(var(--u)*24)] text-white">
              {image + 1} / {gallery.length}
            </span>
          )}
          <button type="button" aria-label="Expand photo" className={cn(round, "absolute bottom-[calc(var(--u)*24)] right-[calc(var(--u)*30)] size-[calc(var(--u)*70)]")}>
            <Expand className="size-[calc(var(--u)*32)]" strokeWidth={1.6} />
          </button>
        </div>

        {/* info */}
        <section className={cn("mt-[calc(var(--u)*28)]", px)}>
          <p className="text-[calc(var(--u)*22)] font-medium tracking-[0.16em]" style={{ color: FOREST }}>{product.category.toUpperCase()} COLLECTION</p>
          <div className="mt-[calc(var(--u)*6)] flex items-start justify-between gap-[calc(var(--u)*16)]">
            <h1 className="font-display text-[calc(var(--u)*54)] leading-none">{product.name}</h1>
          </div>
          <p className="mt-[calc(var(--u)*16)] flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*27)]">
            <Star className="size-[calc(var(--u)*30)] fill-[#e8a13a] text-[#e8a13a]" />
            <b>{product.rating.toFixed(1)}</b>
            <span className="text-muted">({reviews > 999 ? `${(reviews / 1000).toFixed(1)}K` : reviews} reviews)</span>
            <ChevronRight className="size-[calc(var(--u)*26)] text-muted" />
          </p>
          <p className="mt-[calc(var(--u)*18)] flex flex-wrap items-center gap-[calc(var(--u)*18)]">
            <b className="text-[calc(var(--u)*46)]">${product.price.toFixed(2)}</b>
            {product.oldPrice && <s className="text-[calc(var(--u)*27)] text-muted">${product.oldPrice.toFixed(2)}</s>}
            {off > 0 && <span className="rounded-full bg-[#e3edd6] px-[calc(var(--u)*20)] py-[calc(var(--u)*8)] text-[calc(var(--u)*23)]" style={{ color: FOREST }}>{off}% Off</span>}
          </p>
          <p className="mt-[calc(var(--u)*18)] max-w-[calc(var(--u)*640)] text-[calc(var(--u)*26)] leading-[1.4] text-muted">
            Classic design, modern comfort. Perfect for work, meetings and special occasions.
          </p>
        </section>

        {/* color */}
        <section className={cn("mt-[calc(var(--u)*32)]", px)}>
          <p className="text-[calc(var(--u)*27)]">Color : <span className="font-medium text-ink">{COLOR_NAMES[product.colors[color]] ?? "Custom"}</span></p>
          <div className="mt-[calc(var(--u)*18)] flex gap-[calc(var(--u)*20)]">
            {product.colors.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-label={COLOR_NAMES[c] ?? "Color"}
                aria-pressed={color === i}
                onClick={() => setColor(i)}
                className={cn("grid size-[calc(var(--u)*62)] place-items-center rounded-full", color === i && "ring-[calc(var(--u)*4)] ring-offset-[calc(var(--u)*5)] ring-offset-page")}
                style={color === i ? { boxShadow: `0 0 0 calc(var(--u)*4) ${FOREST}` } : undefined}
              >
                <span className="size-full rounded-full ring-1 ring-black/10" style={{ background: c }} />
              </button>
            ))}
          </div>
        </section>

        {/* size */}
        <section className={cn("mt-[calc(var(--u)*32)]", px)}>
          <div className="flex items-center justify-between">
            <p className="text-[calc(var(--u)*27)]">Size : <span className="font-medium text-ink">{size}</span></p>
            <button type="button" className="flex items-center gap-[calc(var(--u)*8)] text-[calc(var(--u)*24)] text-muted">
              Size Guide
            </button>
          </div>
          <div className="no-scrollbar mt-[calc(var(--u)*18)] flex gap-[calc(var(--u)*16)] overflow-x-auto">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={cn(
                  "h-[calc(var(--u)*68)] min-w-[calc(var(--u)*80)] shrink-0 rounded-[calc(var(--u)*16)] px-[calc(var(--u)*24)] text-[calc(var(--u)*26)] transition-colors",
                  size === s && "text-white",
                )}
                style={size === s ? { background: FOREST } : { background: AMBER_LIGHT }}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* quantity */}
        <section className={cn("mt-[calc(var(--u)*32)] flex items-center justify-between", px)}>
          <p className="text-[calc(var(--u)*27)]">Quantity</p>
          <div className="flex h-[calc(var(--u)*72)] w-[calc(var(--u)*220)] items-center justify-between rounded-full bg-pill/80 px-[calc(var(--u)*14)]">
            <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-[calc(var(--u)*48)] place-items-center">
              <Minus className="size-[calc(var(--u)*28)]" strokeWidth={1.8} />
            </button>
            <span className="text-[calc(var(--u)*30)]" aria-live="polite">{qty}</span>
            <button type="button" aria-label="Increase" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid size-[calc(var(--u)*48)] place-items-center">
              <Plus className="size-[calc(var(--u)*28)]" strokeWidth={1.8} />
            </button>
          </div>
        </section>

        {/* perks */}
        <section className={cn("mt-[calc(var(--u)*36)] grid grid-cols-4 gap-[calc(var(--u)*10)]", px)}>
          {PERKS.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-[calc(var(--u)*12)] text-center">
              <span className="grid size-[calc(var(--u)*84)] place-items-center rounded-full" style={{ background: "#e9efdd" }}>
                <Icon className="size-[calc(var(--u)*36)]" style={{ color: FOREST }} strokeWidth={1.5} />
              </span>
              <p className="whitespace-pre-line text-[calc(var(--u)*20)] leading-[1.25] text-muted">{label}</p>
            </div>
          ))}
        </section>

        {/* actions */}
        <section className={cn("mt-[calc(var(--u)*36)] space-y-[calc(var(--u)*16)]", px)}>
          <button
            ref={addBtn}
            type="button"
            onClick={add}
            className="flex h-[calc(var(--u)*94)] w-full items-center justify-center gap-[calc(var(--u)*18)] rounded-[calc(var(--u)*24)] text-[calc(var(--u)*30)] text-white transition-transform active:scale-[0.98]"
            style={{ background: FOREST }}
          >
            <ShoppingCart className="size-[calc(var(--u)*34)]" strokeWidth={1.6} /> {added ? "Added to Cart" : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="flex h-[calc(var(--u)*94)] w-full items-center justify-center rounded-[calc(var(--u)*24)] text-[calc(var(--u)*30)] font-medium transition-transform active:scale-[0.98]"
            style={{ background: "#e3edd6", color: FOREST }}
          >
            Buy Now
          </button>
        </section>

        {/* similar products */}
        {similar.length > 0 && (
          <section className="mt-[calc(var(--u)*50)]">
            <div className={cn("flex items-center justify-between", px)}>
              <h2 className="font-display text-[calc(var(--u)*42)]">You may also like</h2>
              <Link href="/categories" className="flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*24)]" style={{ color: FOREST }}>
                View All <ChevronRight className="size-[calc(var(--u)*26)]" />
              </Link>
            </div>
            <div className="no-scrollbar mt-[calc(var(--u)*24)] flex snap-x items-end gap-[calc(var(--u)*32)] overflow-x-auto px-[calc(var(--u)*55)]">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} liked={likedIds.has(p.id)} onToggleLike={toggleLike} />
              ))}
            </div>
          </section>
        )}

        <BottomNav active="" cartCount={cartCount} />
      </main>
      {typeof document !== "undefined" &&
        createPortal(
          flyers.map((f) => (
            <div
              key={f.id}
              ref={(el) => flyRef(el, f)}
              aria-hidden
              className="pointer-events-none fixed z-50 size-11 overflow-hidden rounded-full border-2 border-white bg-card shadow-lg will-change-transform"
              style={{ left: f.x, top: f.y }}
            >
              <Image src={product.image} alt="" fill sizes="44px" className="object-cover object-top" />
            </div>
          )),
          document.body,
        )}
    </PhoneFrame>
  );
}
