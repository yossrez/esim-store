import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import BackNav from "@/components/nav/back-nav";
import { useOrderItemsQuery } from "@/network/api-hooks/query";
import { useRouter } from "next/router";

export default function PageOrderDetails() {
  const router = useRouter();
  const { data, isLoading, isError } = useOrderItemsQuery(
    (router.query.id as string) ?? "",
  );

  return (
    <BaseLayout title="Order Details">
      <ContentLayout>
        {isLoading && "Loading ..."}
        {isError && "Error!"}
        {data?.data === null ? (
          <ErrState code={404} description="Order not found" />
        ) : (
          <>
            <BackNav title="Order Details" />
            <div>{router.query.id}</div>
          </>
        )}
      </ContentLayout>
    </BaseLayout>
  );
}
