import kyClient from "@/lib/ky-client";
import { DestinationData, HttpResponse, ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";

async function getProducts(): Promise<HttpResponse<ProductData>> {
  try {
    const res = await kyClient
      .get<HttpResponse<ProductData>>("products")
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useProductsQuery() {
  return useQuery<HttpResponse<ProductData>>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

async function getDestinations(
  filter?: string,
): Promise<HttpResponse<DestinationData>> {
  try {
    const res = await kyClient
      .get<
        HttpResponse<DestinationData>
      >(`destinations${filter ? `?filter=${filter}` : null}`)
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useDestinationsQuery(filter?: string | null) {
  return useQuery<HttpResponse<DestinationData>>({
    queryKey: ["destinations", filter ?? "populars"],
    queryFn: ({ queryKey }) => getDestinations(queryKey[1] as string),
  });
}
