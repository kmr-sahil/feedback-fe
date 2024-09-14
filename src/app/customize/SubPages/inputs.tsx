"use client";
import CustomButton from "@/components/CustomButton";
import CustomSwitch from "@/components/CustomSwitch";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

// Define type for adjustInputs state
interface AdjustInputs {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface InputsProps {
  intialDetails: AdjustInputs;
}

const Inputs: React.FC<InputsProps> = ({ intialDetails }) => {
  const [adjustInputs, setAdjustInputs] = useState<AdjustInputs>(intialDetails);
  console.log(intialDetails);
  const [isDisable, setIsDisable] = useState(true)

  // useEffect(() => {
  //   console.log(adjustInputs);
  //   updateAdjustForm();
  // }, [adjustInputs]);

  const updateAdjustForm = async () => {
    try {
      const projectId = localStorage.getItem("projectId");
      const response = await axios.put(
        `http://localhost:8080/v1/project`,
        { projectId: projectId, adjustForm: adjustInputs },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      toast("Error fetching project");
    }
  };

  // Add type annotations for key and value
  const handleSwitchChange = (key: keyof AdjustInputs, value: boolean) => {
    setAdjustInputs((prev) => {
      const updatedInputs = { ...prev, [key]: value };
      const isDifferent = JSON.stringify(updatedInputs) !== JSON.stringify(intialDetails);
      setIsDisable(!isDifferent);
      return updatedInputs;
    });
  };

  return (
    <div className="bg-backgroundOne rounded-[12px] border-special border-backgroundTwo p-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <CustomSwitch
          checked={adjustInputs.isEmailReq}
          setChecked={(value) => handleSwitchChange("isEmailReq", value)}
          label="Make EMAIL input compulsory for customer"
        />
        <CustomSwitch
          checked={adjustInputs.isNameInputReq}
          setChecked={(value) => handleSwitchChange("isNameInputReq", value)}
          label="Make NAME input Visible for customer"
        />
        <CustomSwitch
          checked={adjustInputs.isNameReq}
          setChecked={(value) => handleSwitchChange("isNameReq", value)}
          label="Make NAME input compulsory for customer"
        />
        <div className="w-[2rem]">
          <CustomButton label={"Save"} disabled={isDisable}  onClick={() => updateAdjustForm()} />
        </div>
      </div>
    </div>
  );
};

export default Inputs;
