import {
  ArrowDownCircleIcon,
  ArrowLongRightIcon,
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
    console.log(e.target);
    const button = e.target as HTMLButtonElement;
    const buttonText = button.innerText.slice(1, -1);
    updateValue(buttonText);
  };
  return (
    <div className="flex flex-col md:grow justify-center items-center px-6 h-full overflow-auto text-gray-100 w-full pb-6 md:gap-10 md:pt-48">
      <h1 className="text-4xl font-semibold py-10 md:pt-10">ChatGPT</h1>
      <div className="flex flex-col md:flex-row text-center gap-8 md:max-w-2xl lg:max-w-3xl w-full">
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex md:flex-col items-center justify-center gap-2">
            <SunIcon className="h-7 w-7" />
            <h2 className="text-lg">Examples</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full sm:max-w-md h-full">
            <InfoButton
              handleClick={handleClick}
              text="Explain quantum computing in simple terms."
            />
            <InfoButton
              handleClick={handleClick}
              text="Explain quantum computing in simple terms."
            />
            <InfoButton
              handleClick={handleClick}
              text="Should we hire the guy who made this page?"
            />
          </ul>
        </div>
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex md:flex-col items-center justify-center gap-2">
            <BoltIcon className="h-7 w-7" />
            <h2 className="text-lg">Capabilities</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full justify-start  sm:max-w-md h-full">
            <InfoRow text="Remembers what user said earlier in the conversation" />
            <InfoRow text="Allows user to provide follow-up corrections" />
            <InfoRow text="Trained to decline inappropriate requests" />
          </ul>
        </div>
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex md:flex-col items-center justify-center gap-2">
            <ExclamationTriangleIcon className="h-7 w-7" />
            <h2 className="text-lg">Limitations</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full sm:max-w-md">
            <InfoRow text="May occasionally generate incorrect information" />
            <InfoRow text="May occasionally produce harmful instructions or biased content" />
            <InfoRow text="Limited knowledge of world and events after 2021" />
          </ul>
        </div>
      </div>

      <ArrowDownCircleIcon className="hidden md:block animate-bounce w-6 h-6 mt-auto" />
    </div>
  );
};

export default InfoBlock;
