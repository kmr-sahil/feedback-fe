"use client";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

export default function AddCompany() {
  const [website, setWebsite] = React.useState<string>("");
  const submitCompany = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/create-unclaimed-profile`,
        { website: website },
        { withCredentials: true }
      );

      toast.success("Company added successfully!");
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] items-start justify-start bg-white border-2 border-zinc-200 rounded-lg p-4 max-w-[30rem] mx-auto">
      <h3>
        <span className="font-semibold">Can't find a company?</span> They might
        not be listed on Trustflag yet. Add them and be the first to write a
        review!
      </h3>
      <div className="flex gap-[1rem] flex-col sm:flex-row">
        {" "}
        <CustomInput
          label={""}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="www.example.com"
          type={""}
        />
        <CustomButton label={"Add Company"} onClick={submitCompany} />
      </div>
    </div>
  );
}
