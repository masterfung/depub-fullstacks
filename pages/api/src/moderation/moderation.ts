import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

export default class Moderation {
  private openAi: OpenAIApi;
  private model = "text-davinci-003";

  private rules = [
    "given title, text",
    "and list of labels for supporting artifacts",
    "judge if the content is worth publishing",
    "no spam, nudes, explicit content, hate speech or otherwise harmful content is allowed",
    "unless it is evidence in direct support of wrong doing set forth in the text",
    "answer with a single confidence value ranging 0 to 1",
  ];

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY ?? "",
    });

    this.openAi = new OpenAIApi(configuration);
  }

  //Returns a float value 0-1 representing the Ai"s confidence in the content being publishable
  verify = async (title: string, text: string, artifacts: string[]) => {
    try {
      const prompt = this.rules
        .concat(
          `title: ${title} text: ${text}, labels: ${artifacts.join(";\n")}`
        )
        .join("\n");

      const response = await this.openAi.createCompletion({
        model: this.model,
        prompt: prompt,
        temperature: 0,
        max_tokens: 128,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const retval = Number.parseFloat(
        response.data.choices[0].text?.split("\n").at(-1) ?? "NaN"
      );

      if (!isNaN(retval)) return { success: true, confidence: retval };
    } catch (error) {
      console.error("Error while moderating text: ", error);
    }

    return { success: false, confidence: NaN };
  };
}
