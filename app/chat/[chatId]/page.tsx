"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
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
  const [value, setValue] = useState("");
  const updateValue = (text: string) => {
    setValue(text);
  };
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
    <div className="flex flex-col justify-between h-full">
      <ChatMessages
        chatId={chatId}
        messages={messages}
        loading={loading}
        updateValue={updateValue}
      />
      <ChatInput
        chatId={chatId}
        messages={messages}
        updateValue={updateValue}
        value={value}
      />
    </div>
  );
};

export default ChatPage;
