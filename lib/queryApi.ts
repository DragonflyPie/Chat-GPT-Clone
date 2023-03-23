import { QueryProps } from "../types";
import openai from "./chatgpt";

const query = async ({ text, model }: QueryProps) => {
  if (model === "gpt-3.5-turbo" || model === "gpt-3.5-turbo-0301") {
    const res = await openai
      .createChatCompletion({
        model,
        messages: [{ role: "user", content: text }],
        temperature: 0.5,
        max_tokens: 500,
      })
      .then((res) => res.data.choices[0].message?.content)
      .catch(
        (err) =>
          `Chat GPT was unable to respond to your request. Error: ${err.message}`
      );
    return res;
  } else {
    const res = await openai
      .createCompletion({
        model,
        prompt: text,
        temperature: 0.5,
        max_tokens: 300,
      })
      .then((res) => res.data.choices[0].text)
      .catch(
        (err) =>
          `Chat GPT was unable to respond to your request. Error: ${err.message}`
      );

    return res;
  }
};

export default query;
