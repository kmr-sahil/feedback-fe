"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

function SigninPage() {
  const router = useRouter();
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
      toast.success("Login Successful");
      console.log(response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signin error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-bgColor p-[2rem] rounded-[16px] outline-[] outline-gray-200 shadow-[0_20px_35px_0px_rgba(0,0,210,0.2)]">
      <h3 className="text-[1.5rem] font-medium mb-[0.5rem] text-accColor">
        Welcome Back
      </h3>
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
      <p className="text-[14px] text-textColor text-center">
        New to FeedbackSpace ?{" "}
        <Link className="underline underline-offset-2" href={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;
