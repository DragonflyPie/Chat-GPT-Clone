import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface InfoButtonProps {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoButton = ({ handleClick, text }: InfoButtonProps) => {
  return (
    <button
      className="w-full grow items-center justify-center rounded-md bg-white/5 p-3 text-sm hover:bg-gray_hover"
      onClick={handleClick}
    >
      {`"${text}"`}
      <ArrowLongRightIcon className="pointer-events-none ml-2 inline-flex h-4 w-4 items-center" />
    </button>
  );
};

export default InfoButton;
