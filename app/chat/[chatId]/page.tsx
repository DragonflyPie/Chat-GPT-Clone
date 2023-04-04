"use client";

import Chat from "../../../components/Chat";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage = ({ params: { chatId } }: ChatPageProps) => {
  return <Chat chatId={chatId} />;
};

export default ChatPage;
