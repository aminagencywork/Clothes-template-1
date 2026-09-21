"use client";

import { useWishlist } from "@/lib/wishlist";

export function WishlistCount() {
  return <>{useWishlist().length}</>;
}
