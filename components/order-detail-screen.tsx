import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { formatDate, orderCount, orderLines, orderTotal, type Order, type OrderStatus } from "@/lib/orders";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const round = "grid place-items-center rounded-full bg-pill/80";
const card = "rounded-[calc(var(--u)*28)] bg-white/70 p-[calc(var(--u)*28)] shadow-[0_2px_14px_rgba(60,45,20,0.05)]";
const h2 = "font-display text-[calc(var(--u)*36)]";

const CHIP: Record<OrderStatus, string> = {
  Delivered: "bg-[#e3f1dd] text-[#2f6b3a]",
  Shipped: "bg-[#e1ecf8] text-[#2f5f96]",
  Processing: "bg-[#fbeecb] text-[#8a5a12]",
  Cancelled: "bg-[#fbe3e2] text-[#a8322f]",
};

const DISCOUNT_RATE = 0.1;
const SHIPPING = 8;

/** Timeline steps: `done` steps are filled. */
function timeline(o: Order): { label: string; date?: string; done: boolean }[] {
  const placed = { label: "Order placed", date: o.placed, done: true };
  if (o.status === "Cancelled") return [placed, { label: "Cancelled", date: o.statusDate, done: true }];
  const rank = { Processing: 0, Shipped: 1, Delivered: 2 }[o.status];
  return [
    placed,
    { label: "Processing", done: true },
    { label: "Shipped", done: rank >= 1 },
    { label: o.status === "Delivered" ? "Delivered" : "Expected delivery", date: o.statusDate, done: rank >= 2 },
  ];
}

