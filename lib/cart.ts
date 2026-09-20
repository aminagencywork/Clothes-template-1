"use client";

import { useSyncExternalStore } from "react";

export type CartItem = { productId: string; size: string; color: number; colorName: string; qty: number };

const KEY = "cart-items";
const EMPTY: CartItem[] = [];
const MAX_QTY = 10;

export const lineKey = (i: Pick<CartItem, "productId" | "size" | "color">) => `${i.productId}|${i.size}|${i.color}`;

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(next: CartItem[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToCart(item: CartItem) {
  const items = read();
  const key = lineKey(item);
  const found = items.some((i) => lineKey(i) === key);
  write(
    found
      ? items.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i))
      : [...items, { ...item, qty: Math.min(MAX_QTY, item.qty) }],
  );
}

export function updateCartItem(key: string, qty: number) {
  write(read().map((i) => (lineKey(i) === key ? { ...i, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : i)));
}

export function removeCartItem(key: string) {
  write(read().filter((i) => lineKey(i) !== key));
}
