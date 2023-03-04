/*eslint-disable*/

import * as dotenv from "dotenv";
import axios from "axios";
import FormData from "form-data"
import { Stream } from "stream";

dotenv.config();

export default class ImageLabeler {

    getLabelsUrl = async (url: string) => {
        try {

            const result = await axios.get(process.env.SIGHTENGINE_ENDPOINT ?? "", {
                params: {
                    "url": url,
                    "models": "nudity-2.0,offensive,scam,text-content,gore,text,qr-content",
                    "api_user": process.env.SIGHTENGINE_USER ?? "",
                    "api_secret": process.env.SIGHTENGINE_SECRET ?? "",
                }
            });

            console.log(result.data)

            if (result.status === 200)
                return { success: true, labels: this.parseData(result.data) };

        } catch (error) {
            console.log(error);
        }

        return { success: false, labels: [] };
    }

    getLabelsFile = async (stream: Stream) => {
        try {

            const data = new FormData();
            data.append("media", stream);
            data.append("models", "nudity-2.0,offensive,scam,text-content,gore,text,qr-content");
            data.append("api_user", process.env.SIGHTENGINE_USER ?? "");
            data.append("api_secret", process.env.SIGHTENGINE_SECRET ?? "");

            const result = await axios({
                method: "post",
                url: process.env.SIGHTENGINE_ENDPOINT ?? "",
                data: data,
                headers: data.getHeaders()
            });

            if (result.status === 200)
                return { success: true, labels: this.parseData(result.data) }

        } catch (error) {
            console.log(error);
        }

        return { success: false, labels: [] };
    }

    private parseData = (data: any) => {

        function singleProb(fieldName: string) {
            if (data[fieldName].prob >= 0.5) {
                return [fieldName];
            }

            return [];
        }

        const labels = [];

        if (data.status === "success") {

            for (const key in data.nudity) {
                if (key == "none")
                    continue;
                if (data.nudity[key] >= 0.5)
                    labels.push(key);
            }

            if (data.text.profanity.length > 0)
                labels.push("textcontent-profanity")

            if (data.text.link.length > 0)
                labels.push("textcontent-link")

            if (data.qr.profanity.length > 0)
                labels.push("qrcode-profanity")

            if (data.qr.link.length > 0)
                labels.push("qrcode-link")

            labels.push(...singleProb("offensive"));
            labels.push(...singleProb("scam"));
            labels.push(...singleProb("gore"))
        }

        return labels;
    }
}

