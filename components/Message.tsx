import { DocumentData } from "@firebase/firestore-types";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
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

  // useEffect(() => {
  //   if (isLast) {
  //     messageRef.current?.scrollIntoView();
  //   }
  // }, [isLast, text]);

  return (
    <div
      ref={messageRef}
      className={`w-full flex justify-center ${
        chatGPT && "bg-gray_light_message"
      }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto text-gray-100 grow items-center">
        {chatGPT ? (
          <div className="h-[30px] w-[30px] min-w-[30px] bg-green flex items-center justify-center rounded-sm">
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
