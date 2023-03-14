import { DocumentData } from "@firebase/firestore-types";
import React from "react";
import OpenAi from "./icons/OpenAi";

interface MessageProps {
  content: DocumentData;
}

const Message = ({ content }: MessageProps) => {
  const chatGPT = content.user.name === "chatGPT";

  return (
    <div
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
            alt=""
            className="h-[30px] w-[30px] rounded-sm"
          />
        )}
        <p className="">{content.text}</p>
      </div>
    </div>
  );
};

export default Message;
