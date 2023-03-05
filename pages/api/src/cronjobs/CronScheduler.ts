import { Inngest } from "inngest";
import { Content } from "../moderation/contentcheck";

/* just add more static funcions to call the Ingest endpoint on here, the name property needs to 
match the event parameter in the function set up in inngest.ts */
export default class CronScheduler {

    static scheduleModeration = async (content: Content) => {

        const inngest = new Inngest({ name: "Freepub" });
        await inngest.send({
            name: "schedule.moderation",
            data: content
        });
    }

}