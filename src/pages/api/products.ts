import type { NextApiRequest, NextApiResponse } from "next";
import { HttpResponse, HttpResponseError, ProductData } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<ProductData> | HttpResponseError>,
) {
  try {
    res.status(200).json({ data: { name: "test" } });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
    res.status(500).json({ error: err });
  }
}
