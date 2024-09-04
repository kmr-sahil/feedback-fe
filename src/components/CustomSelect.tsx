import React, { useState, useRef, useEffect } from "react";

interface Option {
  name: string;
  icon?: JSX.Element;
  value: string;
  description?: string;
}

interface ISelectCompProps {
  options: Option[];
  default?: any;
  onOptionSelect: (value: string) => void;
}

const CustomSelect: React.FC<ISelectCompProps> = (props) => {
  const { options, default: defaultOption, onOptionSelect } = props;
  const [activeOption, setActiveOption] = useState(defaultOption);
  const [toggle, setToggle] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setActiveOption(option.name);
    setToggle(false);
    onOptionSelect(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col" ref={selectRef}>
      <button
        onClick={() => setToggle(!toggle)}
        className="flex justify-between items-center rounded-[12px] px-[1rem] py-[12px] bg-priColor font-medium bg-backgroundOne border-special border-backgroundTwo text-textOne"
      >
        <h3 className="">{activeOption}</h3>
        <img
          className={`${toggle ? "rotate-180" : ""}`}
          src="/images/dropdown.svg"
          alt=""
        />
      </button>
      {toggle && (
        <div className="absolute top-[4rem] flex flex-col gap-[6px] p-[6px] rounded-[12px] w-[100%] bg-backgroundOne border-special border-backgroundTwo z-10 overflow-hidden">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`flex w-[100%] text-textOne items-center gap-[0.5rem] px-[8px] py-[6px] ${
                option.name == activeOption ? "bg-backgroundTwo" : ""
              } rounded-[8px]`}
            >
              {option.icon}
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
