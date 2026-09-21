import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/categories", label: "Categories", Icon: LayoutGrid },
  { href: "/cart", label: "Cart", Icon: ShoppingCart },
  { href: "/profile", label: "Profile", Icon: User },
];

/** Space a page must reserve at its bottom so content isn't hidden behind the fixed nav. */
export const NAV_CLEARANCE = "pb-[calc(var(--u)*180)]";

// Fixed to the viewport bottom. It has its own container for `--u`: a `container-type`
// ancestor (PhoneFrame) would otherwise become the containing block of a fixed child.
export function BottomNav({ active, cartCount = 0 }: { active: string; cartCount?: number }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center">
      <div
        className="w-full max-w-[430px] [container-type:inline-size]"
        style={{ ["--u" as string]: "calc(100cqw / 941)" }}
      >
        <nav
          aria-label="Main"
          className="pointer-events-auto mx-[calc(var(--u)*35)] mb-[calc(var(--u)*24)] flex h-[calc(var(--u)*113)] items-center justify-between rounded-[calc(var(--u)*34)] bg-white px-[calc(var(--u)*23)] shadow-[0_6px_30px_rgba(60,45,20,0.14)]"
        >
          {items.map(({ href, label, Icon }) => {
            const on = href === active;
            return (
              <Link
                key={href}
                href={href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex h-[calc(var(--u)*93)] w-[calc(var(--u)*186)] flex-col items-center justify-center gap-[calc(var(--u)*6)] rounded-[calc(var(--u)*46)] text-[calc(var(--u)*24)]",
                  on ? "bg-pill text-ink font-medium" : "text-muted",
                )}
              >
                <span className="relative" data-nav-cart={href === "/cart" ? "" : undefined}>
                  <Icon className="size-[calc(var(--u)*42)]" strokeWidth={1.6} fill={on ? "currentColor" : "none"} />
                  {href === "/cart" && cartCount > 0 && (
                    <span key={cartCount} className="absolute -right-[calc(var(--u)*18)] -top-[calc(var(--u)*14)] grid size-[calc(var(--u)*32)] place-items-center rounded-full bg-gold-dark text-[calc(var(--u)*19)] text-white animate-[cart-pop_0.45s_cubic-bezier(0.34,1.56,0.64,1)]">
                      {cartCount}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
