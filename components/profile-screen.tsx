import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Bell, ChevronRight, CircleHelp, CreditCard, Heart, LogOut, MapPin,
  Pencil, Settings, ShoppingBag, Tag, User, type LucideIcon,
} from "lucide-react";
import { BottomNav } from "./bottom-nav";
import { PhoneFrame } from "./phone-frame";
import { ProfileAvatar, ProfileText } from "./profile-bits";
import { WishlistCount } from "./wishlist-count";
import { orders } from "@/lib/orders";

const stats: { label: string; count: number | "wishlist"; Icon: LucideIcon; href?: string }[] = [
  { label: "Wishlist", count: "wishlist", Icon: Heart, href: "/wishlist" },
  { label: "Orders", count: orders.length, Icon: ShoppingBag, href: "/orders" },
  { label: "Addresses", count: 1, Icon: MapPin, href: "/address" },
  { label: "Payment Methods", count: 2, Icon: CreditCard },
];

const menu: { label: string; Icon: LucideIcon; href?: string }[] = [
  { label: "Personal Information", Icon: User, href: "/profile/edit" },
  { label: "Manage Addresses", Icon: MapPin, href: "/address" },
  { label: "Payment Methods", Icon: CreditCard },
  { label: "Notifications", Icon: Bell },
  { label: "Promo Codes", Icon: Tag },
  { label: "Help & Support", Icon: CircleHelp },
  { label: "Logout", Icon: LogOut },
];

const CART_COUNT = 3; // dummy

