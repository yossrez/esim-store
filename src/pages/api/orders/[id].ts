import { NextApiRequest, NextApiResponse } from "next";
import { getInMemOrderItems } from "../store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ data: undefined });
    const data = getInMemOrderItems(id as string);
    return res.status(200).json({ data: data });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
