"use client";

import Link from "next/link";
import { OrderDetailScreen } from "./order-detail-screen";
import { PhoneFrame } from "./phone-frame";
import { usePlacedOrders } from "@/lib/placed-orders";

/** Order detail for orders placed through checkout (stored in the browser, so looked up client-side). */
export function PlacedOrderDetail({ id }: { id: string }) {
  const order = usePlacedOrders().find((o) => o.id === id);
  if (order) return <OrderDetailScreen order={order} />;
  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*44)] pt-[calc(var(--u)*300)] text-center">
        <p className="font-display text-[calc(var(--u)*44)]">Order not found</p>
        <p className="mt-[calc(var(--u)*16)] text-[calc(var(--u)*26)] text-muted">This order isn&apos;t saved on this device.</p>
        <Link href="/orders" className="mt-[calc(var(--u)*40)] inline-block rounded-full bg-gold-dark px-[calc(var(--u)*50)] py-[calc(var(--u)*24)] text-[calc(var(--u)*28)] text-white">View all orders</Link>
      </main>
    </PhoneFrame>
  );
}
