import CustomSwitch from "@/components/CustomSwitch";
import React, { useEffect, useState, useRef } from "react";

// Define type for adjustInputs state
type AdjustInputs = {
  isEmailReq: boolean;
  isNameReq: boolean;
};

const Inputs: React.FC = () => {
  const [adjustInputs, setAdjustInputs] = useState<AdjustInputs>({
    isEmailReq: false,
    isNameReq: false,
  });

  const isFirstLoad = useRef(true); // To skip the first load

  // Load initial state from localStorage on component mount
  useEffect(() => {
    const storedInputs = localStorage.getItem("adjustInputs");
    console.log("Loaded from localStorage:", storedInputs); // Log what’s loaded
    if (storedInputs) {
      setAdjustInputs(JSON.parse(storedInputs));
    }
  }, []);

  // Update localStorage after the first load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    console.log("Saving to localStorage:", adjustInputs); // Log what’s being saved
    localStorage.setItem("adjustInputs", JSON.stringify(adjustInputs));
  }, [adjustInputs]);

  // Add type annotations for key and value
  const handleSwitchChange = (key: keyof AdjustInputs, value: boolean) => {
    setAdjustInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-backgroundOne rounded-[12px] border-special border-backgroundTwo p-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <CustomSwitch
          checked={adjustInputs.isEmailReq}
          setChecked={(value) => handleSwitchChange("isEmailReq", value)}
          label="Make email input compulsory for customer"
        />
        <CustomSwitch
          checked={adjustInputs.isNameReq}
          setChecked={(value) => handleSwitchChange("isNameReq", value)}
          label="Make name input compulsory for customer"
        />
      </div>
    </div>
  );
};

export default Inputs;
