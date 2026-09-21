import Link from "next/link";
import { PhoneFrame } from "@/components/phone-frame";

export const metadata = { title: "Offline – Vyntra" };

export default function OfflinePage() {
  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*60)] pt-[calc(var(--u)*500)] text-center">
        <h1 className="font-display text-[calc(var(--u)*64)] leading-tight">You&apos;re offline</h1>
        <p className="mt-[calc(var(--u)*24)] text-[calc(var(--u)*28)] text-muted">Check your connection. Pages you&apos;ve already opened still work.</p>
        <Link href="/home" className="mt-[calc(var(--u)*60)] inline-block rounded-full bg-gold-dark px-[calc(var(--u)*60)] py-[calc(var(--u)*26)] text-[calc(var(--u)*29)] text-white">Try again</Link>
      </main>
    </PhoneFrame>
  );
}
