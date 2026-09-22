export type CategoryFilter = "All" | "Men" | "Women" | "Kids" | "Shoes" | "Accessories";

export type CategoryCard = {
  id: string;
  title: string;
  group: Exclude<CategoryFilter, "All">;
  image: string;
  badge?: string;
};

export const categoryFilters: CategoryFilter[] = ["All", "Men", "Women", "Kids", "Shoes", "Accessories"];

export const categoryCards: CategoryCard[] = [
  { id: "men", title: "Men's Clothing", group: "Men", image: "/images/cats-men.jpg" },
  { id: "women", title: "Women's Clothing", group: "Women", image: "/images/cats-women.jpg" },
  { id: "kids", title: "Kids Collection", group: "Kids", image: "/images/cats-kids.jpg" },
  { id: "shoes", title: "Shoes Collection", group: "Shoes", image: "/images/cats-shoes.jpg" },
  { id: "accessories", title: "Accessories", group: "Accessories", image: "/images/cats-accessories.jpg" },
  { id: "new", title: "New Arrivals", group: "Women", image: "/images/cats-new.jpg", badge: "New" },
];
