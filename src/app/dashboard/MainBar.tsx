import React from "react";
import ReviewContainer from "@/components/ReviewContainer";
import { Copy } from "@phosphor-icons/react";
import { toast } from "sonner";

function MainBar({ data, projectId }: any) {
  const copyToClipboard = () => {
    const textToCopy = `http://localhost:3000/reviewbox/${projectId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Optionally, you can show a success message or tooltip here
        toast("Link Copied")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex-grow w-[40%] flex flex-col gap-[1.25rem]">
      {data && data.length > 0 ? (
        data.map((item: { responseId: any }) => (
          <ReviewContainer key={item.responseId} data={item} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 flex flex-col gap-[1rem] justify-center items-center">
          No responses yet? No problem. <br></br> Share the link below and start
          collecting review.
          <div className="w-[300px] flex items-center justify-center rounded-[10px] bg-gray-600 bg-opacity-30 border-[2px] border-blue-900 p-[0.5rem] truncate">
            <p className="truncate">{`https://localhost:3000/reviewbox/${projectId}`}</p>
            <button
              className="rounded-[4px] bg-slate-200 p-1"
              onClick={copyToClipboard}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainBar;
