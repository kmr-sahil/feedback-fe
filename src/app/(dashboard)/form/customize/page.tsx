"use client";
import CustomButton from "@/components/CustomButton";
import CustomSwitch from "@/components/CustomSwitch";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Define type for adjustInputs state
interface AdjustInputs {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface ProjectDetails {
  projectId: string;
  adjustForm: AdjustInputs;
}

// Remove the InputsProps interface as it's not needed

const Customize: React.FC = () => {
  const [adjustInputs, setAdjustInputs] = useState<AdjustInputs>({
    isEmailReq: false,
    isNameInputReq: false,
    isNameReq: false,
  });
  const [isDisable, setIsDisable] = useState(true);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [initialDetails, setInitialDetails] = useState<AdjustInputs>({
    isEmailReq: false,
    isNameInputReq: false,
    isNameReq: false,
  });

  useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    if (projectId) {
      getProjectDetail(projectId);
    }
  }, []);

  const getProjectDetail = async (projectId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        {
          params: { projectId },
        }
      );
      const details = response.data;
      console.log(details);
      setProjectDetails(details.project);
      setAdjustInputs(details.project.adjustForm);
      setInitialDetails(details.project.adjustForm);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching project details");
    }
  };

  const updateAdjustForm = async () => {
    try {
      const projectId = localStorage.getItem("projectId");
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        { projectId: projectId, adjustForm: adjustInputs },
        { withCredentials: true }
      );
      toast.success("Form settings updated successfully!");
      setInitialDetails(adjustInputs);
      setIsDisable(true);
    } catch (error) {
      console.error(error);
      toast.error("Error updating project settings");
    }
  };

  // Handle switch toggle
  const handleSwitchChange = (key: keyof AdjustInputs, value: boolean) => {
    setAdjustInputs((prev) => {
      const updatedInputs = { ...prev, [key]: value };
      const isDifferent =
        JSON.stringify(updatedInputs) !== JSON.stringify(initialDetails);
      setIsDisable(!isDifferent);
      return updatedInputs;
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-backgroundOne rounded-[12px] border-special border-backgroundTwo p-[1rem]">
        <div className="flex flex-col gap-[1rem]">
          {adjustInputs ? (
            <>
              <CustomSwitch
                checked={adjustInputs.isEmailReq}
                setChecked={(value) => handleSwitchChange("isEmailReq", value)}
                label="Make EMAIL input compulsory for customer"
              />
              <CustomSwitch
                checked={adjustInputs.isNameInputReq}
                setChecked={(value) =>
                  handleSwitchChange("isNameInputReq", value)
                }
                label="Make NAME input visible for customer"
              />
              <CustomSwitch
                checked={adjustInputs.isNameReq}
                setChecked={(value) => handleSwitchChange("isNameReq", value)}
                label="Make NAME input compulsory for customer"
              />
            </>
          ) : (
            <p>Loading form settings...</p>
          )}
          <div className="w-[2rem]">
            <CustomButton
              label="Save"
              disabled={isDisable}
              onClick={updateAdjustForm}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Customize;
