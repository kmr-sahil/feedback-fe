import React from "react";
import { motion } from "framer-motion";

interface ICustomSwitchProps {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

const CustomSwitch: React.FC<ICustomSwitchProps> = ({ label, checked, setChecked }) => {
  const handleClick = () => {
    setChecked(!checked);  // Toggle the checked value on click
  };

  return (
    <div className="flex justify-between items-center">
      <label>{label}</label>
      <label
        htmlFor="checkbox"
        className={`mt-[0.5rem] h-6 px-1 flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[50px] relative cursor-pointer transition duration-200 ${
          checked ? "bg-cyan-500" : "bg-slate-700 border-slate-500"
        }`}
        onClick={handleClick}  // Add onClick handler
      >
        <motion.div
          initial={{ x: checked ? 0 : 24 }}
          animate={{
            x: checked ? 24 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="h-[20px] w-[20px] block rounded-full bg-white shadow-md"
        />
        {/* Removed input as the toggle is handled by onClick */}
      </label>
    </div>
  );
};

export default CustomSwitch;
