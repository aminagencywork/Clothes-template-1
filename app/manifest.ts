import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vyntra – Wear a Brighter You",
    short_name: "Vyntra",
    description: "Shop men's, women's, kids' clothing, shoes and accessories.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fbf9f4",
    theme_color: "#fbf9f4",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Categories", url: "/categories" },
      { name: "My Cart", url: "/cart" },
      { name: "Wishlist", url: "/wishlist" },
    ],
  };
}
