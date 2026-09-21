import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from a phone on the same Wi-Fi.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  async headers() {
    return [
      // Always revalidate the service worker so updates roll out immediately.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }, { key: "Content-Type", value: "application/javascript; charset=utf-8" }] },
    ];
  },
};

export default nextConfig;
