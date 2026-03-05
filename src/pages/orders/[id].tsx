import BaseLayout from "@/components/layout/base-layout";
import { useRouter } from "next/router";

export default function PageOrderDetails() {
  const router = useRouter();

  return (
    <BaseLayout title="Order Details">
      <div>{router.query.id}</div>
    </BaseLayout>
  );
}
