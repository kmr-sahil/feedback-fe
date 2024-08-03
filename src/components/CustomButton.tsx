import React from "react";

interface CustomButton {
  label: string;
  type?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

function CustomButton({ label, onClick, type }: CustomButton) {
  return (
    <button
      className={`${type == "secondary" ? "" : "bg-[#0401E4]"} ${
        type == "secondary" ? "outline outline-1 outline-accColor" : ""
      }  text-[#FFF7FC] font-medium p-[0.5rem] rounded-[8px] hover:bg-[#4B48FE] focus:bg-[#4B48FE]`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CustomButton;
