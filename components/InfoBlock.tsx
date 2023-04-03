import {
  ArrowDownCircleIcon,
  ArrowLongRightIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import InfoRow from "./InfoRow";

interface InfoBlockProps {
  updateValue: (text: string) => void;
}

const InfoBlock = ({ updateValue }: InfoBlockProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    updateValue(button.innerText);
    // updateValue(e.currentTarget.value);
  };
  return (
    // <div className="w-full flex flex-col px-6 text-gray-100 items-center justify-center pb-6 h-fu">
    <div className="flex flex-col md:grow justify-center items-center px-6 md:h-full text-gray-100 w-full pb-6 md:gap-10 md:pt-48">
      <h1 className="text-4xl font-semibold py-10 md:pt-10">ChatGPT</h1>
      <div className="flex flex-col md:flex-row text-center gap-8 md:max-w-2xl lg:max-w-3xl w-full">
        <div className="flex flex-col items-center w-full gap-5">
          <div className="flex md:flex-col items-center justify-center gap-2">
            <SunIcon className="h-7 w-7" />
            <h2 className="text-lg">Examples</h2>
          </div>
          <ul className="flex flex-col gap-3.5 w-full sm:max-w-md h-full">
            <button
              className="w-full flex items-center justify-center bg-white/5 p-3 rounded-md text-sm hover:bg-gray_hover grow"
              onClick={handleClick}
              value="blabla"
            >
              "Explain quantum computing in simple terms"
              <ArrowLongRightIcon className="inline-block w-4 h-4 ml-2 grow" />
            </button>
            <button
              className="w-full flex items-center justify-center bg-white/5 p-3 rounded-md text-sm hover:bg-gray_hover grow"
              onClick={handleClick}
              value="blabla"
            >
              "Got any creative ideas for a 10 year old’s birthday?"
              <ArrowLongRightIcon className="inline-block w-4 h-4 ml-2" />
            </button>
            <button
              className="w-full flex items-center justify-center bg-white/5 p-3 rounded-md text-sm hover:bg-gray_hover grow"
              onClick={handleClick}
              value="blabla"
            >
              "Should we hire the guy who made this page?"
              <ArrowLongRightIcon className="inline-block w-4 h-4 ml-2" />
            </button>
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
      <ArrowDownCircleIcon className="animate-bounce w-6 h-6 mt-auto" />
    </div>
    // </div>
  );
};

export default InfoBlock;
