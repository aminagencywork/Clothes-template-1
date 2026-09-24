"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_EMAIL, DEMO_PASSWORD, signIn, signInDemo, signUp } from "@/lib/auth";
import { FOREST } from "@/lib/theme";

type Mode = "signin" | "signup";

const iconCls = "size-[calc(var(--u)*40)] shrink-0";

const copy = {
  signin: {
    greeting: "Welcome Back",
    emoji: "👋",
    greetingSub: "Let's continue",
    image: "/images/auth-signin.jpg",
    imageAlt: "Cream hoodie – Good Things Ahead",
    imageCls: "w-[52%]",
    submit: "Log In",
    switchText: "Don't have an account?",
    switchLabel: "Sign Up",
    switchHref: "/signup",
  },
  signup: {
    greeting: "Join the Vyntra Family",
    emoji: "✨",
    greetingSub: "Style starts here",
    image: "/images/auth-signup.jpg",
    imageAlt: "Black hoodie – Better Days Ahead",
    imageCls: "w-[46%]",
    submit: "Sign Up",
    switchText: "Already have an account?",
    switchLabel: "Log In",
    switchHref: "/signin",
  },
} as const;

function Field({ icon, compact, children }: { icon: ReactNode; compact: boolean; children: ReactNode }) {
  return (
    <label
      className={cn(
        "flex items-center gap-[calc(var(--u)*32)] rounded-[calc(var(--u)*36)] border border-black/10 bg-white/80 px-[calc(var(--u)*42)] text-ink transition-colors focus-within:border-[#3a4a2e]",
        compact ? "h-[calc(var(--u)*106)]" : "h-[calc(var(--u)*112)]",
      )}
    >
      {icon}
      {children}
    </label>
  );
}

const inputCls = "min-w-0 flex-1 bg-transparent text-[calc(var(--u)*30)] text-ink outline-none placeholder:text-muted";

function PasswordInput({ value, onChange, placeholder, autoComplete }: { value: string; onChange: (v: string) => void; placeholder: string; autoComplete: string }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputCls}
      />
      <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)} className="shrink-0 text-ink/80">
        {show ? <EyeOff className={iconCls} strokeWidth={1.6} /> : <Eye className={iconCls} strokeWidth={1.6} />}
      </button>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-[calc(var(--u)*46)] shrink-0" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[calc(var(--u)*46)] shrink-0" aria-hidden>
      <path
        fill="#111"
        d="M16.37 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.21-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8-1.29-1.82-2.32-4.63-2.32-7.28 0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.96 4.45z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[calc(var(--u)*50)] shrink-0" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path fill="#fff" d="m16.67 15.56.53-3.49h-3.33V9.81c0-.96.47-1.89 1.96-1.89h1.51V4.95s-1.37-.24-2.69-.24c-2.74 0-4.53 1.67-4.53 4.7v2.66H7.08v3.49h3.05V24h3.75v-8.44z" />
    </svg>
  );
}

const socials = [
  { label: "Google", icon: <GoogleIcon /> },
  { label: "Apple", icon: <AppleIcon /> },
  { label: "Facebook", icon: <FacebookIcon /> },
];

