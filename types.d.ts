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

interface ChatMessage {
  user: string;
  content: string;
}

type ChatHistory = Chatmessage[];

interface IChat {
  createdAt: string;
  userId: string;
  messages?: IMessage[];
}
