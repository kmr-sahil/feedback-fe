"use client"
import React from "react";

interface CustomInput {
  label: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: CustomInput) {
  return (
    <div className="flex flex-col gap-[0.5rem] text-textOne text-[1rem]">
      {label && <label className="font-medium text-textTwo">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-[0.75rem] py-[0.5rem] rounded-[8px] text-textColor bg-backgroundTwo ring-1 ring-inset ring-backgroundThree placeholder:text-textTwo focus:ring-1 focus:ring-inset focus:ring-accentOne focus:shadow-[0px_0px_4px_1px] focus:shadow-accentOne"
      />
    </div>
  );
}

export default CustomInput;
