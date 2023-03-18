"use client";

import React, { ContextType, useContext, useEffect } from "react";
import ChatInput from "../../../components/ChatInput";
import ChatMessages from "../../../components/ChatMessages";
import { SidebarContext } from "../../../context/sidebarContext";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { showSidebar, hideSidebar } = useContext(SidebarContext);

  useEffect(() => {
    if (hideSidebar !== undefined) {
      hideSidebar();
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <ChatMessages id={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  );
};

export default ChatPage;
