import type { NextApiRequest, NextApiResponse } from "next";
import {
  HttpResponse,
  HttpResponseError,
  Product,
  ProductData,
} from "../../../types";
import { getInMemPlans } from "../store";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<ProductData> | HttpResponseError>,
) {
  try {
    const { slug, day, dataplan } = req.query;

    const slugs = (slug as string).split("region-");
    const param: Record<string, string | number> = {};
    if (slugs.length > 1) {
      param["type"] = "regional";
      param["dest"] = slugs[1];
    } else {
      param["type"] = "local";
      param["dest"] = slugs[0];
    }
    param["validity_days"] =
      (day as string) === "recommended"
        ? (day as string)
        : Number((day as string)[0]);
    param["dataplan"] = (dataplan as string | undefined) ?? "limited";

    const data = getInMemPlans(param.type, param.dest);
    if (data === null) {
      return res.status(400).json({ error: "Not Found" });
    }

    const items: Product[] = [];
    for (const v of data.data.product_items) {
      if (v.data_type !== param.dataplan) {
        continue;
      }
      if (typeof param.validity_days === "string") {
        if (!v.is_recommended) {
          continue;
        }
      } else {
        if (v.validity_days !== param.validity_days) {
          continue;
        }
      }

      items.push({
        data_type: v.data_type,
        is_recommended: v.is_recommended,
        natural_name: v.natural_name,
        prices: v.prices,
        quota_in_gb: v.quota_in_gb,
        validity_days: v.validity_days,
      });
    }

    const resp: ProductData = {
      id: data.data.id,
      name: data.data.name,
      scale: data.data.scale,
      slug: data.data.slug,
      coverages: data.data.coverages,
      details: data.data.details,
      product_items: items,
    };

    res.status(200).json({ data: resp });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
    res.status(500).json({ error: err });
  }
}
