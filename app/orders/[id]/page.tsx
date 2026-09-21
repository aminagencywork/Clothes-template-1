import { notFound } from "next/navigation";
import { OrderDetailScreen } from "@/components/order-detail-screen";
import { PlacedOrderDetail } from "@/components/placed-order-detail";
import { orders } from "@/lib/orders";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) {
    // Orders placed through checkout live in the browser; look them up client-side.
    if (id.startsWith("VNTR")) return <PlacedOrderDetail id={id} />;
    notFound();
  }
  return <OrderDetailScreen order={order} />;
}
