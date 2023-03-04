import type { NextApiRequest, NextApiResponse } from "next";
import QueryClient from "./src/database/base/query";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  console.log("Handling query by CID");
  const cid = _req.query.cid as string;

  const indexCollection = process.env.MONGODB_INDEX_COLLECTION ?? "";
  const client = new QueryClient(indexCollection);

  const result = await client.queryByEquality({
    _id: cid,
  });

  res.send(JSON.stringify(result));
  res.status(200);
  res.end();
};

export default handler;
