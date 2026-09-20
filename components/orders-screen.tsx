"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Hourglass, Package, Search, ShoppingBag, SlidersHorizontal, Truck, XCircle, type LucideIcon } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { formatDate, orderCount, orderLines, orderTotal, orders, type OrderStatus } from "@/lib/orders";

const STATUSES: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_STYLE: Record<OrderStatus, { Icon: LucideIcon; chip: string; label: string }> = {
  Delivered: { Icon: Truck, chip: "bg-[#e3f1dd] text-[#2f6b3a]", label: "Delivered on" },
  Shipped: { Icon: Package, chip: "bg-[#e1ecf8] text-[#2f5f96]", label: "Expected by" },
  Processing: { Icon: Hourglass, chip: "bg-[#fbeecb] text-[#8a5a12]", label: "Expected by" },
  Cancelled: { Icon: XCircle, chip: "bg-[#fbe3e2] text-[#a8322f]", label: "Cancelled on" },
};

const SORTS = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "high", label: "Price: high to low" },
  { id: "low", label: "Price: low to high" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const round = "grid place-items-center rounded-full bg-pill/80";

export function OrdersScreen() {
  const cart = useCart();
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const [tab, setTab] = useState<"All" | OrderStatus>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("newest");
  const [menu, setMenu] = useState(false);

  const tabs = [
    { id: "All" as const, label: "All Orders", count: orders.length },
    ...STATUSES.map((s) => ({ id: s, label: s, count: orders.filter((o) => o.status === s).length })),
  ];

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = orders.filter((o) => {
      if (tab !== "All" && o.status !== tab) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        formatDate(o.placed).toLowerCase().includes(q) ||
        orderLines(o).some((l) => l.product.name.toLowerCase().includes(q))
      );
    });
    return list.sort((a, b) => {
      if (sort === "oldest") return a.placed.localeCompare(b.placed);
      if (sort === "high") return orderTotal(b) - orderTotal(a);
      if (sort === "low") return orderTotal(a) - orderTotal(b);
      return b.placed.localeCompare(a.placed);
    });
  }, [tab, query, sort]);

  return (
    <PhoneFrame>
      <main className="pb-[calc(var(--u)*190)] pt-[calc(var(--u)*88)]">
        {/* header */}
        <header className="relative flex items-start justify-between px-[calc(var(--u)*36)]">
          <Link href="/profile" aria-label="Back" className={cn(round, "size-[calc(var(--u)*84)]")}>
            <ChevronLeft className="size-[calc(var(--u)*44)]" strokeWidth={1.6} />
          </Link>
          <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--u)*-2)] text-center">
            <h1 className="font-display text-[calc(var(--u)*52)] leading-[1.1]">My Orders</h1>
            <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*24)] text-muted">Track, manage and return your orders</p>
          </div>
          <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className={cn(round, "relative size-[calc(var(--u)*84)]")}>
            <ShoppingBag className="size-[calc(var(--u)*40)]" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -right-[calc(var(--u)*6)] -top-[calc(var(--u)*8)] grid min-w-[calc(var(--u)*38)] place-items-center rounded-full bg-gold-dark px-[calc(var(--u)*8)] text-[calc(var(--u)*22)] leading-[calc(var(--u)*38)] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </header>

        {/* status tabs */}
        <div role="tablist" aria-label="Order status" className="no-scrollbar mt-[calc(var(--u)*64)] flex gap-[calc(var(--u)*14)] overflow-x-auto px-[calc(var(--u)*32)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "h-[calc(var(--u)*55)] shrink-0 rounded-full px-[calc(var(--u)*26)] text-[calc(var(--u)*24)] transition-colors",
                tab === t.id ? "bg-gold-dark text-white" : "bg-pill/80",
              )}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* search + filter */}
        <div className="relative mt-[calc(var(--u)*28)] flex gap-[calc(var(--u)*16)] px-[calc(var(--u)*32)]">
          <label className="flex h-[calc(var(--u)*64)] flex-1 items-center gap-[calc(var(--u)*20)] rounded-full bg-pill/80 px-[calc(var(--u)*24)]">
            <Search className="size-[calc(var(--u)*34)] shrink-0" strokeWidth={1.6} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, order ID or date..."
              aria-label="Search orders"
              className="min-w-0 flex-1 bg-transparent text-[calc(var(--u)*23)] outline-none placeholder:text-muted"
            />
          </label>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
            className="flex h-[calc(var(--u)*64)] w-[calc(var(--u)*205)] shrink-0 items-center justify-between rounded-full bg-pill/80 px-[calc(var(--u)*26)] text-[calc(var(--u)*25)]"
          >
            <SlidersHorizontal className="size-[calc(var(--u)*32)]" strokeWidth={1.6} />
            Filter
            <ChevronDown className={cn("size-[calc(var(--u)*30)] transition-transform", menu && "rotate-180")} strokeWidth={1.6} />
          </button>
          {menu && (
            <ul role="menu" className="absolute right-[calc(var(--u)*32)] top-[calc(var(--u)*76)] z-10 w-[calc(var(--u)*400)] rounded-[calc(var(--u)*24)] bg-white p-[calc(var(--u)*10)] shadow-[0_8px_30px_rgba(60,45,20,0.16)]">
              {SORTS.map((s) => (
                <li key={s.id} role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={sort === s.id}
                    onClick={() => { setSort(s.id); setMenu(false); }}
                    className="flex h-[calc(var(--u)*68)] w-full items-center justify-between rounded-[calc(var(--u)*16)] px-[calc(var(--u)*20)] text-left text-[calc(var(--u)*25)] active:bg-pill/70"
                  >
                    {s.label}
                    {sort === s.id && <Check className="size-[calc(var(--u)*30)] text-gold-dark" strokeWidth={2} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* orders */}
        <ul className="mt-[calc(var(--u)*24)] space-y-[calc(var(--u)*20)] px-[calc(var(--u)*38)]">
          {visible.map((o) => {
            const lines = orderLines(o);
            const first = lines[0]?.product;
            const st = STATUS_STYLE[o.status];
            const n = orderCount(o);
            return (
              <li key={o.id} className="relative flex items-stretch gap-[calc(var(--u)*30)] rounded-[calc(var(--u)*28)] bg-white/70 p-[calc(var(--u)*13)] shadow-[0_2px_14px_rgba(60,45,20,0.05)]">
                <Link href={`/orders/${o.id}`} aria-label={`View order ${o.id}`} className="absolute inset-0 rounded-[calc(var(--u)*28)]" />
                {first && (
                  <div className="relative w-[calc(var(--u)*162)] shrink-0 self-stretch overflow-hidden rounded-[calc(var(--u)*22)] bg-card">
                    <Image src={first.image} alt={first.name} fill sizes="120px" className="object-cover object-top" />
                  </div>
                )}
                <div className="min-w-0 flex-1 py-[calc(var(--u)*6)]">
                  <h2 className="text-[calc(var(--u)*26)] font-medium leading-tight">Order #{o.id}</h2>
                  <p className="mt-[calc(var(--u)*6)] text-[calc(var(--u)*22)] text-muted">Placed on {formatDate(o.placed)}</p>
                  <p className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*24)]">
                    {n} {n === 1 ? "item" : "items"} <span className="mx-[calc(var(--u)*8)] text-muted">|</span> {money(orderTotal(o))}
                  </p>
                  <div className="mt-[calc(var(--u)*10)] flex gap-[calc(var(--u)*10)]">
                    {lines.map(({ product }) => (
                      <span key={product.id} className="relative size-[calc(var(--u)*50)] overflow-hidden rounded-[calc(var(--u)*10)] bg-card">
                        <Image src={product.image} alt="" fill sizes="40px" className="object-cover object-top" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col justify-between py-[calc(var(--u)*6)] pr-[calc(var(--u)*6)]">
                  <div className="flex items-start justify-between gap-[calc(var(--u)*10)]">
                    <span className={cn("flex items-center gap-[calc(var(--u)*10)] rounded-full px-[calc(var(--u)*20)] py-[calc(var(--u)*8)] text-[calc(var(--u)*22)]", st.chip)}>
                      <st.Icon className="size-[calc(var(--u)*28)]" strokeWidth={1.6} />
                      {o.status}
                    </span>
                    <ChevronRight className="mt-[calc(var(--u)*6)] size-[calc(var(--u)*30)]" strokeWidth={1.8} />
                  </div>
                  <p className="text-[calc(var(--u)*21)] text-muted">{st.label} {formatDate(o.statusDate)}</p>
                  {o.status === "Delivered" && first ? (
                    <Link href={`/product/${first.id}`} className="relative z-10 grid h-[calc(var(--u)*52)] w-[calc(var(--u)*178)] place-items-center rounded-full border border-ink/70 text-[calc(var(--u)*23)]">
                      Buy Again
                    </Link>
                  ) : (
                    <Link
                      href={`/orders/${o.id}`}
                      className={cn(
                        "relative z-10 grid h-[calc(var(--u)*52)] w-[calc(var(--u)*178)] place-items-center rounded-full text-[calc(var(--u)*23)]",
                        o.status === "Shipped" ? "bg-gold-dark text-white" : "border border-ink/70",
                      )}
                    >
                      {o.status === "Shipped" ? "Track Order" : "View Details"}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 && (
          <p className="mt-[calc(var(--u)*120)] text-center font-display text-[calc(var(--u)*40)]">No orders found</p>
        )}

        <BottomNav active="/profile" cartCount={cartCount} />
      </main>
    </PhoneFrame>
  );
}
