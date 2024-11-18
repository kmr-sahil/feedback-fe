"use client";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import StartInput from "./starInput";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface IDetailsToSend {
  projectId: string;
  type: string;
  content: string;
  star: number;
  name?: string;
  email?: string;
}

interface AdjustInputs {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface ProjectDetails {
  adjustForm: AdjustInputs;
  createdAt: string;
  description: string;
  logoUrl: string;
  name: string;
  projectId: string;
  userId: string;
}

function SimpleFormPage() {
  const [rating, setRating] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state for submission status
  const [loading, setLoading] = useState(false);
  const [highlighter, setHighlighter] = useState({
    email: "",
    message: "",
  });
  const [details, setDetails] = useState<IDetailsToSend>({
    name: "",
    email: "",
    projectId: "",
    type: "",
    content: "",
    star: 0,
  });

  const [projectDetails, setProjectDetails] = useState<
    ProjectDetails | undefined
  >(undefined);

  const getProjectDetail = async (projectId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
        params: { projectId },
      });
      const details = response.data;
      console.log(details);
      setProjectDetails(details.project);
    } catch (error) {
      console.log(error);
      toast("Error fetching project");
    }
  };

  useEffect(() => {
    if (rating > 0) {
      setShowInputs(true);

      if (rating < 2) {
        setDetails((prev) => ({ ...prev, type: "Issue" }));
        setHighlighter({
          email: "Enter your mail so we can inform resolution at earliest",
          message:
            "Please describe what we did wrong, we will definitely try to solve it for you",
        });
      } else if (rating < 4) {
        setDetails((prev) => ({ ...prev, type: "Suggestion" }));
        setHighlighter({
          email: "Enter your mail",
          message:
            "Please describe what should we do to make you rate us 5 stars. Any feature or recommendation.",
        });
      } else if (rating <= 5) {
        setDetails((prev) => ({ ...prev, type: "Liked" }));
        setHighlighter({
          email: "Enter your mail",
          message: "Please tell us what you liked the most about us.",
        });
      }
    }
  }, [rating]);

  const pathname = usePathname();

  useEffect(() => {
    const projectId = pathname.split("/")[2];
    setDetails((prev) => ({ ...prev, projectId }));
    getProjectDetail(projectId);
  }, [pathname]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true)
      const submitData = {
        ...details,
        star: rating,
      };

      if (
        details.name === "" &&
        projectDetails?.adjustForm?.isNameReq === true
      ) {
        toast("Name is required", { duration: 3000 });
        return;
      }

      if (
        details.email === "" &&
        projectDetails?.adjustForm?.isEmailReq === true
      ) {
        toast("Email is required", { duration: 3000 });
        return;
      }

      if (details.content == "") {
        toast("Content is required", { duration: 3000 });
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses`,
        submitData,
        {
          withCredentials: true,
        }
      );
      toast("Submitted Successfully", { duration: 3000 });
      setSubmitted(true); // Set submission status to true
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-100 p-[1rem]">
      <div className="relative max-w-[30rem] flex-grow flex flex-col justify-center items-center mt-[2rem]">
        <motion.img
          transition={{ duration: 0.2, type: "spring" }}
          src={projectDetails?.logoUrl}
          className="absolute z-30 top-[-3rem] w-[6rem] h-[6rem] border-special border-zinc-200 rounded-[8px] object-cover"
        />
        <motion.div
          transition={{ duration: 0.2, type: "spring" }}
          className={`w-[100%] p-[1.5rem] bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-[1rem] text-zinc-700 flex flex-col gap-6 border-[2px] border-zinc-200 ${
            showInputs ? "overflow-visible" : "overflow-hidden"
          }`}
          layout
        >
          {!submitted && (
            <motion.div
              className={`h-[5rem] ${
                showInputs ? "scale-75" : "scale-100"
              } mt-[3rem]`}
              transition={{ duration: 0.5 }}
            >
              <StartInput rating={rating} setRating={setRating} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                className="text-[2rem] font-semibold text-center text-green-600 mt-[4rem]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                Thank you for your feedback!
              </motion.div>
            ) : (
              <>
                {showInputs ? (
                  <motion.div
                    className="flex flex-col gap-[1rem]"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ scale: -100, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {/* Input Fields */}
                    <div className="flex flex-col justify-start items-start gap-[0.5rem]">
                      <label className="text-zinc-400 font-medium text-[0.95rem]">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={details.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full bg-slate-100 p-[0.5rem] rounded-[8px] border-[2px] border-zinc-200 placeholder:text-zinc-400 focus:border-zinc-400"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-[0.5rem]">
                      <label className="text-zinc-400 font-medium text-[0.95rem]">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={details.email}
                        onChange={handleChange}
                        placeholder={highlighter.email}
                        className="w-full bg-slate-100 p-[0.5rem] rounded-[8px] border-[2px] border-zinc-200 placeholder:text-zinc-400 focus:border-zinc-400"
                      />
                    </div>

                    <div className="flex flex-col justify-start items-start gap-[0.5rem]">
                      <label className="text-zinc-400 font-medium text-[0.95rem]">
                        Content
                      </label>
                      <textarea
                        id="content"
                        rows={4}
                        value={details.content}
                        onChange={handleChange}
                        placeholder={highlighter.message}
                        className="w-full bg-slate-100 p-[0.5rem] rounded-[8px] border-[2px] border-zinc-200 focus:border-zinc-400 focus:outline-none"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    className="text-[2rem] font-semibold text-center"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 1, opacity: 1 }}
                    exit={{ x: -100, opacity: 1 }}
                    transition={{ duration: 0.1, type: "spring" }}
                  >
                    Give Us Feedback
                  </motion.span>
                )}
              </>
            )}
          </AnimatePresence>

          {showInputs && !submitted && (
            <div className="ml-auto">
              <CustomButton label="Submit" onClick={onSubmit} loading={loading} disabled={loading}/>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default SimpleFormPage;
