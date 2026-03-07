import { UseFormReturn } from "react-hook-form";
import Title from "../ui/title";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { activationPolicy } from "@/lib/const/activation-policy";
import { Input } from "../ui/input";
import RadioSelect from "../ui/radio-select";
import { useRef } from "react";

export default function ActivationPolicy({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
            <RadioSelect
              key={v}
              {...form.register("activation")}
              value={
                inputRef?.current?.value === undefined
                  ? v
                  : inputRef.current?.value
              }
              checked={
                radio === "" || !Number.isNaN(Date.parse(radio as string))
              }
            >
              <>
                <span className="block leading-9">Activate Later</span>
                <Input
                  ref={inputRef}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => form.setValue("activation", e.target.value)}
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
