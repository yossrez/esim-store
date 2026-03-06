import TabFilter from "../filters/tab-filter";
import Title from "../ui/title";
import { useQueryClient } from "@tanstack/react-query";
import {
  dataPlanTab,
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "@/lib/const/dataplan-filter";
import useFilterMemo from "@/lib/hooks/filter-memo";

export default function DataPlans() {
  const queryClient = useQueryClient();
  const filterMemo = useFilterMemo(
    pageDataPlanFilterKeys,
    fallbackPageDataPlanFilter,
  );
  const data = queryClient.getQueryData([
    "products",
    JSON.stringify(filterMemo),
  ]);
  console.log(data);
  return (
    <div>
      <Title>Data Plans</Title>
      <div className="flex justify-center mt-3 mb-6">
        <TabFilter {...dataPlanTab} />
      </div>
    </div>
  );
}
