import fs from "fs";
import { ProductResponse } from "../../types";

const products: ProductResponse = { data: undefined };

function getInMemProducts(): ProductResponse {
  if (products.data === undefined) {
    const data = JSON.parse(fs.readFileSync("src/seed/products.json", "utf8"));
    products.data = data.data;
    return products;
  }
  return products;
}

export { getInMemProducts };
