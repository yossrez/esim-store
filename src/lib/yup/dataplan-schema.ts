import { InferType, mixed, number, object, string } from "yup";

export const planSchema = object({
  quantity: number().default(1),
  plan: object({
    name: string().required(),
    destination: string().required(),
    price: number().required(),
    validity_days: number().required(),
    quota_in_gb: number().required(),
    currency_code: string().required(),
    data_type: string().required(),
  }),
  activation: mixed()
    .test(
      "string-or-date",
      "Must be a string or valid date",
      (value: unknown) => {
        if (value === undefined || value === null) return false;

        if (typeof value === "string") {
          if (value === "now") return true;

          const parsed = Date.parse(value);
          return !Number.isNaN(parsed);
        }

        if (value instanceof Date) {
          return !Number.isNaN(value.getTime());
        }

        return false;
      },
    )
    .required(),
});

export type FormDataPlan = InferType<typeof planSchema>;
