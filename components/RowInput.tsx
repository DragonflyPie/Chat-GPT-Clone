import React, { RefObject } from "react";

interface RowInputProps {
  inputRef: RefObject<HTMLInputElement>;
  renameChat: () => void;
  name: string;
}

const RowInput = ({ name, inputRef, renameChat }: RowInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") renameChat();
  };

  return (
    <input
      autoFocus
      ref={inputRef}
      className="w-full rounded bg-gray_light  px-1 outline-none ring-0 focus:ring-0 "
      type="text"
      defaultValue={name}
      onKeyDown={handleKeyPress}
    />
  );
};

export default RowInput;
