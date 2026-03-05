/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { PayloadJson } from "@/seed/types";

const products: PayloadJson = { data: undefined };

function getInMemProducts(): PayloadJson {
  if (products.data === undefined) {
    const data = JSON.parse(fs.readFileSync("src/seed/products.json", "utf8"));
    products.data = data.data;
    return products;
  }
  return products;
}

export { getInMemProducts };
