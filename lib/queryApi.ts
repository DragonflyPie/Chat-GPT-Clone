import { QueryProps } from "../types";
import openai from "./chatgpt";

const query = async ({ text, model }: QueryProps) => {
  const res = await openai
    .createCompletion({
      model,
      prompt: text,
      temperature: 0.5,
      max_tokens: 20,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `Chat GPT was unable to respond to your request. Error: ${err.message}`
    );

  return res;
};

export default query;
