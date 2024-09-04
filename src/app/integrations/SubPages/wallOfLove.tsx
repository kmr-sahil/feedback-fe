import { ArrowUpRight } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

const WallOfLove = () => {
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    // Check if the window object is defined to ensure we are in the browser
    if (typeof window !== "undefined") {
      const storedProjectId = localStorage.getItem("projectId");
      setProjectId(storedProjectId || "");
    }
  }, []);

  return (
    <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
      We have curated a wall <br></br> Click or share the link with your users
      <div className="max-w-[400px] flex items-center justify-center rounded-[10px] bg-backgroundOne border-special border-backgroundTwo p-[0.5rem] truncate">
        <p className="truncate">{`https://localhost:3000/walloflove/${projectId}`}</p>
        <a
          href={`https://localhost:3000/walloflove/${projectId}`}
          className="rounded-[4px] bg-backgroundTwo p-1"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default WallOfLove;
