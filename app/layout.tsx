import type { Metadata, Viewport } from "next";
import { DM_Sans, Gloock } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/service-worker-register";

const gloock = Gloock({
  variable: "--font-gloock",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vyntra – Wear a Brighter You",
  description: "Shop men's, women's, kids' clothing, shoes and accessories.",
  applicationName: "Vyntra",
  appleWebApp: { capable: true, title: "Vyntra", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${dmSans.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
