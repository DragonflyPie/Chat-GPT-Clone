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

interface QueryProps {
  text: string;
  model: string;
}
