import TabFilter from "../filters/tab-filter";
import Title from "../ui/title";
import { useQueryClient } from "@tanstack/react-query";
import {
  dataPlanTab,
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "@/lib/const/dataplan-filter";
import useFilterMemo from "@/lib/hooks/filter-memo";
import { useRouter } from "next/router";
import { HttpResponse, Product, ProductData } from "@/types";

export default function DataPlans() {
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
  return (
    <div>
      <Title>Data Plans</Title>
      <div className="flex justify-center mt-3 mb-6">
        <TabFilter {...dataPlanTab} />
      </div>
      <div>
        {data?.data?.product_items.map((v) => (
          <DataPlanCard key={v.natural_name} plan={v} />
        ))}
      </div>
    </div>
  );
}

function DataPlanCard({ plan }: { plan: Product }) {
  return <div>{plan.natural_name}</div>;
}
