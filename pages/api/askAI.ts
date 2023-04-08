import { IChatGPTMessage, OpenAIStream } from "../../lib/OpenAIStream";
import { IPayload } from "../../types";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const messages: IChatGPTMessage[] = await req.json();

  const payload: IPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.5,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};
export default handler;
