/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { PayloadJson } from "@/seed/types";
// import { Cart, Order } from "@/types";

const destinations: PayloadJson = { data: undefined };

const localPlans: Record<string, PayloadJson> = {};
const regionalPlans: Record<string, PayloadJson> = {};

// const carts: Cart[] = [];

// const orders: Order[] = [];

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
}
