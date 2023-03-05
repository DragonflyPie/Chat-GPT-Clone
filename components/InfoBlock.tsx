import React from "react";

import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const InfoBlock = ({ text = "Param Pam Pamdfgsdgsdgsdgsdg dg" }) => {
  return (
    <button className="w-full bg-white/5 p-3 rounded-md  hover:bg-gray-900">
      {text} <ArrowLongRightIcon width={12} style={{ display: "inline" }} />
    </button>
  );
};

export default InfoBlock;
