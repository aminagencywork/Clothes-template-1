import { cn } from "@/lib/utils";

type Props = { count: number; active: number; onSelect?: (index: number) => void };

export function PaginationDots({ count, active, onSelect }: Props) {
  return (
    <div className="flex items-center gap-[calc(var(--u)*24)]">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === active}
          onClick={() => onSelect?.(i)}
          className={cn(
            "size-[calc(var(--u)*26)] rounded-full transition-colors duration-500",
            i === active ? "bg-ink" : "bg-dot",
          )}
        />
      ))}
    </div>
  );
}
