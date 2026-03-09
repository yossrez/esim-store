import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import Nav from "@/components/nav/indext";
import { useOrderItemsQuery } from "@/network/api-hooks/query";
import { PlacedOrderData } from "@/types";
import Link from "next/link";

export default function PageOrders() {
  const { data, isLoading, isError } = useOrderItemsQuery();
  return (
    <BaseLayout title="Orders">
      <Nav />
      <ContentLayout>
        {isLoading && "Loading ..."}
        {isError && "Error!"}
        <div className="grid gap-3 mx-auto w-3/4">
          {(data?.data as PlacedOrderData[])?.map((v) => (
            <div key={v.id} className="bg-white p-5 rounded-lg">
              <span className="block text-base leading-10">
                Order Invoice {v.invoice_number}
              </span>
              <div>
                <span className="block">Data Plan Ordered: {v.total_item}</span>
                <span className="block">Total Amount: {v.total_amount}</span>
              </div>
              <div className="mt-3 self-end">
                <Link
                  href={`/orders/${v.id}`}
                  className="text-white bg-primary text-xs rounded-sm px-3 py-1"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </BaseLayout>
  );
}
