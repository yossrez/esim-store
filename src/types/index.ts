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
  countries: string[];
};

export type CountryDestination = {
  id: string;
  name: string;
  slug: string;
  is_saleable: boolean;
  aliases: string;
};

export type ProductData = {
  name: string;
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
