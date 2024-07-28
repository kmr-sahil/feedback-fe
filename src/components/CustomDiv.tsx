import React from "react";

interface IDivCompProps {
  label: string;
  key?: number;
  number?: number;
  color?: string;
  icon?: string;
  onClick?: () => void;
}

const CustomDiv: React.FC<IDivCompProps> = (props) => {
  const { label, number, color, icon, onClick } = props;
  //console.log(color)
  return (
    <button
      onClick={onClick}
      className={`flex w-[100%] justify-between px-[1rem] py-[12px] bg-priColor font-medium `}
      style={{ color: color || "#D6D6D9" }}
    >
      <div className="flex gap-[8px]">
        {icon && <img src={`/images/${icon}.svg`} alt={icon} />}
        <p>{label}</p>
      </div>
      {number !== undefined && <span>{number}</span>}
    </button>
  );
};

export default CustomDiv;
