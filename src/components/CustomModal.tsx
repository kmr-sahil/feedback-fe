import React, { useState } from "react";
import CustomButton from "./CustomButton";

interface ICustomModalProps {
  content?: JSX.Element;
  buttonLabel: string;
  onSubmitButton?: () => void;
  title?: string;
  onClose?: () => void;
}

const CustomModal: React.FC<ICustomModalProps> = (props) => {
  const { title, content, buttonLabel, onSubmitButton, onClose } = props;

  return (
    <div
      className="z-50 fixed top-0 right-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"
      
    >
      <div className="bg-bgColor rounded-[12px] p-[1rem] flex flex-col gap-4 border border-zinc-500">
        <h2 className="text-accColor font-semibold text-[1.1rem]">{title}</h2>

        {content}
        <CustomButton label={buttonLabel} onClick={onSubmitButton} />
        <CustomButton label="Close" type="secondary" onClick={onClose}/>
      </div>
    </div>
  );
};

export default CustomModal;
