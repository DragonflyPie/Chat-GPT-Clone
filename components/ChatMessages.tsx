import { usePathname } from "next/navigation";
import React from "react";

interface ChatMessagesProps {
  id: string;
}

const ChatMessages = ({ id }: ChatMessagesProps) => {
  return <div className="flex-1">{id}</div>;
};

export default ChatMessages;
