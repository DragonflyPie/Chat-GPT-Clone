"use client";

import React, { useContext, useEffect } from "react";
import ChatMessages from "../../../components/ChatMessages";
import { SidebarContext } from "../../../context/sidebarContext";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  const { hideSidebar } = useContext(SidebarContext);

  useEffect(() => {
    if (hideSidebar !== undefined) {
      hideSidebar();
    }
  }, []);

  return (
    <div className="flex flex-col overflow-hidden h-full min-h-[calc(100vh-7.5rem)]">
      <ChatMessages id={chatId} />
    </div>
  );
};

export default ChatPage;
