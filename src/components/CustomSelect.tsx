import React, { useState } from "react";
import CustomDiv from "./CustomDiv";

interface Option {
  name: string;
  icon?: string;
  onClick?: () => void;
}

interface ISelectCompProps {
  options: Option[];
  default?: string;
}

const CustomSelect: React.FC<ISelectCompProps> = (props) => {
  const { options, default: defaultOption } = props;
  const [activeOption, setActiveOption] = useState(
    defaultOption || options[0].name
  );

  const [toggle, setToggle] = useState(false);

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
              <CustomDiv
                key={index}
                label={option.name}
                onClick={option.onClick}
                icon={option.icon}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
