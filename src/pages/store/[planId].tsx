import BaseLayout from "@/components/layout/base-layout";
import { useRouter } from "next/router";

export default function PageDataPlan() {
  const router = useRouter();
  return (
    <BaseLayout title="Choose plan">
      <div>{router.query.planId}</div>
    </BaseLayout>
  );
}
