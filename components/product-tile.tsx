import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { discountPercent, type Product } from "@/lib/products";
import { FavoriteButton } from "./favorite-button";

type Props = {
  product: Product;
  liked: boolean;
  onToggleLike: (id: string) => void;
  onAdd: (id: string) => void;
};

/** Grid card used in "New Arrivals" (price, old price, discount, add to bag). */
export function ProductTile({ product, liked, onToggleLike, onAdd }: Props) {
  const off = discountPercent(product);
  return (
    <article className="overflow-hidden rounded-[calc(var(--u)*34)] bg-white shadow-[0_4px_24px_rgba(60,45,20,0.06)]">
      <div className="relative h-[calc(var(--u)*350)] bg-card">
        <Link href={`/product/${product.id}`} aria-label={product.name} className="absolute inset-0">
          <Image src={product.image} alt={product.name} fill sizes="200px" className="object-cover object-top" />
        </Link>
        {off > 0 && (
          <span className="absolute left-[calc(var(--u)*16)] top-[calc(var(--u)*16)] rounded-full bg-white px-[calc(var(--u)*20)] py-[calc(var(--u)*10)] text-[calc(var(--u)*21)]">
            {off}% Off
          </span>
        )}
        <FavoriteButton
          liked={liked}
          label={product.name}
          onClick={() => onToggleLike(product.id)}
          className="absolute right-[calc(var(--u)*16)] top-[calc(var(--u)*16)] !size-[calc(var(--u)*58)]"
        />
      </div>
      <div className="p-[calc(var(--u)*20)]">
        <div className="flex items-center justify-between gap-[calc(var(--u)*8)]">
          <h3 className="font-display truncate text-[calc(var(--u)*32)]"><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
          <span className="flex shrink-0 items-center gap-[calc(var(--u)*4)] text-[calc(var(--u)*21)] text-muted">
            <Star className="size-[calc(var(--u)*22)] fill-[#e0a23a] text-[#e0a23a]" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-[calc(var(--u)*6)] flex items-baseline gap-[calc(var(--u)*12)]">
          <b className="text-[calc(var(--u)*34)]">${product.price.toFixed(2)}</b>
          {product.oldPrice && <s className="text-[calc(var(--u)*23)] text-muted">${product.oldPrice.toFixed(2)}</s>}
        </p>
        <div className="mt-[calc(var(--u)*14)] flex items-center justify-between">
          <div className="flex gap-[calc(var(--u)*10)]">
            {product.colors.slice(0, 4).map((c) => (
              <span key={c} className="size-[calc(var(--u)*30)] rounded-full ring-1 ring-black/10" style={{ background: c }} />
            ))}
          </div>
          <button
            type="button"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => onAdd(product.id)}
            className="grid h-[calc(var(--u)*64)] w-[calc(var(--u)*80)] place-items-center rounded-[calc(var(--u)*22)] bg-gold-dark text-white transition-transform active:scale-90"
          >
            <ShoppingBag className="size-[calc(var(--u)*32)]" strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </article>
  );
}
