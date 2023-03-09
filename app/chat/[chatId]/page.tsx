import React from "react";
import ChatInput from "../../../components/ChatInput";
import ChatMessages from "../../../components/ChatMessages";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  return (
    <div className="flex flex-col overflow-hidden h-full">
      {chatId}
      <ChatMessages id={chatId} />
      <ChatInput id={chatId} />
    </div>
  );
};

export default ChatPage;
