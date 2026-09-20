import { products, type Product } from "./products";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  placed: string; // ISO date
  status: OrderStatus;
  /** delivered / expected / cancelled date, depending on status */
  statusDate: string;
  items: { productId: string; qty: number }[];
};

export const orders: Order[] = [
  { id: "ORD123456", placed: "2025-09-12", status: "Delivered", statusDate: "2025-09-15", items: [{ productId: "white-formal", qty: 1 }] },
  { id: "ORD123455", placed: "2025-09-10", status: "Shipped", statusDate: "2025-09-18", items: [{ productId: "blue-casual", qty: 1 }] },
  { id: "ORD123454", placed: "2025-09-08", status: "Processing", statusDate: "2025-09-16", items: [{ productId: "air-force-1", qty: 1 }] },
  { id: "ORD123453", placed: "2025-09-05", status: "Delivered", statusDate: "2025-09-09", items: [{ productId: "dress-shirt", qty: 1 }] },
  { id: "ORD123452", placed: "2025-08-28", status: "Cancelled", statusDate: "2025-08-29", items: [{ productId: "watch-set", qty: 1 }] },
  { id: "ORD123451", placed: "2025-08-20", status: "Delivered", statusDate: "2025-08-24", items: [{ productId: "linen-shirt", qty: 1 }, { productId: "dress-shirt", qty: 1 }] },
  { id: "ORD123450", placed: "2025-08-14", status: "Shipped", statusDate: "2025-08-20", items: [{ productId: "knit-sweater", qty: 1 }] },
  { id: "ORD123449", placed: "2025-08-09", status: "Delivered", statusDate: "2025-08-13", items: [{ productId: "leather-sneakers", qty: 1 }] },
  { id: "ORD123448", placed: "2025-08-03", status: "Shipped", statusDate: "2025-08-09", items: [{ productId: "casual-shirt", qty: 2 }] },
  { id: "ORD123447", placed: "2025-07-27", status: "Processing", statusDate: "2025-08-01", items: [{ productId: "kids-sweatshirt", qty: 1 }] },
  { id: "ORD123446", placed: "2025-07-19", status: "Shipped", statusDate: "2025-07-25", items: [{ productId: "spring-arrivals", qty: 1 }] },
  { id: "ORD123445", placed: "2025-07-11", status: "Delivered", statusDate: "2025-07-15", items: [{ productId: "white-oxford", qty: 1 }] },
];

export function orderLines(o: Order): { product: Product; qty: number }[] {
  return o.items.flatMap((i) => {
    const product = products.find((p) => p.id === i.productId);
    return product ? [{ product, qty: i.qty }] : [];
  });
}

export const orderTotal = (o: Order) => orderLines(o).reduce((n, l) => n + l.product.price * l.qty, 0);
export const orderCount = (o: Order) => o.items.reduce((n, i) => n + i.qty, 0);

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1];
  return `${String(d).padStart(2, "0")} ${month} ${y}`;
}
