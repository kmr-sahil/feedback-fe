import ThemeSwitch from "@/components/ThemeSwitch";
import React from "react";

const Theme = () => {
  return (
    <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
      <div className="flex justify-center items-center rounded-[8px] px-[0.75rem] py-[10px] bg-backgroundOne border-special border-backgroundTwo">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Theme;
