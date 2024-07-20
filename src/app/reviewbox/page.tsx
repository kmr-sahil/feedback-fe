"use client"
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import React, { useState } from "react";

function ReviewBox() {
  const [details, setDetails] = useState({
    type: 'Issue',
    content: "",
    star: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:8080/v1/responses",
        details,
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
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Star</label>
        <input
          type="number"
          name="star"
          value={details.star}
          onChange={handleChange}
          placeholder="star"
          min="0"
          max="5"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <select
          name="type"
          value={details.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Issue">Issue</option>
          <option value="Idea">Idea</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          name="content"
          value={details.content}
          onChange={handleChange}
          placeholder="enter what you loved"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end">
        <CustomButton label={"Submit"} onClick={onSubmit} />
      </div>
    </div>
  );
}

export default ReviewBox;
