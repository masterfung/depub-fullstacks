import type { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  // Get data from your database
  res.status(200).json("hello world");
};

export default handler;
