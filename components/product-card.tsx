import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { FavoriteButton } from "./favorite-button";

type Props = { product: Product; liked: boolean; onToggleLike: (id: string) => void };

/** Compact card used in the horizontal "Popular Collection" row. */
export function ProductCard({ product, liked, onToggleLike }: Props) {
  return (
    <article className="w-[calc(var(--u)*290)] shrink-0 snap-start text-center">
      <div
        className={cn(
          "relative overflow-hidden rounded-[calc(var(--u)*40)] bg-card",
          product.tall ? "h-[calc(var(--u)*396)]" : "mt-[calc(var(--u)*13)] h-[calc(var(--u)*375)]",
        )}
      >
        <Link href={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill sizes="130px" className="object-cover object-top" />
        </Link>
        <FavoriteButton
          liked={liked}
          label={product.name}
          onClick={() => onToggleLike(product.id)}
          className="absolute right-[calc(var(--u)*20)] top-[calc(var(--u)*14)]"
        />
      </div>
      <h3 className="mt-[calc(var(--u)*20)] text-[calc(var(--u)*23)]">{product.name}</h3>
      <p className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*29)] font-semibold">${product.price.toFixed(2)}</p>
      <div className="mt-[calc(var(--u)*16)] flex justify-center gap-[calc(var(--u)*16)]">
        {product.colors.slice(0, 3).map((c) => (
          <span key={c} className="size-[calc(var(--u)*34)] rounded-full ring-1 ring-black/5" style={{ background: c }} />
        ))}
      </div>
    </article>
  );
}
