"use client"
import { CircleNotch, Spinner } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React from "react";

interface CustomButton {
  label: string;
  type?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  disabled?: boolean;
  loading?: boolean;
}

function CustomButton({
  label,
  onClick,
  type,
  disabled,
  loading,
}: CustomButton) {
  return (
    <button
      disabled={disabled}
      className={`${type == "secondary" ? "bg-backgroundTwo" : "bg-accentOne"} ${
        type == "secondary" ? "border-2 border-backgroundThree" : ""
      } text-[0.9rem] text-textOne px-[1rem] py-[0.5rem]  rounded-[8px] hover:opacity-90 focus:opacity-90 disabled:opacity-20 flex gap-[1rem] items-center justify-center`}
      onClick={onClick}
    >
      {label}{" "}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <CircleNotch size={20} />
        </motion.div>
      )}
    </button>
  );
}

export default CustomButton;
