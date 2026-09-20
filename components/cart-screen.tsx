"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, ChevronLeft, Lock, Minus, MoreHorizontal, Plus, ShieldCheck, Tag, Trash2 } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import { lineKey, removeCartItem, updateCartItem, useCart } from "@/lib/cart";


const DISCOUNT_RATE = 0.1;
const SHIPPING = 8;
const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const round = "grid place-items-center rounded-full bg-pill/80";
const card = "rounded-[calc(var(--u)*28)] bg-white/70 shadow-[0_2px_14px_rgba(60,45,20,0.05)]";

export function CartScreen() {
  const items = useCart();

  const lines = useMemo(
    () => items.flatMap((it) => {
      const product = products.find((p) => p.id === it.productId);
      return product ? [{ it, product }] : [];
    }),
    [items],
  );
  const count = lines.reduce((n, l) => n + l.it.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.it.qty, 0);
  const discount = subtotal * DISCOUNT_RATE;
  const shipping = lines.length ? SHIPPING : 0;
  const total = subtotal - discount + shipping;


  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*48)] pb-[calc(var(--u)*190)] pt-[calc(var(--u)*88)]">
        {/* header */}
        <header className="relative flex items-start justify-between">
          <Link href="/home" aria-label="Back" className={cn(round, "size-[calc(var(--u)*88)]")}>
            <ChevronLeft className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
          </Link>
          <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--u)*-2)] text-center">
            <h1 className="font-display text-[calc(var(--u)*52)] leading-[1.1]">My Cart</h1>
            <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] text-muted">Review your items before checkout</p>
          </div>
          <button type="button" aria-label="More" className={cn(round, "relative size-[calc(var(--u)*88)]")}>
            <MoreHorizontal className="size-[calc(var(--u)*40)]" strokeWidth={2} />
          </button>
        </header>

        <p className="mt-[calc(var(--u)*22)] pr-[calc(var(--u)*8)] text-right text-[calc(var(--u)*24)]" aria-live="polite">
          {count} {count === 1 ? "Item" : "Items"}
        </p>

        {/* items */}
        <ul className="mt-[calc(var(--u)*6)] space-y-[calc(var(--u)*20)]">
          {lines.map(({ it, product }) => (
            <li key={lineKey(it)}className={cn(card, "flex min-h-[calc(var(--u)*222)] items-center p-[calc(var(--u)*7)]")}>
              <Link href={`/product/${product.id}`} className="relative self-stretch w-[calc(var(--u)*205)] shrink-0 overflow-hidden rounded-[calc(var(--u)*24)] bg-card">
                <Image src={product.image} alt={product.name} fill sizes="120px" className="object-cover object-top" />
              </Link>
              <div className="ml-[calc(var(--u)*23)] min-w-0 flex-1">
                <h2 className="font-display text-[calc(var(--u)*30)] leading-tight">{product.name}</h2>
                <p className="mt-[calc(var(--u)*12)] flex items-baseline gap-[calc(var(--u)*16)]">
                  <b className="text-[calc(var(--u)*34)]">{money(product.price)}</b>
                  {product.oldPrice && <s className="text-[calc(var(--u)*24)] text-muted">{money(product.oldPrice)}</s>}
                </p>
                <p className="mt-[calc(var(--u)*18)] text-[calc(var(--u)*24)] leading-[1.35] text-muted">Size: {it.size}</p>
                <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] leading-[1.35] text-muted">Color: {it.colorName}</p>
              </div>
              <div className="ml-[calc(var(--u)*12)] flex h-[calc(var(--u)*58)] w-[calc(var(--u)*150)] shrink-0 items-center justify-between rounded-full bg-pill/80 px-[calc(var(--u)*8)]">
                <button type="button" aria-label="Decrease quantity" onClick={() => updateCartItem(lineKey(it), it.qty - 1)} className="grid size-[calc(var(--u)*40)] place-items-center">
                  <Minus className="size-[calc(var(--u)*28)]" strokeWidth={1.8} />
                </button>
                <span className="text-[length:calc(var(--u)*27)] text-ink">{it.qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => updateCartItem(lineKey(it), it.qty + 1)} className="grid size-[calc(var(--u)*40)] place-items-center">
                  <Plus className="size-[calc(var(--u)*28)]" strokeWidth={1.8} />
                </button>
              </div>
              <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeCartItem(lineKey(it))} className="mx-[calc(var(--u)*20)] grid size-[calc(var(--u)*64)] place-items-center">
                <Trash2 className="size-[calc(var(--u)*46)]" strokeWidth={1.6} />
              </button>
            </li>
          ))}
        </ul>

        {lines.length === 0 && (
          <div className="mt-[calc(var(--u)*140)] text-center">
            <p className="font-display text-[calc(var(--u)*44)]">Your cart is empty</p>
            <Link href="/home" className="mt-[calc(var(--u)*30)] inline-block rounded-full bg-gold-dark px-[calc(var(--u)*50)] py-[calc(var(--u)*24)] text-[calc(var(--u)*28)] text-white">
              Start shopping
            </Link>
          </div>
        )}

        {lines.length > 0 && (
          <>
            {/* promo */}
            <section className={cn(card, "mt-[calc(var(--u)*20)] flex h-[calc(var(--u)*100)] items-center gap-[calc(var(--u)*28)] px-[calc(var(--u)*24)]")}>
              <span className="grid size-[calc(var(--u)*62)] shrink-0 place-items-center rounded-full bg-pill">
                <Tag className="size-[calc(var(--u)*36)]" strokeWidth={1.5} />
              </span>
              <div className="flex-1">
                <p className="text-[calc(var(--u)*26)]">Promo Code or Gift Card</p>
                <p className="text-[calc(var(--u)*23)] text-muted">Save more on your purchase</p>
              </div>
              <button type="button" className="h-[calc(var(--u)*60)] w-[calc(var(--u)*182)] rounded-full bg-pill text-[calc(var(--u)*25)]">Apply</button>
            </section>

            {/* summary */}
            <section className={cn(card, "mt-[calc(var(--u)*22)] px-[calc(var(--u)*24)] py-[calc(var(--u)*20)]")}>
              <h2 className="font-display text-[calc(var(--u)*36)]">Order Summary</h2>
              <dl className="mt-[calc(var(--u)*4)] text-[calc(var(--u)*27)]">
                <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Subtotal ({count} {count === 1 ? "item" : "items"})</dt><dd>{money(subtotal)}</dd></div>
                <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Discount</dt><dd className="text-[#3f7a4a]">-{money(discount)}</dd></div>
                <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Shipping</dt><dd>{money(shipping)}</dd></div>
              </dl>
              <div className="mt-[calc(var(--u)*10)] flex items-center justify-between border-t border-black/[0.07] pt-[calc(var(--u)*18)]">
                <span className="text-[calc(var(--u)*33)] font-semibold">Total</span>
                <span className="text-[calc(var(--u)*38)] font-semibold">{money(total)}</span>
              </div>
            </section>

            <button type="button" className="mt-[calc(var(--u)*17)] flex h-[calc(var(--u)*88)] w-full items-center justify-center gap-[calc(var(--u)*26)] rounded-[calc(var(--u)*24)] bg-gold-dark text-[calc(var(--u)*30)] text-white transition-transform active:scale-[0.99]">
              <Lock className="size-[calc(var(--u)*40)]" strokeWidth={1.5} />
              Proceed to Checkout
              <ArrowRight className="size-[calc(var(--u)*36)]" strokeWidth={1.6} />
            </button>
            <p className="mt-[calc(var(--u)*20)] flex items-center justify-center gap-[calc(var(--u)*16)] text-[calc(var(--u)*23)] text-muted">
              <ShieldCheck className="size-[calc(var(--u)*36)] text-ink" strokeWidth={1.4} />
              Secure and encrypted payment
            </p>
          </>
        )}

        <BottomNav active="/cart" cartCount={count} />
      </main>
    </PhoneFrame>
  );
}
