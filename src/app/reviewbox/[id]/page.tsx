"use client";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

interface IDetailsToSend {
  projectId: string;
  type: string;
  content: string;
  star: number;
}

function ReviewBox() {
  const [details, setDetails] = useState<IDetailsToSend>({
    projectId: "",
    type: "Issue",
    content: "",
    star: 0,
  });

  const pathname = usePathname();

  useEffect(() => {
    const projectId = pathname.split("/")[2];
    setDetails((prev) => ({ ...prev, projectId: projectId }));
  }, [pathname]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const submitData = {
        ...details,
        star: parseInt(details.star.toString(), 10), // Ensure star is an integer
      };

      console.log(details);

      const response = await axios.post(
        "http://localhost:8080/v1/responses",
        submitData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data); // handle response if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg shadow-lg max-w-md mx-auto mt-10 transform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Star
        </label>
        <input
          type="number"
          name="star"
          value={details.star}
          onChange={handleChange}
          placeholder="star"
          min="0"
          max="5"
          step="1"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          name="type"
          value={details.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
        >
          <option value="Issue">Issue</option>
          <option value="Idea">Idea</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          name="content"
          value={details.content}
          onChange={handleChange}
          placeholder="enter what you loved"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="flex justify-end">
        <CustomButton label={"Submit"} onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ReviewBox;
