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
const FLICK = 0.6; // px/ms: a fast flick counts even for a short drag
const EASE = "transform 240ms cubic-bezier(0.22, 0.9, 0.3, 1)";

/**
 * A list row you can swipe: left reveals Delete, right reveals Add to Wishlist. Touch and mouse.
 * While dragging, the row is moved straight through the DOM (transform only, one write per frame),
 * so React never re-renders during a swipe — that keeps it smooth.
 */
export function SwipeRow({ children, onDelete, onWishlist, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const delRef = useRef<HTMLDivElement>(null);
  const wishRef = useRef<HTMLDivElement>(null);

  const dx = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const drag = useRef<{ x: number; y: number; base: number; id: number; active: boolean; lastX: number; lastT: number; v: number } | null>(null);
  const moved = useRef(false);
  const busy = useRef(false);

  const [open, setOpen] = useState<-1 | 0 | 1>(0); // settled state, for a11y + tab order only
  const [collapsed, setCollapsed] = useState(false);

  const width = () => rootRef.current?.offsetWidth ?? 800;

  /** Position the card and show only the panel for the swipe direction. */
  const paint = (x: number, animate: boolean) => {
    dx.current = x;
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = animate ? EASE : "none";
    card.style.transform = `translate3d(${x}px,0,0)`;
    if (delRef.current) delRef.current.style.visibility = x < 0 ? "visible" : "hidden";
    if (wishRef.current) wishRef.current.style.visibility = x > 0 ? "visible" : "hidden";
  };

  const schedule = (x: number) => {
    target.current = x;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      paint(target.current, false);
    });
  };

  const settle = (x: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    paint(x, true);
    setOpen(x === 0 ? 0 : x < 0 ? -1 : 1);
  };

  const commit = (kind: "delete" | "wishlist") => {
    if (busy.current) return;
    busy.current = true;
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    paint(kind === "delete" ? -width() : width(), true);
    setTimeout(() => setCollapsed(true), 200);
    setTimeout(() => (kind === "delete" ? onDelete() : onWishlist()), 440);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current || (e.pointerType === "mouse" && e.button !== 0)) return;
    // Stop any settle animation and continue from where the row visually is.
    const card = cardRef.current;
    const current = card ? new DOMMatrixReadOnly(getComputedStyle(card).transform).m41 : dx.current;
    paint(current, false);
    drag.current = { x: e.clientX, y: e.clientY, base: current, id: e.pointerId, active: false, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
    moved.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || busy.current) return;
    const mx = e.clientX - d.x;
    if (!d.active) {
      // Only clearly horizontal movement starts a swipe, so vertical scrolling still works.
      if (Math.abs(mx) < 6 || Math.abs(mx) < Math.abs(e.clientY - d.y)) return;
      d.active = true;
      cardRef.current?.setPointerCapture(d.id);
    }
    moved.current = true;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    const w = width();
    let x = d.base + mx;
    // A little resistance once past the commit point.
    if (Math.abs(x) > w * COMMIT_AT) x = Math.sign(x) * (w * COMMIT_AT + (Math.abs(x) - w * COMMIT_AT) * 0.4);
    schedule(Math.max(-w, Math.min(w, x)));
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.active) return;
    const w = width();
    const x = dx.current;
    const flickLeft = d.v < -FLICK && x < 0;
    const flickRight = d.v > FLICK && x > 0;
    if (x <= -COMMIT_AT * w) return commit("delete");
    if (x >= COMMIT_AT * w) return commit("wishlist");
    if (x <= -OPEN_AT * w || flickLeft) return settle(-PANEL * w);
    if (x >= OPEN_AT * w || flickRight) return settle(PANEL * w);
    settle(0);
  };

  const panelBase = "absolute inset-y-0 flex items-center text-white [will-change:visibility]";

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden rounded-[calc(var(--u)*28)] transition-[max-height,opacity] duration-200 ease-out", className)}
      style={collapsed ? { maxHeight: 0, opacity: 0 } : { maxHeight: 600 }}
    >
      {/* action panels sit behind the card; the card's own opaque backdrop hides them until it slides away */}
      <div ref={delRef} className={cn(panelBase, "inset-x-0 justify-end bg-[#ef4136]")} style={{ visibility: "hidden" }} aria-hidden={open !== -1}>
        <button
          type="button"
          aria-label="Delete item"
          tabIndex={open === -1 ? 0 : -1}
          onClick={() => commit("delete")}
          className="flex h-full flex-col items-center justify-center gap-[calc(var(--u)*8)] text-[calc(var(--u)*24)] font-medium"
          style={{ width: `${PANEL * 100}%` }}
        >
          <Trash2 className="size-[calc(var(--u)*48)]" strokeWidth={1.6} />
          Delete
        </button>
      </div>
      <div ref={wishRef} className={cn(panelBase, "inset-x-0 justify-start bg-[#f0507a]")} style={{ visibility: "hidden" }} aria-hidden={open !== 1}>
        <button
          type="button"
          aria-label="Add to wishlist"
          tabIndex={open === 1 ? 0 : -1}
          onClick={() => commit("wishlist")}
          className="flex h-full flex-col items-center justify-center gap-[calc(var(--u)*8)] text-center text-[calc(var(--u)*22)] font-medium leading-tight"
          style={{ width: `${PANEL * 100}%` }}
        >
          <Heart className="size-[calc(var(--u)*48)]" strokeWidth={1.6} />
          Add to<br />Wishlist
        </button>
      </div>

      <div
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
            moved.current = false;
          } else if (open !== 0) {
            // Tapping the row while a panel is open just closes it.
            e.preventDefault();
            e.stopPropagation();
            settle(0);
          }
        }}
        style={{ touchAction: "pan-y", willChange: "transform" }}
        className="relative select-none rounded-[calc(var(--u)*28)] bg-page"
      >
        {children}
      </div>
    </div>
  );
}
