"use client";

import { useRef, useState, type ReactNode } from "react";
import { Heart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Swipe left past the threshold (or tap the revealed panel) */
  onDelete: () => void;
  /** Swipe right past the threshold (or tap the revealed panel) */
  onWishlist: () => void;
  className?: string;
};

const OPEN_AT = 0.2; // fraction of the row width: past this the panel stays open
const COMMIT_AT = 0.55; // past this the action fires on release
const PANEL = 0.18; // width of an open panel, as a fraction of the row width

/** A list row you can swipe: left reveals Delete, right reveals Add to Wishlist. Works with touch and mouse. */
export function SwipeRow({ children, onDelete, onWishlist, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; base: number; id: number } | null>(null);
  const moved = useRef(false);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState<null | "delete" | "wishlist">(null);
  const [collapsed, setCollapsed] = useState(false);

  const width = () => ref.current?.offsetWidth ?? 800;

  const commit = (kind: "delete" | "wishlist") => {
    setLeaving(kind);
    setDx(kind === "delete" ? -width() : width());
    setTimeout(() => setCollapsed(true), 180);
    setTimeout(() => (kind === "delete" ? onDelete() : onWishlist()), 420);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (leaving || (e.pointerType === "mouse" && e.button !== 0)) return;
    start.current = { x: e.clientX, y: e.clientY, base: dx, id: e.pointerId };
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || leaving) return;
    const mx = e.clientX - s.x;
    const my = e.clientY - s.y;
    if (!dragging) {
      // Only treat clearly horizontal movement as a swipe so vertical scrolling still works.
      if (Math.abs(mx) < 8 || Math.abs(mx) < Math.abs(my)) return;
      setDragging(true);
      ref.current?.setPointerCapture(s.id);
    }
    moved.current = true;
    const w = width();
    setDx(Math.max(-w, Math.min(w, s.base + mx)));
  };

  const onPointerUp = () => {
    const s = start.current;
    start.current = null;
    if (!s || !dragging) return;
    setDragging(false);
    const w = width();
    if (dx <= -COMMIT_AT * w) return commit("delete");
    if (dx >= COMMIT_AT * w) return commit("wishlist");
    if (dx <= -OPEN_AT * w) return setDx(-PANEL * w);
    if (dx >= OPEN_AT * w) return setDx(PANEL * w);
    setDx(0);
  };

  const panel = Math.abs(dx);
  const open = !leaving && (dx === 0 ? 0 : dx < 0 ? -1 : 1);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-[calc(var(--u)*28)] transition-[max-height,opacity,margin] duration-200 ease-out", className)}
      style={collapsed ? { maxHeight: 0, opacity: 0, marginTop: 0, marginBottom: 0 } : { maxHeight: 600 }}
    >
      {dx < 0 && (
        <button
          type="button"
          aria-label="Delete item"
          tabIndex={open === -1 ? 0 : -1}
          onClick={() => commit("delete")}
          className="absolute inset-y-0 right-0 flex flex-col items-center justify-center gap-[calc(var(--u)*8)] bg-[#ef4136] text-white"
          style={{ width: panel }}
        >
          <span className="flex flex-col items-center gap-[calc(var(--u)*8)] overflow-hidden text-[calc(var(--u)*24)] font-medium">
            <Trash2 className="size-[calc(var(--u)*48)]" strokeWidth={1.6} />
            Delete
          </span>
        </button>
      )}
      {dx > 0 && (
        <button
          type="button"
          aria-label="Add to wishlist"
          tabIndex={open === 1 ? 0 : -1}
          onClick={() => commit("wishlist")}
          className="absolute inset-y-0 left-0 flex flex-col items-center justify-center bg-[#f0507a] text-white"
          style={{ width: panel }}
        >
          <span className="flex flex-col items-center gap-[calc(var(--u)*8)] overflow-hidden text-center text-[calc(var(--u)*22)] font-medium leading-tight">
            <Heart className="size-[calc(var(--u)*48)]" strokeWidth={1.6} />
            Add to<br />Wishlist
          </span>
        </button>
      )}

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
            moved.current = false;
          } else if (open) {
            // Tapping the row while a panel is open just closes it.
            e.preventDefault();
            e.stopPropagation();
            setDx(0);
          }
        }}
        style={{ transform: `translateX(${dx}px)`, touchAction: "pan-y" }}
        className={cn("relative select-none", !dragging && "transition-transform duration-200 ease-out", leaving && "pointer-events-none")}
      >
        {children}
      </div>
    </div>
  );
}
