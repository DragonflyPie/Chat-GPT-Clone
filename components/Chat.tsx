"use client";

import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebarContext";
import useChatName from "../lib/useChatName";
import useSubscribeMessages from "../lib/useSubscribeMessages";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import InfoBlock from "./InfoBlock";

interface ChatProps {
  chatId?: string;
}

const Chat = ({ chatId }: ChatProps) => {
  const [value, setValue] = useState("");
  const updateValue = (text: string) => {
    setValue(text);
  };
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { data: messages, loading } = useSubscribeMessages({
    chatId,
    email,
  });

  const { title } = useChatName({ email, chatId });
  const chatTitle = title ? title : "New Chat";

  return (
    <div className="flex h-full flex-col justify-between">
      <title>{chatTitle}</title>

      {chatId ? (
        <ChatMessages
          chatId={chatId}
          messages={messages}
          loading={loading}
          updateValue={updateValue}
        />
      ) : (
        <InfoBlock updateValue={updateValue} />
      )}
      <ChatInput
        chatId={chatId}
        messages={messages}
        updateValue={updateValue}
        value={value}
      />
    </div>
  );
};

export default Chat;
