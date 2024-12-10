"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ForgetPasswordPage() {
  const router = useRouter();
  const [details, setDetails] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
    otp: 0
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const emailSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgotpass`,
        { email: details.email },
        {
          withCredentials: true,
        }
      );
      toast.success("OTP sent successfully");
      console.log(response.data);
      setIsOtpSent(true); // Show additional inputs when OTP is sent
      setLoading(false)
    } catch (error: any) {
      console.error("OTP error:", error);
      toast.error(`Error: ${error.response.data.error}`);
      setLoading(false)
    }
  };

  const otpSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resetpass`,
        { email: details.email, otp: details.otp, newPassword: details.newpassword },
        {
          withCredentials: true,
        }
      );
      toast.success("Password Changed Successfully");
      router.push("/signin");
      setLoading(false)
      console.log(response.data);
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(`Error: ${error.response.data.error}`);
      setLoading(false)
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-backgroundOne border-special border-backgroundTwo p-[2rem] rounded-[12px]">
      <h3 className="text-[1.5rem] font-semibold mb-[0.5rem] text-textTwo">
        {isOtpSent ? "Reset Your Password" : "Welcome Back"}
      </h3>

      {/* Show email input and OTP button initially */}
      <CustomInput
        type="email"
        name="email"
        placeholder="email"
        value={details.email}
        onChange={handleChange}
        label="Email"
        //disabled={isOtpSent} // Disable email input after OTP is sent
      />

      {isOtpSent && (
        <>
          <CustomInput
            type="number"
            name="otp"
            placeholder="OTP"
            value={details.otp}
            onChange={handleChange}
            label="OTP"
          />
          <CustomInput
            type="password"
            name="newpassword"
            placeholder="New Password"
            value={details.newpassword}
            onChange={handleChange}
            label="New Password"
          />
          <CustomInput
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={details.confirmpassword}
            onChange={handleChange}
            label="Confirm Password"
          />
        </>
      )}

      <CustomButton
        label={isOtpSent ? "Reset Password" : "Send OTP"}
        onClick={isOtpSent ? otpSubmit : emailSubmit}
        loading={loading}
        disabled={loading}
      />

      <p className="text-[14px] text-textTwo text-center">
        New to FeedbackSpace?{" "}
        <Link className="underline underline-offset-2 text-accentOne" href={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default ForgetPasswordPage;
