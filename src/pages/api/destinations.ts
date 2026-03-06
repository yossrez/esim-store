import type { NextApiRequest, NextApiResponse } from "next";
import { getInMemDestinations } from "./store";
import {
  CountryDestination,
  DestinationData,
  HttpResponseError,
  HttpResponse,
} from "../../types";
import parseAliases from "@/lib/parse-aliases";
import { destinationTab } from "@/lib/const/destination-filter";

const destFilters = destinationTab.filters.map((v) => v.toLowerCase());

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<DestinationData> | HttpResponseError>,
) {
  try {
    const { destination } = req.query;
    const data = getInMemDestinations();
    const resp: HttpResponse<DestinationData> = {
      data: {},
    };

    switch (destination) {
      case destFilters[2]:
        resp.data[destination] = [];
        // eslint-disable-next-line
        data.data[destination as keyof typeof data.data].forEach((v: any) => {
          const countries = parseAliases(v.aliases);
          resp.data.regionals.push({
            id: v.id,
            is_saleable: v.is_saleable,
            name: v.name,
            slug: v.slug,
            total_countries: v.total_countries,
            countries: countries,
            scale: v.scale,
          });
        });
        break;
      case destFilters[0]:
      case destFilters[1]:
        for (const dest of destFilters) {
          if (destination !== dest) continue;

          resp.data[dest] = [];
          // eslint-disable-next-line
          data.data[dest as keyof typeof data.data].forEach((v: any) => {
            const c_dest: CountryDestination = {
              id: v.id,
              is_saleable: v.is_saleable,
              name: v.name,
              slug: v.slug,
              aliases: v.aliases,
              scale: v.scale,
            };
            resp.data[dest].push(c_dest);
          });
        }
        break;
      default:
        return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(resp);
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
    res.status(500).json({ error: err });
  }
}
