import axios from "axios";
import React, { useEffect, useState } from "react";

interface ReviewData {
  name?: string;
  content: string;
}

const Snippet: React.FC = () => {
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [projectId, setProject] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const storedProjectId = localStorage.getItem("projectId");
      setProject(storedProjectId);
      const res = await axios.get(
        `http://localhost:8080/v1/responses?projectId=${storedProjectId}`,
        {
          withCredentials: true,
        }
      );
      setReviewData(res.data.responses as ReviewData[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    const reviewsHtml = reviewData
      .slice(0, 3)
      .map(
        (review, index) => `
      <div
        key="${index}"
        className="p-[1rem] w-[30%] flex flex-col rounded-[8px] bg-backgroundThree"
      >
        <span className="text-textTwo">
          ${review.name ? review.name : "Anonymous"}
        </span>
        <p className="text-[16px]">${review.content}</p>
      </div>
    `
      )
      .join("\n");

    const codeSnippet = `
<div className="w-[100%] flex gap-[1rem] justify-center">
  ${reviewsHtml}
</div>
<a href="" className="p-2 rounded-[8px] bg-backgroundTwo text-textTwo">
  View more
</a>
`;

    navigator.clipboard.writeText(codeSnippet.trim());
    alert("Code snippet copied to clipboard!");
  };

  useEffect(() => {
    fetchReviews();
  }, [projectId]);

  const reviewsToShow = reviewData.slice(0, 3); // Limit to 3 reviews

  return (
    <div className="mt-[2rem] relative bg-backgroundOne border-special border-backgroundTwo rounded-[12px] p-[1rem] flex flex-col items-center justify-center gap-[1rem]">
      {loading ? (
        <p>Loading...</p>
      ) : reviewsToShow.length > 0 ? (
        <div className="w-[100%] flex gap-[1rem] justify-center">
          {reviewsToShow.map((review, index) => (
            <div
              key={index}
              className="p-[1rem] w-[30%] flex flex-col rounded-[8px] bg-backgroundThree"
            >
              <span className="text-textTwo">
                {review.name ? review.name : "Anonymous"}
              </span>
              <p className="text-[16px]">{review.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available.</p>
      )}
      <a href="" className="p-2 rounded-[8px] bg-backgroundTwo text-textTwo">
        View more
      </a>
      <button
        onClick={handleCopyCode}
        className="absolute bottom-2 right-2 p-2 rounded-md bg-backgroundTwo text-textOne"
      >
        Copy Code
      </button>
    </div>
  );
};

export default Snippet;
