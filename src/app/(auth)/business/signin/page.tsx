"use client";
import React, { useState, useEffect } from "react";
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

  const signin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
        details,
        {
          withCredentials: true,
        }
      );
      toast.success("OTP sent successfully");
      console.log(response.data);
      setIsSignupDone(true);
    } catch (error: any) {
      console.error("Signin error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  const otpSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`,
        { email: details.email, otp: details.otp },
        {
          withCredentials: true,
        }
      );
      toast.success("Login Successful");
      const currentDate = new Date().toISOString(); // Save date in ISO format
      localStorage.setItem("isLogin", currentDate);

      const userId = response.data.verified.user.userId;
      const name = response.data.verified.user.name;

      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      router.push("/inbox");
      console.log(response.data);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(`Error: ${error.response.data.error}`);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      const loginDate = new Date(isLogin);
      const currentDate = new Date();
      const daysDifference =
        (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24); // Difference in days
      if (daysDifference < 30) {
        router.push("/search");
      }
    }
  }, [router]);
  

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-backgroundOne border-special border-backgroundTwo p-[2rem] rounded-[12px]">
      <h3 className="text-[1.5rem] font-semibold mb-[0.5rem] text-textTwo">
        Logging to Business account
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
        label={"Signin"}
        onClick={isSignupDone ? otpSubmit : signin}
      ></CustomButton>
      <p className="text-[14px] text-textTwo text-center">
        New Business at Trustflag ?{" "}
        <Link
          className="underline underline-offset-2 text-accentOne"
          href={"/business/signup"}
        >
          Signup
        </Link>
      </p>
      <Link
        className="text-[14px] text-center underline underline-offset-2 text-accentOne"
        href={"/forgetpassword"}
      >
        Forgot Password
      </Link>
    </div>
  );
}

export default SigninPage;
