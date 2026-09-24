"use client";

// Dummy auth for the demo — no backend yet. Accounts and the session live in localStorage.

export const DEMO_EMAIL = "demo@vyntra.com";
export const DEMO_PASSWORD = "vyntra123";
const DEMO_PHONE = "9876543210";

export type Account = { name: string; email: string; phone: string; password: string };

const ACCOUNTS_KEY = "accounts";
const SESSION_KEY = "session";

const DEMO_ACCOUNT: Account = { name: "Demo User", email: DEMO_EMAIL, phone: DEMO_PHONE, password: DEMO_PASSWORD };

const digits = (s: string) => s.replace(/\D/g, "");

function accounts(): Account[] {
  try {
    return [DEMO_ACCOUNT, ...JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]")];
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function startSession(account: Account) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: account.email, name: account.name }));
  } catch {}
}

/** `id` is an email or a mobile number. Returns an error message, or null on success. */
export function signIn(id: string, password: string): string | null {
  const key = id.trim().toLowerCase();
  if (!key || !password) return "Please enter your email and password.";
  const account = accounts().find(
    (a) => a.email.toLowerCase() === key || (digits(key).length >= 10 && digits(a.phone).endsWith(digits(key).slice(-10))),
  );
  if (!account || account.password !== password) return "Incorrect email or password.";
  startSession(account);
  return null;
}

export function signInDemo() {
  startSession(DEMO_ACCOUNT);
}

export function signUp(account: Account): string | null {
  const email = account.email.trim().toLowerCase();
  if (!account.name.trim()) return "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address.";
  if (digits(account.phone).length < 10) return "Please enter a valid mobile number.";
  if (account.password.length < 6) return "Password must be at least 6 characters.";
  if (accounts().some((a) => a.email.toLowerCase() === email)) return "An account with this email already exists.";
  const next = { ...account, name: account.name.trim(), email };
  try {
    const saved = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...saved, next]));
  } catch {}
  startSession(next);
  return null;
}
