import { HttpResponse, ProductData } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useFilterMemo from "./filter-memo";
import {
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "../const/dataplan-filter";

export default function useProductCacheData():
  | HttpResponse<ProductData>
  | undefined {
  const router = useRouter();
  const queryClient = useQueryClient();
  const filterMemo = useFilterMemo(
    pageDataPlanFilterKeys,
    fallbackPageDataPlanFilter,
  );

  const data: HttpResponse<ProductData> | undefined = queryClient.getQueryData([
    "products",
    router.query.planId,
    JSON.stringify(filterMemo),
  ]);
  return data;
}
