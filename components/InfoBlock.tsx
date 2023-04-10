import {
  ArrowDownCircleIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import InfoButton from "./InfoButton";
import InfoRow from "./InfoRow";

interface InfoBlockProps {
  updateValue: (text: string) => void;
}

const InfoBlock = ({ updateValue }: InfoBlockProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const buttonText = button.innerText.slice(1, -1);
    updateValue(buttonText);
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-auto px-6 pb-6 text-gray-100 md:grow md:gap-10 ">
      <h1 className="py-10 text-4xl font-semibold md:pt-10">ChatGPT</h1>
      <div className="flex w-full flex-col gap-3 text-center md:max-w-2xl md:flex-row lg:max-w-3xl">
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2 md:flex-col">
            <SunIcon className="h-7 w-7" />
            <h2 className="text-lg">Examples</h2>
          </div>
          <ul className="flex h-full w-full flex-col gap-3.5 sm:max-w-md">
            <InfoButton
              handleClick={handleClick}
              text="Explain quantum computing in simple terms."
            />
            <InfoButton
              handleClick={handleClick}
              text="How many stars are in the sky?"
            />
            <InfoButton
              handleClick={handleClick}
              text="Should we hire the guy who made this page?"
            />
          </ul>
        </div>
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2 md:flex-col">
            <BoltIcon className="h-7 w-7" />
            <h2 className="text-lg">Capabilities</h2>
          </div>
          <ul className="flex h-full w-full flex-col justify-start  gap-3.5 sm:max-w-md">
            <InfoRow text="Remembers what user said earlier in the conversation" />
            <InfoRow text="Allows user to provide follow-up corrections" />
            <InfoRow text="Trained to decline inappropriate requests" />
          </ul>
        </div>
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2 md:flex-col">
            <ExclamationTriangleIcon className="h-7 w-7" />
            <h2 className="text-lg">Limitations</h2>
          </div>
          <ul className="flex w-full flex-col gap-3.5 sm:max-w-md">
            <InfoRow text="May occasionally generate incorrect information" />
            <InfoRow text="May occasionally produce harmful instructions or biased content" />
            <InfoRow text="Limited knowledge of world and events after 2021" />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;
