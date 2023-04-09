import { DocumentData } from "@firebase/firestore-types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { LoadingContext, ILoadingContext } from "../context/LoadingContext";
import { db } from "../firebase";
import { IMessage } from "../types";
import { askChatGPT } from "./openAIUtils";

interface SendMessageProps {
  messages: DocumentData[] | [];
  text: string;
  chatId?: string;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

export default function useSubmitForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toggleLoadingOn, toggleLoadingOff } = useContext(
    LoadingContext
  ) as ILoadingContext;

  const sendMessage = async ({
    messages,
    text,
    chatId,
    user,
  }: SendMessageProps) => {
    try {
      const email = user?.email;
      const name = user?.name;
      const image = user?.image;

      if (!email || !name) {
        throw new Error("No user object");
      }

      if (!text) {
        throw new Error("Input field is empty");
      }

      if (!chatId) {
        throw new Error("No chat ID provided");
      }

      toggleLoadingOn();

      const message: IMessage = {
        text: text.trim(),
        createdAt: serverTimestamp(),
        read: true,
        user: {
          _id: email,
          name: name,
          avatar: image || `https://ui-avatars.com/api/?name=${name}`,
        },
      };

      await addDoc(
        collection(db, "users", email, "chats", chatId, "messages"),
        message
      );

      const blankResponse: IMessage = {
        text: "",
        createdAt: serverTimestamp(),
        read: false,
        user: {
          _id: "chatGPT",
          name: "chatGPT",
          avatar: "/chatgpt-icon.png",
        },
      };

      const responseMessage = await addDoc(
        collection(db, "users", email, "chats", chatId, "messages"),
        blankResponse
      );

      const responseId = responseMessage.id;

      const responseRef = doc(
        db,
        "users",
        email,
        "chats",
        chatId,
        "messages",
        responseId
      );

      const answer = await askChatGPT({ messages, text });

      await updateDoc(responseRef, { text: answer });
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) errorMessage = error.message;
      else errorMessage = String(error);
      // we'll proceed, but let's report it

      setError(errorMessage);
    } finally {
      toggleLoadingOff();
    }
  };
  return { error, sendMessage };
}
