import TabFilter from "../filters/tab-filter";
import Title from "../ui/title";
import { dataPlanTab } from "@/lib/const/dataplan-filter";
import { Product } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import RadioSelect from "../ui/radio-select";
import { capitalizeFirstLetter } from "@/lib/utils";
import useProductCacheData from "@/lib/hooks/product-cache-data";
import { useEffect, useState } from "react";

export default function DataPlans({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  return (
    <div className="mb-6">
      <Title>Data Plans</Title>
      <div className="flex justify-center mb-6">
        <TabFilter {...dataPlanTab} />
      </div>
      <DataPlanCards form={form} />
    </div>
  );
}

function DataPlanCards({ form }: { form: UseFormReturn<FormDataPlan> }) {
  const data = useProductCacheData();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-3.5">
      {data?.data?.product_items.map((v) => (
        <DataPlanCard
          key={v.natural_name}
          slug={data.data.slug}
          plan={v}
          form={form}
        />
      ))}
    </div>
  );
}

function DataPlanCard({
  slug,
  plan,
  form,
}: {
  slug: string;
  plan: Product;
  form: UseFormReturn<FormDataPlan>;
}) {
  const isUnlimited = plan?.data_type === "unlimited";
  const watchPlan = form.watch("plan");
  const checked = watchPlan?.name === plan.natural_name;

  const [click, setClick] = useState(false);
  useEffect(() => {
    if (click) {
      form.setValue(
        "plan",
        {
          name: plan.natural_name,
          quota_in_gb: plan.quota_in_gb,
          destination: slug,
          validity_days: plan.validity_days,
          data_type: plan.data_type,
          // eslint-disable-next-line
          price: (plan.prices[0] as any).standard.price,
          // eslint-disable-next-line
          currency_code: (plan.prices[0] as any).currency_code,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    }
    setClick(false);
    // eslint-disable-next-line
  }, [form, click]);

  return (
    <RadioSelect
      {...form.register("plan")}
      onClick={() => setClick(true)}
      checked={watchPlan?.name === plan.natural_name}
    >
      <div className="flex items-center justify-between py-2.5 px-2">
        <div>
          <span className="block text-lg">
            {plan.validity_days} {plan.validity_days > 1 ? "Days" : "Day"}
            {isUnlimited ? (
              <span className="text-sm align-text-bottom">
                {" "}
                / {capitalizeFirstLetter(plan.data_type)}
              </span>
            ) : null}
          </span>
          <span className="block italic">
            {isUnlimited && "FUP"} {plan.quota_in_gb} GB{isUnlimited && "/Day"}
          </span>
        </div>

        <span
          className={`block px-3 py-1 text-lg ${!checked ? "text-orange-700 " : "text-black"}`}
        >
          {/*eslint-disable-next-line*/}
          IDR {(plan.prices[0] as any).standard.price.toLocaleString()}
        </span>
      </div>
    </RadioSelect>
  );
}
