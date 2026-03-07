import { NextApiRequest, NextApiResponse } from "next";
import { addInMemCart, getInMemCartItems } from "../store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      addInMemCart(req.body);
      return res.status(200).json({ message: "1 Plan Added to Cart" });
    } else {
      // Handle any other HTTP method
      return res.status(200).json({ data: getInMemCartItems() });
    }
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
