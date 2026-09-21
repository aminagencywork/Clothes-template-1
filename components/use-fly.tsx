"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Flyer = { id: number; src: string; x: number; y: number; dx: number; dy: number; done: () => void };

/** Fly a product thumbnail from one element to another (same motion as the add-to-cart flight), then run `done`. */
export function useFly(): { fly: (from: HTMLElement | null, to: HTMLElement | null, src: string, done: () => void) => void; layer: ReactNode } {
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  const fly = (from: HTMLElement | null, to: HTMLElement | null, src: string, done: () => void) => {
    const a = from?.getBoundingClientRect();
    const c = to?.getBoundingClientRect();
    if (!a || !c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
    setFlyers((f) => [
      ...f,
      {
        id: Date.now() + Math.random(),
        src,
        x: a.left + a.width / 2 - 22,
        y: a.top + a.height / 2 - 22,
        dx: c.left + c.width / 2 - (a.left + a.width / 2),
        dy: c.top + c.height / 2 - (a.top + a.height / 2),
        done,
      },
    ]);
  };

  const run = (el: HTMLDivElement | null, f: Flyer) => {
    if (!el || el.dataset.started) return;
    el.dataset.started = "1";
    const anim = el.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1, offset: 0 },
        { transform: `translate(${f.dx * 0.5}px, ${f.dy * 0.15 - 60}px) scale(0.85)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${f.dx}px, ${f.dy}px) scale(0.3)`, opacity: 0.9, offset: 1 },
      ],
      { duration: 800, easing: "cubic-bezier(0.55, 0, 0.35, 1)", fill: "forwards" },
    );
    anim.onfinish = () => {
      setFlyers((all) => all.filter((x) => x.id !== f.id));
      f.done();
    };
  };

  const layer =
    typeof document !== "undefined"
      ? createPortal(
          flyers.map((f) => (
            <div
              key={f.id}
              ref={(el) => run(el, f)}
              aria-hidden
              className="pointer-events-none fixed z-50 size-11 overflow-hidden rounded-full border-2 border-white bg-card shadow-lg will-change-transform"
              style={{ left: f.x, top: f.y }}
            >
              <Image src={f.src} alt="" fill sizes="44px" className="object-cover object-top" />
            </div>
          )),
          document.body,
        )
      : null;

  return { fly, layer };
}
