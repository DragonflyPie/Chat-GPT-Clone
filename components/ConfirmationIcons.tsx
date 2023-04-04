import { CheckIcon } from "@heroicons/react/24/outline";
import React, { RefObject } from "react";
import useClickOutside from "../lib/useClickOutside";
import CloseIcon from "./icons/CloseIcon";

interface ConfirmationIconsProps {
  defaultModeOn: () => void;
  saveChanges: (e: React.MouseEvent<HTMLSpanElement>) => void;
  rowRef: RefObject<HTMLAnchorElement>;
}

const ConfirmationIcons = ({
  saveChanges,
  defaultModeOn,
  rowRef,
}: ConfirmationIconsProps) => {
  useClickOutside(rowRef, defaultModeOn);
  return (
    <div className="inline-flex items-center gap-2">
      <span className="hover:text-white" onClick={saveChanges}>
        <CheckIcon className="h-[1.1rem] w-[1.1rem] hover:text-white" />
      </span>
      <span className="hover:text-white" onClick={defaultModeOn}>
        <CloseIcon size={5} />
      </span>
    </div>
  );
};

export default ConfirmationIcons;