export function OrderDetailScreen({ order }: { order: Order }) {
  const lines = orderLines(order);
  const subtotal = orderTotal(order);
  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount + SHIPPING;
  const n = orderCount(order);
  const steps = timeline(order);
  const first = lines[0]?.product;

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*44)] pb-[calc(var(--u)*190)] pt-[calc(var(--u)*88)]">
        <header className="relative flex items-start justify-between">
          <Link href="/orders" aria-label="Back to orders" className={cn(round, "size-[calc(var(--u)*84)]")}>
            <ChevronLeft className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
          </Link>
          <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--u)*-2)] text-center">
            <h1 className="font-display text-[calc(var(--u)*52)] leading-[1.1]">Order Details</h1>
            <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] text-muted">#{order.id}</p>
          </div>
          <span className="size-[calc(var(--u)*84)]" />
        </header>

        {/* status */}
        <section className={cn(card, "mt-[calc(var(--u)*56)]")}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[calc(var(--u)*24)] text-muted">Placed on {formatDate(order.placed)}</p>
              <p className="mt-[calc(var(--u)*6)] text-[calc(var(--u)*24)] text-muted">{n} {n === 1 ? "item" : "items"}</p>
            </div>
            <span className={cn("rounded-full px-[calc(var(--u)*26)] py-[calc(var(--u)*10)] text-[calc(var(--u)*26)]", CHIP[order.status])}>{order.status}</span>
          </div>
          <ol className="mt-[calc(var(--u)*30)]">
            {steps.map((s, i) => (
              <li key={s.label} className="relative flex gap-[calc(var(--u)*26)] pb-[calc(var(--u)*28)] last:pb-0">
                {i < steps.length - 1 && (
                  <span className={cn("absolute bottom-0 left-[calc(var(--u)*17)] top-[calc(var(--u)*38)] w-px", steps[i + 1].done ? "bg-gold-dark" : "bg-black/15")} />
                )}
                <span className={cn("relative grid size-[calc(var(--u)*36)] shrink-0 place-items-center rounded-full", s.done ? (order.status === "Cancelled" && i > 0 ? "bg-[#a8322f]" : "bg-gold-dark") : "border border-black/20 bg-white")}>
                  {s.done && <Check className="size-[calc(var(--u)*22)] text-white" strokeWidth={3} />}
                </span>
                <div className="-mt-[calc(var(--u)*2)] flex flex-1 items-baseline justify-between">
                  <p className={cn("text-[calc(var(--u)*27)]", !s.done && "text-muted")}>{s.label}</p>
                  {s.date && <p className="text-[calc(var(--u)*23)] text-muted">{formatDate(s.date)}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* items */}
        <section className="mt-[calc(var(--u)*30)]">
          <h2 className={h2}>Items</h2>
          <ul className="mt-[calc(var(--u)*16)] space-y-[calc(var(--u)*16)]">
            {lines.map(({ product, qty }) => (
              <li key={product.id}>
                <Link href={`/product/${product.id}`} className={cn(card, "flex items-center gap-[calc(var(--u)*24)] !p-[calc(var(--u)*10)]")}>
                  <span className="relative h-[calc(var(--u)*170)] w-[calc(var(--u)*150)] shrink-0 overflow-hidden rounded-[calc(var(--u)*20)] bg-card">
                    <Image src={product.image} alt={product.name} fill sizes="100px" className="object-cover object-top" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[calc(var(--u)*32)] leading-tight">{product.name}</span>
                    <span className="mt-[calc(var(--u)*10)] block text-[calc(var(--u)*24)] text-muted">Qty: {qty}</span>
                  </span>
                  <span className="pr-[calc(var(--u)*18)] text-[calc(var(--u)*30)] font-semibold">{money(product.price * qty)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* shipping + payment */}
        <section className={cn(card, "mt-[calc(var(--u)*30)] space-y-[calc(var(--u)*26)]")}>
          <div className="flex gap-[calc(var(--u)*24)]">
            <MapPin className="size-[calc(var(--u)*40)] shrink-0" strokeWidth={1.5} />
            <div>
              <h2 className="text-[calc(var(--u)*27)] font-medium">Shipping address</h2>
              <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] leading-[1.4] text-muted">
                Ibrahim Popatiya<br />12, Park Street, Mumbai 400001<br />+91 98765 43210
              </p>
            </div>
          </div>
          <div className="flex gap-[calc(var(--u)*24)] border-t border-black/[0.07] pt-[calc(var(--u)*26)]">
            <CreditCard className="size-[calc(var(--u)*40)] shrink-0" strokeWidth={1.5} />
            <div>
              <h2 className="text-[calc(var(--u)*27)] font-medium">Payment method</h2>
              <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] text-muted">Visa ending in 4242</p>
            </div>
          </div>
        </section>

        {/* summary */}
        <section className={cn(card, "mt-[calc(var(--u)*30)]")}>
          <h2 className={h2}>Order Summary</h2>
          <dl className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*27)]">
            <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Subtotal ({n} {n === 1 ? "item" : "items"})</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Discount</dt><dd className="text-[#3f7a4a]">-{money(discount)}</dd></div>
            <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Shipping</dt><dd>{money(SHIPPING)}</dd></div>
          </dl>
          <div className="mt-[calc(var(--u)*10)] flex items-center justify-between border-t border-black/[0.07] pt-[calc(var(--u)*18)]">
            <span className="text-[calc(var(--u)*33)] font-semibold">{order.status === "Cancelled" ? "Refund total" : "Total"}</span>
            <span className="text-[calc(var(--u)*38)] font-semibold">{money(total)}</span>
          </div>
        </section>

        {order.status === "Delivered" && first && (
          <Link href={`/product/${first.id}`} className="mt-[calc(var(--u)*30)] grid h-[calc(var(--u)*88)] place-items-center rounded-[calc(var(--u)*24)] bg-gold-dark text-[calc(var(--u)*30)] text-white">
            Buy Again
          </Link>
        )}
        <p className="mt-[calc(var(--u)*24)] flex items-center justify-center gap-[calc(var(--u)*16)] text-[calc(var(--u)*23)] text-muted">
          <ShieldCheck className="size-[calc(var(--u)*36)] text-ink" strokeWidth={1.4} />
          Secure and encrypted payment
        </p>

        <BottomNav active="/profile" />
      </main>
    </PhoneFrame>
  );
}
