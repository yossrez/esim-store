import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { useCartItemsQuery } from "@/network/api-hooks/query";

export default function PageCart() {
  const {} = useCartItemsQuery();
  return (
    <BaseLayout title="My Cart">
      <ContentLayout>
        <div>Cart</div>
      </ContentLayout>
    </BaseLayout>
  );
}
