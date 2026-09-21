"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useFly } from "./use-fly";
import { cn } from "@/lib/utils";
import { addToCart } from "@/lib/cart";
import { COLOR_NAMES, sizesFor } from "@/lib/product-options";
import type { Product } from "@/lib/products";

/** Quick add (first size, first colour) pinned to a card's bottom-right corner. Parent card must be `relative`. */
export function AddToCartButton({ product, className }: { product: Product; className?: string }) {
  const [added, setAdded] = useState(false);
  const { fly, layer } = useFly();
  const add = (e: React.MouseEvent<HTMLButtonElement>) => {
    const from = e.currentTarget.closest("article")?.querySelector<HTMLElement>("img") ?? e.currentTarget;
    const to = document.querySelector<HTMLElement>("[data-nav-cart]");
    fly(from, to, product.image, () => {
      addToCart({ productId: product.id, size: sizesFor(product)[0], color: 0, colorName: COLOR_NAMES[product.colors[0]] ?? "Custom", qty: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    });
  };
  return (
    <>
    <button
      type="button"
      aria-label={`Add ${product.name} to cart`}
      onClick={add}
      className={cn("absolute grid place-items-center bg-gold-dark text-white shadow-md transition-transform active:scale-90", className)}
    >
      {added ? <Check className="size-[55%]" strokeWidth={2.2} /> : <ShoppingBag className="size-[55%]" strokeWidth={1.7} />}
    </button>
    {layer}
    </>
  );
}
