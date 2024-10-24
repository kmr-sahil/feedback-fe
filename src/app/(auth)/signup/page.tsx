"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    otp: 0,
  });

  const [isSignupDone, setIsSignupDone] = useState(false);

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
        {
          name: details.name,
          email: details.email,
          password: details.password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("OTP sent Successful");
      console.log(response.data);
      setIsSignupDone(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const otpSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/check",
        { email: details.email, otp: details.otp },
        {
          withCredentials: true,
        }
      );
      toast.success("Login Successful");
      localStorage.setItem("isLogin", "true");
      router.push("/inbox");
      console.log(response.data);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-backgroundOne border-special border-backgroundTwo p-[2rem] rounded-[12px]">
      <h3 className="text-[1.5rem] font-semibold mb-[0.5rem] text-textTwo">
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
      {isSignupDone && (
        <CustomInput
          type="number"
          name="otp"
          placeholder="otp"
          value={details.otp}
          onChange={handleChange}
          label="OTP"
        />
      )}
      <CustomButton
        label="Signin"
        onClick={isSignupDone ? otpSubmit : signup}
      ></CustomButton>
      <p className="text-[14px] text-textTwo text-center">
        Already user here ?{" "}
        <Link
          className="underline underline-offset-2 text-accentOne"
          href={"/signin"}
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
