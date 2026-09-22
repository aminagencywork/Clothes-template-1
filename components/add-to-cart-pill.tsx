"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { addToCart } from "@/lib/cart";
import { COLOR_NAMES, sizesFor } from "@/lib/product-options";
import type { Product } from "@/lib/products";
import { useFly } from "./use-fly";
import { FOREST } from "@/lib/theme";

/** Full-width "Add to Cart" pill (first size/colour); flies the photo to the bottom-nav cart icon. */
export function AddToCartPill({ product, className, color = FOREST }: { product: Product; className?: string; color?: string }) {
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
        className={cn(
          "flex items-center justify-center gap-[calc(var(--u)*10)] rounded-full text-white shadow-sm transition-transform active:scale-[0.97]",
          className,
        )}
        style={{ background: color }}
      >
        {added ? <Check className="size-[calc(var(--u)*24)]" strokeWidth={2.2} /> : <ShoppingCart className="size-[calc(var(--u)*24)]" strokeWidth={1.8} />}
        {added ? "Added" : "Add to Cart"}
      </button>
      {layer}
    </>
  );
}
