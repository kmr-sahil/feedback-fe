"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-backgroundOne border-special border-backgroundTwo p-[2rem] rounded-[12px]">
      <h3 className="text-[1.5rem] font-semibold mb-[0.5rem] text-textTwo">
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
      <p className="text-[14px] text-textTwo text-center">
        New to FeedbackSpace ?{" "}
        <Link
          className="underline underline-offset-2 text-accentOne"
          href={"/signup"}
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;
