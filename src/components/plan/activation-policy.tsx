import { UseFormReturn } from "react-hook-form";
import Title from "../ui/title";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { activationPolicy } from "@/lib/const/activation-policy";
import { Input } from "../ui/input";
import RadioSelect from "../ui/radio-select";
import { useState } from "react";

export default function ActivationPolicy({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  const [date, setDate] = useState<string>();

  const radio = form.watch("activation");

  return (
    <div className="mb-6">
      <Title>Activation Policy</Title>
      <div className="grid gap-4">
        {activationPolicy.map((v) => {
          if (v === "now") {
            return (
              <RadioSelect key={v} {...form.register("activation")} value={v}>
                <span className="block leading-9">Activate Now</span>
              </RadioSelect>
            );
          }
          return (
            <RadioSelect key={v} {...form.register("activation")} value={date}>
              <>
                <span className="block leading-9">Activate Later</span>
                <Input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-secondary text-primary"
                  disabled={radio === "now" || radio === null}
                />
              </>
            </RadioSelect>
          );
        })}
      </div>
    </div>
  );
}
