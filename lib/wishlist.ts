"use client";

import { useSyncExternalStore } from "react";

const KEY = "wishlist-items";
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    cache = [];
  }
  return cache!;
}

function write(next: string[]) {
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

/** Product ids on the wishlist, newest last. */
export function useWishlist() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function addToWishlist(id: string) {
  const ids = read();
  if (!ids.includes(id)) write([...ids, id]);
}

export function removeFromWishlist(id: string) {
  write(read().filter((x) => x !== id));
}
