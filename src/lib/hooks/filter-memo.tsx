import { ApiFilter } from "@/types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useFilterMemo(
  filterKeys: string[],
  fallback: ApiFilter,
): ApiFilter {
  const searchParams = useSearchParams();
  const filter = useMemo<ApiFilter>(() => {
    return filterKeys.reduce((acc, val) => {
      const f = searchParams.get(val);
      if (f !== null && typeof acc === "object" && acc !== null) {
        acc[val] = f;
      }
      return acc;
    }, fallback);
  }, [searchParams, filterKeys, fallback]);
  return filter;
}
