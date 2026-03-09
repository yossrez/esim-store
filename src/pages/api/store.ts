/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { PayloadJson } from "@/seed/types";
import { Cart, Order, PlacedOrderData, PlacedOrderDetailsData } from "@/types";
import { genRandTempId } from "@/lib/utils";

const destinations: PayloadJson = { data: undefined };

const localPlans: Record<string, PayloadJson> = {};
const regionalPlans: Record<string, PayloadJson> = {};

const carts: Map<string, Cart> = new Map();

let placedOrderCount = 0;
const placedOrders: Map<string, PlacedOrderDetailsData> = new Map();

export function getInMemDestinations(): PayloadJson {
  if (destinations.data !== undefined) {
    return destinations;
  }
  const json = JSON.parse(
    fs.readFileSync("src/seed/destinations.json", "utf8"),
  );
  destinations.data = json.data;
  return destinations;
}

export function getInMemPlans(type: string, dest: string) {
  try {
    let refData = undefined;
    let valid = false;
    switch (type) {
      case "local":
        valid = true;
        refData = localPlans;
        break;
      case "regional":
        valid = true;
        refData = regionalPlans;
        break;
    }

    if (!valid) return null;

    if (refData![dest] !== undefined) {
      return refData![dest];
    }

    const json = JSON.parse(
      fs.readFileSync(`src/seed/plans/${type}/${dest}.json`, "utf8"),
    );
    refData![dest] = json;

    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getInMemCartItemTotal() {
  return carts.size;
}

export function addInMemCart(payload: Cart) {
  const id = genRandTempId();
  payload["id"] = id;
  carts.set(id, payload);
  console.log(carts);
}

export function getInMemCartItems(ids?: string[]) {
  if (ids) {
    const res: Cart[] = [];
    ids.forEach((v) => {
      const c = carts.get(v);
      if (c) {
        res.push(c);
      }
    });
    return res;
  }
  return Array.from(carts.values());
}

export function addInMemOrder(payload: Order[]) {
  const id = genRandTempId();
  placedOrderCount++;
  const data: PlacedOrderDetailsData = {
    id: id,
    invoice_number: "#" + placedOrderCount,
    plans: payload,
  };
  placedOrders.set(id, data);
  payload.forEach((v) => {
    carts.delete(v.id);
  });
  console.log(placedOrders);
}

export function getInMemOrderItems(id?: string) {
  if (id) {
    const order = placedOrders.get(id);
    if (order === undefined) return null;
    return order;
  }
  const res: PlacedOrderData[] = [];
  for (const [id, order] of placedOrders) {
    res.push({
      id: id,
      invoice_number: order.invoice_number,
      total_item: order.plans.length,
      total_amount: order.plans.reduce(
        (acc, val) => acc + val.quantity * val.plan.price,
        0,
      ),
    });
  }
  return res;
}
