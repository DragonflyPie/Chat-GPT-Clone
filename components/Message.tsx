import { DocumentData } from "@firebase/firestore-types";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import useTypeMessage from "../lib/useTypeMessage";
import { IMessage } from "../types";
import OpenAi from "./icons/OpenAi";

interface MessageProps {
  message: DocumentData;
  isLast: boolean;
  chatId: string;
}

const Message = ({ message, isLast, chatId }: MessageProps) => {
  const content = message.data() as IMessage;
  const fullText = content.text;
  const { data: session } = useSession();
  const email = session?.user?.email;

  const { text } = useTypeMessage({
    email,
    chatId,
    content,
    messageId: message.id,
  });

  const messageRef = useRef<HTMLDivElement>(null);
  const chatGPT = content.user.name === "chatGPT";

  return (
    <div
      ref={messageRef}
      className={`flex w-full justify-center ${
        chatGPT && "bg-gray_light_message"
      }`}
    >
      <div className="m-auto flex grow items-center gap-4 p-4 text-base text-gray-100 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        {chatGPT ? (
          <div className="flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-sm bg-green">
            <OpenAi />
          </div>
        ) : (
          <img
            src={content.user.avatar}
            alt="user image"
            className="h-[30px] w-[30px] rounded-sm"
          />
        )}

        <div className="">
          {content.read || !isLast ? (
            fullText
          ) : (
            <div>
              {text}
              <span className="inline animate-[blink_1s_steps(5,start)_infinite]">
                &#9608;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
