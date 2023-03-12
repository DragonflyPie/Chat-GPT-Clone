import { FieldValue, Timestamp } from "@firebase/firestore-types";
import { StaticImageData } from "next/image";

interface Message {
  text: string;
  createdAt: FieldValue | Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string | StaticImageData;
  };
}

interface QueryProps {
  text: string;
  model: string;
}
