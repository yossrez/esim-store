import kyClient from "@/lib/ky-client";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";

export function useAddToCartMutation(reset: UseFormReset<FormDataPlan>) {
  return useMutation({
    mutationFn: (newPlan: FormDataPlan) => {
      return kyClient.post("cart/add", { json: newPlan });
    },
    onSuccess: () => {
      reset();
      alert("Plan added to cart!");
    },
  });
}
