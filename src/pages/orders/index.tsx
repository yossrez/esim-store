import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import Nav from "@/components/nav/indext";
import { useOrderItemsQuery } from "@/network/api-hooks/query";

export default function PageOrders() {
  const { data, isLoading, isError } = useOrderItemsQuery();
  return (
    <BaseLayout title="Orders">
      <Nav />
      <ContentLayout>
        {isLoading && "Loading ..."}
        {isError && "Error!"}
        <div></div>
      </ContentLayout>
    </BaseLayout>
  );
}
