"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

function SigninPage() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const signin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/signin",
        details,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1.5rem] bg-[#EBEBFF] p-[2rem] rounded-[12px]">
      <h3 className="text-[1.5rem] font-medium mb-[0.5rem]">Welcome Back</h3>
      <CustomInput
        type="email"
        name="email"
        placeholder="email"
        value={details.email}
        onChange={handleChange}
        label="Email"
      ></CustomInput>
      <CustomInput
        type="password"
        name="password"
        placeholder="password"
        value={details.password}
        onChange={handleChange}
        label="Password"
      />
      <CustomButton label="Signin" onClick={signin}></CustomButton>
      <p className="text-[14px] text-center">New to FeedbackSpace ? <Link className="underline underline-offset-2" href={'/signup'}>Signup</Link></p>
    </div>
  );
}

export default SigninPage;
