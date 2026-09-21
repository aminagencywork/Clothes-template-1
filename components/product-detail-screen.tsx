"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Expand, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { addToCart, useCart } from "@/lib/cart";
import { ProductCard } from "./product-card";
import { COLOR_NAMES, sizesFor } from "@/lib/product-options";
import { discountPercent, galleryFor, similarProducts, type Product } from "@/lib/products";

const px = "px-[calc(var(--u)*55)]";
const round = "grid place-items-center rounded-full bg-pill/80";

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
      <main className="pb-[calc(var(--u)*200)] pt-[calc(var(--u)*100)]">
        {/* top bar */}
        <header className="flex items-center justify-between px-[calc(var(--u)*49)]">
          <button type="button" aria-label="Back" onClick={goBack} className={cn(round, "size-[calc(var(--u)*92)]")}>
            <ChevronLeft className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
          </button>
          <div className="flex gap-[calc(var(--u)*22)]">
            <Link ref={cartBtn} href="/cart" aria-label={`Cart, ${cartCount} items`} className={cn(round, "relative size-[calc(var(--u)*92)]")}>
              <ShoppingCart className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span
                  key={bump}
                  className="absolute -right-[calc(var(--u)*6)] -top-[calc(var(--u)*6)] grid min-w-[calc(var(--u)*38)] place-items-center rounded-full bg-gold-dark px-[calc(var(--u)*8)] text-[calc(var(--u)*23)] leading-[calc(var(--u)*38)] text-white animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]"
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <button ref={heartBtn} type="button" aria-label="Save" aria-pressed={liked} onClick={toggleSave} className={cn(round, "size-[calc(var(--u)*92)]")}>
              <Heart key={likeBump} className={cn("size-[calc(var(--u)*44)]", liked && "text-[#b23a48] animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]")} fill={liked ? "currentColor" : "none"} strokeWidth={1.6} />
            </button>
            <button type="button" aria-label="Share" className={cn(round, "size-[calc(var(--u)*92)]")}>
              <Share2 className="size-[calc(var(--u)*40)]" strokeWidth={1.6} />
            </button>
          </div>
        </header>

        {/* gallery */}
        <section className={cn("mt-[calc(var(--u)*22)] flex gap-[calc(var(--u)*16)]", px, "!px-[calc(var(--u)*55)]")}>
          <div ref={galleryBox} className={cn("relative h-[calc(var(--u)*765)] overflow-hidden rounded-[calc(var(--u)*40)] bg-card", gallery.length > 1 ? "w-[calc(var(--u)*622)]" : "w-full")}>
            <Image key={gallery[image]} src={gallery[image]} alt={product.name} fill sizes="400px" priority className="object-cover object-top" />
            {off > 0 && (
              <span className="absolute left-[calc(var(--u)*25)] top-[calc(var(--u)*30)] rounded-full bg-white px-[calc(var(--u)*24)] py-[calc(var(--u)*16)] text-[calc(var(--u)*24)]">{off}% Off</span>
            )}
            <span className="absolute bottom-[calc(var(--u)*30)] left-[calc(var(--u)*25)] rounded-full bg-black/40 px-[calc(var(--u)*22)] py-[calc(var(--u)*10)] text-[calc(var(--u)*24)] text-white">
              {image + 1} / {gallery.length}
            </span>
            <button type="button" aria-label="Expand" className="absolute bottom-[calc(var(--u)*30)] right-[calc(var(--u)*30)] grid size-[calc(var(--u)*70)] place-items-center rounded-full bg-white/85">
              <Expand className="size-[calc(var(--u)*32)]" strokeWidth={1.6} />
            </button>
          </div>
          {gallery.length > 1 && (
            <div className="flex flex-1 flex-col gap-[calc(var(--u)*16)]">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  onClick={() => setImage(i)}
                  className={cn(
                    "relative min-h-0 flex-1 overflow-hidden rounded-[calc(var(--u)*26)] bg-card",
                    i === image && "ring-[calc(var(--u)*4)] ring-gold-dark",
                  )}
                >
                  <Image src={src} alt="" fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* info */}
        <section className={cn("mt-[calc(var(--u)*28)]", px)}>
          <div className="flex items-start justify-between">
            <h1 className="font-display text-[calc(var(--u)*62)] leading-none">{product.name}</h1>
            <span className="mt-[calc(var(--u)*14)] flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*38)] font-semibold">
              <Star className="size-[calc(var(--u)*38)] fill-[#e8a13a] text-[#e8a13a]" />
              {product.rating.toFixed(1)}
              <span className="text-[calc(var(--u)*27)] font-normal text-muted">(320)</span>
            </span>
          </div>
          <p className="mt-[calc(var(--u)*20)] max-w-[calc(var(--u)*600)] text-[calc(var(--u)*27)] leading-[1.4] text-muted">
            Classic design, modern comfort. Perfect for work, meetings and special occasions.
          </p>
          <p className="mt-[calc(var(--u)*24)] flex items-center gap-[calc(var(--u)*26)]">
            <b className="text-[calc(var(--u)*56)]">${product.price.toFixed(2)}</b>
            {product.oldPrice && <s className="text-[calc(var(--u)*30)] text-muted">${product.oldPrice.toFixed(2)}</s>}
            {off > 0 && <span className="rounded-full bg-[#eef3e4] px-[calc(var(--u)*26)] py-[calc(var(--u)*14)] text-[calc(var(--u)*29)]">{off}% Off</span>}
          </p>
        </section>

        {/* size */}
        <section className={cn("mt-[calc(var(--u)*34)]", px)}>
          <div className="flex items-center justify-between">
            <p className="text-[calc(var(--u)*29)] font-medium">Size : {size}</p>
            <button type="button" className="flex items-center gap-[calc(var(--u)*8)] text-[calc(var(--u)*25)] text-muted">
              Size Guide <ChevronRight className="size-[calc(var(--u)*28)]" />
            </button>
          </div>
          <div className="no-scrollbar mt-[calc(var(--u)*24)] flex gap-[calc(var(--u)*17)] overflow-x-auto">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={cn(
                  "h-[calc(var(--u)*68)] min-w-[calc(var(--u)*151)] flex-1 shrink-0 rounded-full px-[calc(var(--u)*24)] text-[calc(var(--u)*27)] transition-colors",
                  size === s ? "bg-gold-dark text-white" : "bg-pill/80",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* color */}
        <section className={cn("mt-[calc(var(--u)*36)] flex items-center justify-between", px)}>
          <p className="text-[calc(var(--u)*29)]">Color : <span className="text-ink">{COLOR_NAMES[product.colors[color]] ?? "Custom"}</span></p>
          <div className="flex gap-[calc(var(--u)*20)]">
            {product.colors.map((c, i) => (
              <button
                key={c}
                type="button"
                aria-label={COLOR_NAMES[c] ?? "Color"}
                aria-pressed={color === i}
                onClick={() => setColor(i)}
                className={cn(
                  "grid size-[calc(var(--u)*62)] place-items-center rounded-full",
                  color === i && "ring-[calc(var(--u)*4)] ring-gold-dark ring-offset-[calc(var(--u)*5)] ring-offset-page",
                )}
              >
                <span className="size-full rounded-full ring-1 ring-black/10" style={{ background: c }} />
              </button>
            ))}
          </div>
        </section>

        {/* similar products */}
        <section className="mt-[calc(var(--u)*56)]">
          <div className={cn("flex items-center justify-between", px)}>
            <h2 className="font-display text-[calc(var(--u)*46)]">Similar Products</h2>
            <Link href="/categories" className="flex items-center gap-[calc(var(--u)*10)] text-[calc(var(--u)*24)] text-muted">
              View All <ChevronRight className="size-[calc(var(--u)*28)]" />
            </Link>
          </div>
          <div className="no-scrollbar mt-[calc(var(--u)*24)] flex snap-x items-end gap-[calc(var(--u)*32)] overflow-x-auto px-[calc(var(--u)*55)]">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} liked={likedIds.has(p.id)} onToggleLike={toggleLike} />
            ))}
          </div>
        </section>

        {/* fixed add-to-cart bar */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center">
          <div className="w-full max-w-[430px] [container-type:inline-size]" style={{ ["--u" as string]: "calc(100cqw / 941)" }}>
            <div className="pointer-events-auto mx-[calc(var(--u)*38)] mb-[calc(var(--u)*24)] flex h-[calc(var(--u)*132)] items-center gap-[calc(var(--u)*22)] rounded-[calc(var(--u)*34)] bg-white px-[calc(var(--u)*24)] shadow-[0_6px_30px_rgba(60,45,20,0.14)]">
              <div className="flex h-[calc(var(--u)*94)] w-[calc(var(--u)*286)] items-center justify-between rounded-[calc(var(--u)*28)] bg-pill/80 px-[calc(var(--u)*18)]">
                <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-[calc(var(--u)*60)] place-items-center">
                  <Minus className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />
                </button>
                <span className="text-[calc(var(--u)*38)]" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid size-[calc(var(--u)*60)] place-items-center">
                  <Plus className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />
                </button>
              </div>
              <button
                ref={addBtn}
                type="button"
                onClick={add}
                className="flex h-[calc(var(--u)*98)] flex-1 items-center justify-center gap-[calc(var(--u)*20)] rounded-[calc(var(--u)*30)] bg-gold-dark text-[calc(var(--u)*38)] text-white transition-transform active:scale-[0.98]"
              >
                {added ? "Added to cart" : "Add to cart"} <ShoppingCart className="size-[calc(var(--u)*40)]" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
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
