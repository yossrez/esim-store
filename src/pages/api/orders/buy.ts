import { NextApiRequest, NextApiResponse } from "next";
import { addInMemOrder } from "../store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const payload = req.body;
      addInMemOrder(payload);
      return res.status(200).json({ message: "ok" });
    }
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
