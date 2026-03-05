import kyClient from "@/lib/ky-client";
import { ProductResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";

async function getProducts(): Promise<ProductResponse> {
  try {
    const res = await kyClient.get<ProductResponse>("products").json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useProducts() {
  return useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
