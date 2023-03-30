import { ChatHistory } from "../types";
import openai from "./chatgpt";

interface QueryProps {
  chatHistory: ChatHistory;
}

const query = async ({ chatHistory }: QueryProps) => {
  const res = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
      temperature: 0.5,
      max_tokens: 500,
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch(
      (err) =>
        `Chat GPT was unable to respond to your request. Error: ${err.message}`
    );
  return res;
};

export default query;
