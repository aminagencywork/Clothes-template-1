"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Check, ChevronLeft, ClipboardCheck, CreditCard, MapPin, Truck, type LucideIcon } from "lucide-react";
import { FOREST } from "@/lib/theme";
import { PhoneFrame } from "./phone-frame";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

const STEPS: { label: string; Icon: LucideIcon; title: string }[] = [
  { label: "Address", Icon: MapPin, title: "Delivery Address" },
  { label: "Delivery", Icon: Truck, title: "Delivery Options" },
  { label: "Payment", Icon: CreditCard, title: "Payment Method" },
  { label: "Review", Icon: ClipboardCheck, title: "Review Order" },
];

export const primaryBtn =
  "flex h-[calc(var(--u)*100)] w-full items-center justify-center gap-[calc(var(--u)*20)] rounded-[calc(var(--u)*24)] text-[calc(var(--u)*30)] font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-60";
export const primaryBtnStyle = { background: FOREST };
export const card = "rounded-[calc(var(--u)*28)] bg-white/70 shadow-[0_2px_14px_rgba(60,45,20,0.05)]";
export const editLink = "text-[calc(var(--u)*25)] text-ink/70 underline underline-offset-4";

/** Shared frame for checkout steps 1-4: back button, logo, title, step counter and the progress tracker. */
export function CheckoutShell({ step, back, children }: { step: 1 | 2 | 3 | 4; back: () => void; children: ReactNode }) {
  const router = useRouter();
  const cartEmpty = useCart().length === 0;

  useEffect(() => {
    if (cartEmpty) router.replace("/cart");
  }, [cartEmpty, router]);

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*40)] pb-[calc(var(--u)*80)] pt-[calc(var(--u)*70)]">
        <header className="relative flex items-start justify-center">
          <button type="button" aria-label="Back" onClick={back} className="absolute left-0 top-[calc(var(--u)*14)] grid size-[calc(var(--u)*72)] place-items-center">
            <ChevronLeft className="size-[calc(var(--u)*50)]" strokeWidth={1.6} />
          </button>
          <Image src="/images/navbar-logo.png" alt="Vyntra – wear a brighter you" width={900} height={519} priority className="h-[calc(var(--u)*84)] w-auto" />
        </header>

        <div className="mt-[calc(var(--u)*24)] px-[calc(var(--u)*10)]">
          <h1 className="font-display text-[calc(var(--u)*62)] leading-none">Checkout</h1>
          <p className="mt-[calc(var(--u)*16)] text-[calc(var(--u)*28)] text-muted">Step {step} of 4 • {STEPS[step - 1].title}</p>
        </div>

        <ol className="mt-[calc(var(--u)*34)] flex items-start px-[calc(var(--u)*6)]" aria-label="Checkout progress">
          {STEPS.map(({ label, Icon }, i) => {
            const n = i + 1;
            const done = n < step || (step === 4 && n === 4);
            const current = n === step && !done;
            return (
              <li key={label} className="relative flex flex-1 flex-col items-center" aria-current={current ? "step" : undefined}>
                {i > 0 && (
                  <span className={cn("absolute right-1/2 top-[calc(var(--u)*33)] h-[calc(var(--u)*3)] w-full", n > step && "bg-black/10")} style={n <= step ? { background: FOREST } : undefined} />
                )}
                <span
                  className={cn(
                    "relative z-10 grid size-[calc(var(--u)*68)] place-items-center rounded-full",
                    done || current ? "text-white" : "bg-page text-muted",
                  )}
                  style={done || current ? { background: FOREST } : undefined}
                >
                  {done ? <Check className="size-[calc(var(--u)*36)]" strokeWidth={2.6} /> : <Icon className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />}
                </span>
                <span className={cn("mt-[calc(var(--u)*12)] text-[calc(var(--u)*23)]", n <= step ? "text-ink" : "text-muted")}>{label}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-[calc(var(--u)*36)]">{children}</div>
      </main>
    </PhoneFrame>
  );
}

export function Radio({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="grid size-[calc(var(--u)*40)] shrink-0 place-items-center rounded-full text-white" style={{ background: FOREST }}>
        <Check className="size-[calc(var(--u)*24)]" strokeWidth={3} />
      </span>
    );
  }
  return <span className="size-[calc(var(--u)*40)] shrink-0 rounded-full border-2 border-black/25" />;
}
