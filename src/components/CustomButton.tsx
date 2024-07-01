import React from "react";

interface CustomButton {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CustomButton({ label, onClick }: CustomButton) {
  return (
    <button
      className="bg-[#0401E4] text-[#FFF7FC] font-medium p-[0.5rem] rounded-[8px] hover:bg-[#4B48FE] focus:bg-[#4B48FE]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default CustomButton;
