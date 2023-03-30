"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";
import ChatInput from "../../../components/ChatInput";
import ChatMessages from "../../../components/ChatMessages";
import { SidebarContext } from "../../../context/sidebarContext";
import useSubscribeFirebase from "../../../lib/useSubscribeFirebase";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { hideSidebar } = useContext(SidebarContext);
  const { data: messages, loading } = useSubscribeFirebase({
    chatId,
    email,
  });

  useEffect(() => {
    if (hideSidebar !== undefined) {
      hideSidebar();
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <ChatMessages chatId={chatId} messages={messages} loading={loading} />
      <ChatInput chatId={chatId} messages={messages} />
    </div>
  );
};

export default ChatPage;
