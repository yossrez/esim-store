import type { NextApiRequest, NextApiResponse } from "next";
import { HttpResponse, ProductData } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HttpResponse<ProductData>>,
) {
  res.status(200).json({ data: { name: "test" } });
}
