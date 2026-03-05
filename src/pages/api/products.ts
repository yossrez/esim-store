import type { NextApiRequest, NextApiResponse } from "next";
import { getInMemProducts } from "./store";
import { ProductResponse } from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>,
) {
  res.status(200).json(getInMemProducts());
}
