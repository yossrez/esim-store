import kyClient from "@/lib/ky-client";
import { ApiFilter, DestinationData, HttpResponse, ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";

async function getProducts(
  filter?: ApiFilter,
): Promise<HttpResponse<ProductData>> {
  try {
    const res = await kyClient
      .get<
        HttpResponse<ProductData>
      >("products", { searchParams: filter !== null && typeof filter === "object" ? filter : {} })
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useProductsQuery(filter?: ApiFilter) {
  return useQuery<HttpResponse<ProductData>>({
    queryKey: ["products", JSON.stringify(filter)],
    queryFn: () => getProducts(filter),
    enabled: () => {
      if (filter !== null && typeof filter === "object") {
        if (filter?.day || filter?.dataplan) {
          return true;
        }
      }
      return false;
    },
  });
}

async function getDestinations(
  filter?: string,
): Promise<HttpResponse<DestinationData>> {
  try {
    const params: { [key: string]: string } = {};
    if (filter) {
      params["destination"] = filter;
    }
    const res = await kyClient
      .get<
        HttpResponse<DestinationData>
      >("destinations", { searchParams: params })
      .json();
    return res;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw new Error(`Client Error: ${String(err)}`);
  }
}
export function useDestinationsQuery(filter?: ApiFilter) {
  return useQuery<HttpResponse<DestinationData>>({
    queryKey: ["destinations", filter],
    queryFn: ({ queryKey }) => getDestinations(queryKey[1] as string),
    enabled: filter !== null,
  });
}
