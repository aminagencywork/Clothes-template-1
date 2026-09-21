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
  /** sub-category shown as a chip on the collection screen */
  types?: string[];
};

export const categories: ("All" | Category)[] = ["All", "Men's", "Women's", "Kids", "Shoes", "Accessories"];

export const products: Product[] = [
  { id: "casual-shirt", name: "Casual shirt", category: "Men's", types: ["Shirts"], price: 199, image: "/images/product-1.jpg", colors: ["#f3f0e8", "#dcc8a5", "#7f8a5c"], rating: 4.7, popular: true },
  { id: "tie-a-formal-shirt", name: "Tie a formal shirt", category: "Men's", types: ["Shirts"], price: 249, image: "/images/product-2.jpg", colors: ["#7f97b5", "#e2cfa8", "#1c2a44"], rating: 4.8, popular: true, tall: true },
  { id: "formal-shirt", name: "Formal shirt", category: "Men's", types: ["Shirts"], price: 189, image: "/images/product-3.jpg", colors: ["#7a2e34", "#b89870", "#3f4a33"], rating: 4.6, popular: true },
  { id: "knit-sweater", name: "Chunky knit sweater", category: "Women's", types: ["Winter Wear", "Tops"], price: 159, image: "/images/p-sweater.jpg", colors: ["#e2cfb0", "#c9b79c", "#8a7a63"], rating: 4.9, popular: true },
  { id: "kids-sweatshirt", name: "Smiley sweatshirt", category: "Kids", types: ["Tops"], price: 59, image: "/images/p-kids.jpg", colors: ["#e6dccb", "#a9b7c7", "#c8a37a"], rating: 4.8, popular: true },
  { id: "leather-sneakers", name: "Court sneakers", category: "Shoes", price: 129, image: "/images/p-sneakers.jpg", colors: ["#f1ece1", "#231a10", "#b8a58a"], rating: 4.7, popular: true },
  { id: "watch-set", name: "Classic watch", category: "Accessories", price: 219, oldPrice: 259, image: "/images/p-watch.jpg", colors: ["#231a10", "#8a8a86"], rating: 4.5, popular: true },

  { id: "air-force-1", name: "Air Force 1", category: "Shoes", price: 149, oldPrice: 179, image: "/images/p-air-force.jpg", colors: ["#ffffff", "#a9a9a9", "#111111", "#d8c3b0"], rating: 4.8 },
  { id: "white-formal", name: "Formal Shirt", category: "Men's", types: ["Shirts"], price: 578.9, oldPrice: 659, image: "/images/p-formal.jpg", gallery: ["/images/pd-1.jpg", "/images/pd-2.jpg", "/images/pd-3.jpg", "/images/pd-4.jpg"], colors: ["#ffffff", "#b7cde6", "#e4dccd", "#1c2a44", "#6b7050"], rating: 4.8, isNew: true },
  { id: "blue-casual", name: "Casual Shirt", category: "Men's", types: ["Shirts"], price: 294.29, oldPrice: 349, image: "/images/p-casual-blue.jpg", colors: ["#a9c3e6", "#ffffff", "#e4dccd", "#1c2a44"], rating: 4.6, isNew: true },
  { id: "dress-shirt", name: "Dress Shirt", category: "Men's", types: ["Shirts"], price: 269.41, oldPrice: 319, image: "/images/p-dress.jpg", colors: ["#7a2e34", "#1c2a44", "#c4c4c0", "#111111"], rating: 4.7, isNew: true },
  { id: "linen-shirt", name: "Linen Shirt", category: "Men's", types: ["Shirts"], price: 310, oldPrice: 399, image: "/images/p-linen.jpg", colors: ["#7c8563", "#dccbb2", "#a9c3e6", "#ffffff"], rating: 4.9, isNew: true },
  { id: "white-oxford", name: "Oxford Shirt", category: "Men's", types: ["Shirts"], price: 179, image: "/images/p-white-shirt.jpg", colors: ["#ffffff", "#b7cde6", "#c9b79c"], rating: 4.5, isNew: true },
  { id: "knit-sweater-2", name: "Turtleneck Knit", category: "Women's", types: ["Winter Wear", "Tops"], price: 139, oldPrice: 169, image: "/images/p-sweater.jpg", colors: ["#e2cfb0", "#7c6a55"], rating: 4.8, isNew: true },
  { id: "spring-arrivals", name: "Layered Basics", category: "Women's", types: ["Tops"], price: 99, image: "/images/p-arrivals.jpg", colors: ["#c9b79c", "#f1ece1", "#3f4a33"], rating: 4.4, isNew: true },
  { id: "slim-polo", name: "Slim Fit Polo T-Shirt", category: "Men's", types: ["T-Shirts"], price: 799, oldPrice: 999, image: "/images/m-polo.jpg", gallery: ["/images/m-polo.jpg"], colors: ["#1c2a44", "#111111", "#c4c4c0", "#3f4a33"], rating: 4.7 },
  { id: "crew-tee", name: "Classic Crew Tee", category: "Men's", types: ["T-Shirts"], price: 499, oldPrice: 649, image: "/images/m-polo.jpg", gallery: ["/images/m-polo.jpg"], colors: ["#ffffff", "#111111", "#7f97b5"], rating: 4.5 },
  { id: "graphic-tee", name: "Everyday Cotton Tee", category: "Men's", types: ["T-Shirts"], price: 549, image: "/images/m-polo.jpg", gallery: ["/images/m-polo.jpg"], colors: ["#3f4a33", "#e4dccd", "#1c2a44"], rating: 4.4 },
  { id: "regular-jeans", name: "Regular Fit Jeans", category: "Men's", types: ["Jeans"], price: 1199, oldPrice: 1699, image: "/images/m-jeans.jpg", gallery: ["/images/m-jeans.jpg"], colors: ["#3b4a63", "#111111", "#c4c4c0", "#3f4a33"], rating: 4.6 },
  { id: "slim-jeans", name: "Slim Fit Denim", category: "Men's", types: ["Jeans"], price: 1399, oldPrice: 1899, image: "/images/m-jeans.jpg", gallery: ["/images/m-jeans.jpg"], colors: ["#1c2a44", "#7f97b5", "#111111"], rating: 4.7 },
  { id: "straight-jeans", name: "Straight Blue Jeans", category: "Men's", types: ["Jeans"], price: 1099, image: "/images/m-jeans.jpg", gallery: ["/images/m-jeans.jpg"], colors: ["#5b76a3", "#1c2a44"], rating: 4.4 },
  { id: "formal-trousers", name: "Formal Trousers", category: "Men's", types: ["Trousers"], price: 1299, oldPrice: 1799, image: "/images/m-trousers.jpg", gallery: ["/images/m-trousers.jpg"], colors: ["#2b2b2b", "#1c2a44", "#c9b79c", "#3f4a33"], rating: 4.6 },
  { id: "chino-trousers", name: "Stretch Chinos", category: "Men's", types: ["Trousers"], price: 999, oldPrice: 1399, image: "/images/m-trousers.jpg", gallery: ["/images/m-trousers.jpg"], colors: ["#c9b79c", "#3f4a33", "#111111"], rating: 4.5 },
  { id: "pleated-trousers", name: "Pleated Trousers", category: "Men's", types: ["Trousers"], price: 1499, image: "/images/m-trousers.jpg", gallery: ["/images/m-trousers.jpg"], colors: ["#111111", "#7a7a76"], rating: 4.3 },
  { id: "hooded-jacket", name: "Hooded Jacket", category: "Men's", types: ["Jackets"], price: 1699, oldPrice: 1999, image: "/images/m-jacket.jpg", gallery: ["/images/m-jacket.jpg"], colors: ["#3f4a33", "#111111", "#c4c4c0", "#1c2a44"], rating: 4.8 },
  { id: "bomber-jacket", name: "Bomber Jacket", category: "Men's", types: ["Jackets"], price: 1899, oldPrice: 2399, image: "/images/m-jacket.jpg", gallery: ["/images/m-jacket.jpg"], colors: ["#1c2a44", "#6b7050", "#111111"], rating: 4.6 },
  { id: "utility-jacket", name: "Utility Jacket", category: "Men's", types: ["Jackets"], price: 1599, image: "/images/m-jacket.jpg", gallery: ["/images/m-jacket.jpg"], colors: ["#7c8563", "#c9b79c"], rating: 4.4 },
  { id: "mens-kurta", name: "Men's Kurta", category: "Men's", types: ["Ethnic Wear"], price: 1499, oldPrice: 1999, image: "/images/m-kurta.jpg", gallery: ["/images/m-kurta.jpg"], colors: ["#c9b79c", "#7a2e34", "#e4dccd", "#a9c3a0"], rating: 4.7 },
  { id: "linen-kurta", name: "Linen Kurta", category: "Men's", types: ["Ethnic Wear"], price: 1299, image: "/images/m-kurta.jpg", gallery: ["/images/m-kurta.jpg"], colors: ["#e4dccd", "#a9c3e6"], rating: 4.5 },
  { id: "boys-hoodie", name: "Boys Hoodie", category: "Kids", types: ["Boys", "Tops", "Winter Wear"], price: 699, oldPrice: 899, image: "/images/k-hoodie.jpg", gallery: ["/images/k-hoodie.jpg"], colors: ["#1c2a44", "#111111", "#c4c4c0", "#6b7050"], rating: 4.8 },
  { id: "boys-tshirt", name: "Boys T-Shirt", category: "Kids", types: ["Boys", "Tops"], price: 499, oldPrice: 599, image: "/images/k-tee.jpg", gallery: ["/images/k-tee.jpg"], colors: ["#1c2a44", "#111111", "#7c8563", "#6b7050"], rating: 4.6 },
  { id: "boys-fleece", name: "Boys Fleece Pullover", category: "Kids", types: ["Boys", "Tops", "Winter Wear"], price: 799, image: "/images/k-hoodie.jpg", gallery: ["/images/k-hoodie.jpg"], colors: ["#3f4a33", "#1c2a44"], rating: 4.5 },
  { id: "girls-dress", name: "Girls Floral Dress", category: "Kids", types: ["Girls", "Dresses"], price: 899, oldPrice: 1199, image: "/images/k-dress.jpg", gallery: ["/images/k-dress.jpg"], colors: ["#f0b8c6", "#f3e6d8", "#c9d3c2", "#c9a8e0"], rating: 4.9 },
  { id: "girls-party", name: "Girls Party Dress", category: "Kids", types: ["Girls", "Dresses"], price: 1299, oldPrice: 1699, image: "/images/k-party.jpg", gallery: ["/images/k-party.jpg"], colors: ["#e0b8f0", "#f0b8c6", "#f3e6d8"], rating: 4.8 },
  { id: "girls-top", name: "Girls Ruffle Top", category: "Kids", types: ["Girls", "Tops"], price: 549, image: "/images/k-dress.jpg", gallery: ["/images/k-dress.jpg"], colors: ["#f0b8c6", "#ffffff"], rating: 4.4 },
  { id: "infant-set", name: "Infant Clothing Set", category: "Kids", types: ["Infants (0-2)", "Winter Wear", "Tops"], price: 599, oldPrice: 799, image: "/images/k-set.jpg", gallery: ["/images/k-set.jpg"], colors: ["#b89870", "#8a5a2e", "#f3e6d8", "#c9a36a"], rating: 4.7 },
  { id: "baby-romper", name: "Baby Romper", category: "Kids", types: ["Infants (0-2)", "Bottoms"], price: 799, oldPrice: 999, image: "/images/k-romper.jpg", gallery: ["/images/k-romper.jpg"], colors: ["#7f97b5", "#3a3a3a", "#a9c3e6", "#c9a36a"], rating: 4.7 },
  { id: "kids-joggers", name: "Kids Joggers", category: "Kids", types: ["Bottoms", "Boys"], price: 449, oldPrice: 599, image: "/images/k-set.jpg", gallery: ["/images/k-set.jpg"], colors: ["#8a5a2e", "#111111", "#c4c4c0"], rating: 4.5 },
  { id: "kids-denim-shorts", name: "Denim Dungarees", category: "Kids", types: ["Bottoms", "Girls"], price: 899, image: "/images/k-romper.jpg", gallery: ["/images/k-romper.jpg"], colors: ["#7f97b5", "#1c2a44"], rating: 4.6 },
  { id: "kids-parka", name: "Kids Puffer Jacket", category: "Kids", types: ["Winter Wear", "Boys", "Girls"], price: 1499, oldPrice: 1999, image: "/images/k-hoodie.jpg", gallery: ["/images/k-hoodie.jpg"], colors: ["#1c2a44", "#a9463a", "#e4dccd"], rating: 4.8 },
  { id: "puff-top", name: "Puff Sleeve Top", category: "Women's", types: ["Tops"], price: 799, oldPrice: 999, image: "/images/w-puff.jpg", gallery: ["/images/w-puff.jpg"], colors: ["#ffffff", "#dcc8a5", "#e8b4bc", "#111111"], rating: 4.7 },
  { id: "floral-dress", name: "Floral Dress", category: "Women's", types: ["Dresses"], price: 1299, oldPrice: 1699, image: "/images/w-floral.jpg", gallery: ["/images/w-floral.jpg"], colors: ["#e8a0ae", "#9fd0c0", "#f0e6d2", "#2b3f6b"], rating: 4.8 },
  { id: "ribbed-top", name: "Ribbed Knit Top", category: "Women's", types: ["Tops", "Winter Wear"], price: 899, oldPrice: 1199, image: "/images/w-ribbed.jpg", gallery: ["/images/w-ribbed.jpg"], colors: ["#111111", "#b8b8b8", "#f0e6d2", "#7a2e34"], rating: 4.6 },
  { id: "maxi-dress", name: "Maxi Dress", category: "Women's", types: ["Dresses"], price: 1499, oldPrice: 1799, image: "/images/w-maxi.jpg", gallery: ["/images/w-maxi.jpg"], colors: ["#4f7a55", "#e8a0ae", "#f0e6d2", "#1c2a44"], rating: 4.8 },
  { id: "wide-pants", name: "Wide Leg Pants", category: "Women's", types: ["Bottoms"], price: 999, oldPrice: 1299, image: "/images/w-wide.jpg", gallery: ["/images/w-wide.jpg"], colors: ["#e4d6bd", "#111111", "#7c8563", "#a89880"], rating: 4.5 },
  { id: "emb-kurti", name: "Embroidered Kurti", category: "Women's", types: ["Ethnic Wear", "Tops"], price: 1199, image: "/images/w-kurti.jpg", gallery: ["/images/w-kurti.jpg"], colors: ["#c3a6dd", "#d9646e", "#8fd0b8", "#f0e6d2"], rating: 4.7, isNew: true },
  { id: "active-leggings", name: "Active Fit Leggings", category: "Women's", types: ["Active Wear", "Bottoms"], price: 699, oldPrice: 899, image: "/images/w-wide.jpg", gallery: ["/images/w-wide.jpg"], colors: ["#111111", "#4f7a55"], rating: 4.4 },
  { id: "active-tee", name: "Active Ribbed Tee", category: "Women's", types: ["Active Wear", "Tops"], price: 599, image: "/images/w-ribbed.jpg", gallery: ["/images/w-ribbed.jpg"], colors: ["#111111", "#ffffff"], rating: 4.3 },
  { id: "ethnic-set", name: "Printed Kurta Set", category: "Women's", types: ["Ethnic Wear"], price: 1699, oldPrice: 2199, image: "/images/w-kurti.jpg", gallery: ["/images/w-kurti.jpg"], colors: ["#c3a6dd", "#e8a0ae"], rating: 4.6 },
  { id: "cardigan", name: "Knit Cardigan", category: "Women's", types: ["Winter Wear", "Tops"], price: 1399, image: "/images/w-ribbed.jpg", gallery: ["/images/w-ribbed.jpg"], colors: ["#e4d6bd", "#7a2e34"], rating: 4.5 },
  { id: "casual-sneakers", name: "Casual Sneakers", category: "Shoes", types: ["Sneakers", "Casual"], price: 1599, oldPrice: 1999, image: "/images/s-casual.jpg", gallery: ["/images/s-casual.jpg"], colors: ["#2b4a8c", "#8a8a8a", "#111111", "#c4c4c4"], rating: 4.6 },
  { id: "running-shoes", name: "Running Shoes", category: "Shoes", types: ["Running", "Sports"], price: 1899, oldPrice: 2499, image: "/images/s-running.jpg", gallery: ["/images/s-running.jpg"], colors: ["#111111", "#1c2a44", "#222222"], rating: 4.7 },
  { id: "formal-shoes", name: "Formal Shoes", category: "Shoes", types: ["Formal"], price: 2299, oldPrice: 2999, image: "/images/s-formal.jpg", gallery: ["/images/s-formal.jpg"], colors: ["#1f1f1f", "#2b2b2b", "#3f3a2f"], rating: 4.5 },
  { id: "sports-shoes", name: "Sports Shoes", category: "Shoes", types: ["Sports", "Running"], price: 1699, oldPrice: 1999, image: "/images/s-sports.jpg", gallery: ["/images/s-sports.jpg"], colors: ["#1c2a44", "#6b6b6b", "#7a2e34"], rating: 4.6 },
  { id: "mens-sandals", name: "Men's Sandals", category: "Shoes", types: ["Casual"], price: 999, oldPrice: 1299, image: "/images/s-sandals.jpg", gallery: ["/images/s-sandals.jpg"], colors: ["#1f1f1f", "#b0b0b0", "#111111"], rating: 4.3 },
  { id: "womens-sneakers", name: "Women's Sneakers", category: "Shoes", types: ["Sneakers", "Casual"], price: 1799, oldPrice: 2299, image: "/images/s-womens.jpg", gallery: ["/images/s-womens.jpg"], colors: ["#a9b7d8", "#c96b6b", "#7a4a3a"], rating: 4.7 },
  { id: "womens-heels", name: "Women's Heels", category: "Shoes", types: ["Formal"], price: 1999, oldPrice: 2499, image: "/images/s-heels.jpg", gallery: ["/images/s-heels.jpg"], colors: ["#5a4030", "#d59a9a", "#eee4d4", "#c9a36a"], rating: 4.4 },
  { id: "kids-shoes", name: "Kids Shoes", category: "Shoes", types: ["Sneakers", "Casual"], price: 899, oldPrice: 1199, image: "/images/s-kids.jpg", gallery: ["/images/s-kids.jpg"], colors: ["#1f1f1f", "#2b2b2b", "#e4e4e4", "#b0a898"], rating: 4.5 },
  { id: "slip-on", name: "Slip On Shoes", category: "Shoes", types: ["Casual"], price: 1299, oldPrice: 1699, image: "/images/s-slipon.jpg", gallery: ["/images/s-slipon.jpg"], colors: ["#1f1f1f", "#a89880", "#b8b0a4"], rating: 4.4 },
  { id: "womens-handbag", name: "Women's Handbag", category: "Accessories", types: ["Bags"], price: 2499, oldPrice: 3299, image: "/images/a-handbag.jpg", gallery: ["/images/a-handbag.jpg"], colors: ["#1c2a44", "#111111", "#5c5c5c"], rating: 4.7 },
  { id: "mens-watch", name: "Men's Watch", category: "Accessories", types: ["Watches"], price: 1999, oldPrice: 2999, image: "/images/a-watch.jpg", gallery: ["/images/a-watch.jpg"], colors: ["#111111", "#7a5a3a", "#b89870", "#f0e6d2"], rating: 4.6 },
  { id: "sunglasses", name: "Sunglasses", category: "Accessories", types: ["Sunglasses"], price: 1299, oldPrice: 1799, image: "/images/a-sunglasses.jpg", gallery: ["/images/a-sunglasses.jpg"], colors: ["#6b6b6b", "#8a8a8a", "#111111"], rating: 4.5 },
  { id: "leather-belt", name: "Leather Belt", category: "Accessories", types: ["Belts"], price: 999, oldPrice: 1299, image: "/images/a-belt.jpg", gallery: ["/images/a-belt.jpg"], colors: ["#3a3a3a", "#4a4a4a"], rating: 4.4 },
  { id: "mens-wallet", name: "Men's Wallet", category: "Accessories", types: ["Wallets"], price: 799, image: "/images/a-wallet.jpg", gallery: ["/images/a-wallet.jpg"], colors: ["#111111", "#3a3a3a", "#dccbb2", "#c9b79c"], rating: 4.5 },
  { id: "baseball-cap", name: "Baseball Cap", category: "Accessories", types: ["Belts"], price: 699, oldPrice: 999, image: "/images/a-cap.jpg", gallery: ["/images/a-cap.jpg"], colors: ["#7f97b5", "#1c2a44"], rating: 4.3 },
  { id: "fashion-earrings", name: "Fashion Earrings", category: "Accessories", types: ["Wallets"], price: 599, oldPrice: 999, image: "/images/a-earrings.jpg", gallery: ["/images/a-earrings.jpg"], colors: ["#5a1f26", "#c9464e", "#f3e6d8"], rating: 4.6 },
  { id: "necklace", name: "Necklace", category: "Accessories", types: ["Watches"], price: 799, oldPrice: 1099, image: "/images/a-necklace.jpg", gallery: ["/images/a-necklace.jpg"], colors: ["#111111", "#b8b8b8", "#e4dccd", "#c9b79c"], rating: 4.5 },
  { id: "backpack", name: "Backpack", category: "Accessories", types: ["Bags"], price: 1499, oldPrice: 1999, image: "/images/a-backpack.jpg", gallery: ["/images/a-backpack.jpg"], colors: ["#6b4a3a", "#dcc0a8", "#b8704a", "#c9a89a"], rating: 4.6 },
  { id: "n-floral-maxi", name: "Floral Maxi Dress", category: "Women's", types: ["Dresses"], price: 1499, image: "/images/n-dress.jpg", gallery: ["/images/n-dress.jpg"], colors: ["#111111", "#e8a0ae", "#f0b8c6", "#d98090"], rating: 4.6, isNew: true },
  { id: "n-linen-shirt", name: "Linen Shirt", category: "Men's", types: ["Shirts"], price: 1299, image: "/images/n-linen.jpg", gallery: ["/images/n-linen.jpg"], colors: ["#111111", "#3a3a3a", "#a0a0a0", "#7a7a7a"], rating: 4.5, isNew: true },
  { id: "n-kids-set", name: "Kids Printed Set", category: "Kids", types: ["Boys", "Girls"], price: 899, image: "/images/n-kidsset.jpg", gallery: ["/images/n-kidsset.jpg"], colors: ["#1c2a44", "#e8c8c8", "#c9b0b0"], rating: 4.6, isNew: true },
  { id: "n-trendy-sneakers", name: "Trendy Sneakers", category: "Shoes", types: ["Sneakers"], price: 1999, image: "/images/n-sneakers.jpg", gallery: ["/images/n-sneakers.jpg"], colors: ["#6b5a52", "#b89890", "#7a6a62"], rating: 4.6, isNew: true },
  { id: "n-quilted-bag", name: "Quilted Handbag", category: "Accessories", types: ["Bags"], price: 2299, image: "/images/n-quilted.jpg", gallery: ["/images/n-quilted.jpg"], colors: ["#4a4038", "#4a5a52", "#111111"], rating: 4.7, isNew: true },
  { id: "n-classic-watch", name: "Classic Watch", category: "Accessories", types: ["Watches"], price: 1799, image: "/images/n-watch.jpg", gallery: ["/images/n-watch.jpg"], colors: ["#6b5a52", "#9aa8b4", "#c9c0b0", "#a89880"], rating: 4.5, isNew: true },
  { id: "n-oversized-hoodie", name: "Oversized Hoodie", category: "Men's", types: ["Jackets"], price: 1499, image: "/images/n-hoodie.jpg", gallery: ["/images/n-hoodie.jpg"], colors: ["#2b2f3f", "#111111", "#3a3a3a"], rating: 4.7, isNew: true },
  { id: "n-wide-jeans", name: "Wide Leg Jeans", category: "Men's", types: ["Jeans"], price: 1299, image: "/images/n-jeans.jpg", gallery: ["/images/n-jeans.jpg"], colors: ["#6b7a8a", "#111111", "#7a7a7a", "#e4dccd"], rating: 4.6, isNew: true },
  { id: "n-retro-sunglasses", name: "Retro Sunglasses", category: "Accessories", types: ["Sunglasses"], price: 1199, image: "/images/n-retro.jpg", gallery: ["/images/n-retro.jpg"], colors: ["#5a6a8a", "#b8b8b8", "#a89880"], rating: 4.5, isNew: true },
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
