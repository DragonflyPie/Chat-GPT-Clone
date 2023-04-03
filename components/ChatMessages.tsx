"use client";

import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import React, { useEffect, useRef } from "react";
import useSubscribeFirebase from "../lib/useSubscribeFirebase";
import useAutoNameChat from "../lib/useNameChat";
import Loader from "./Loader";

import Message from "./Message";
import { QuerySnapshot } from "firebase/firestore";
import { DocumentData } from "@firebase/firestore-types";
import Spinner from "./Spinner";
import InfoBlock from "./InfoBlock";

interface ChatMessagesProps {
  chatId: string;
  messages: QuerySnapshot<DocumentData> | undefined;
  loading: boolean;
  updateValue: (text: string) => void;
}

const ChatMessages = ({
  chatId,
  messages,
  loading,
  updateValue,
}: ChatMessagesProps) => {
  const { data: session } = useSession();

  const user = session?.user?.email;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAutoNameChat({ messages, id: chatId, email: user });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-y-scroll grow">
      {messages?.docs.length ? (
        <div className="flex flex-col py-4">
          {messages.docs.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              chatId={chatId}
              isLast={messages.docs.length - 1 === index}
            />
          ))}
          <div className="h-24"></div>
          <div className="" ref={messagesEndRef}></div>
        </div>
      ) : (
        <InfoBlock updateValue={updateValue} />
      )}
    </div>
  );
};

export default ChatMessages;
