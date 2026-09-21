"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckoutShell, card, editLink } from "./checkout-shell";
import { SlideToPlace } from "./slide-to-place";
import { cn } from "@/lib/utils";
import { DELIVERY, addressLines, deliveryEta, formatDay, isoDate, money, newOrderId, paymentSummary, useAddresses, useCheckout, useCheckoutTotals } from "@/lib/checkout";
import { addPlacedOrder } from "@/lib/placed-orders";
import { useProfile } from "@/lib/profile";

const Head = ({ title, href }: { title: string; href: string }) => (
  <div className="flex items-center justify-between">
    <h2 className="font-display text-[calc(var(--u)*34)]">{title}</h2>
    <Link href={href} className={editLink}>Edit</Link>
  </div>
);

export function CheckoutReviewStep() {
  const router = useRouter();
  const s = useCheckout();
  const t = useCheckoutTotals();
  const addresses = useAddresses();
  const { email } = useProfile();
  const address = addresses.find((a) => a.id === s.addressId) ?? addresses[0];
  const delivery = DELIVERY.find((d) => d.id === s.delivery)!;
  const eta = deliveryEta(s.delivery, s.scheduledDate);
  const pay = paymentSummary(s);

  const place = () => {
    if (!address || t.lines.length === 0) return;
    const id = newOrderId();
    addPlacedOrder({
      id,
      placed: isoDate(new Date()),
      status: "Processing",
      statusDate: isoDate(eta),
      items: t.lines.map((l) => ({ productId: l.product.id, qty: l.it.qty })),
      discount: t.discount,
      shipping: t.shipping,
      address,
      deliveryTitle: `${delivery.title} (${delivery.fee ? money(delivery.fee) : "Free"})`,
      paymentTitle: pay.title,
      paymentDetail: pay.detail,
      email,
    });
    router.push(`/checkout/success/${id}`);
  };

  return (
    <CheckoutShell step={4} back={() => router.push("/checkout/payment")}>
      <Head title={`Order Items (${t.count})`} href="/cart" />
      <ul className="mt-[calc(var(--u)*20)] space-y-[calc(var(--u)*16)]">
        {t.lines.map(({ it, product }) => (
          <li key={`${it.productId}|${it.size}|${it.color}`} className="flex items-center gap-[calc(var(--u)*22)]">
            <div className="relative size-[calc(var(--u)*104)] shrink-0 overflow-hidden rounded-[calc(var(--u)*16)] bg-card">
              <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover object-top" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[calc(var(--u)*27)]">{product.name}</p>
              <p className="mt-[calc(var(--u)*6)] text-[calc(var(--u)*21)] text-muted">Size: {it.size} &nbsp;|&nbsp; Color: {it.colorName} &nbsp;|&nbsp; Qty: {it.qty}</p>
            </div>
            <span className="text-[calc(var(--u)*27)] font-medium">{money(product.price * it.qty)}</span>
          </li>
        ))}
      </ul>

      {address && (
        <section className="mt-[calc(var(--u)*30)]">
          <Head title="Delivery Address" href="/checkout/address" />
          <div className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*26)] leading-[1.5] text-muted">
            <b className="block font-semibold text-ink">{addressLines(address)[0]}</b>
            {addressLines(address).slice(1).map((l) => <p key={l}>{l}</p>)}
          </div>
        </section>
      )}

      <section className="mt-[calc(var(--u)*28)] border-t border-black/[0.07] pt-[calc(var(--u)*24)]">
        <Head title="Delivery Method" href="/checkout/delivery" />
        <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*27)]">{delivery.title} ({delivery.fee ? money(delivery.fee) : "Free"})</p>
        <p className="text-[calc(var(--u)*24)] text-muted">Delivery by {formatDay(eta)}</p>
      </section>

      <section className="mt-[calc(var(--u)*28)] border-t border-black/[0.07] pt-[calc(var(--u)*24)]">
        <Head title="Payment Method" href="/checkout/payment" />
        <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*27)]">{pay.title}</p>
        {pay.detail && <p className="text-[calc(var(--u)*24)] text-muted">{pay.detail}</p>}
      </section>

      <section className={cn(card, "mt-[calc(var(--u)*28)] p-[calc(var(--u)*26)]")}>
        <h2 className="font-display text-[calc(var(--u)*34)]">Price Details</h2>
        <dl className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*27)]">
          <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Subtotal ({t.count} {t.count === 1 ? "item" : "items"})</dt><dd>{money(t.subtotal)}</dd></div>
          {s.coupon && <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Discount (Coupon)</dt><dd className="text-[#3f7a4a]">-{money(t.discount)}</dd></div>}
          <div className="flex justify-between py-[calc(var(--u)*7)]"><dt className="text-muted">Shipping</dt><dd>{t.shipping ? money(t.shipping) : "Free"}</dd></div>
        </dl>
        <div className="mt-[calc(var(--u)*10)] flex items-center justify-between border-t border-black/[0.07] pt-[calc(var(--u)*18)]">
          <span className="text-[calc(var(--u)*33)] font-semibold">Total</span>
          <span className="text-[calc(var(--u)*38)] font-semibold">{money(t.total)}</span>
        </div>
      </section>

      <SlideToPlace onConfirm={place} disabled={!address || t.lines.length === 0} />
      <p className="mt-[calc(var(--u)*18)] text-center text-[calc(var(--u)*21)] leading-[1.5] text-muted">
        By placing this order, you agree to our <u>Terms &amp; Conditions</u><br />and <u>Privacy Policy</u>.
      </p>
    </CheckoutShell>
  );
}
