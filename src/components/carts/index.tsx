import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import useCartCacheData from "@/lib/hooks/query-cache/cart-cache-data";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Cart } from "@/types";

interface CartsProps {
  handleCheck: (id: string) => void;
}

export default function Carts({ handleCheck }: CartsProps) {
  const data = useCartCacheData();

  return (
    <FieldGroup className="mx-auto w-3/4 gap-3">
      {data?.data?.map((v) => (
        <CartBox key={v.id} data={v} handleCheck={handleCheck} />
      ))}
    </FieldGroup>
  );
}

interface CartBoxProps extends CartsProps {
  data: Cart;
}

function CartBox({ data, handleCheck }: CartBoxProps) {
  return (
    <Field orientation="horizontal" className="bg-white p-5 rounded-lg">
      <div className="mt-0.5">
        <Checkbox
          id={data.id}
          name={data.plan.name}
          className="border-primary"
          onClick={() => handleCheck(data.id)}
        />
      </div>
      <FieldContent>
        <FieldLabel htmlFor={data.id}>
          <span className="text-base">{data.plan.name}</span>
        </FieldLabel>
        <FieldDescription></FieldDescription>
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
      </FieldContent>
    </Field>
  );
}
