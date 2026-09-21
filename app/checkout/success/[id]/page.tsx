import { OrderSuccessScreen } from "@/components/order-success-screen";

export default async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderSuccessScreen id={id} />;
}
