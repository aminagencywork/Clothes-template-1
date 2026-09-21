"use client";

import { useProfile, type Profile } from "@/lib/profile";

/** Live profile values for the (server-rendered) profile screen. */
export function ProfileText({ field }: { field: "name" | "email" | "phone" }) {
  return <>{useProfile()[field as keyof Profile]}</>;
}

export function ProfileAvatar({ className }: { className?: string }) {
  const { photo, name } = useProfile();
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={photo} alt={name} className={className} />;
}
