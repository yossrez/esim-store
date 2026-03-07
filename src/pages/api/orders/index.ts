import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({ data: undefined });
    // eslint-disable-next-line
  } catch (e: any) {
    const err = String(e);
    console.error(err);
  }
}
