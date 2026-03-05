import BaseLayout from "@/components/layout/base-layout";
import { useRouter } from "next/router";

export default function PageCartDetails() {
  const router = useRouter();
  const planName = "7 Days - 10 GB";

  return (
    <BaseLayout title={`My Cart | ${planName}`}>
      <div>{router.query.planId}</div>
    </BaseLayout>
  );
}
