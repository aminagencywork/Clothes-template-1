"use client";

import { useMemo } from "react";
import { useCart } from "./cart";
import { products } from "./products";
import { createStore } from "./store";

/* ---------- addresses ---------- */
export type Address = { id: string; label: string; name: string; line1: string; line2: string; city: string; state: string; pin: string; country: string; isDefault?: boolean };

const SEED_ADDRESSES: Address[] = [
  { id: "home", label: "Home", name: "Ibrahim Popatiya", line1: "12-3-456, Shaikpet", line2: "", city: "Hyderabad", state: "Telangana", pin: "500008", country: "India", isDefault: true },
  { id: "office", label: "Office", name: "Ibrahim Popatiya", line1: "Plot No. 18, Raidurgam", line2: "", city: "Hyderabad", state: "Telangana", pin: "500032", country: "India" },
  { id: "other", label: "Other", name: "Ibrahim Popatiya", line1: "Hitech City", line2: "", city: "Hyderabad", state: "", pin: "500081", country: "India" },
];

export const addressStore = createStore<Address[]>("checkout-addresses", SEED_ADDRESSES);
export const useAddresses = addressStore.use;

export function saveAddress(a: Address) {
  const list = addressStore.get();
  const exists = list.some((x) => x.id === a.id);
  let next = exists ? list.map((x) => (x.id === a.id ? a : x)) : [...list, a];
  if (a.isDefault) next = next.map((x) => ({ ...x, isDefault: x.id === a.id }));
  addressStore.set(next);
}

export const addressLines = (a: Address) => [
  a.name,
  [a.line1, a.line2].filter(Boolean).join(", "),
  [`${a.city}${a.state ? `, ${a.state}` : ""}`, a.pin].filter(Boolean).join(" "),
  a.country,
];

/* ---------- delivery ---------- */
export type DeliveryId = "standard" | "express" | "scheduled";
export const DELIVERY: { id: DeliveryId; title: string; fee: number; days: number; sub: string }[] = [
  { id: "standard", title: "Standard Delivery", fee: 0, days: 5, sub: "3-5 business days" },
  { id: "express", title: "Express Delivery", fee: 12, days: 2, sub: "1-2 business days" },
  { id: "scheduled", title: "Scheduled Delivery", fee: 0, days: 7, sub: "Choose a convenient date" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDay = (d: Date) => `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
export const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};
export const isoDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function deliveryEta(id: DeliveryId, scheduledDate: string): Date {
  if (id === "scheduled" && scheduledDate) return new Date(`${scheduledDate}T00:00:00`);
  return addDays(DELIVERY.find((d) => d.id === id)!.days);
}

/* ---------- payment ---------- */
export type PaymentId = "upi" | "card" | "netbanking" | "wallet" | "cod";
export const PAYMENTS: { id: PaymentId; title: string; sub: string }[] = [
  { id: "upi", title: "UPI (Recommended)", sub: "Pay using any UPI app" },
  { id: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
  { id: "netbanking", title: "Net Banking", sub: "All major banks" },
  { id: "wallet", title: "Wallets", sub: "Paytm, Amazon Pay, PhonePe" },
  { id: "cod", title: "Cash on Delivery", sub: "Pay at your doorstep" },
];
export const BANKS = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"];
export const WALLETS = ["Paytm", "Amazon Pay", "PhonePe", "Google Pay"];

/** Human label + detail for the review / order screens. */
export function paymentSummary(s: CheckoutState): { title: string; detail: string } {
  switch (s.payment) {
    case "upi": return { title: "UPI", detail: s.upiId };
    case "card": return { title: "Credit / Debit Card", detail: s.cardLast4 ? `•••• •••• •••• ${s.cardLast4}` : "" };
    case "netbanking": return { title: "Net Banking", detail: s.bank };
    case "wallet": return { title: "Wallet", detail: s.wallet };
    default: return { title: "Cash on Delivery", detail: "Pay at your doorstep" };
  }
}

/* ---------- coupon ---------- */
export const COUPONS: Record<string, number> = { VYNTRA10: 0.1, WELCOME15: 0.15 };

/* ---------- checkout selections ---------- */
export type CheckoutState = {
  addressId: string;
  delivery: DeliveryId;
  scheduledDate: string;
  payment: PaymentId;
  upiId: string;
  cardLast4: string;
  bank: string;
  wallet: string;
  coupon: string | null;
};

export const DEFAULT_CHECKOUT: CheckoutState = {
  addressId: "home",
  delivery: "standard",
  scheduledDate: "",
  payment: "upi",
  upiId: "ibrahim@okhdfcbank",
  cardLast4: "",
  bank: "",
  wallet: "",
  coupon: "VYNTRA10",
};

export const checkoutStore = createStore<CheckoutState>("checkout-state", DEFAULT_CHECKOUT);
export const useCheckout = checkoutStore.use;
export const patchCheckout = (p: Partial<CheckoutState>) => checkoutStore.set({ ...checkoutStore.get(), ...p });

/* ---------- totals ---------- */
export function useCheckoutTotals() {
  const cart = useCart();
  const s = useCheckout();
  return useMemo(() => {
    const lines = cart.flatMap((it) => {
      const product = products.find((p) => p.id === it.productId);
      return product ? [{ it, product }] : [];
    });
    const count = lines.reduce((n, l) => n + l.it.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.product.price * l.it.qty, 0);
    const rate = s.coupon ? COUPONS[s.coupon] ?? 0 : 0;
    const discount = subtotal * rate;
    const shipping = lines.length ? DELIVERY.find((d) => d.id === s.delivery)!.fee : 0;
    return { lines, count, subtotal, discount, shipping, total: subtotal - discount + shipping };
  }, [cart, s.coupon, s.delivery]);
}

export const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const newOrderId = () => `VNTR${Math.floor(100000 + Math.random() * 900000)}`;
