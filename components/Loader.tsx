import React from "react";

interface LoaderProps {
  text?: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="">
      <span>{text}.</span>
      <span className="animate-[flicker_2s_steps(1,start)_infinite]">.</span>
      <span className="animate-[flickerAlt_2s_steps(1,start)_infinite]">.</span>
    </div>
  );
};

export default Loader;
