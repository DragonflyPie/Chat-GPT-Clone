import React from "react";

const InfoRow = ({ text = "Param Pam Pamdfgsdgsdgsdgsdg dg" }) => {
  return (
    <div className="w-full bg-white/5 p-3 rounded-md text-sm grow">{text}</div>
  );
};

export default InfoRow;
