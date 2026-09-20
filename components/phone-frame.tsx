import type { ReactNode } from "react";

// Phone-style column. `--u` = 1 design pixel of the 941px-wide reference.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-page">
      <div
        className="relative min-h-dvh w-full max-w-[430px] bg-page [container-type:inline-size]"
        style={{ ["--u" as string]: "calc(100cqw / 941)" }}
      >
        {children}
      </div>
    </div>
  );
}
