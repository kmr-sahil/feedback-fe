"use client";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import StartInput from "./components/starInput";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

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
  const [highlighter, setHighlighter] = useState({
    email: "",
    message: "",
  });
  const [isReq, setIsReq] = useState();
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
      const response = await axios.get(`http://localhost:8080/v1/project`, {
        params: { projectId }, // Use params to include query parameters
      });
      const details = response.data; // Access data from the response
      console.log(details);
      setProjectDetails(details.project); // Ensure `details.project` is correctly typed
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
    const projectId = pathname.split("/")[3];
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
      const submitData = {
        ...details,
        star: rating, // Rating is already a number
      };

      console.log(submitData);

      if (
        details.name === "" &&
        projectDetails?.adjustForm?.isNameReq === true
      ) {
        console.log("name is required");
        toast("Name is required", { duration: 3000 });
        return; // stop submission if required
      }

      if (
        details.email === "" &&
        projectDetails?.adjustForm?.isEmailReq === true
      ) {
        console.log("email is required");
        toast("Email is required", { duration: 3000 });
        return; // stop submission if required
      }

      if (details.content == "") {
        toast("Content is required", { duration: 3000 });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/v1/responses",
        submitData,
        {
          withCredentials: true,
        }
      );
      toast("Submitted Successfully", { duration: 3000 });
      console.log(response.data); // handle response if needed
    } catch (error) {
      console.log(error);
    }
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
          {/* Star Input */}
          <motion.div
            className={`h-[5rem] ${
              showInputs ? "scale-75" : "scale-100"
            } mt-[3rem]`}
            transition={{ duration: 0.5 }}
          >
            <StartInput rating={rating} setRating={setRating} />
          </motion.div>

          {/* Input Fields and Span */}
          <AnimatePresence mode="wait">
            {showInputs ? (
              <motion.div
                className="flex flex-col gap-[1rem]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ scale: -100, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
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
          </AnimatePresence>

          {/* Submit Button */}
          <motion.div
            className={`flex ${showInputs ? "justify-end" : "justify-center"}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, type: "spring" }}
            layout
          >
            <CustomButton label={"Submit"} onClick={onSubmit} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SimpleFormPage;
