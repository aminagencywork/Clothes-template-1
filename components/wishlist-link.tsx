"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

/** Header heart button linking to the wishlist; the badge pops when the count changes. */
export const WishlistLink = forwardRef<HTMLAnchorElement, { className?: string }>(function WishlistLink({ className }, ref) {
  const count = useWishlist().length;
  return (
    <Link ref={ref} href="/wishlist" aria-label={`Wishlist, ${count} items`} className={cn("relative grid place-items-center rounded-full bg-pill/80", className)}>
      <Heart className="size-[calc(var(--u)*42)]" strokeWidth={1.6} />
      {count > 0 && (
        <span
          key={count}
          className="absolute -right-[calc(var(--u)*8)] -top-[calc(var(--u)*8)] grid min-w-[calc(var(--u)*38)] place-items-center rounded-full bg-[#b23a48] px-[calc(var(--u)*8)] text-[calc(var(--u)*22)] leading-[calc(var(--u)*38)] text-white animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]"
        >
          {count}
        </span>
      )}
    </Link>
  );
});
