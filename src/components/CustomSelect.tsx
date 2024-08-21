import React, { useState } from "react";
import CustomDiv from "./CustomDiv";

interface Option {
  name: string;
  icon?: string;
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
  console.log(defaultOption)
  const [activeOption, setActiveOption] = useState(
    defaultOption
  );

  const [toggle, setToggle] = useState(false);

  const handleOptionClick = (option: Option) => {
    setActiveOption(option.name);
    setToggle(false);
    onOptionSelect(option.value);
  };

  return (
    <div className="relative flex flex-col">
      <button
        onClick={() => setToggle(!toggle)}
        className="flex justify-between items-center rounded-[12px] px-[1rem] py-[14px] bg-priColor font-medium"
      >
        <h3 className="text-[18px]">{activeOption}</h3>
        <img
          className={`${toggle ? "rotate-180" : ""}`}
          src="/images/dropdown.svg"
          alt=""
        />
      </button>
      {toggle && (
        <div className="absolute top-[4rem] rounded-[12px] w-[100%] shadow-[0_35px_60px_15px_rgba(0,0,0,0.9)] z-10 overflow-hidden">
          {options
            .filter((option) => option.name !== activeOption)
            .map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="flex w-[100%] justify-between px-[1rem] py-[12px] bg-priColor font-medium "
              >
                <CustomDiv label={option.name} icon={option.icon} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