export function AuthScreen({ mode }: { mode: Mode }) {
  const router = useRouter();
  const c = copy[mode];
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(isSignup ? "" : DEMO_EMAIL);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(isSignup ? "" : DEMO_PASSWORD);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const back = () => (window.history.length > 1 ? router.back() : router.push("/"));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setInfo(null);
    let err: string | null;
    if (isSignup) err = agree ? signUp({ name, email, phone, password }) : "Please accept the Terms & Conditions and Privacy Policy.";
    else err = signIn(email, password);
    setError(err);
    if (!err) router.push("/home");
  };

  const social = () => {
    signInDemo();
    router.push("/home");
  };

  return (
    <div className="flex min-h-dvh justify-center bg-page">
      <main
        className="relative flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-page [container-type:inline-size]"
        style={{ ["--u" as string]: "calc(100cqw / 941)" }}
      >
        {/* hero */}
        <section className={cn("relative px-[calc(var(--u)*56)] pt-[calc(var(--u)*50)]", isSignup ? "pb-[calc(var(--u)*110)]" : "pb-[calc(var(--u)*140)]")}>
          <Image
            src={c.image}
            alt={c.imageAlt}
            width={544}
            height={840}
            priority
            className={cn(
              "pointer-events-none absolute bottom-0 right-0 top-[calc(var(--u)*150)] h-[calc(100%_-_var(--u)*150)] object-cover object-left-top [mask-image:linear-gradient(to_right,transparent,black_22%),linear-gradient(to_bottom,transparent,black_12%)] [mask-composite:intersect]",
              c.imageCls,
            )}
          />

          <div className="relative flex items-start justify-between gap-[calc(var(--u)*24)]">
            <button
              type="button"
              aria-label="Back"
              onClick={back}
              className="grid size-[calc(var(--u)*92)] shrink-0 place-items-center rounded-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition-transform active:scale-95"
            >
              <ArrowLeft className="size-[calc(var(--u)*42)]" strokeWidth={1.8} />
            </button>
            <div className="pt-[calc(var(--u)*10)] text-right">
              <p className="text-[calc(var(--u)*32)] font-semibold leading-tight text-ink">
                {c.greeting} <span aria-hidden>{c.emoji}</span>
              </p>
              <p className="mt-[calc(var(--u)*6)] text-[calc(var(--u)*28)] text-muted">{c.greetingSub}</p>
            </div>
          </div>

          <Image
            src="/images/navbar-logo.png"
            alt="Vyntra – wear a brighter you"
            width={900}
            height={519}
            priority
            className="relative mt-[calc(var(--u)*40)] h-[calc(var(--u)*170)] w-auto"
          />

          {isSignup ? (
            <div className="relative mt-[calc(var(--u)*28)] max-w-[calc(var(--u)*500)]">
              <h1 className="font-display text-[calc(var(--u)*76)] leading-[1.05] text-ink">
                Create
                <br />
                Your Account
              </h1>
              <p className="mt-[calc(var(--u)*22)] text-[calc(var(--u)*31)] leading-snug text-muted">
                Join us and explore a world
                <br />
                of comfort and style.
              </p>
            </div>
          ) : (
            <div className="relative mt-[calc(var(--u)*34)]">
              <h1 className="font-display text-[calc(var(--u)*86)] leading-none text-ink">Log In</h1>
              <p className="mt-[calc(var(--u)*14)] font-display text-[calc(var(--u)*50)] leading-tight text-ink">to your account</p>
              <p className="mt-[calc(var(--u)*34)] text-[calc(var(--u)*31)] leading-snug text-muted">
                Your style. Your space.
                <br />
                Let&apos;s get you back.
              </p>
            </div>
          )}
        </section>

        {/* sheet */}
        <section className="relative z-10 -mt-[calc(var(--u)*56)] flex flex-1 flex-col rounded-t-[calc(var(--u)*70)] bg-white px-[calc(var(--u)*53)] pb-[calc(var(--u)*60_+_env(safe-area-inset-bottom))] pt-[calc(var(--u)*38)] shadow-[0_-10px_30px_rgba(35,45,25,0.06)]">
          <form onSubmit={submit} noValidate>
            <div className={isSignup ? "space-y-[calc(var(--u)*16)]" : "space-y-[calc(var(--u)*26)]"}>
              {isSignup && (
                <Field compact icon={<User className={iconCls} strokeWidth={1.6} />}>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" autoComplete="name" className={inputCls} />
                </Field>
              )}
              <Field compact={isSignup} icon={<Mail className={iconCls} strokeWidth={1.6} />}>
                <input
                  type={isSignup ? "email" : "text"}
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSignup ? "Email Address" : "Email or Mobile Number"}
                  autoComplete={isSignup ? "email" : "username"}
                  className={inputCls}
                />
              </Field>
              {isSignup && (
                <Field compact icon={<Phone className={iconCls} strokeWidth={1.6} />}>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile Number" autoComplete="tel" className={inputCls} />
                </Field>
              )}
              <Field compact={isSignup} icon={<Lock className={iconCls} strokeWidth={1.6} />}>
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder={isSignup ? "Create Password" : "Password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </Field>
            </div>

            {isSignup ? (
              <label className="mt-[calc(var(--u)*30)] flex cursor-pointer items-center gap-[calc(var(--u)*20)] text-[calc(var(--u)*27)] text-muted">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="peer sr-only" />
                <span className="grid size-[calc(var(--u)*44)] shrink-0 place-items-center rounded-[calc(var(--u)*10)] border-2 border-[#3a4a2e] bg-white text-white transition-colors peer-checked:bg-[#3a4a2e] peer-focus-visible:ring-2 peer-focus-visible:ring-black/30">
                  <Check className="size-[calc(var(--u)*30)]" strokeWidth={3} />
                </span>
                <span>
                  I agree to the <span className="font-semibold text-ink">Terms &amp; Conditions</span> and{" "}
                  <span className="font-semibold text-ink">Privacy Policy</span>
                </span>
              </label>
            ) : (
              <div className="mt-[calc(var(--u)*30)] text-right">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setInfo(`Demo account: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
                  }}
                  className="text-[calc(var(--u)*30)] font-medium text-ink"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {(error || info) && (
              <p role={error ? "alert" : "status"} className={cn("mt-[calc(var(--u)*24)] text-center text-[calc(var(--u)*26)]", error ? "text-[#e5232f]" : "text-muted")}>
                {error ?? info}
              </p>
            )}

            <button
              type="submit"
              className={cn(
                "flex w-full items-center justify-center gap-[calc(var(--u)*26)] rounded-full font-display text-[calc(var(--u)*38)] text-page shadow-[0_10px_26px_rgba(58,74,46,0.28)] transition-transform active:scale-[0.98]",
                isSignup ? "mt-[calc(var(--u)*38)] h-[calc(var(--u)*125)]" : "mt-[calc(var(--u)*44)] h-[calc(var(--u)*130)]",
              )}
              style={{ background: FOREST }}
            >
              {c.submit}
              <ArrowRight className="size-[calc(var(--u)*46)]" strokeWidth={1.8} />
            </button>
          </form>

          <div className="mt-[calc(var(--u)*50)] flex items-center gap-[calc(var(--u)*40)] text-[calc(var(--u)*28)] text-muted">
            <span className="h-px flex-1 bg-black/15" />
            or continue with
            <span className="h-px flex-1 bg-black/15" />
          </div>

          <div className="mt-[calc(var(--u)*40)] grid grid-cols-3 gap-[calc(var(--u)*18)]">
            {socials.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={social}
                className="flex h-[calc(var(--u)*104)] items-center justify-center gap-[calc(var(--u)*18)] rounded-full bg-white text-[calc(var(--u)*28)] font-medium text-ink ring-1 ring-black/[0.08] transition-transform active:scale-95"
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>

          <p className="mt-auto pt-[calc(var(--u)*64)] text-center text-[calc(var(--u)*30)] text-muted">
            {c.switchText}
            <Link href={c.switchHref} replace className="ml-[calc(var(--u)*24)] font-semibold" style={{ color: FOREST }}>
              {c.switchLabel}
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
