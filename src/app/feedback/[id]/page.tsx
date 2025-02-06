"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StartInput from "./starInput";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useProjectContext } from "@/app/projectContext";

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
  website: string;
}

function SimpleFormPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [showInputs, setShowInputs] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state for submission status
  const [loading, setLoading] = useState(false);
  const { isAuth, loading: load } = useProjectContext();

  const [showModal, setShowModal] = useState(false);
  const [highlighter, setHighlighter] = useState({
    message: "",
  });

  useEffect(() => {
    
    if (!isAuth && !load) {
      setShowModal(true);
    }
  }, [isAuth, load]);

  const Modal = () => (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[30rem]">
        <h2 className="text-xl font-semibold">Please Log In or Sign Up</h2>
        <p className="mt-2 text-zinc-600">
          You need to log in to submit your feedback.
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => router.push("/signin")}
            className="bg-zinc-500 text-white py-2 px-4 rounded-[8px]"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#379777] text-white py-2 px-4 rounded-[8px]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </motion.div>
  );

  const [details, setDetails] = useState<IDetailsToSend>({
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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
        {
          params: { projectId },
        }
      );
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
          message:
            "Please describe what we did wrong, we will definitely try to solve it for you",
        });
      } else if (rating < 4) {
        setDetails((prev) => ({ ...prev, type: "Suggestion" }));
        setHighlighter({
          message:
            "Please describe what should we do to make you rate us 5 stars. Any feature or recommendation.",
        });
      } else if (rating <= 5) {
        setDetails((prev) => ({ ...prev, type: "Liked" }));
        setHighlighter({
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
      setLoading(true);
      const submitData = {
        ...details,
        star: rating,
      };

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
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-100 p-[1rem]">
      {showModal && <Modal />}
      <div className="relative max-w-[30rem] flex-grow flex flex-col justify-center items-center mt-[2rem]">
        <motion.img
          onClick={() => router.push(`https://${projectDetails?.website}`)}
          transition={{ duration: 0.2, type: "spring" }}
          src={projectDetails?.logoUrl}
          className="absolute z-30 top-[-3rem] w-[6rem] h-[6rem] border-special border-zinc-200 rounded-[8px] object-cover"
        />
        <motion.div
          transition={{ duration: 0.2, type: "spring" }}
          className={`w-[100%] p-[1rem] sm:p-[1.5rem] bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-[1rem] text-zinc-700 flex flex-col gap-[1rem] sm:gap-[1.5rem] border-[2px] border-zinc-200 ${
            showInputs ? "overflow-visible" : "overflow-hidden"
          }`}
          layout
        >
          {!submitted && (
            <motion.div
              className={`h-[5rem] ${
                showInputs ? "scale-75" : "scale-100"
              } mt-[2rem]`}
              transition={{ duration: 0.5 }}
            >
              {/* <a href={projectDetails?.website} className="font-semibold text-[1rem] text-center">{projectDetails?.name}</a> */}
              <StartInput rating={rating} setRating={setRating} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {submitted ? (
              <>
                <motion.div
                  className="text-[2rem] font-semibold text-center text-green-600 mt-[4rem]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  Thank you for your feedback!
                </motion.div>
                <a
                  href="/search"
                  className="text-[0.65rem] text-zinc-400 text-center underline"
                >
                  Go back
                </a>
              </>
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
                    <div className="flex flex-col justify-start items-start gap-[0.35rem]">
                      <label className="text-zinc-400 font-medium text-[0.95rem]">
                        Content
                      </label>
                      <textarea
                        id="content"
                        rows={4}
                        value={details.content}
                        onChange={handleChange}
                        placeholder={highlighter.message}
                        className="w-full bg-zinc-100 p-[0.5rem] rounded-[8px] border-[2px] border-zinc-200 focus:border-[#37977793] focus:outline-none"
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
              <button
                onClick={onSubmit}
                className="bg-[#379979] text-[0.9rem] border-[2px] border-[#31876a] text-white px-[1rem] py-[0.35rem] rounded-[6px] hover:bg-[#2f8166] transition-colors"
              >
                Submit
              </button>
            </div>
          )}
        </motion.div>
        <p className="mt-[0.35rem] text-[0.65rem] text-zinc-300 text-center">
          Widget by{" "}
          <a href="https://trustflag.in" className="text-[#399d7c95] underline">
            TrustFlag.in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SimpleFormPage;
