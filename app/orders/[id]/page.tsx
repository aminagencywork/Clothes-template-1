import { notFound } from "next/navigation";
import { OrderDetailScreen } from "@/components/order-detail-screen";
import { orders } from "@/lib/orders";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();
  return <OrderDetailScreen order={order} />;
}
