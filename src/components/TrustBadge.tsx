"use client";
import { useProjectContext } from "@/app/projectContext";
import { Star } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TrustBadge() {
  const [data, setData] = useState<any>();
    const { activeProject} = useProjectContext();

  // Fetch company details
  useEffect(() => {
    const website = localStorage.getItem("website") || null;

    fetchCompanyDetails(website);
  }, [activeProject]);

  const fetchCompanyDetails = async (website: any) => {
    if (!website) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/details`,
        { params: { website } }
      );
      console.log(res.data.company);
      setData(res.data.company);
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  // Copy function
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const prefilledContent = `<div style={{
  borderRadius: '12px',
  border: '1px solid #e5e5e5',
  padding: '1rem',
  backgroundColor: '#fafafa',
  display: 'flex',
  flexDirection: window.innerWidth < 540 ? 'column-reverse' : 'row',  // Mobile: column-reverse, Desktop: row
  gap: window.innerWidth < 640 ? '0' : '1.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}}>
  <div style={{
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-end',
    marginTop: window.innerWidth < 540 ? '0.5rem' : '0', // Adjust margin-top based on screen size
  }}>
    <img
      src="https://sureefy.s3.ap-south-1.amazonaws.com/logo.svg"
      alt=""
      style={{
        width: '40px',
        height: '40px',
      }}
    />
    <h2 style={{
      fontWeight: '600',
      fontSize: '1.4rem',
      color: '#45474b',
      margin: '0',
    }}>Trustflag.in</h2>
</div>
<div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: window.innerWidth < 640 ? 'center' : 'right', // Align text to the right on larger screens
  }}>
    <p style={{
      fontSize: '0.75rem',
      color: '#a3a3a3',
      fontWeight: '600',
      margin: '0.25rem 0',
    }}>
      ${data?.avgRating || 0} Rating | ${data?.totalReviews || 0} Reviews
    </p>
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      gap: '0.15rem',
      marginLeft: window.innerWidth < 640 ? '0' : 'auto', // Adjust margin based on screen size
    }}>
    <>${Array.from(
      { length: 5 },
      (_, index) => `
    <svg
      key={${index}}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 256 256"
      style={{
        fill: "${index < (data?.avgRating || 0) ? "#F4CE14" : "#D1D5DB"}",
        width: "24px",
        height: "24px",
      }}
    >
      <path d="M236.47,104.91a15.81,15.81,0,0,0-13.55-10.81l-58.64-4.92L141.5,34.35a15.91,15.91,0,0,0-27,0L91.72,89.18,33.08,94.1A15.81,15.81,0,0,0,19.53,104.91a15.34,15.34,0,0,0,3.35,16.41l44.19,39.4-12.68,56.95a15.33,15.33,0,0,0,5.89,15.85,15.74,15.74,0,0,0,16.58.82l52.14-29.68,52.14,29.68a15.74,15.74,0,0,0,16.58-.82,15.33,15.33,0,0,0,5.89-15.85l-12.68-56.95,44.19-39.4A15.34,15.34,0,0,0,236.47,104.91Z"></path>
    </svg>
  `
    ).join("")}</>
  </div>
</div>
</div>`;

  return (
    <div className="w-full relative bg-zinc-100 border-[1px] border-zinc-200 rounded-[12px] flex justify-center items-center p-[1rem]">
      {data ? (
        <div className=" rounded-8px border-[1px] border-zinc-200 p-[1rem] bg-zinc-50 rounded-[12px] flex flex-col-reverse sm:flex-row sm:gap-[1.5rem] shadow-sm">
          <div className="flex gap-2 items-end mt-[0.5rem] sm:mt-0">
            {" "}
            <img
              src="https://sureefy.s3.ap-south-1.amazonaws.com/logo.svg"
              alt=""
              className="w-10 h-10"
            />
            <h2 className="font-semibold text-[1.4rem] text-zinc-700">
              Trustflag.in
            </h2>
          </div>{" "}
          <div className="flex flex-col justify-center items-center sm:items-end sm:justify-end">
            <p className="text-[0.75rem] text-zinc-400 font-semibold">
              {data.avgRating} Rating | {data.totalReviews} Reviews
            </p>
            <div className="flex justify-end items-end gap-[0.15rem] sm:mr-auto">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={24}
                  weight="fill"
                  className={
                    index < (data.avgRating || 0)
                      ? "text-[#F4CE14]"
                      : "text-zinc-200"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <button
        onClick={() => handleCopy(prefilledContent)}
        className="absolute bottom-2 right-2 px-2 py-1 rounded-sm bg-zinc-200 border-[1px] border-zinc-300 bg-opacity-70 text-zinc-600 text-xs"
      >
        Copy Code
      </button>

    </div>
  );
}
