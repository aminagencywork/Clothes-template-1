"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { useCart } from "@/lib/cart";
import { shop } from "@/lib/shop";
import { AMBER, AMBER_LIGHT, FOREST } from "@/lib/theme";

export function AddressScreen() {
  const router = useRouter();
  const cartCount = useCart().reduce((n, i) => n + i.qty, 0);
  const q = encodeURIComponent(shop.address);

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*40)] pb-[calc(var(--u)*240)] pt-[calc(var(--u)*60)]">
        <header className="flex items-center justify-between">
          <button type="button" aria-label="Back" onClick={() => router.back()} className="grid size-[calc(var(--u)*92)] place-items-center rounded-full" style={{ background: AMBER_LIGHT }}>
            <ArrowLeft className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
          </button>
          <div className="text-center">
            <h1 className="font-display text-[calc(var(--u)*54)] leading-none" style={{ color: AMBER }}>Our Store</h1>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*25)] text-muted">Visit us in person</p>
          </div>
          <span className="size-[calc(var(--u)*92)]" />
        </header>

        <div className="mt-[calc(var(--u)*36)] h-[calc(var(--u)*640)] overflow-hidden rounded-[calc(var(--u)*30)] bg-card shadow-[0_4px_24px_rgba(60,45,20,0.08)]">
          <iframe
            title={`Map of ${shop.name}`}
            src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>

        <section className="mt-[calc(var(--u)*30)] rounded-[calc(var(--u)*30)] bg-white p-[calc(var(--u)*34)] shadow-[0_4px_24px_rgba(60,45,20,0.05)]">
          <h2 className="font-display text-[calc(var(--u)*44)] leading-tight">{shop.name}</h2>
          <ul className="mt-[calc(var(--u)*24)] space-y-[calc(var(--u)*22)] text-[calc(var(--u)*27)]">
            <li className="flex gap-[calc(var(--u)*20)]"><MapPin className="mt-[calc(var(--u)*4)] size-[calc(var(--u)*36)] shrink-0" style={{ color: FOREST }} strokeWidth={1.6} />{shop.address}</li>
            <li className="flex gap-[calc(var(--u)*20)]"><Phone className="size-[calc(var(--u)*36)] shrink-0" style={{ color: FOREST }} strokeWidth={1.6} />{shop.phone}</li>
            <li className="flex gap-[calc(var(--u)*20)]"><Clock className="size-[calc(var(--u)*36)] shrink-0" style={{ color: FOREST }} strokeWidth={1.6} />{shop.hours}</li>
          </ul>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[calc(var(--u)*30)] flex h-[calc(var(--u)*88)] items-center justify-center gap-[calc(var(--u)*14)] rounded-full text-[calc(var(--u)*27)] font-medium text-white"
            style={{ background: FOREST }}
          >
            <Navigation className="size-[calc(var(--u)*34)]" strokeWidth={1.7} /> Get Directions
          </a>
        </section>

        <BottomNav active="/profile" cartCount={cartCount} />
      </main>
    </PhoneFrame>
  );
}
