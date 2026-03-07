import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    return res.status(200).json({ data: id });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
