"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { onConfirm: () => void; disabled?: boolean };

const KNOB = 84; // design units
const PAD = 8;
const CONFIRM_AT = 0.9; // fraction of the travel that counts as "slid all the way"
const DONE_MS = 1500; // how long the success state shows before moving on

// Little dashes that burst out from both ends of the pill in the success state.
const TICKS = [
  { s: "left", x: -34, y: -30, r: -35 }, { s: "left", x: -46, y: 0, r: 0 }, { s: "left", x: -34, y: 30, r: 35 },
  { s: "right", x: 34, y: -30, r: 35 }, { s: "right", x: 46, y: 0, r: 0 }, { s: "right", x: 34, y: 30, r: -35 },
] as const;

/** Slide-to-confirm "place order" track that turns into a success pill. */
export function SlideToPlace({ onConfirm, disabled }: Props) {
  const [phase, setPhase] = useState<"armed" | "done">("armed");
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const drag = useRef<{ x: number; base: number; id: number } | null>(null);
  const pos = useRef(0);
  const frame = useRef(0);
  const doneTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const maxTravel = () => {
    const w = trackRef.current?.offsetWidth ?? 800;
    const u = w / 845; // one design unit in px (track spans the content width)
    return w - (KNOB + PAD * 2) * u;
  };

  /** Move the knob + fill + hint text directly (no React re-render while dragging). */
  const paint = (x: number, animate: boolean) => {
    pos.current = x;
    const max = maxTravel();
    const p = max ? x / max : 0;
    const t = animate ? "transform 260ms cubic-bezier(0.22, 0.9, 0.3, 1)" : "none";
    if (knobRef.current) {
      knobRef.current.style.transition = t;
      knobRef.current.style.transform = `translate3d(${x}px,0,0)`;
    }
    if (fillRef.current) {
      fillRef.current.style.transition = animate ? "width 260ms cubic-bezier(0.22, 0.9, 0.3, 1)" : "none";
      fillRef.current.style.width = `${x + (trackRef.current?.offsetHeight ?? 0) * 0.5 + 4}px`;
    }
    if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 1.6));
  };

  useEffect(
    () => () => {
      clearTimeout(doneTimer.current);
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  const complete = () => {
    paint(maxTravel(), true);
    setPhase("done");
    doneTimer.current = setTimeout(onConfirm, DONE_MS);
  };

  const onDown = (e: React.PointerEvent) => {
    if (phase !== "armed" || disabled) return;
    drag.current = { x: e.clientX, base: pos.current, id: e.pointerId };
    knobRef.current?.setPointerCapture(e.pointerId);
    paint(pos.current, false);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const x = Math.max(0, Math.min(maxTravel(), d.base + e.clientX - d.x));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => paint(x, false));
    pos.current = x;
  };

  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    cancelAnimationFrame(frame.current);
    if (pos.current >= maxTravel() * CONFIRM_AT) complete();
    else paint(0, true);
  };

  const done = phase === "done";
  return (
    <div
      ref={trackRef}
      role={done ? "status" : undefined}
      className={cn(
        "relative mt-[calc(var(--u)*26)] h-[calc(var(--u)*100)] select-none rounded-full transition-colors duration-500",
        disabled && !done && "opacity-60",
        done ? "bg-[#2c4438] shadow-[0_6px_20px_rgba(44,68,56,0.35)]" : "bg-gradient-to-r from-[#8a7440] to-[#4f4326]",
      )}
      style={{ touchAction: "none" }}
    >
      {!done && (
        <>
          <div ref={fillRef} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#b8923f] to-[#e6c26f]" style={{ width: "50%" }} />
          <span ref={hintRef} className="pointer-events-none absolute inset-0 flex items-center justify-center pl-[calc(var(--u)*60)] text-[calc(var(--u)*26)] text-white/90">
            Slide right to place order
          </span>
          <span className="pointer-events-none absolute right-[calc(var(--u)*30)] top-1/2 flex -translate-y-1/2 text-white/70">
            <ChevronRight className="-mr-[calc(var(--u)*14)] size-[calc(var(--u)*34)]" strokeWidth={1.8} />
            <ChevronRight className="-mr-[calc(var(--u)*14)] size-[calc(var(--u)*34)]" strokeWidth={1.8} />
            <ChevronRight className="size-[calc(var(--u)*34)]" strokeWidth={1.8} />
          </span>
          <button
            ref={knobRef}
            type="button"
            aria-label="Slide to place order"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={(e) => !disabled && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") && (e.preventDefault(), complete())}
            className="absolute top-1/2 grid -translate-y-1/2 cursor-grab place-items-center rounded-full bg-white text-ink shadow-md active:cursor-grabbing"
            style={{ left: `calc(var(--u) * ${PAD})`, width: `calc(var(--u) * ${KNOB})`, height: `calc(var(--u) * ${KNOB})`, willChange: "transform", touchAction: "none" }}
          >
            <ArrowRight className="size-[calc(var(--u)*42)]" strokeWidth={1.8} />
          </button>
        </>
      )}

      {done && (
        <>
          <div className="absolute inset-0 flex items-center justify-center gap-[calc(var(--u)*22)] text-[calc(var(--u)*28)] font-medium text-white animate-[cart-pop_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
            <span className="grid size-[calc(var(--u)*56)] place-items-center rounded-full bg-white text-[#2c4438]">
              <Check className="size-[calc(var(--u)*34)]" strokeWidth={3} />
            </span>
            Order Placed Successfully!
          </div>
          {TICKS.map((t, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute top-1/2 h-[calc(var(--u)*5)] w-[calc(var(--u)*16)] rounded-full bg-[#c9a24f] opacity-0"
              style={{
                [t.s]: 0,
                transform: `translate(0, -50%) rotate(${t.r}deg)`,
                animation: "tick-burst 0.7s ease-out forwards",
                animationDelay: `${i * 40}ms`,
                ["--tx" as string]: `calc(var(--u) * ${t.x})`,
                ["--ty" as string]: `calc(var(--u) * ${t.y})`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
