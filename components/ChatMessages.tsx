"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

interface ChatMessagesProps {
  id: string;
}

const ChatMessages = ({ id }: ChatMessagesProps) => {
  const { data: session } = useSession();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.docs.map((message) => (
        <Message key={message.id} content={message.data()} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
