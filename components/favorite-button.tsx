import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { liked: boolean; label: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; className?: string };

export function FavoriteButton({ liked, label, onClick, className }: Props) {
  return (
    <button
      type="button"
      aria-label={`${liked ? "Remove" : "Save"} ${label}`}
      aria-pressed={liked}
      onClick={onClick}
      className={cn("grid size-[calc(var(--u)*64)] place-items-center rounded-full bg-white transition-transform active:scale-90", className)}
    >
      <Heart
        className={cn("size-[calc(var(--u)*32)]", liked && "text-[#b23a48]")}
        fill={liked ? "currentColor" : "none"}
        strokeWidth={1.6}
      />
    </button>
  );
}
