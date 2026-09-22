"use client";

import { useSyncExternalStore } from "react";

export type Profile = { name: string; email: string; phone: string; dob: string; gender: string; bio: string };

/** The profile picture is fixed to the brand logo everywhere — it isn't user-changeable. */
export const PROFILE_PHOTO = "/images/profile-logo.jpg";

export const DEFAULT_PROFILE: Profile = {
  name: "Ibrahim Popatiya",
  email: "ibrahim@example.com",
  phone: "+91 98765 43210",
  dob: "2003-03-15",
  gender: "Male",
  bio: "Fashion enthusiast | Keep exploring new styles ✨",
};

const KEY = "profile";
let cache: Profile | null = null;
const listeners = new Set<() => void>();

function read(): Profile {
  if (cache) return cache;
  try {
    cache = { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(KEY) ?? "{}") };
  } catch {
    cache = DEFAULT_PROFILE;
  }
  return cache!;
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

export function useProfile() {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_PROFILE);
}

export function saveProfile(next: Profile) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}
