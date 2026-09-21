"use client";

import type { Order } from "./orders";
import { createStore } from "./store";
import type { Address } from "./checkout";

export type PlacedOrder = Order & {
  address: Address;
  deliveryTitle: string;
  paymentTitle: string;
  paymentDetail: string;
  email: string;
};

export const placedStore = createStore<PlacedOrder[]>("placed-orders", []);
export const usePlacedOrders = placedStore.use;
export const addPlacedOrder = (o: PlacedOrder) => placedStore.set([o, ...placedStore.get()]);
