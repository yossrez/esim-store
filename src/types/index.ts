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

export type CartData = {
  [key: string]: Cart[];
};

export type Cart = {
  id: string;
};

export type OrderData = {
  [key: string]: Order[];
};

export type Order = {
  id: string;
};
