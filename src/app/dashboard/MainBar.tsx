import React from "react";
import ReviewContainer from "@/components/ReviewContainer";
import { Copy } from "@phosphor-icons/react";
import { toast } from "sonner";

function MainBar({ data, projectId, setSkip, hasMore }: any) {
  const copyToClipboard = () => {
    const textToCopy = `http://localhost:3000/feedback/simple/${projectId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast("Link Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="w-[100%] flex flex-col gap-[1.25rem] justify-center items-center">
      {data.length > 0 ? (
        data.map((item: { responseId: any }) => (
          <ReviewContainer key={item.responseId} data={item} />
        ))
      ) : (
        <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
          No responses there !
        </div>
        // <div className="text-center py-8 text-textTwo flex flex-col gap-[1rem] justify-center items-center">
        //   No responses yet? No problem. <br /> Share the link below and start
        //   collecting review.
        //   <div className=" max-w-[400px] flex items-center justify-center rounded-[10px] bg-backgroundOne border-special border-backgroundTwo p-[0.5rem] truncate">
        //     <p className="truncate">{`https://localhost:3000/feedback/simple/${projectId}`}</p>
        //     <button
        //       className="rounded-[4px] bg-backgroundTwo p-1"
        //       onClick={copyToClipboard}
        //     >
        //       <Copy size={16} />
        //     </button>
        //   </div>
        // </div>
      )}

      {/* Show Load More button only if there is more data to load */}
      {hasMore && (
        <button
          className=" bg-backgroundOne rounded-[12px] px-[1rem] py-[0.5rem] mb-[2rem]"
          onClick={() => setSkip((prev: number) => prev + 5)}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default MainBar;
