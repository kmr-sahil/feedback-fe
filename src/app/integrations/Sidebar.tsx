import CustomDiv from "@/components/CustomDiv";
import React from "react";

const Sidebar = ({ setType }: any) => {
  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem] ">
      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[6px] p-[6px] bg-backgroundOne border-special border-backgroundTwo">
        <CustomDiv
          label={"Wall of Love"}
          onClick={() => setType("walloflove")}
        />
        <CustomDiv
          label={"Integrate Snippets"}
          onClick={() => setType("snippet")}
        />
        <CustomDiv label={"API"} onClick={() => setType("api")} />
      </div>
    </div>
  );
};

export default Sidebar;
