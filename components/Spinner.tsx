import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";

const Spinner = () => {
  return (
    <div className=" flex flex-col grow justify-center items-center text-white gap-8 ">
      <ArrowPathIcon className="w-8 h-8 animate-spin" />
    </div>
  );
};

export default Spinner;
