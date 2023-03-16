import React from "react";

const ChatLoader = () => {
  return (
    <div className="flex w-full justify-center items-center text-white pt-20">
      <div className="">
        <span>Loading chats.</span>
        <span className="animate-[flicker_2s_steps(1,start)_infinite]">.</span>
        <span className="animate-[flickerAlt_2s_steps(1,start)_infinite]">
          .
        </span>
      </div>
    </div>
  );
};

export default ChatLoader;
