import type { Category } from "./products";

export type Collection = {
  slug: string;
  /** omitted for cross-category collections (New Arrivals) */
  category?: Category;
  /** chips filter by product category instead of sub-type */
  chipsByCategory?: boolean;
  newOnly?: boolean;
  defaultSort?: "popular" | "newest";
  title: string;
  subtitle: string;
  headline: string;
  blurb: string;
  script: string;
  banner: string;
  chips: string[];
};

export const collections: Collection[] = [
  {
    slug: "men",
    category: "Men's",
    title: "Men's Clothing",
    subtitle: "Style for Every Move",
    headline: "Look Sharp\nLive Bold",
    blurb: "Trendy styles for modern men",
    script: "Men\nStyle\nMatters",
    banner: "/images/cat-men.jpg",
    chips: ["All", "T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Ethnic Wear"],
  },
  {
    slug: "kids",
    category: "Kids",
    title: "Kids' Clothing",
    subtitle: "Little Styles, Big Smiles",
    headline: "Cute Outfits\nfor Brighter\nTomorrows",
    blurb: "Comfortable • Stylish • Playful",
    script: "Happy\nKids\nHappier\nDays",
    banner: "/images/cat-kids.jpg",
    chips: ["All", "Boys", "Girls", "Infants (0-2)", "Tops", "Dresses", "Bottoms", "Winter Wear"],
  },
  {
    slug: "women",
    category: "Women's",
    title: "Women's Clothing",
    subtitle: "Express your style, every day",
    headline: "Trendy\nStyles for\nEvery You",
    blurb: "Comfort • Elegance • Everyday",
    script: "",
    banner: "/images/cat-banner-women.jpg",
    chips: ["All", "Tops", "Dresses", "Bottoms", "Ethnic Wear", "Active Wear", "Winter Wear"],
  },
  {
    slug: "shoes",
    category: "Shoes",
    title: "Shoes Collection",
    subtitle: "Step Into Better Days",
    headline: "Every\nStep\nMatters",
    blurb: "Comfort • Style • Performance",
    script: "",
    banner: "/images/cat-banner-shoes.jpg",
    chips: ["All", "Sneakers", "Running", "Formal", "Casual", "Sports"],
  },
  {
    slug: "accessories",
    category: "Accessories",
    title: "Accessories",
    subtitle: "Small Details, Big Style",
    headline: "Complete\nYour Look",
    blurb: "Accessories for Every You",
    script: "",
    banner: "/images/cat-banner-accessories.jpg",
    chips: ["All", "Bags", "Watches", "Sunglasses", "Belts", "Wallets"],
  },
  {
    slug: "new",
    title: "New Arrivals",
    subtitle: "Fresh Styles, Just for You",
    headline: "New\nArrivals",
    blurb: "Be the First to Explore the Latest Trends",
    script: "",
    banner: "/images/cat-banner-new.jpg",
    chips: ["All", "Women", "Men", "Kids", "Shoes", "Accessories"],
    chipsByCategory: true,
    newOnly: true,
    defaultSort: "newest",
  },
];

export const collectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);
