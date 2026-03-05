import type { NextApiRequest, NextApiResponse } from "next";
import { getInMemProducts } from "./store";
import {
  CountryDestination,
  DestinationData,
  HttpResponseError,
  HttpResponse,
} from "../../types";
import parseAliases from "@/lib/parse-aliases";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<DestinationData> | HttpResponseError>,
) {
  try {
    const { filter } = req.query;
    const data = getInMemProducts();
    const resp: HttpResponse<DestinationData> = {
      data: {},
    };

    switch (filter) {
      case "regionals":
        resp.data[filter] = [];
        // eslint-disable-next-line
        data.data[filter as keyof typeof data.data].forEach((v: any) => {
          const countries = parseAliases(v.aliases);
          resp.data.regionals.push({
            id: v.id,
            is_saleable: v.is_saleable,
            name: v.name,
            slug: v.slug,
            total_countries: v.total_countries,
            countries: countries,
          });
        });
        break;
      case "countries":
        resp.data[filter] = [];
        // eslint-disable-next-line
        data.data[filter as keyof typeof data.data].forEach((v: any) => {
          const c_dest: CountryDestination = {
            id: v.id,
            is_saleable: v.is_saleable,
            name: v.name,
            slug: v.slug,
            aliases: v.aliases,
          };
          resp.data.countries.push(c_dest);
        });
        break;
      default:
        resp.data["populars"] = [];
        // eslint-disable-next-line
        data.data["populars" as keyof typeof data.data].forEach((v: any) => {
          const c_dest: CountryDestination = {
            id: v.id,
            is_saleable: v.is_saleable,
            name: v.name,
            slug: v.slug,
            aliases: v.aliases,
          };
          resp.data.populars.push(c_dest);
        });
        break;
    }
    res.status(200).json(resp);
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
    res.status(500).json({ error: err });
  }
}
