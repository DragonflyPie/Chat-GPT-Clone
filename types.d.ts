import { FieldValue, Timestamp } from "@firebase/firestore-types";
import { StaticImageData } from "next/image";

interface IMessage {
  text: string;
  createdAt: FieldValue | Timestamp;
  read: Boolean;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

type ChatHistory = Chatmessage[];

interface IChat {
  createdAt: string;
  userId: string;
  messages?: IMessage[];
}

interface IPayload {
  model: "gpt-3.5-turbo";
  messages: ChatHistory;
  temperature: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}
