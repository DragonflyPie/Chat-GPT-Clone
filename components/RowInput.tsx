import React, { RefObject, useRef } from "react";
import useClickOutside from "../lib/useClickOutside";

interface RowInputProps {
  inputRef: RefObject<HTMLInputElement>;
  renameChat: () => void;
  name: string;
  editOff: () => void;
}

const RowInput = ({ name, inputRef, renameChat, editOff }: RowInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") renameChat();
  };

  useClickOutside(inputRef, editOff);
  return (
    <input
      autoFocus
      ref={inputRef}
      className="bg-gray_light w-full px-1  ring-0 outline-none focus:ring-0 rounded "
      type="text"
      defaultValue={name}
      onKeyDown={handleKeyPress}
    />
  );
};

export default RowInput;
