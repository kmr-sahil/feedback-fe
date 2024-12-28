"use client";
import { CaretDown } from "@phosphor-icons/react";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  name: string;
  value: string;
  icon?: JSX.Element;
}

interface ISelectCompProps {
  options: Option[];
  default?: string;
  onOptionSelect: (value: string) => void;
}

const CustomSelect: React.FC<ISelectCompProps> = ({
  options,
  default: defaultOption = "",
  onOptionSelect,
}) => {
  const [activeOption, setActiveOption] = useState<string | undefined>(
    options.find((option) => option.value === defaultOption)?.name
  );
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setActiveOption(option.name);
    setOpen(false);
    onOptionSelect(option.value);
  };

  useEffect(() => {
    // Update the active option when the default value changes
    const newActiveOption = options.find(
      (option) => option.value === defaultOption
    )?.name;
    setActiveOption(newActiveOption || "Select option");
  }, [defaultOption, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-[100%] flex justify-between items-center px-4 py-2 bg-zinc-50 border-2 border-zinc-200 rounded-[8px]"
      >
        {activeOption || "Select option"}
        <span className={`ml-2 ${open ? "rotate-180" : ""}`}>
          <CaretDown size={20} />
        </span>
      </button>
      {open && (
        <div className="absolute mt-[0.5rem] flex flex-col gap-[0.25rem] w-full max-h-[10rem] overflow-y-scroll bg-backgroundOne border-2 border-backgroundThree rounded-[12px] z-10 p-[0.25rem]">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`px-[0.5rem] py-[0.5rem] rounded-[8px] text-[0.85rem] flex items-center gap-[0.5rem] cursor-pointer hover:bg-backgroundTwo ${
                option.name === activeOption ? "bg-backgroundThree" : ""
              }`}
            >
              {option.icon} {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
