"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronRight, ClipboardList, CreditCard, Crown, Headset, Heart, House, LayoutGrid, LogOut,
  MapPin, Settings, Sparkles, BadgePercent, X, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { label: string; Icon: LucideIcon; href?: string };

const items: Item[] = [
  { label: "Home", Icon: House, href: "/home" },
  { label: "Categories", Icon: LayoutGrid, href: "/categories" },
  { label: "New Arrivals", Icon: Sparkles, href: "/categories" },
  { label: "My Wishlist", Icon: Heart },
  { label: "My Orders", Icon: ClipboardList, href: "/orders" },
  { label: "Delivery Addresses", Icon: MapPin },
  { label: "Payment Methods", Icon: CreditCard },
  { label: "Offers & Coupons", Icon: BadgePercent },
  { label: "Help & Support", Icon: Headset },
  { label: "Settings", Icon: Settings },
];

const row = "flex h-[calc(var(--u)*74)] w-full items-center gap-[calc(var(--u)*30)] rounded-full px-[calc(var(--u)*44)] text-left text-[calc(var(--u)*30)]";

/** Slide-in side menu. Fixed to the viewport with its own `--u` container (see BottomNav). */
export function MenuDrawer({ open, onClose, active = "/home" }: { open: boolean; onClose: () => void; active?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className={cn("fixed inset-0 z-50 flex justify-center", !open && "pointer-events-none")} aria-hidden={!open}>
      <div className="relative h-full w-full max-w-[430px] overflow-hidden [container-type:size]">
       <div className="absolute inset-0" style={{ ["--u" as string]: "calc(100cqw / 941)" }}>
        {/* scrim */}
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={onClose}
          className={cn("absolute inset-0 bg-black/45 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        />

        {/* panel */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!open}
          className={cn(
            "absolute inset-y-0 left-0 flex w-[62%] flex-col overflow-y-auto bg-page shadow-[8px_0_40px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out no-scrollbar",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="relative z-10 shrink-0 px-[calc(var(--u)*48)] pt-[calc(var(--u)*62)]">
            <div className="flex items-start justify-between">
              <Image src="/images/menu-logo.jpg" alt="Vyntra – wear a brighter you" width={320} height={136} className="h-[calc(var(--u)*120)] w-auto mix-blend-multiply" />
              <button type="button" aria-label="Close menu" onClick={onClose} className="mt-[calc(var(--u)*6)] grid size-[calc(var(--u)*64)] place-items-center">
                <X className="size-[calc(var(--u)*46)]" strokeWidth={1.6} />
              </button>
            </div>

            <Link href="/profile" onClick={onClose} className="mt-[calc(var(--u)*30)] flex items-center gap-[calc(var(--u)*28)]">
              <Image src="/images/menu-avatar.jpg" alt="" width={126} height={126} className="size-[calc(var(--u)*126)] rounded-full object-cover" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[calc(var(--u)*38)] leading-tight">Ibrahim</span>
                <span className="mt-[calc(var(--u)*8)] block text-[calc(var(--u)*23)] leading-[1.25] text-muted">View and edit your profile</span>
              </span>
              <ChevronRight className="size-[calc(var(--u)*38)] shrink-0" strokeWidth={1.6} />
            </Link>

            <button type="button" onClick={onClose} className="mt-[calc(var(--u)*30)] flex w-full items-center gap-[calc(var(--u)*24)] rounded-[calc(var(--u)*24)] bg-[#f9e3df] p-[calc(var(--u)*18)] text-left">
              <span className="grid size-[calc(var(--u)*86)] shrink-0 place-items-center rounded-full bg-[#a5624f]/85">
                <Crown className="size-[calc(var(--u)*46)] text-[#4a2a20]" strokeWidth={1.6} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[calc(var(--u)*29)] font-medium">Vyntra Plus</span>
                <span className="mt-[calc(var(--u)*4)] block text-[calc(var(--u)*21)] leading-[1.25] text-muted">Exclusive deals, early access and more!</span>
              </span>
              <ChevronRight className="size-[calc(var(--u)*34)] shrink-0" strokeWidth={1.6} />
            </button>
          </div>

          <nav aria-label="Menu" className="relative z-10 mt-[calc(var(--u)*30)] shrink-0 px-[calc(var(--u)*10)]">
            <ul>
              {items.map(({ label, Icon, href }) => {
                const on = href === active && label === "Home";
                const body = (
                  <>
                    <Icon className="size-[calc(var(--u)*44)] shrink-0" strokeWidth={1.5} />
                    <span className="flex-1">{label}</span>
                    {!on && <ChevronRight className="size-[calc(var(--u)*34)] shrink-0" strokeWidth={1.6} />}
                  </>
                );
                const cls = cn(row, on ? "bg-pill font-medium" : "");
                return (
                  <li key={label}>
                    {href ? (
                      <Link href={href} onClick={onClose} aria-current={on ? "page" : undefined} className={cls}>{body}</Link>
                    ) : (
                      <button type="button" onClick={onClose} className={cls}>{body}</button>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mx-[calc(var(--u)*38)] mt-[calc(var(--u)*14)] border-t border-black/[0.08] pt-[calc(var(--u)*10)]">
              <Link href="/" onClick={onClose} className={cn(row, "!px-[calc(var(--u)*6)]")}>
                <LogOut className="size-[calc(var(--u)*44)] shrink-0" strokeWidth={1.5} />
                Log Out
              </Link>
            </div>
          </nav>

          {/* artwork pinned to the bottom of the panel */}
          <div className="relative mt-auto shrink-0 pt-[calc(var(--u)*10)]">
            <Image src="/images/menu-art-v2.jpg" alt="" width={582} height={372} className="block w-full" />
          </div>
        </aside>
       </div>
      </div>
    </div>,
    document.body,
  );
}
