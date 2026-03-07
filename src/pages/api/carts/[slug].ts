import { NextApiRequest, NextApiResponse } from "next";
import { getInMemCartItems } from "../store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;
    if (slug === null) {
      return res.status(400).json({ data: undefined });
    }

    const decoded = atob(slug as string);
    const ids = decoded.split("#");
    const data = getInMemCartItems(ids);
    return res.status(200).json({ data: data });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
