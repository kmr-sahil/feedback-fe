import React from "react";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

const handleLogout = () => {
  // Clear localStorage
  localStorage.clear();

  // Clear cookies
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Optionally, you can redirect the user to the login page or home page
  window.location.href = "/login"; // Change the URL as needed
};

const Profile = () => {
  return (
    <div className="flex flex-col justify-start items-start rounded-[8px] p-[1rem] gap-[1rem] bg-backgroundOne border-special border-backgroundTwo">
      <CustomInput label={"Name"} type={"text"} placeholder="name" />
      <CustomInput label={"Email"} type={"email"} placeholder="email" />
      <CustomInput
        label={"Password"}
        type={"password"}
        placeholder="password"
      />
      <CustomButton label={"Save"} />
      <div className="w-[100%] h-[2px] bg-backgroundTwo"></div>
      <button
        className="ml-auto rounded-[12px] border-special border-red-600 text-red-600 px-[1rem] py-[0.5rem]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
