"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

import React, { useContext, useEffect, useRef } from "react";
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
    if (!session) return;
    const getName = async () => {
      const docRef = doc(db, "users", session?.user?.email!, "chats", id);
      const chatSnap = await getDoc(docRef);
      const chatData = chatSnap.data();

      if (chatData && !chatData.name && messages?.docs.length) {
        const newName = messages.docs[0].data().text.trim().slice(0, 20);
        await updateDoc(docRef, { name: newName });
      }
    };
    getName();
  }, [db, session, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.docs.map((message, index) => (
        <Message
          key={message.id}
          content={message.data()}
          messageId={message.id}
          chatId={id}
          isLast={messages.docs.length - 1 === index}
        />
      ))}
      {/* {loading && <MessageReplacement />} */}
      <div className="h-24"></div>
      <div className="" ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
