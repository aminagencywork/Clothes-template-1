"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Banknote, Check, ChevronDown, CreditCard, Landmark, Smartphone, Tag, Wallet, X, type LucideIcon } from "lucide-react";
import { CheckoutShell, Radio, card, primaryBtn, primaryBtnStyle } from "./checkout-shell";
import { FOREST } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { BANKS, COUPONS, PAYMENTS, WALLETS, money, patchCheckout, useCheckout, useCheckoutTotals, type PaymentId } from "@/lib/checkout";

const ICONS: Record<PaymentId, LucideIcon> = { upi: Smartphone, card: CreditCard, netbanking: Landmark, wallet: Wallet, cod: Banknote };
const input = "h-[calc(var(--u)*76)] w-full rounded-[calc(var(--u)*16)] border border-black/10 bg-white px-[calc(var(--u)*22)] text-[calc(var(--u)*26)] outline-none focus:border-[#3a4a2e]";

export function CheckoutPaymentStep() {
  const router = useRouter();
  const s = useCheckout();
  const totals = useCheckoutTotals();
  const [code, setCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [card4, setCard4] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [error, setError] = useState("");

  const applyCoupon = () => {
    const c = code.trim().toUpperCase();
    if (!c) return;
    if (COUPONS[c]) {
      patchCheckout({ coupon: c });
      setCode("");
      setCouponMsg("");
    } else {
      setCouponMsg("Invalid coupon code");
    }
  };

  const next = () => {
    setError("");
    if (s.payment === "upi" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(s.upiId.trim())) return setError("Enter a valid UPI ID, e.g. name@bank");
    if (s.payment === "netbanking" && !s.bank) return setError("Select your bank");
    if (s.payment === "wallet" && !s.wallet) return setError("Select a wallet");
    if (s.payment === "card") {
      const digits = card4.number.replace(/\s/g, "");
      if (!/^\d{16}$/.test(digits)) return setError("Enter a valid 16-digit card number");
      if (!card4.name.trim()) return setError("Enter the name on the card");
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card4.expiry)) return setError("Enter expiry as MM/YY");
      if (!/^\d{3,4}$/.test(card4.cvv)) return setError("Enter a valid CVV");
      patchCheckout({ cardLast4: digits.slice(-4) });
    }
    router.push("/checkout/review");
  };

  return (
    <CheckoutShell step={3} back={() => router.push("/checkout/delivery")}>
      <h2 className="font-display text-[calc(var(--u)*38)]">Payment Method</h2>

      <div className="mt-[calc(var(--u)*22)] space-y-[calc(var(--u)*16)]" role="radiogroup" aria-label="Payment methods">
        {PAYMENTS.map((p) => {
          const on = s.payment === p.id;
          const Icon = ICONS[p.id];
          return (
            <div key={p.id} className={cn(card, "border px-[calc(var(--u)*26)] py-[calc(var(--u)*24)] transition-colors", on ? "bg-pill/80" : "border-transparent")} style={on ? { borderColor: "rgba(58,74,46,0.4)" } : undefined}>
              <div
                role="radio"
                aria-checked={on}
                tabIndex={0}
                onClick={() => { patchCheckout({ payment: p.id }); setError(""); }}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), patchCheckout({ payment: p.id }))}
                className="flex cursor-pointer items-center gap-[calc(var(--u)*24)]"
              >
                <Radio on={on} />
                <Icon className="size-[calc(var(--u)*58)] shrink-0" strokeWidth={1.3} />
                <div className="min-w-0 flex-1 text-[calc(var(--u)*23)] leading-[1.45] text-muted">
                  <p className="text-[calc(var(--u)*27)] font-medium text-ink">{p.title}</p>
                  <p>{p.sub}</p>
                </div>
                <ChevronDown className={cn("size-[calc(var(--u)*36)] transition-transform", on && "rotate-180")} strokeWidth={1.6} />
              </div>

              {on && p.id === "upi" && (
                <input value={s.upiId} onChange={(e) => patchCheckout({ upiId: e.target.value })} placeholder="yourname@bank" aria-label="UPI ID" className={cn(input, "mt-[calc(var(--u)*20)]")} />
              )}
              {on && p.id === "card" && (
                <div className="mt-[calc(var(--u)*20)] space-y-[calc(var(--u)*14)]">
                  <input value={card4.number} onChange={(e) => setCard4({ ...card4, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })} placeholder="Card number" inputMode="numeric" autoComplete="cc-number" aria-label="Card number" className={input} />
                  <input value={card4.name} onChange={(e) => setCard4({ ...card4, name: e.target.value })} placeholder="Name on card" autoComplete="cc-name" aria-label="Name on card" className={input} />
                  <div className="flex gap-[calc(var(--u)*14)]">
                    <input value={card4.expiry} onChange={(e) => setCard4({ ...card4, expiry: e.target.value.replace(/[^\d/]/g, "").slice(0, 5) })} placeholder="MM/YY" autoComplete="cc-exp" aria-label="Expiry" className={input} />
                    <input value={card4.cvv} onChange={(e) => setCard4({ ...card4, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="CVV" type="password" inputMode="numeric" autoComplete="cc-csc" aria-label="CVV" className={input} />
                  </div>
                </div>
              )}
              {on && p.id === "netbanking" && (
                <select value={s.bank} onChange={(e) => patchCheckout({ bank: e.target.value })} aria-label="Bank" className={cn(input, "mt-[calc(var(--u)*20)]")}>
                  <option value="">Select your bank</option>
                  {BANKS.map((b) => <option key={b}>{b}</option>)}
                </select>
              )}
              {on && p.id === "wallet" && (
                <select value={s.wallet} onChange={(e) => patchCheckout({ wallet: e.target.value })} aria-label="Wallet" className={cn(input, "mt-[calc(var(--u)*20)]")}>
                  <option value="">Select a wallet</option>
                  {WALLETS.map((w) => <option key={w}>{w}</option>)}
                </select>
              )}
              {on && p.id === "cod" && (
                <p className="mt-[calc(var(--u)*18)] text-[calc(var(--u)*24)] text-muted">Pay in cash when your order arrives. Please keep the exact amount ready.</p>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="font-display mt-[calc(var(--u)*32)] text-[calc(var(--u)*34)]">Apply Coupon</h2>
      <div className={cn(card, "mt-[calc(var(--u)*16)] flex h-[calc(var(--u)*84)] items-center gap-[calc(var(--u)*18)] pl-[calc(var(--u)*22)] pr-[calc(var(--u)*10)]")}>
        <Tag className="size-[calc(var(--u)*34)] shrink-0" strokeWidth={1.5} />
        <input value={code} onChange={(e) => { setCode(e.target.value); setCouponMsg(""); }} onKeyDown={(e) => e.key === "Enter" && applyCoupon()} placeholder="Enter coupon code" aria-label="Coupon code" className="min-w-0 flex-1 bg-transparent text-[calc(var(--u)*25)] uppercase outline-none placeholder:normal-case placeholder:text-muted" />
        <button type="button" onClick={applyCoupon} className="h-[calc(var(--u)*64)] rounded-[calc(var(--u)*16)] px-[calc(var(--u)*36)] text-[calc(var(--u)*25)] text-white" style={{ background: FOREST }}>Apply</button>
      </div>
      {couponMsg && <p role="alert" className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*24)] text-[#a8322f]">{couponMsg}</p>}
      {s.coupon && (
        <div className="mt-[calc(var(--u)*16)] flex items-center gap-[calc(var(--u)*18)] rounded-[calc(var(--u)*20)] bg-[#e3f2e3] px-[calc(var(--u)*24)] py-[calc(var(--u)*18)]">
          <span className="grid size-[calc(var(--u)*44)] shrink-0 place-items-center rounded-full bg-[#2d8a4a] text-white"><Check className="size-[calc(var(--u)*28)]" strokeWidth={3} /></span>
          <div className="flex-1 text-[calc(var(--u)*23)] text-[#2d6a3a]">
            <p className="text-[calc(var(--u)*26)] font-semibold">Coupon applied! ({s.coupon})</p>
            <p>You saved {money(totals.discount)}</p>
          </div>
          <button type="button" aria-label="Remove coupon" onClick={() => patchCheckout({ coupon: null })}><X className="size-[calc(var(--u)*30)] text-[#2d6a3a]" /></button>
        </div>
      )}

      {error && <p role="alert" className="mt-[calc(var(--u)*20)] text-[calc(var(--u)*25)] text-[#a8322f]">{error}</p>}

      <button type="button" onClick={next} className={cn(primaryBtn, "mt-[calc(var(--u)*24)]")} style={primaryBtnStyle}>
        Continue to Review <ArrowRight className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />
      </button>
    </CheckoutShell>
  );
}
