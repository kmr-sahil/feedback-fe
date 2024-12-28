"use client"
import React from "react";

interface CustomInput {
  label: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: any;
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
      {label && <label className="font-medium text-zinc-700">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-[0.75rem] py-[0.4rem] rounded-[8px] text-zinc-700 bg-zinc-50 ring-[1.5px] ring-inset ring-zinc-200 placeholder:text-zinc-500 focus:ring-1 focus:ring-inset focus:ring-[#379777]"
      />
    </div>
  );
}

export default CustomInput;
