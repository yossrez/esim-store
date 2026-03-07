/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { PayloadJson } from "@/seed/types";
import { Cart, Order } from "@/types";
import { genRandTempId } from "@/lib/utils";

const destinations: PayloadJson = { data: undefined };

const localPlans: Record<string, PayloadJson> = {};
const regionalPlans: Record<string, PayloadJson> = {};

const cartsLookup: Record<string, number> = {};
const carts: Cart[] = [];

const ordersLookup: Record<string, number> = {};
const orders: Order[] = [];

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
  return carts.length;
}

export function addInMemCart(payload: Cart) {
  const id = genRandTempId();
  payload["id"] = id;
  carts.push(payload);
  cartsLookup[id] = carts.length - 1;
  console.log(carts);
}

export function getInMemCartItems(ids?: string[]) {
  if (ids) {
    const res: Cart[] = [];
    ids.forEach((v) => {
      const idx = cartsLookup[v];
      if (idx !== undefined && idx >= 0 && idx < carts.length) {
        res.push(carts[idx]);
      }
    });
    return res;
  }
  return carts;
}

export function addInMemOrder(payload: Order) {
  const id = genRandTempId();
  payload["id"] = id;
  orders.push(payload);
  ordersLookup[id] = orders.length - 1;
  console.log(orders);
}

export function getInMemOrderItems(id?: string) {
  if (id) {
    const idx = ordersLookup[id];
    if (idx !== undefined && idx >= 0 && idx < orders.length) {
      return carts[idx];
    }
  }
  return carts;
}
