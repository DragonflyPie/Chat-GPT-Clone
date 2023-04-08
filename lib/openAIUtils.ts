import { DocumentData } from "@firebase/firestore-types";

interface SendMessageProps {
  text: string;
  messages: DocumentData[] | [];
}

export async function askChatGPT({ messages, text }: SendMessageProps) {
  const chatGPTMessages = messages.map((message) => {
    return {
      role: message.data().user.name === "chatGPT" ? "assistant" : "user",
      content: message.data().text,
    };
  });
  const newMessage = { role: "user", content: text };

  chatGPTMessages.push(newMessage);
  const last16Messages = chatGPTMessages.slice(-16);

  const response = await fetch("/api/askAI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(last16Messages),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;
  if (!data) {
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  let answer = "";

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    answer = answer + chunkValue;
  }

  return answer;
}
