"use client";
import CreateProject from "@/components/CreateProject";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function GetStartedPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginDate = localStorage.getItem("isLogin");

    if (loginDate) {
      console.log("loggedin");
    } else {
      console.log("No login date found.");
      toast.error("Log in again please");
      window.location.href = "/signin";
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col">
      <CreateProject />
    </div>
  );
}

export default GetStartedPage;
