import TabFilter from "../filters/tab-filter";
import Title from "../ui/title";
import { dataPlanTab } from "@/lib/const/dataplan-filter";
import { Product } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import RadioSelect from "../ui/radio-select";
import { capitalizeFirstLetter } from "@/lib/utils";
import useProductCacheData from "@/lib/hooks/product-cache-data";

export default function DataPlans({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  const data = useProductCacheData();

  return (
    <div className="mb-6">
      <Title>Data Plans</Title>
      <div className="flex justify-center mb-6">
        <TabFilter {...dataPlanTab} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3.5">
        {data?.data?.product_items.map((v) => (
          <DataPlanCard key={v.natural_name} plan={v} form={form} />
        ))}
      </div>
    </div>
  );
}

function DataPlanCard({
  plan,
  form,
}: {
  plan: Product;
  form: UseFormReturn<FormDataPlan>;
}) {
  const isUnlimited = plan.data_type === "unlimited";
  const checked = form.watch("plan") === plan.natural_name;
  return (
    <RadioSelect {...form.register("plan")} value={plan.natural_name}>
      <div className="flex items-center justify-between">
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
