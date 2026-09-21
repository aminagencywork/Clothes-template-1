"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { CheckoutShell, Radio, card, editLink, primaryBtn } from "./checkout-shell";
import { cn } from "@/lib/utils";
import { addressLines, patchCheckout, saveAddress, useAddresses, useCheckout, type Address } from "@/lib/checkout";

const input = "h-[calc(var(--u)*80)] w-full rounded-[calc(var(--u)*18)] border border-black/10 bg-white/80 px-[calc(var(--u)*24)] text-[calc(var(--u)*27)] outline-none focus:border-gold-dark";
const EMPTY: Address = { id: "", label: "Home", name: "", line1: "", line2: "", city: "", state: "", pin: "", country: "India" };

function AddressForm({ initial, onDone }: { initial: Address; onDone: (saved?: Address) => void }) {
  const [a, setA] = useState(initial);
  const set = (k: keyof Address, v: string | boolean) => setA((x) => ({ ...x, [k]: v }));
  const valid = a.name.trim() && a.line1.trim() && a.city.trim() && /^\d{6}$/.test(a.pin);

  const save = () => {
    if (!valid) return;
    const next = { ...a, id: a.id || `addr-${Date.now()}` };
    saveAddress(next);
    onDone(next);
  };

  return (
    <div className={cn(card, "space-y-[calc(var(--u)*18)] p-[calc(var(--u)*28)]")}>
      <h3 className="font-display text-[calc(var(--u)*36)]">{initial.id ? "Edit Address" : "Add New Address"}</h3>
      <select value={a.label} onChange={(e) => set("label", e.target.value)} aria-label="Address type" className={input}>
        <option>Home</option>
        <option>Office</option>
        <option>Other</option>
      </select>
      <input value={a.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" aria-label="Full name" className={input} />
      <input value={a.line1} onChange={(e) => set("line1", e.target.value)} placeholder="House no., street, area" aria-label="Address line 1" className={input} />
      <input value={a.line2} onChange={(e) => set("line2", e.target.value)} placeholder="Landmark (optional)" aria-label="Address line 2" className={input} />
      <div className="flex gap-[calc(var(--u)*16)]">
        <input value={a.city} onChange={(e) => set("city", e.target.value)} placeholder="City" aria-label="City" className={input} />
        <input value={a.state} onChange={(e) => set("state", e.target.value)} placeholder="State" aria-label="State" className={input} />
      </div>
      <div className="flex gap-[calc(var(--u)*16)]">
        <input value={a.pin} onChange={(e) => set("pin", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="PIN code" inputMode="numeric" aria-label="PIN code" className={input} />
        <input value={a.country} onChange={(e) => set("country", e.target.value)} placeholder="Country" aria-label="Country" className={input} />
      </div>
      <label className="flex items-center gap-[calc(var(--u)*16)] text-[calc(var(--u)*25)]">
        <input type="checkbox" checked={!!a.isDefault} onChange={(e) => set("isDefault", e.target.checked)} className="size-[calc(var(--u)*32)] accent-[#7a5a2e]" />
        Make this my default address
      </label>
      <div className="flex gap-[calc(var(--u)*16)] pt-[calc(var(--u)*6)]">
        <button type="button" onClick={() => onDone()} className="h-[calc(var(--u)*88)] flex-1 rounded-[calc(var(--u)*22)] border border-black/15 text-[calc(var(--u)*27)]">Cancel</button>
        <button type="button" onClick={save} disabled={!valid} className="h-[calc(var(--u)*88)] flex-1 rounded-[calc(var(--u)*22)] bg-gold-dark text-[calc(var(--u)*27)] text-white disabled:opacity-50">Save Address</button>
      </div>
    </div>
  );
}

export function CheckoutAddressStep() {
  const router = useRouter();
  const addresses = useAddresses();
  const { addressId } = useCheckout();
  const [editing, setEditing] = useState<Address | null>(null);

  // Fall back to the default (or first) address if the stored selection no longer exists.
  const selected = addresses.find((a) => a.id === addressId) ?? addresses.find((a) => a.isDefault) ?? addresses[0];

  return (
    <CheckoutShell step={1} back={() => router.push("/cart")}>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[calc(var(--u)*38)]">Saved Addresses</h2>
        <button type="button" onClick={() => setEditing(EMPTY)} className="flex items-center gap-[calc(var(--u)*8)] text-[calc(var(--u)*27)] text-gold-dark">
          <Plus className="size-[calc(var(--u)*30)]" strokeWidth={1.8} /> Add New
        </button>
      </div>

      <div className="mt-[calc(var(--u)*22)] space-y-[calc(var(--u)*20)]">
        {editing && (
          <AddressForm
            key={editing.id || "new"}
            initial={editing}
            onDone={(saved) => {
              setEditing(null);
              if (saved) patchCheckout({ addressId: saved.id });
            }}
          />
        )}
        {addresses.map((a) => {
          const on = selected?.id === a.id;
          const [name, l1, l2, country] = addressLines(a);
          return (
            <div
              key={a.id}
              role="radio"
              aria-checked={on}
              tabIndex={0}
              onClick={() => patchCheckout({ addressId: a.id })}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), patchCheckout({ addressId: a.id }))}
              className={cn(card, "flex cursor-pointer gap-[calc(var(--u)*22)] border p-[calc(var(--u)*28)] transition-colors", on ? "border-gold-dark/40 bg-pill/80" : "border-transparent")}
            >
              <div className="pt-[calc(var(--u)*6)]"><Radio on={on} /></div>
              <div className="min-w-0 flex-1 text-[calc(var(--u)*26)] leading-[1.5] text-muted">
                <div className="flex items-center gap-[calc(var(--u)*14)]">
                  <b className="text-[calc(var(--u)*32)] font-semibold text-ink">{a.label}</b>
                  {a.isDefault && <span className="rounded-full bg-black/[0.07] px-[calc(var(--u)*16)] py-[calc(var(--u)*4)] text-[calc(var(--u)*21)] text-ink">Default</span>}
                </div>
                <p className="mt-[calc(var(--u)*8)] text-ink">{name}</p>
                <p>{l1}</p>
                <p>{l2}</p>
                <p>{country}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(a);
                }}
                className={cn(editLink, "self-start")}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={() => {
          patchCheckout({ addressId: selected.id });
          router.push("/checkout/delivery");
        }}
        className={cn(primaryBtn, "mt-[calc(var(--u)*30)]")}
      >
        Continue to Delivery <ArrowRight className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />
      </button>
    </CheckoutShell>
  );
}