export function ProfileScreen() {
  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*45)] pb-[calc(var(--u)*180)] pt-[calc(var(--u)*105)]">
        {/* header */}
        <header className="flex items-start justify-between">
          <div className="pl-[calc(var(--u)*8)]">
            <h1 className="font-display text-[calc(var(--u)*62)] leading-none">My Profile</h1>
            <p className="mt-[calc(var(--u)*14)] text-[calc(var(--u)*27)] text-muted">Style reflects who you are</p>
          </div>
          <div className="flex gap-[calc(var(--u)*20)]">
            <button type="button" aria-label="Notifications" className="relative grid size-[calc(var(--u)*92)] place-items-center rounded-full bg-pill/80">
              <Bell className="size-[calc(var(--u)*42)]" strokeWidth={1.5} />
              <span className="absolute right-[calc(var(--u)*22)] top-[calc(var(--u)*20)] size-[calc(var(--u)*15)] rounded-full bg-gold-dark" />
            </button>
            <button type="button" aria-label="Settings" className="grid size-[calc(var(--u)*92)] place-items-center rounded-full bg-pill/80">
              <Settings className="size-[calc(var(--u)*42)]" strokeWidth={1.5} />
            </button>
          </div>
        </header>

        {/* user card */}
        <section className="mt-[calc(var(--u)*38)] flex h-[calc(var(--u)*205)] items-center rounded-[calc(var(--u)*30)] bg-pill/70 px-[calc(var(--u)*26)]">
          <div className="relative size-[calc(var(--u)*172)] shrink-0">
            <ProfileAvatar className="size-full rounded-full object-cover" />
            <Link href="/profile/edit" aria-label="Edit photo" className="absolute bottom-0 right-0 grid size-[calc(var(--u)*52)] place-items-center rounded-full bg-white shadow">
              <Pencil className="size-[calc(var(--u)*26)]" strokeWidth={1.6} />
            </Link>
          </div>
          <div className="ml-[calc(var(--u)*44)] min-w-0 flex-1">
            <h2 className="font-display text-[calc(var(--u)*39)] leading-tight"><ProfileText field="name" /></h2>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*27)] text-muted"><ProfileText field="email" /></p>
            <p className="mt-[calc(var(--u)*12)] text-[calc(var(--u)*27)] text-muted"><ProfileText field="phone" /></p>
          </div>
          <Link href="/profile/edit" className="flex shrink-0 items-center gap-[calc(var(--u)*14)] self-start pt-[calc(var(--u)*82)] text-[calc(var(--u)*25)] text-muted">
            Edit Profile <ChevronRight className="size-[calc(var(--u)*32)] text-ink" />
          </Link>
        </section>

        {/* stats */}
        <div className="mt-[calc(var(--u)*18)] grid grid-cols-4 gap-[calc(var(--u)*15)]">
          {stats.map(({ label, count, Icon, href }) => {
            const cls = "flex h-[calc(var(--u)*185)] flex-col items-center justify-center rounded-[calc(var(--u)*30)] bg-pill/70 text-center transition-transform active:scale-95";
            const body = (
              <>
                <Icon className="size-[calc(var(--u)*50)]" strokeWidth={1.4} />
                <span className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*24)] leading-[1.2]">{label}</span>
                <span className="mt-[calc(var(--u)*8)] text-[calc(var(--u)*23)] text-muted">{count === "wishlist" ? <WishlistCount /> : count}</span>
              </>
            );
            return href ? (
              <Link key={label} href={href} className={cls}>{body}</Link>
            ) : (
              <button key={label} type="button" className={cls}>{body}</button>
            );
          })}
        </div>

        {/* menu */}
        <ul className="mt-[calc(var(--u)*28)] rounded-[calc(var(--u)*30)] bg-white px-[calc(var(--u)*28)] shadow-[0_4px_24px_rgba(60,45,20,0.05)]">
          {menu.map(({ label, Icon, href }, i) => {
            const cls = "flex h-[calc(var(--u)*80)] w-full items-center gap-[calc(var(--u)*36)] text-left";
            const body = (
              <>
                <Icon className="size-[calc(var(--u)*40)]" strokeWidth={1.5} />
                <span className="flex-1 text-[calc(var(--u)*27)]">{label}</span>
                <ChevronRight className="size-[calc(var(--u)*34)]" strokeWidth={1.6} />
              </>
            );
            return (
              <li key={label} className={i > 0 ? "border-t border-black/[0.06]" : ""}>
                {href ? <Link href={href} className={cls}>{body}</Link> : <button type="button" className={cls}>{body}</button>}
              </li>
            );
          })}
        </ul>

        {/* offers */}
        <section className="relative mt-[calc(var(--u)*26)] h-[calc(var(--u)*225)] overflow-hidden rounded-[calc(var(--u)*26)] bg-banner">
          <div className="absolute left-[calc(var(--u)*34)] top-[calc(var(--u)*30)]">
            <p className="text-[calc(var(--u)*17)] tracking-[0.2em] text-muted">STYLE MORE YOU</p>
            <h2 className="font-display mt-[calc(var(--u)*8)] text-[calc(var(--u)*46)] leading-[1.05]">Exclusive Offers<br />Just for You</h2>
          </div>
          <Link href="/home" className="absolute bottom-[calc(var(--u)*14)] left-[calc(var(--u)*34)] flex h-[calc(var(--u)*55)] items-center gap-[calc(var(--u)*12)] rounded-full bg-gold-dark px-[calc(var(--u)*30)] text-[calc(var(--u)*24)] text-white">
            Explore Now <ArrowRight className="size-[calc(var(--u)*24)]" />
          </Link>
          <Image src="/images/banner-model.jpg" alt="Model in sunglasses" width={280} height={242} className="absolute bottom-0 left-[calc(var(--u)*470)] h-full w-[calc(var(--u)*300)] object-cover object-top [mask-image:linear-gradient(to_right,transparent,#000_15%)]" />
          <p className="absolute right-[calc(var(--u)*24)] top-[calc(var(--u)*44)] text-[calc(var(--u)*22)] leading-[1.3] text-muted">Better<br />Style<br />Brighter<br />You</p>
        </section>

        <BottomNav active="/profile" cartCount={CART_COUNT} />
      </main>
    </PhoneFrame>
  );
}
