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

interface ChatMessagesProps {
  chatId: string;
  messages: QuerySnapshot<DocumentData> | undefined;
  loading: boolean;
}

const ChatMessages = ({ chatId, messages, loading }: ChatMessagesProps) => {
  const { data: session } = useSession();

  const user = session?.user?.email;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useAutoNameChat({ messages, id: chatId, email: user });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className=" flex flex-col justify-center items-center pt-[20vh] pr-10 text-white gap-8 ">
        <Loader text="Loading messages" />
        <ArrowPathIcon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-7.5rem)] md:h-[calc(100vh-5rem)] overflow-y-auto">
      {messages?.docs.length ? (
        <div className="flex overflow-y-auto flex-col">
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
        <div className="flex flex-col h-full text-white pt-[20vh] pb-10 items-center justify-between">
          <h2 className="">No messages yet.</h2>
          <ArrowDownCircleIcon className="w-6 h-6 animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
