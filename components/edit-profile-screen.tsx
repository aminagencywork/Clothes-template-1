"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Calendar, Camera, Check, ChevronDown, FileText, Mail, Phone, User } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { saveProfile, useProfile, type Profile } from "@/lib/profile";

const BIO_MAX = 150;
const field = "flex items-center gap-[calc(var(--u)*30)] rounded-[calc(var(--u)*22)] border border-black/10 bg-white/80 px-[calc(var(--u)*28)]";
const icon = "size-[calc(var(--u)*44)] shrink-0";
const input = "min-w-0 flex-1 bg-transparent text-[calc(var(--u)*29)] outline-none";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-[calc(var(--u)*30)] block">
      <span className="text-[calc(var(--u)*26)] text-muted">{label}</span>
      <div className="mt-[calc(var(--u)*12)]">{children}</div>
    </label>
  );
}

/** Downscale a picked photo so it fits comfortably in localStorage. */
function toDataUrl(file: File, size = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, size / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function EditProfileScreen() {
  const router = useRouter();
  const saved = useProfile();
  // Edits live in `draft`; until the first edit the form simply mirrors the saved profile.
  const [draft, setDraft] = useState<Profile | null>(null);
  const form = draft ?? saved;
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [done, setDone] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setDraft({ ...form, [k]: v });
  const dobLabel = form.dob ? new Date(`${form.dob}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Select date";
  const valid = form.name.trim().length > 1 && form.phone.replace(/\D/g, "").length >= 8;

  const onPhoto = async (f?: File) => {
    if (!f) return;
    try {
      set("photo", await toDataUrl(f));
    } catch {}
  };

  const save = () => {
    if (!valid) return;
    saveProfile({ ...form, name: form.name.trim(), bio: form.bio.trim() });
    setDone(true);
    setTimeout(() => router.push("/profile"), 700);
  };

  return (
    <PhoneFrame>
      <main className="px-[calc(var(--u)*40)] pb-[calc(var(--u)*80)] pt-[calc(var(--u)*80)]">
        <header className="flex items-start justify-between px-[calc(var(--u)*12)]">
          <div>
            <button type="button" aria-label="Back" onClick={() => router.back()} className="-ml-[calc(var(--u)*6)] block">
              <ArrowLeft className="size-[calc(var(--u)*46)]" strokeWidth={1.6} />
            </button>
            <h1 className="font-display mt-[calc(var(--u)*30)] text-[calc(var(--u)*70)] leading-none">Edit Profile</h1>
            <p className="mt-[calc(var(--u)*16)] text-[calc(var(--u)*29)] text-muted">Keep your information up to date</p>
          </div>
          <Image src="/images/home-logo.jpg" alt="Vyntra – wear a brighter you" width={290} height={135} className="mt-[calc(var(--u)*10)] h-[calc(var(--u)*110)] w-auto mix-blend-multiply" />
        </header>

        <section className="relative mt-[calc(var(--u)*34)] flex h-[calc(var(--u)*250)] items-center overflow-hidden rounded-[calc(var(--u)*30)] bg-gradient-to-br from-[#f4efe6] to-[#ebe3d3] px-[calc(var(--u)*28)]">
          <div className="relative size-[calc(var(--u)*204)] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.photo} alt={form.name} className="size-full rounded-full border-[calc(var(--u)*4)] border-white object-cover" />
            <button type="button" aria-label="Change photo" onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 grid size-[calc(var(--u)*62)] place-items-center rounded-full bg-gold-dark text-white shadow">
              <Camera className="size-[calc(var(--u)*32)]" strokeWidth={1.7} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onPhoto(e.target.files?.[0])} />
          </div>
          <div className="ml-[calc(var(--u)*56)] min-w-0">
            <h2 className="font-display truncate text-[calc(var(--u)*42)] leading-tight">{form.name || "Your name"}</h2>
            <p className="mt-[calc(var(--u)*10)] text-[calc(var(--u)*27)] text-muted">Update your photo</p>
          </div>
          <p className="font-display absolute right-[calc(var(--u)*40)] top-[calc(var(--u)*50)] text-[calc(var(--u)*34)] italic leading-[1.25] text-muted/80">Good<br />Style<br />Better<br />You</p>
        </section>

        <Row label="Full Name">
          <div className={`${field} h-[calc(var(--u)*82)]`}>
            <User className={icon} strokeWidth={1.4} />
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className={input} autoComplete="name" />
          </div>
        </Row>

        <Row label="Email Address">
          <div className={`${field} h-[calc(var(--u)*82)] bg-black/[0.03] pr-[calc(var(--u)*14)]`}>
            <Mail className={icon} strokeWidth={1.4} />
            <input value={form.email} readOnly className={`${input} text-muted`} />
            <span className="flex items-center gap-[calc(var(--u)*10)] rounded-full bg-[#e3f2e3] px-[calc(var(--u)*24)] py-[calc(var(--u)*14)] text-[calc(var(--u)*25)] text-[#2d6a3a]">
              <span className="grid size-[calc(var(--u)*34)] place-items-center rounded-full bg-[#2d8a4a] text-white"><Check className="size-[calc(var(--u)*22)]" strokeWidth={3} /></span>
              Verified
            </span>
          </div>
        </Row>

        <Row label="Phone Number">
          <div className={`${field} h-[calc(var(--u)*82)] pr-[calc(var(--u)*14)]`}>
            <Phone className={icon} strokeWidth={1.4} />
            <input ref={phoneRef} value={form.phone} readOnly={!phoneEditable} onChange={(e) => set("phone", e.target.value)} inputMode="tel" className={input} />
            <button
              type="button"
              onClick={() => {
                setPhoneEditable(true);
                setTimeout(() => phoneRef.current?.focus(), 0);
              }}
              className="rounded-[calc(var(--u)*18)] border border-gold-dark px-[calc(var(--u)*30)] py-[calc(var(--u)*12)] text-[calc(var(--u)*27)] font-medium text-gold-dark"
            >
              Change
            </button>
          </div>
        </Row>

        <Row label="Date of Birth">
          <div className={`${field} relative h-[calc(var(--u)*82)]`}>
            <Calendar className={icon} strokeWidth={1.4} />
            <span className="flex-1 text-[calc(var(--u)*29)]">{dobLabel}</span>
            <ChevronDown className="size-[calc(var(--u)*40)]" strokeWidth={1.5} />
            <input type="date" value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => set("dob", e.target.value)} aria-label="Date of birth" className="absolute inset-0 cursor-pointer opacity-0" />
          </div>
        </Row>

        <Row label="Gender">
          <div className={`${field} relative h-[calc(var(--u)*82)]`}>
            <User className={icon} strokeWidth={1.4} />
            <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="min-w-0 flex-1 appearance-none bg-transparent text-[calc(var(--u)*29)] outline-none">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
            <ChevronDown className="pointer-events-none size-[calc(var(--u)*40)]" strokeWidth={1.5} />
          </div>
        </Row>

        <Row label="Bio (Optional)">
          <div className={`${field} h-[calc(var(--u)*160)] items-start pt-[calc(var(--u)*26)]`}>
            <FileText className={icon} strokeWidth={1.4} />
            <textarea value={form.bio} maxLength={BIO_MAX} onChange={(e) => set("bio", e.target.value)} className={`${input} h-full resize-none`} />
          </div>
          <p className="mt-[calc(var(--u)*12)] text-right text-[calc(var(--u)*25)] text-muted">{form.bio.length}/{BIO_MAX}</p>
        </Row>

        <button
          type="button"
          onClick={save}
          disabled={!valid || done}
          className="mt-[calc(var(--u)*30)] flex h-[calc(var(--u)*100)] w-full items-center justify-center gap-[calc(var(--u)*20)] rounded-[calc(var(--u)*24)] bg-gold-dark text-[calc(var(--u)*32)] font-medium text-white transition-opacity disabled:opacity-60"
        >
          {done ? <>Saved <Check className="size-[calc(var(--u)*38)]" /></> : <>Save Changes <ArrowRight className="size-[calc(var(--u)*38)]" /></>}
        </button>
      </main>
    </PhoneFrame>
  );
}
