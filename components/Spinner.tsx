import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";

const Spinner = () => {
  return (
    <div className=" flex grow flex-col items-center justify-center gap-8 text-white ">
      <ArrowPathIcon className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default Spinner;
