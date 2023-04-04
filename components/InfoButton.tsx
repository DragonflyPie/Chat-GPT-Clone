import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface InfoButtonProps {
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InfoButton = ({ handleClick, text }: InfoButtonProps) => {
  return (
    <button
      className="w-full items-center justify-center bg-white/5 p-3 rounded-md text-sm hover:bg-gray_hover grow"
      onClick={handleClick}
    >
      {`"${text}"`}
      <ArrowLongRightIcon className="inline-flex items-center w-4 h-4 ml-2 pointer-events-none" />
    </button>
  );
};

export default InfoButton;
