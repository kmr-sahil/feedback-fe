"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Form from "./SubPages/form";
import Widget from "./SubPages/widget";
import Inputs from "./SubPages/inputs";
import Templates from "./SubPages/templates";
import ParentLayout from "@/components/ParentLayout";
import ChildLayout from "@/components/ChildLayout";
import PageLayout from "@/components/PageLayout";

const CustomizePage = () => {

  const [type, setType] = useState("")

  return (
    <ParentLayout>
      <Navbar />
      <ChildLayout>
        <Sidebar setType={setType}/>

        <PageLayout>
          {type == "form" && <Form />}
          {type == "widget" && <Widget />}
          {type == "input" && <Inputs />}
          {type == "templates" && <Templates />}
        </PageLayout>
      </ChildLayout>
    </ParentLayout>
  );
};

export default CustomizePage;
