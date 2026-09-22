"use client";

import Image from "next/image";
import { PROFILE_PHOTO, useProfile, type Profile } from "@/lib/profile";

/** Live profile values for the (server-rendered) profile screen. */
export function ProfileText({ field }: { field: "name" | "email" | "phone" }) {
  return <>{useProfile()[field as keyof Profile]}</>;
}

/** The profile picture: always the brand logo, not user-changeable. */
export function ProfileAvatar({ className }: { className?: string }) {
  const { name } = useProfile();
  return <Image src={PROFILE_PHOTO} alt={name} width={204} height={204} className={className} />;
}
