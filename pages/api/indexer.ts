import type { NextApiRequest, NextApiResponse } from "next";
import DatabaseInsertClient from "./src/database/base/insert";
import CronScheduler from "./src/cronjobs/CronScheduler";

export enum STATUS {
  UNFUNDED = "UNFUNDED",
  FUNDED = "FUNDED",
  BLACKLISTED = "BLACKLISTED",
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, author, directoryCID, files } = _req.body;

  const indexCollection = process.env.MONGODB_INDEX_COLLECTION ?? "";
  const insertClient = new DatabaseInsertClient(indexCollection);

  if (!title || !description || !directoryCID) {
    console.log("Aborting");
    console.log(title);
    console.log(description);
    console.log(directoryCID);
    res.status(400);
    res.end();
  }

  // eslint-disable-next-line
  // await CronScheduler.scheduleModeration(_req.body);

  const timestamp = new Date().getTime() / 1000;
  try {
    await insertClient.insertSingleDocument({
      _id: directoryCID as string,
      title: title as string,
      description: description as string,
      author: author as string,
      files: files as object[],
      timestamp,
      status: STATUS.UNFUNDED,
    });
  } catch (e) {
    console.log("Error with indexing:");
    console.log(e);
    res.status(400);
    res.end();
  }

  res.status(200);
  res.end();
};

export default handler;
