import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { IMessage } from "../types";
import useSWR from "swr";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface SendMessageProps {
  value: string;
  session: Session | null;
  chatId: string | null;
}

function useSendMessage({ value, session, chatId }: SendMessageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const router = useRouter();

  const sendMessage = async () => {
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

    if (!chatId) {
      const doc = await addDoc(
        collection(db, "users", session?.user?.email!, "chats"),
        {
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
        }
      );

      chatId = doc.id;

      router.push(`/chat/${chatId}`);
    }

    try {
      const message: IMessage = {
        text: value.trim(),
        createdAt: serverTimestamp(),
        read: true,
        user: {
          _id: session?.user?.email!,
          name: session?.user?.name!,
          avatar:
            session?.user?.image ||
            `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
        },
      };

      await addDoc(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        message
      );

      const responseMessage = await addDoc(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
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
          session,
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
