"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays, PackageCheck, Truck, Zap, type LucideIcon } from "lucide-react";
import { CheckoutShell, Radio, card, editLink, primaryBtn } from "./checkout-shell";
import { cn } from "@/lib/utils";
import { DELIVERY, addDays, addressLines, deliveryEta, formatDay, isoDate, money, patchCheckout, useAddresses, useCheckout, type DeliveryId } from "@/lib/checkout";

const ICONS: Record<DeliveryId, LucideIcon> = { standard: Truck, express: Zap, scheduled: CalendarDays };

export function CheckoutDeliveryStep() {
  const router = useRouter();
  const addresses = useAddresses();
  const s = useCheckout();
  const address = addresses.find((a) => a.id === s.addressId) ?? addresses[0];
  const needsDate = s.delivery === "scheduled" && !s.scheduledDate;

  return (
    <CheckoutShell step={2} back={() => router.push("/checkout/address")}>
      <h2 className="font-display text-[calc(var(--u)*38)]">Delivery Options</h2>

      <div className="mt-[calc(var(--u)*22)] space-y-[calc(var(--u)*20)]" role="radiogroup" aria-label="Delivery options">
        {DELIVERY.map((d) => {
          const on = s.delivery === d.id;
          const Icon = ICONS[d.id] ?? PackageCheck;
          return (
            <div key={d.id} className={cn(card, "border p-[calc(var(--u)*28)] transition-colors", on ? "border-gold-dark/40 bg-pill/80" : "border-transparent")}>
              <div
                role="radio"
                aria-checked={on}
                tabIndex={0}
                onClick={() => patchCheckout({ delivery: d.id })}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), patchCheckout({ delivery: d.id }))}
                className="flex cursor-pointer items-center gap-[calc(var(--u)*24)]"
              >
                <Radio on={on} />
                <Icon className="size-[calc(var(--u)*64)] shrink-0 text-ink" strokeWidth={1.3} />
                <div className="min-w-0 flex-1 text-[calc(var(--u)*25)] leading-[1.5] text-muted">
                  <p className="text-[calc(var(--u)*29)] font-medium text-ink">{d.title}</p>
                  {d.id === "scheduled" ? (
                    <p>{s.scheduledDate ? `Delivery on ${formatDay(deliveryEta(d.id, s.scheduledDate))}` : d.sub}</p>
                  ) : (
                    <>
                      <p>Delivery by {formatDay(addDays(d.days))}</p>
                      <p>{d.sub}</p>
                    </>
                  )}
                </div>
                <span className="self-start text-[calc(var(--u)*27)] font-medium">{d.fee ? money(d.fee) : "Free"}</span>
              </div>
              {on && d.id === "scheduled" && (
                <label className="mt-[calc(var(--u)*20)] flex items-center gap-[calc(var(--u)*16)] text-[calc(var(--u)*25)] text-muted">
                  Pick a date
                  <input
                    type="date"
                    value={s.scheduledDate}
                    min={isoDate(addDays(2))}
                    max={isoDate(addDays(30))}
                    onChange={(e) => patchCheckout({ scheduledDate: e.target.value })}
                    className="h-[calc(var(--u)*70)] flex-1 rounded-[calc(var(--u)*16)] border border-black/10 bg-white px-[calc(var(--u)*20)] text-[calc(var(--u)*26)] text-ink outline-none"
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {address && (
        <section className={cn(card, "mt-[calc(var(--u)*24)] p-[calc(var(--u)*28)]")}>
          <p className="text-[calc(var(--u)*24)] text-muted">Items will be delivered to:</p>
          <div className="mt-[calc(var(--u)*14)] flex justify-between gap-[calc(var(--u)*16)]">
            <div className="text-[calc(var(--u)*26)] leading-[1.5] text-muted">
              <b className="block text-[calc(var(--u)*30)] font-semibold text-ink">{addressLines(address)[0]}</b>
              {addressLines(address).slice(1).map((l) => <p key={l}>{l}</p>)}
            </div>
            <button type="button" onClick={() => router.push("/checkout/address")} className={cn(editLink, "self-start")}>Edit</button>
          </div>
        </section>
      )}

      <button type="button" disabled={needsDate} onClick={() => router.push("/checkout/payment")} className={cn(primaryBtn, "mt-[calc(var(--u)*30)]")}>
        {needsDate ? "Choose a delivery date" : <>Continue to Payment <ArrowRight className="size-[calc(var(--u)*34)]" strokeWidth={1.6} /></>}
      </button>
    </CheckoutShell>
  );
}
