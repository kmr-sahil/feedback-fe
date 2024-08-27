import React from "react";

interface CustomButton {
  label: string;
  type?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

function CustomButton({ label, onClick, type }: CustomButton) {
  return (
    <button
      className={`${type == "secondary" ? "bg-accentThree" : "bg-accentOne"} ${
        type == "secondary" ? "border-special border-accentTwo" : ""
      }  text-textOne font-medium px-[1rem] py-[0.5rem]  rounded-[8px] hover:opacity-90 focus:opacity-90`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CustomButton;
