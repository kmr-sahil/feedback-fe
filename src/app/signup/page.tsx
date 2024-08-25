"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SignupPage() {
  const router = useRouter();
  const [details, setDetails] = useState({
    name: "",
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

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/signup",
        details,
        {
          withCredentials: true,
        }
      );
      toast.success("Login Successful");
      console.log(response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-bgColor p-[2rem] rounded-[16px] outline-[] outline-gray-200 shadow-[0_20px_35px_0px_rgba(0,0,210,0.2)]">
      <h3 className="text-[1.5rem] font-medium mb-[0.5rem] text-accColor">
        Let's onboard you
      </h3>
      <CustomInput
        type="text"
        name="name"
        placeholder="tyler durden"
        value={details.name}
        onChange={handleChange}
        label="Name"
      ></CustomInput>
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
      <CustomButton label="Signin" onClick={signup}></CustomButton>
      <p className="text-[14px] text-textColor text-center">
        Already user here ?{" "}
        <Link className="underline underline-offset-2" href={"/signin"}>
          Signin
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
