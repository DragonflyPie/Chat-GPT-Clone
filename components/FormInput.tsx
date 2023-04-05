import React from "react";

interface FormInputProps {
  inputType: string;
}

const FormInput = ({ inputType }: FormInputProps) => {
  return (
    <div className="flex max-w-2xl justify-between gap-2">
      <label htmlFor={inputType}>
        {inputType[0].toUpperCase() + inputType.slice(1)}
      </label>
      <input id={inputType} type={inputType} className="rounded-sm" />
    </div>
  );
};

export default FormInput;
