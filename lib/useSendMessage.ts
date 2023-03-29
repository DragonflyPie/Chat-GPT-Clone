import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { IMessage } from "../types";
import useSWR from "swr";
import { useRouter } from "next/navigation";

interface SendMessageProps {
  value: string;
  userObject?:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}

function useSendMessage({ value, userObject }: SendMessageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const name = userObject?.name;
  const image = userObject?.image;
  const email = userObject?.email;

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const router = useRouter();

  const sendMessage = async (chatId: string | undefined | null) => {
    if (!userObject || !name || !email || !image) {
      throw new Error("No user object provided");
    }

    if (!chatId) throw new Error("No chat ID provided");

    setLoading(true);

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
        text: value.trim(),
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
          text: value.trim(),
          chatId,
          model,
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
