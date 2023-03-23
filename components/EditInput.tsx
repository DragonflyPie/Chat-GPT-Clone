import React, { useRef, useState } from "react";

interface EditInputProps {
  currentName: string;
  saveName: () => void;
}

const EditInput = ({ currentName, saveName }: EditInputProps) => {
  const [value, setValue] = useState<string>(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  return <input ref={inputRef} type={"text"} value={value} />;
};

export default EditInput;
