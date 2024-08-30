import { ArrowUpRight } from "@phosphor-icons/react";
import React from "react";

const WallOfLove = () => {
  return (
    <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
      No responses yet? No problem. <br></br> Share the link below and start
      collecting review.
      <div className="max-w-[400px] flex items-center justify-center rounded-[10px] bg-backgroundOne border-special border-backgroundTwo p-[0.5rem] truncate">
        <p className="truncate">{`https://localhost:3000/walloflove/${localStorage.getItem("projectId")}`}</p>
        <a
          href={`https://localhost:3000/walloflove/${localStorage.getItem("projectId")}`}
          className="rounded-[4px] bg-backgroundTwo p-1"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default WallOfLove;
