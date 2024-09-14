import { ArrowUpRight, Copy } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ApiInt = () => {
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    // Check if the window object is defined to ensure we are in the browser
    if (typeof window !== "undefined") {
      const storedProjectId = localStorage.getItem("projectId");
      setProjectId(storedProjectId || "");
    }
  }, []);

  const copyToClipboard = () => {
    const textToCopy = `https://localhost:8080/walloflove/${projectId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Optionally, you can show a success message or tooltip here
        toast("Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
      Here is the api
      <div className=" flex gap-[1rem] items-center justify-center rounded-[10px] bg-backgroundOne border-special border-backgroundTwo p-[0.5rem] truncate">
        <p className="w-[100%] truncate">{`https://localhost:8080/walloflove/${projectId}`}</p>
        <button
          onClick={copyToClipboard}
          className="rounded-[4px] bg-backgroundTwo p-1"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};

export default ApiInt;
