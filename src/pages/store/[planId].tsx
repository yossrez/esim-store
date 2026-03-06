import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import DataPlans from "@/components/plan/data-plans";
import ActivationPolicy from "@/components/plan/activation-policy";
import InfoSnackBar from "@/components/snacks/info-snack-bar";
import PlanDetails from "@/components/plan/plan-details";
import TabFilter from "@/components/filters/tab-filter";
import CartNav from "@/components/nav/cart-nav";
import BottomDockPortal from "@/components/portal/bottom-dock-portal";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { useProductsQuery } from "@/network/api-hooks/query";
import useFilterMemo from "@/lib/hooks/filter-memo";
import {
  dayTab,
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "@/lib/const/dataplan-filter";
import { useMemo } from "react";
import { destNameMap } from "@/lib/const/dest-name-map";

export default function PageDataPlan() {
  const router = useRouter();
  const filterMemo = useFilterMemo(
    pageDataPlanFilterKeys,
    fallbackPageDataPlanFilter,
  );

  const title = useMemo(() => {
    if (router.query.planId === undefined) return "";
    const r = (router.query.planId as string).split("region-");
    if (r.length > 1) {
      return destNameMap[r[1] as keyof typeof destNameMap];
    }
    return destNameMap[r[0] as keyof typeof destNameMap];
  }, [router]);

  const {} = useProductsQuery(router.query.planId as string, filterMemo);

  return (
    <BaseLayout title="Choose Plan">
      <ContentLayout>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 p-5">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.replace("/store");
                }
              }}
              className="cursor-pointer hover:bg-primary rounded-sm py-1 px-1.5 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <CartNav />
        </div>
        <main>
          <div className="flex justify-center mt-9 mb-6">
            <TabFilter {...dayTab} />
          </div>
          <DataPlans />
          <ActivationPolicy />
          <PlanDetails />
          <InfoSnackBar description="This plan does not come with a number, so no call and text service will be available." />
        </main>
        <BottomDockPortal mobileOnly={false}>
          <div className="container mx-auto flex items-center gap-3 p-5">
            <Button className="w-12">
              <PackagePlus />
            </Button>
            <Button className="w-[calc(100%-50px)] bg-active/90 hover:bg-active">
              Buy Now
            </Button>
          </div>
        </BottomDockPortal>
      </ContentLayout>
    </BaseLayout>
  );
}
