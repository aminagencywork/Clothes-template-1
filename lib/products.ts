export type Category = "Men's" | "Women's" | "Kids" | "Shoes" | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  rating: number;
  popular?: boolean;
  isNew?: boolean;
  /** taller card in the Popular row */
  tall?: boolean;
  gallery?: string[];
};

export const categories: ("All" | Category)[] = ["All", "Men's", "Women's", "Kids", "Shoes", "Accessories"];

export const products: Product[] = [
  { id: "casual-shirt", name: "Casual shirt", category: "Men's", price: 199, image: "/images/product-1.jpg", colors: ["#f3f0e8", "#dcc8a5", "#7f8a5c"], rating: 4.7, popular: true },
  { id: "tie-a-formal-shirt", name: "Tie a formal shirt", category: "Men's", price: 249, image: "/images/product-2.jpg", colors: ["#7f97b5", "#e2cfa8", "#1c2a44"], rating: 4.8, popular: true, tall: true },
  { id: "formal-shirt", name: "Formal shirt", category: "Men's", price: 189, image: "/images/product-3.jpg", colors: ["#7a2e34", "#b89870", "#3f4a33"], rating: 4.6, popular: true },
  { id: "knit-sweater", name: "Chunky knit sweater", category: "Women's", price: 159, image: "/images/p-sweater.jpg", colors: ["#e2cfb0", "#c9b79c", "#8a7a63"], rating: 4.9, popular: true },
  { id: "kids-sweatshirt", name: "Smiley sweatshirt", category: "Kids", price: 59, image: "/images/p-kids.jpg", colors: ["#e6dccb", "#a9b7c7", "#c8a37a"], rating: 4.8, popular: true },
  { id: "leather-sneakers", name: "Court sneakers", category: "Shoes", price: 129, image: "/images/p-sneakers.jpg", colors: ["#f1ece1", "#231a10", "#b8a58a"], rating: 4.7, popular: true },
  { id: "watch-set", name: "Classic watch", category: "Accessories", price: 219, oldPrice: 259, image: "/images/p-watch.jpg", colors: ["#231a10", "#8a8a86"], rating: 4.5, popular: true },

  { id: "air-force-1", name: "Air Force 1", category: "Shoes", price: 149, oldPrice: 179, image: "/images/p-air-force.jpg", colors: ["#ffffff", "#a9a9a9", "#111111", "#d8c3b0"], rating: 4.8 },
  { id: "white-formal", name: "Formal Shirt", category: "Men's", price: 578.9, oldPrice: 659, image: "/images/p-formal.jpg", gallery: ["/images/pd-1.jpg", "/images/pd-2.jpg", "/images/pd-3.jpg", "/images/pd-4.jpg"], colors: ["#ffffff", "#b7cde6", "#e4dccd", "#1c2a44", "#6b7050"], rating: 4.8, isNew: true },
  { id: "blue-casual", name: "Casual Shirt", category: "Men's", price: 294.29, oldPrice: 349, image: "/images/p-casual-blue.jpg", colors: ["#a9c3e6", "#ffffff", "#e4dccd", "#1c2a44"], rating: 4.6, isNew: true },
  { id: "dress-shirt", name: "Dress Shirt", category: "Men's", price: 269.41, oldPrice: 319, image: "/images/p-dress.jpg", colors: ["#7a2e34", "#1c2a44", "#c4c4c0", "#111111"], rating: 4.7, isNew: true },
  { id: "linen-shirt", name: "Linen Shirt", category: "Men's", price: 310, oldPrice: 399, image: "/images/p-linen.jpg", colors: ["#7c8563", "#dccbb2", "#a9c3e6", "#ffffff"], rating: 4.9, isNew: true },
  { id: "white-oxford", name: "Oxford Shirt", category: "Men's", price: 179, image: "/images/p-white-shirt.jpg", colors: ["#ffffff", "#b7cde6", "#c9b79c"], rating: 4.5, isNew: true },
  { id: "knit-sweater-2", name: "Turtleneck Knit", category: "Women's", price: 139, oldPrice: 169, image: "/images/p-sweater.jpg", colors: ["#e2cfb0", "#7c6a55"], rating: 4.8, isNew: true },
  { id: "spring-arrivals", name: "Layered Basics", category: "Women's", price: 99, image: "/images/p-arrivals.jpg", colors: ["#c9b79c", "#f1ece1", "#3f4a33"], rating: 4.4, isNew: true },
];

export function discountPercent(p: Product) {
  return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
}

/** Gallery images: explicit `gallery`, else the main photo plus three detail crops (public/images/g). */
export function galleryFor(p: Product): string[] {
  if (p.gallery) return p.gallery;
  const stem = p.image.split("/").pop()!.replace(".jpg", "");
  return [p.image, ...[2, 3, 4].map((n) => `/images/g/${stem}-${n}.jpg`)];
}

/** Same category first, then the rest; never the product itself. */
export function similarProducts(p: Product, limit = 6): Product[] {
  const others = products.filter((x) => x.id !== p.id && x.image !== p.image);
  const same = others.filter((x) => x.category === p.category);
  return [...same, ...others.filter((x) => x.category !== p.category)].slice(0, limit);
}
