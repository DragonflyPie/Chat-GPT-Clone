import React from "react";

const InfoRow = ({ text = "Param Pam Pamdfgsdgsdgsdgsdg dg" }) => {
  return (
    <div className="flex w-full grow items-center rounded-md bg-white/5 p-3 text-sm">
      {text}
    </div>
  );
};

export default InfoRow;
