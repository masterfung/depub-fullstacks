//Explanation and tools: https://www.inngest.com/docs/quick-start?ref=blog-run-nextjs-functions-in-the-background

import { Inngest } from "inngest";
import { serve } from "inngest/next";
import {
  ContentCheck,
  Content,
  ModerationStatus,
} from "./src/moderation/contentcheck";
import DatabaseUpdateClient from "./src/database/base/update";

// Create a client to send and receive events
export const inngest = new Inngest({ name: "Freepub" });

const indexCollection = process.env.MONGODB_INDEX_COLLECTION ?? "";
const updateClient = new DatabaseUpdateClient(indexCollection);

const scheduleModeration = inngest.createFunction(
  { name: "Moderation" },
  { event: "schedule.moderation" },
  async ({ event, step }) => {
    const data = event.data as Content;
    let moderationStatus: ModerationStatus;
    let retries = 3;

    do {
      await step.sleep("3m");
      moderationStatus = await new ContentCheck().moderate(data);
      retries--;
    } while (moderationStatus === ModerationStatus.NotStarted && retries > 0);

    let error;
    try {
      await updateClient.updateSingleDocument(
        { _id: data.directoryCID },
        { type: "set", fields: { moderationStatus: moderationStatus } }
      );
    } catch (err) {
      error = err;
    }

    // eslint-disable-next-line
    return { event, body: `modStatus ${moderationStatus} error: ${error}` };
  }
);

// Create an API that hosts zero functions
export default serve(inngest, [scheduleModeration]);
