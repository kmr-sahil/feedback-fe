import React from "react";

interface IDivCompProps {
  label: string;
  key?: number;
  number?: number;
  color?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  isSpotlight?: boolean;
}

const CustomDiv: React.FC<IDivCompProps> = (props) => {
  const { label, number, color, icon, onClick, isSpotlight } = props;
  //console.log(color)
  return (
    <button
      onClick={onClick}
      className={`flex w-[100%] justify-between px-[14px] py-[10px] ${
        color ? color : "text-textOne"
      } ${
        isSpotlight ? "bg-backgroundTwo" : "bg-backgroundOne"
      } font-medium rounded-[8px] `}
    >
      <div className="flex gap-[8px]">
        {icon}
        <p>{label}</p>
      </div>
      {number !== undefined && <span>{number}</span>}
    </button>
  );
};

export default CustomDiv;
