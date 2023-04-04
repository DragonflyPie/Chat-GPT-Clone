import {
  addDoc,
  collection,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { IMessage } from "../types";
import { DocumentData } from "@firebase/firestore-types";

interface UseSendMessageProps {
  user?:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

interface SendMessageProps {
  chatId: string | undefined;
  text: string;
  messages: QuerySnapshot<DocumentData> | undefined;
}

function useSendMessage({ user }: UseSendMessageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const name = user?.name;
  const image = user?.image;
  const email = user?.email;

  const sendMessage = async ({ chatId, text, messages }: SendMessageProps) => {
    if (!user || !name || !email || !image) {
      throw new Error("No user object provided");
    }

    if (!text) throw new Error("Blank input not allowed");

    if (!chatId) throw new Error("No chat ID provided");

    setLoading(true);

    const chatHistory = !messages
      ? []
      : messages?.docs.map((message) => {
          return {
            role: message.data().user.name === "chatGPT" ? "assistant" : "user",
            content: message.data().text,
          };
        });
    const lastMessage = { role: "user", content: text };
    chatHistory?.push(lastMessage);

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

    try {
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

      const responseMessage = await addDoc(
        collection(db, "users", email, "chats", chatId, "messages"),
        blankResponse
      );

      await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory: chatHistory,
          chatId,
          userId: email,
          messageId: responseMessage.id,
        }),
      });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendMessage };
}

export default useSendMessage;
