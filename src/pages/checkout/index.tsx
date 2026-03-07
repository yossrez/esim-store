import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { checkoutOrigin } from "@/lib/const/checkout-origin";
import { useCartItemsQuery } from "@/network/api-hooks/query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function PageCheckout() {
  const searchParams = useSearchParams();

  const paramMemo = useMemo(
    () => (searchParams.get("plan") as string) ?? "",
    [searchParams],
  );

  const isCartCheckout = useMemo(
    () => paramMemo[0] === checkoutOrigin.cart,
    [paramMemo],
  );

  const {} = useCartItemsQuery(
    true,
    isCartCheckout ? paramMemo?.slice(2) : undefined,
  );

  return (
    <BaseLayout title="Checkout">
      <ContentLayout>
        <div>Checkout</div>
      </ContentLayout>
    </BaseLayout>
  );
}
