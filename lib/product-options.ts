import type { Product } from "./products";

export const COLOR_NAMES: Record<string, string> = {
  "#ffffff": "White", "#b7cde6": "Sky Blue", "#a9c3e6": "Sky Blue", "#e4dccd": "Sand", "#1c2a44": "Navy",
  "#6b7050": "Olive", "#7c8563": "Olive", "#7a2e34": "Burgundy", "#111111": "Black", "#231a10": "Black",
  "#c4c4c0": "Grey", "#dccbb2": "Beige", "#c9b79c": "Taupe", "#f3f0e8": "Ivory", "#dcc8a5": "Sand",
  "#7f8a5c": "Olive", "#7f97b5": "Steel Blue", "#e2cfa8": "Sand", "#b89870": "Camel", "#3f4a33": "Forest",
  "#e2cfb0": "Oatmeal", "#8a7a63": "Mocha", "#7c6a55": "Mocha", "#f1ece1": "Cream", "#e6dccb": "Cream",
  "#c8a37a": "Tan", "#b8a58a": "Stone", "#8a8a86": "Steel",
};

export function sizesFor(p: Product) {
  if (p.category === "Shoes") return ["7", "8", "9", "10", "11"];
  if (p.category === "Accessories") return ["One Size"];
  if (p.category === "Kids") return ["4Y", "6Y", "8Y", "10Y", "12Y"];
  return ["S", "M", "L", "XL", "XXL"];
}
