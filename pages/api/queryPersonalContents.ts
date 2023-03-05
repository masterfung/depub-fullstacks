import type { NextApiRequest, NextApiResponse } from "next";
import QueryClient from "./src/database/base/query";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  console.log("Searching for personal contents");
  const searchTerm = _req.query.searchTerm as string;
  const address = _req.query.address as string;
  console.log("Address:", address);

  const indexCollection = process.env.MONGODB_INDEX_COLLECTION ?? "";
  const index = process.env.MONGODB_INDEX_SEARCH ?? "";
  const client = new QueryClient(indexCollection);

  let results;
  if (searchTerm === "") {
    results = await client.queryByEquality({
      address,
    });
  } else {
    results = await client.queryAgainstIndex(index, searchTerm, { author: address });
  }

  console.log(results);

  res.send(JSON.stringify(results));
  res.status(200);
  res.end();
};

export default handler;
