import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/router";
import { SquareChevronLeft } from "lucide-react";

export default function PageDataPlan() {
  const router = useRouter();

  return (
    <BaseLayout title="Choose plan">
      <ContentLayout>
        <div></div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer"
          >
            <SquareChevronLeft size={16} />
          </button>
          <span>{capitalizeFirstLetter(router.query.planId as string)}</span>
        </div>
      </ContentLayout>
    </BaseLayout>
  );
}
