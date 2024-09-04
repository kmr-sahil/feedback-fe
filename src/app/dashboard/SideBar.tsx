"use client";
import CustomDiv from "@/components/CustomDiv";
import SidebarLayout from "@/components/SidebarLayout";
import { useRouter } from "next/navigation";
import React from "react";

function SideBar({ setProjectId }: any) {
  const router = useRouter();
  return (
    <SidebarLayout>
      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv label={"All"} number={17} color="#4747FF" />
        <CustomDiv label={"Issue"} number={3} color="#FF4D4D" />
        <CustomDiv
          label={"Suggestion"}
          number={4}
          color="#FF9933"
          isSpotlight={true}
        />
        <CustomDiv label={"Love"} number={9} color="#FA52DF" />
        <CustomDiv label={"Other"} number={0} color="#BFBFBF" />
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv
          label={"Customize Form"}
          onClick={() => router.push("/customize")}
        />
        <CustomDiv
          label={"Integrate"}
          onClick={() => router.push("/integrations?page=walloflove")}
        />
        <CustomDiv label={"Setting"} onClick={() => router.push("/setting")} />
      </div>
    </SidebarLayout>
  );
}

export default SideBar;
