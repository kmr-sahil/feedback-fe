"use client";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import FileUpload from "./FileUpload";
import CustomModal from "./CustomModal";
import axios from "axios";
import toast from "react-hot-toast";
import CustomSelect from "./CustomSelect";

export default function CreateProject({ setIsCreate }: any) {
  const [details, setDetails] = useState<{
    logoUrl: string;
    name: string;
    description: string;
    website: string;
    country: string;
    category: string;
  }>({
    logoUrl: "",
    name: "",
    description: "",
    website: "",
    country: "",
    category: "",
  });

// Options for the country dropdown
const countryOptions = [
  { name: "United States", value: "United States" },
  { name: "Canada", value: "Canada" },
  { name: "India", value: "India" },
  { name: "United Kingdom", value: "United Kingdom" },
  { name: "Australia", value: "Australia" },
  { name: "Germany", value: "Germany" },
  { name: "France", value: "France" },
  { name: "Brazil", value: "Brazil" },
  { name: "Japan", value: "Japan" },
  { name: "South Korea", value: "South Korea" },
  { name: "Italy", value: "Italy" },
  { name: "Mexico", value: "Mexico" },
  { name: "Netherlands", value: "Netherlands" },
  { name: "South Africa", value: "South Africa" },
];

// Options for the category dropdown
const categoryOptions = [
  { name: "Technology", value: "Technology" },
  { name: "Agency", value: "Agency" },
  { name: "Clothing", value: "Clothing" },
  { name: "Healthcare", value: "Healthcare" },
  { name: "Finance", value: "Finance" },
  { name: "Education", value: "Education" },
  { name: "E-commerce", value: "E-commerce" },
  { name: "Real Estate", value: "Real Estate" },
  { name: "Hospitality", value: "Hospitality" },
  { name: "Transportation", value: "Transportation" },
  { name: "Energy", value: "Energy" },
  { name: "Entertainment", value: "Entertainment" },
  { name: "Agriculture", value: "Agriculture" },
  { name: "Manufacturing", value: "Manufacturing" },
];


  // Create new project
  const onProjectCreate = async () => {
    try {
      console.log(details);
      await axios.post("http://localhost:8080/v1/project", details, {
        withCredentials: true,
      });
      //localStorage.clear();
      //fetchProjects();
      setIsCreate(false);
      toast.success("Project created !");
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const contentJsx = (
    <>
      <FileUpload setDetails={setDetails} />
      <div className="flex gap-[1rem]">
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
          label={"Website"}
          type={"text"}
          value={details.website}
          onChange={(e) =>
            setDetails((prevDetails) => ({
              ...prevDetails,
              website: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex gap-[1rem] w-[100%]">
        <div className="flex-grow flex flex-col gap-[0.5rem]">
          <label className="font-medium text-textTwo">Country</label>
          <CustomSelect
            options={countryOptions}
            default={details.country}
            onOptionSelect={(value) =>
              setDetails((prevDetails) => ({
                ...prevDetails,
                country: value,
              }))
            }
          />
        </div>

        <div className="flex-grow flex flex-col gap-[0.5rem]">
          <label className="font-medium text-textTwo">Category</label>
          <CustomSelect
            options={categoryOptions}
            default={details.category}
            onOptionSelect={(value) =>
              setDetails((prevDetails) => ({
                ...prevDetails,
                category: value,
              }))
            }
          />
        </div>
      </div>

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
