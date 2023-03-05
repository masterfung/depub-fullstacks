import type { NextApiRequest, NextApiResponse } from "next";
import DatabaseUpdateClient from "./src/database/base/update";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const directoryCID = _req.query.directoryCID as string;
  const status = _req.query.status as string;

  const indexCollection = process.env.MONGODB_INDEX_COLLECTION ?? "";
  const updateClient = new DatabaseUpdateClient(indexCollection);

  if (!status || !directoryCID) {
    console.log("Aborting");
    console.log(status);
    console.log(directoryCID);
    res.status(400);
    res.end();
  }

  try {
    await updateClient.updateSingleDocument(
      {
        _id: directoryCID,
      },
      {
        type: "set",
        fields: {
          status: status,
        },
      }
    );
  } catch (e) {
    console.log("Error with index update:");
    console.log(e);
    res.status(400);
    res.end();
  }

  res.status(200);
  res.end();
};

export default handler;
