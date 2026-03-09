import { FormDataPlan } from "@/lib/yup/dataplan-schema";

export type HttpResponse<T> = {
  data: T;
};

export type HttpResponseError = {
  error: string;
};

export type ApiFilter = string | Record<string, string> | null;

export type DestinationData = {
  [key: string]: (RegionDestination | CountryDestination)[];
};

export type RegionDestination = {
  id: string;
  name: string;
  slug: string;
  is_saleable: boolean;
  total_countries: number;
  scale: ScaleDestination;
  countries: string[];
};

export type CountryDestination = {
  id: string;
  name: string;
  slug: string;
  is_saleable: boolean;
  aliases: string;
  scale: ScaleDestination;
};

export type ScaleDestination = "local" | "regional";

export type ProductData = {
  id: string;
  name: string;
  scale: ScaleDestination;
  slug: string;
  details: ProductDetail[];
  product_items: Product[];
  coverages: Record<string, object[]>;
};

export type Product = {
  natural_name: string;
  validity_days: number;
  quota_in_gb: number;
  data_type: DataPlanType;
  prices: object[];
  is_recommended: boolean;
};

export type DataPlanType = "limited" | "unlimited";

export type ProductDetail = {
  text: string;
  value: boolean;
};

export type CartData = Cart[];

export type Cart = FormDataPlan & { id: string };

export type CartItemTotal = {
  total: number;
};

export type Order = FormDataPlan & {
  id: string;
};

export type PlacedOrder = {
  id: string;
  invoice_number: string;
};

export type PlacedOrderData = PlacedOrder & {
  total_item: number;
  total_amount: number;
};

export type PlacedOrderDetailsData = PlacedOrder & {
  plans: Order[];
};
