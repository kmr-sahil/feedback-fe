import React from "react";

interface CustomButton {
  label: string;
  type?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  disabled?: boolean;
}

function CustomButton({ label, onClick, type, disabled }: CustomButton) {
  return (
    <button
      disabled={disabled}
      className={`${type == "secondary" ? "bg-blue-950" : "bg-accentOne"} ${
        type == "secondary" ? "" : ""
      }  text-textOne font-medium px-[1rem] py-[0.5rem]  rounded-[8px] hover:opacity-90 focus:opacity-90 disabled:opacity-20`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CustomButton;
