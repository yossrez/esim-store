"use client";
import DockContainer from "@/components/docks/dock-container";
import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import BackNav from "@/components/nav/back-nav";
import { Button } from "@/components/ui/button";
import { checkoutOrigin } from "@/lib/const/checkout-origin";
import { sessionCheckoutKey } from "@/lib/const/session-keys";
import { capitalizeFirstLetter } from "@/lib/utils";
import { usePlaceOrderMutation } from "@/network/api-hooks/mutation";
import { useCartItemsQuery } from "@/network/api-hooks/query";
import { Cart, Order } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function PageCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const paramMemo = useMemo(
    () => (searchParams.get("plan") as string) ?? "",
    [searchParams],
  );

  const isCartCheckout = useMemo(
    () => paramMemo.slice(0, 2) === checkoutOrigin.cart,
    [paramMemo],
  );

  const sessionCheckoutData = useMemo<Order | null>(() => {
    if (isCartCheckout || paramMemo === "" || typeof window === "undefined") {
      return null;
    }
    const data = sessionStorage.getItem(sessionCheckoutKey);
    if (!data) {
      return null;
    }
    try {
      const order = JSON.parse(data) as Order;
      if (order.id !== atob(paramMemo?.slice(2))) {
        sessionStorage.removeItem(sessionCheckoutKey);
      } else {
        return order;
      }
    } catch {
      sessionStorage.removeItem(sessionCheckoutKey);
      return null;
    }
    return null;
  }, [isCartCheckout, paramMemo]);

  const { data: cartData, isLoading } = useCartItemsQuery(
    true,
    isCartCheckout ? paramMemo : undefined,
  );

  const totalAmount = useMemo(() => {
    if (isCartCheckout) {
      return cartData?.data.reduce(
        (acc, val) => acc + val.quantity * val.plan.price,
        0,
      );
    }
    if (sessionCheckoutData === null) return 0;
    return sessionCheckoutData.quantity * sessionCheckoutData.plan.price;
  }, [cartData, sessionCheckoutData, isCartCheckout]);

  const checkoutMutation = usePlaceOrderMutation(handleSuccess);

  function handleSuccess() {
    if (!isCartCheckout) {
      sessionStorage.removeItem(sessionCheckoutKey);
    }
    router.replace("/orders");
  }

  function handleBuy() {
    if (isCartCheckout) {
      if (cartData?.data === null) {
        console.error("Cart Not Valid");
      }
      checkoutMutation.mutate(cartData?.data as Order[]);
      return;
    }
    if (sessionCheckoutData === null) {
      console.error("Session Not Valid");
      return;
    }
    checkoutMutation.mutate([sessionCheckoutData]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50); // ms

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    <BaseLayout title="Checkout">
      <ContentLayout>Loading...</ContentLayout>
    </BaseLayout>;
  }

  if (!mounted) return null;

  const isNoData =
    (cartData === undefined || cartData.data.length === 0) &&
    sessionCheckoutData === null;

  if (isNoData) {
    return (
      <BaseLayout title="Checkout">
        <ContentLayout>
          <ErrState code={404} description="Uhh, Nothing to Checkout!" />
        </ContentLayout>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Checkout">
      <ContentLayout>
        <BackNav title="Checkout" />
        <div className="conainer grid mx-auto w-3/4 gap-3">
          {(() => {
            if (isCartCheckout) {
              return cartData?.data.map((v) => (
                <CheckoutItem key={v.id} data={v} />
              ));
            }
            return <CheckoutItem data={sessionCheckoutData as Order} />;
          })()}
        </div>
        <DockContainer>
          <div className="grid w-full gap-5">
            <div className="flex justify-between">
              <span className="block">Total</span>
              <span className="block">IDR {totalAmount?.toLocaleString()}</span>
            </div>
            <Button
              onClick={handleBuy}
              className="w-full bg-active/90 hover:bg-active h-12 md:text-lg"
              disabled={
                (!isCartCheckout && sessionCheckoutData === null) ||
                cartData === null
              }
            >
              Place Order
            </Button>
          </div>
        </DockContainer>
      </ContentLayout>
    </BaseLayout>
  );
}

interface CheckoutItemProps {
  data: Order | Cart;
}

function CheckoutItem({ data }: CheckoutItemProps) {
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
