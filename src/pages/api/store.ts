/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { PayloadJson } from "@/seed/types";
// import { Cart, Order } from "@/types";

const destinations: PayloadJson = { data: undefined };

// const plans: PayloadJson[] = [];

// const carts: Cart[] = [];

// const orders: Order[] = [];

function getInMemDestinations(): PayloadJson {
  if (destinations.data === undefined) {
    const data = JSON.parse(
      fs.readFileSync("src/seed/destinations.json", "utf8"),
    );
    destinations.data = data.data;
    return destinations;
  }
  return destinations;
}

export { getInMemDestinations };
