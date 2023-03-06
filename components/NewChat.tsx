import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const NewChat = () => {
  return (
    <a className="flex items-center justify-start rounded-md border-white/20 border hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-white p-3 gap-3">
      <PlusIcon
        className="h-4 w-4"
        strokeWidth={2}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      New chat
    </a>
  );
};

export default NewChat;
