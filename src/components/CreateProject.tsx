"use client";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import FileUpload from "./FileUpload";
import CustomModal from "./CustomModal";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateProject({ setIsCreate }: any) {
  const [details, setDetails] = useState<{
    logoUrl: string;
    name: string;
    description: string;
  }>({
    logoUrl: "",
    name: "",
    description: "",
  });

  // Create new project
  const onProjectCreate = async () => {
    try {
      console.log(details);
      await axios.post("http://localhost:8080/v1/project", details, {
        withCredentials: true,
      });
      //localStorage.clear();
      //fetchProjects();
      setIsCreate(false)
      toast.success("Project created !")
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const contentJsx = (
    <>
      <FileUpload setDetails={setDetails} />
      <CustomInput
        label={"Name"}
        type={"text"}
        value={details.name}
        onChange={(e) =>
          setDetails((prevDetails) => ({
            ...prevDetails,
            name: e.target.value,
          }))
        }
      />
      <CustomInput
        label={"Description"}
        type={"text"}
        value={details.description}
        onChange={(e) =>
          setDetails((prevDetails) => ({
            ...prevDetails,
            description: e.target.value,
          }))
        }
      />
    </>
  );

  return (
    <CustomModal
      buttonLabel={"Create"}
      content={contentJsx}
      onSubmitButton={() => onProjectCreate()}
      onClose={() => setIsCreate(false)}
    />
  );
}
