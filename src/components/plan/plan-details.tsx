import useProductCacheData from "@/lib/hooks/product-cache-data";
import Title from "../ui/title";
import { Check } from "lucide-react";

export default function PlanDetails() {
  const data = useProductCacheData();

  return (
    <div className="mb-6">
      <Title>Plan Details</Title>
      {data?.data.details.map((v) => (
        <div key={v.text} className="flex items-center gap-3 py-1">
          <span>
            <Check color="#1ba14f" />
          </span>
          <span>{v.text}</span>
        </div>
      ))}
    </div>
  );
}
