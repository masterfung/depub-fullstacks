import type { NextApiRequest, NextApiResponse } from "next";
import ReadClient from "./src/ipfs/read";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  console.log("Downloading file:");
  const directoryCID = _req.query.directoryCID as string;
  const fileName = _req.query.fileName as string;
  console.log(`DirectoryCID: ${directoryCID}`);
  console.log(`File Name: ${fileName}`);

  const client = new ReadClient();

  const queryID = !fileName ? directoryCID : `${directoryCID}/${fileName}`;

  let content;
  if (fileName && fileName !== "") {
    content = client.readContent(queryID);
    for await (const el of content) {
      for await (const chunk of el.body) {
        res.write(chunk);
      }
    }
  } else {
    console.log("Getting Directory");
    content = client.readDirectory(queryID);
    for await (const chunk of content) {
      res.write(chunk);
    }
  }

  res.status(200);
  res.end();
};

export default handler;
