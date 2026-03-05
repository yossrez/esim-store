export type HttpResponse<T> = {
  data: T;
};

export type HttpResponseError = {
  error: string;
};

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
