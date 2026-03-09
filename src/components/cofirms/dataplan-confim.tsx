import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { UseFormReturn } from "react-hook-form";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface DataPlanConfimProps {
  title: string;
  trigger: ReactNode;
  confirmTitle: string;
  form: UseFormReturn<FormDataPlan>;
}

export default function DataPlanConfim({
  title,
  trigger,
  confirmTitle,
  form,
}: DataPlanConfimProps) {
  const data = form.getValues();
  const isUnlimited = data?.plan?.data_type === "unlimited";
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!form.formState.isValid) setOpened(false);
  }, [form.formState.isValid]);

  return (
    <Drawer open={opened} onOpenChange={(o) => setOpened(o)}>
      <DrawerTrigger asChild onClick={() => setOpened(true)}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="container mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl">{title}</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          {/*<hr className="border border-b border-b-gray-700" />*/}
          <Separator />
          <div className="flex items-center justify-between gap-10">
            <div className="flex items-center justify-between py-3 px-5 basis-3/4">
              <div>
                <span className="block text-lg">
                  {data?.plan?.validity_days}{" "}
                  {data?.plan?.validity_days > 1 ? "Days" : "Day"}
                  {isUnlimited ? (
                    <span className="text-sm align-text-bottom">
                      {" "}
                      / {capitalizeFirstLetter(data?.plan.data_type)}
                    </span>
                  ) : null}
                </span>
                <span className="block italic">
                  {isUnlimited && "FUP"} {data?.plan?.quota_in_gb} GB
                  {isUnlimited && "/Day"}
                </span>

                <span className="block italic">
                  {data?.activation === "now"
                    ? "Activate Now"
                    : "Activate by " + String(data?.activation)}
                </span>
              </div>

              <span className={`block px-3 py-1 text-lg`}>
                {/*eslint-disable-next-line*/}
                IDR {data?.plan?.price?.toLocaleString()}
              </span>
            </div>
            <QtyCounter form={form} />
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex justify-between items-center gap-5 w-[calc(100%-20px)]">
            <DrawerClose asChild>
              <Button
                onClick={() => setOpened(false)}
                variant="destructive"
                className="h-12 w-1/2"
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" form="form-dataplan" className="h-12 w-1/2">
              {confirmTitle}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const min = 1;
const max = 100;
function QtyCounter({ form }: { form: UseFormReturn<FormDataPlan> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<number>(form.getValues().quantity);

  function counter(n: number) {
    if (inputRef.current) {
      const total = Number(inputRef.current.value) + n;
      setValue(Math.min(Math.max(total, min), max));
    }
  }

  useEffect(() => {
    form.setValue("quantity", value);
  }, [value, form]);

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => counter(-1)}
        disabled={value === 1}
        className="text-xl font-semibold"
      >
        -
      </Button>
      <Input
        type="number"
        value={value}
        {...form.register("quantity")}
        className="font-bold min-w-15"
        ref={inputRef}
        min={min}
        max={max}
        disabled
      />
      <Button
        onClick={() => counter(1)}
        disabled={value === 100}
        className="text-xl font-semibold"
      >
        +
      </Button>
    </div>
  );
}
