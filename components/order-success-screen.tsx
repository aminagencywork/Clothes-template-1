"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { removeCartItem, lineKey, useCart } from "@/lib/cart";
import { FOREST } from "@/lib/theme";
import { usePlacedOrders } from "@/lib/placed-orders";

const CONFETTI = [
  { c: "bg-[#f4a340]", x: "14%", y: "12%", r: 20 }, { c: "bg-[#f08fb0]", x: "40%", y: "6%", r: -30 }, { c: "bg-[#7cc79a]", x: "66%", y: "10%", r: 45 },
  { c: "bg-[#f08fb0]", x: "90%", y: "13%", r: 15 }, { c: "bg-[#7cc79a]", x: "20%", y: "22%", r: -20 }, { c: "bg-[#f4a340]", x: "84%", y: "26%", r: 35 },
  { c: "bg-[#4fb3a4]", x: "8%", y: "34%", r: 10 }, { c: "bg-[#f4a340]", x: "10%", y: "44%", r: -35 }, { c: "bg-[#f4a340]", x: "88%", y: "40%", r: 25 },
  { c: "bg-[#4fb3a4]", x: "16%", y: "54%", r: 40 }, { c: "bg-[#f08fb0]", x: "92%", y: "50%", r: -15 },
];

export function OrderSuccessScreen({ id }: { id: string }) {
  const cart = useCart();
  const order = usePlacedOrders().find((o) => o.id === id);

  // The order is in; empty the cart it was built from (no-op on reload).
  useEffect(() => {
    if (order) cart.forEach((i) => removeCartItem(lineKey(i)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.id]);

  return (
    <PhoneFrame>
      <main className="relative min-h-dvh px-[calc(var(--u)*40)] pb-[calc(var(--u)*80)] pt-[calc(var(--u)*220)] text-center">
        {CONFETTI.map((d, i) => (
          <span
            key={i}
            aria-hidden
            className={cn("absolute size-[calc(var(--u)*18)] animate-[cart-pop_0.7s_cubic-bezier(0.34,1.56,0.64,1)_both]", d.c)}
            style={{ left: d.x, top: d.y, transform: `rotate(${d.r}deg)`, animationDelay: `${i * 60}ms` }}
          />
        ))}

        <span className="mx-auto grid size-[calc(var(--u)*230)] place-items-center rounded-full bg-[#e3f2e3] animate-[cart-pop_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
          <Check className="size-[calc(var(--u)*120)] text-[#2d8a4a]" strokeWidth={2.4} />
        </span>

        <h1 className="font-display mt-[calc(var(--u)*50)] text-[calc(var(--u)*56)] leading-tight">Order Placed Successfully!</h1>
        <p className="mt-[calc(var(--u)*16)] text-[calc(var(--u)*28)] text-muted">Thank you for shopping with Vyntra</p>

        {order ? (
          <section className="mt-[calc(var(--u)*50)] rounded-[calc(var(--u)*24)] bg-white/80 px-[calc(var(--u)*30)] py-[calc(var(--u)*30)] shadow-[0_2px_14px_rgba(60,45,20,0.05)]">
            <p className="text-[calc(var(--u)*30)] font-semibold">Order #{order.id}</p>
            <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*24)] leading-[1.5] text-muted">
              A confirmation email has been sent to<br />
              <span className="text-ink">{order.email}</span>
            </p>
          </section>
        ) : (
          <p className="mt-[calc(var(--u)*50)] text-[calc(var(--u)*26)] text-muted">We couldn&apos;t find this order on this device.</p>
        )}

        {order && (
          <Link href={`/orders/${order.id}`} className="mt-[calc(var(--u)*30)] flex h-[calc(var(--u)*100)] w-full items-center justify-center rounded-[calc(var(--u)*24)] text-[calc(var(--u)*29)] font-medium text-white" style={{ background: FOREST }}>
            View Order Details
          </Link>
        )}
        <Link href="/home" className="mt-[calc(var(--u)*34)] inline-block text-[calc(var(--u)*28)] underline underline-offset-4">Continue Shopping</Link>
      </main>
    </PhoneFrame>
  );
}
