"use client";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import FileUpload from "./FileUpload";
import CustomModal from "./CustomModal";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions, countryOptions } from "@/lib/options";
import { useRouter } from "next/navigation";

export default function CreateProject({ setIsCreate }: any) {
  const router = useRouter();
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

  // Create new project
  const onProjectCreate = async () => {
    try {
      console.log(details);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        details,
        {
          withCredentials: true,
        }
      );
      //localStorage.clear();
      //fetchProjects();
      toast.success("Project created !");
      router.push("/inbox")
      setIsCreate(false);
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
          <Select
            value={details.country}
            onValueChange={(value) =>
              setDetails((prevDetails) => ({
                ...prevDetails,
                country: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-grow flex flex-col gap-[0.5rem]">
          <label className="font-medium text-textTwo">Category</label>
          <Select
            value={details.category}
            onValueChange={(value) =>
              setDetails((prevDetails) => ({
                ...prevDetails,
                category: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
