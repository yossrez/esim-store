import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import BackNav from "@/components/nav/back-nav";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useOrderItemsQuery } from "@/network/api-hooks/query";
import { Order, PlacedOrderDetailsData } from "@/types";
import { useRouter } from "next/router";

export default function PageOrderDetails() {
  const router = useRouter();
  const { data, isLoading, isError } = useOrderItemsQuery(
    (router.query.id as string) ?? "",
  );

  return (
    <BaseLayout title="Order Details">
      <ContentLayout>
        {data?.data === null ? (
          <ErrState code={404} description="Order not found" />
        ) : (
          <>
            <BackNav title="Order Details" />
            <div className="container grid mx-auto w-3/4">
              {!isLoading ? (
                <div className="bg-white p-5 rounded-lg">
                  <span className="block text-base leading-10">
                    Order Invoice{" "}
                    {(data?.data as PlacedOrderDetailsData)?.invoice_number}
                  </span>
                  <Separator />
                  {(data?.data as PlacedOrderDetailsData)?.plans?.map(
                    (v, i) => (
                      <>
                        <Item key={v.id} data={v} />
                        {i <=
                        (data?.data as PlacedOrderDetailsData)?.plans?.length -
                          2 ? (
                          <div className="px-5">
                            <Separator />
                          </div>
                        ) : null}
                      </>
                    ),
                  )}
                </div>
              ) : (
                <div>
                  {isLoading && "Loading ..."}
                  {isError && "Error!"}
                </div>
              )}
            </div>
          </>
        )}
      </ContentLayout>
    </BaseLayout>
  );
}

function Item({ data }: { data: Order }) {
  return (
    <div className="bg-white p-5 rounded-lg">
      <span className="text-base leading-10">{data.plan.name}</span>
      <div className="flex justify-between gap-3">
        <div className="text-xs">
          <span>{capitalizeFirstLetter(data.plan.data_type)}</span>
          <span className="px-3">|</span>
          <span>
            Activate {capitalizeFirstLetter(data.activation as string)}
          </span>
          <div className="italic my-1">
            <span>
              {data.plan.quota_in_gb} GB{" "}
              <span>
                / {data.plan.validity_days}{" "}
                {data.plan.validity_days > 1 ? "Days" : "Day"}
              </span>
            </span>
          </div>
        </div>
        <div className="text-sm text-right">
          <span className="block">Qty: {data.quantity}</span>
          <span className="block">
            IDR {data.plan.price.toLocaleString()}
            <span className="text-xs">/pcs</span>
          </span>
        </div>
      </div>
    </div>
  );
}
