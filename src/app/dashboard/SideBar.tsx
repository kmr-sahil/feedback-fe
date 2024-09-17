"use client";
import CustomDiv from "@/components/CustomDiv";
import SidebarLayout from "@/components/SidebarLayout";
import { useRouter } from "next/navigation";
import React from "react";

function SideBar({ filter, setFilter }: any) {
  const router = useRouter();
  return (
    <SidebarLayout>
      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv
          label={"All"}
          number={17}
          color="#4747FF"
          isSpotlight={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <CustomDiv
          label={"Issue"}
          number={3}
          color="#FF4D4D"
          isSpotlight={filter === "Issue"}
          onClick={() => setFilter("Issue")}
        />
        <CustomDiv
          label={"Suggestion"}
          number={4}
          color="#FF9933"
          isSpotlight={filter === "Suggestion"}
          onClick={() => setFilter("Suggestion")}
        />
        <CustomDiv
          label={"Liked"}
          number={9}
          color="#FA52DF"
          isSpotlight={filter === "Liked"}
          onClick={() => setFilter("Liked")}
        />
        <CustomDiv label={"Other"} number={0} color="#BFBFBF" />
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv
          label={"Customize Form"}
          onClick={() => router.push("/customize")}
        />
        <CustomDiv
          label={"Integrate"}
          onClick={() => router.push("/integrations?page=wallofLove")}
        />
        <CustomDiv label={"Setting"} onClick={() => router.push("/setting")} />
      </div>
    </SidebarLayout>
  );
}

export default SideBar;
