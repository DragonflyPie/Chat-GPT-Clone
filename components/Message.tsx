import { DocumentData } from "@firebase/firestore-types";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import OpenAi from "./icons/OpenAi";

interface MessageProps {
  content: DocumentData;
  isLast: boolean;
  chatId: string;
  messageId: string;
}

const Message = ({ content, isLast, chatId, messageId }: MessageProps) => {
  const fullText = content.text;
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const { data: session } = useSession();

  const messageRef = useRef<HTMLDivElement>(null);
  const chatGPT = content.user.name === "chatGPT";

  useEffect(() => {
    if (content.read || !fullText.length) return;

    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 35);
    } else {
      const docRef = doc(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages",
        messageId
      );
      updateDoc(docRef, { read: true });
    }
  }, [index, content, isLast]);
  // useEffect(() => {
  //   if (!isLast) {
  //     setAnimate(false);
  //     return;
  //   }

  //   if (index < fullText.length) {
  //     setTimeout(() => {
  //       setText(text + fullText[index]);
  //       setIndex(index + 1);
  //     }, 35);
  //   } else {
  //     setAnimate(false);
  //   }
  // }, [index, isLast, fullText]);

  // useEffect(() => {
  //   if (loading && chatGPT && isLast) {
  //     setAnimate(true);
  //   }
  // }, [loading, chatGPT, isLast]);

  useEffect(() => {
    if (isLast) {
      messageRef.current?.scrollIntoView();
    }
  }, [isLast, index]);

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
          {content.read ? (
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
