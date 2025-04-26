"use client";

import React, { useEffect, useState } from "react";
import { Star, X, ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";

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
  isNameReq: boolean;
  allowVerifiedUserOnly: boolean;
}

interface ProjectDetails {
  adjustForm: AdjustInputs;
  projectId: string;
}

function WidgetComponent({ projectId }: { projectId: string }) {
  const [toggle, setToggle] = useState(false);
  const [rating, setRating] = useState(0);
  const [step, setStep] = useState(1);
  const [errorMessages, setErrorMessages] = useState({
    content: "",
    name: "",
    email: "",
  });
  const [details, setDetails] = useState<IDetailsToSend>({
    name: "",
    email: "",
    projectId: projectId,
    type: "",
    content: "",
    star: 0,
  });
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [otp, setOtp] = useState<any>("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDetails((prev) => ({
      ...prev,
      type: rating < 2 ? "Issue" : rating < 4 ? "Suggestion" : "Liked",
      star: rating,
    }));
  }, [rating]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project`,
          { params: { projectId } }
        );
        setProjectDetails(response.data.project);
      } catch (error) {
        console.error("Error fetching project details", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const sendOTP = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tempUser/getOtp`,
        { email: details.email, name: details.name },
        { withCredentials: true }
      );
      setStep(4);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tempUser/verifyOtp`,
        { email: details.email, otp: otp },
        { withCredentials: true }
      );

      console.log(res)
      return res.data.userId;

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateStep = () => {
    const errors: { content: string; name: string; email: string } = {
      content: "",
      name: "",
      email: "",
    };

    if (step === 2 && !details.content.trim()) {
      errors.content = "Please provide some feedback.";
    }
    if (step === 3) {
      if (projectDetails?.adjustForm.isNameReq && !details.name?.trim()) {
        errors.name = "required.";
      }
      if (projectDetails?.adjustForm.isEmailReq && !details.email?.trim()) {
        errors.email = "required.";
      } else if (details.email && !/\S+@\S+\.\S+/.test(details.email)) {
        errors.email = "Please enter a valid email address.";
      }
    }

    setErrorMessages(errors);
    return !errors.content && !errors.name && !errors.email;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        setLoading(true)
        const userId = await verifyOtp()

        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/responses/widget`,
          {
            projectId: projectId,
            type: details.type,
            content: details.content,
            star: details.star,
            userId: userId,
          },
          { withCredentials: true }
        );
        setStep(5);
      } catch (error) {
        console.error("Error submitting feedback", error);
      } finally {
        setLoading(false)
      }
    }
  };

  const renderStarRating = () => (
    <div className="flex justify-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            setRating(star);
            if (step == 1) handleNext();
          }}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            size={step === 1 ? 40 : 32}
            weight={star <= rating ? "fill" : "regular"}
            className={`${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center my-[1rem]">
            {renderStarRating()}
            <p className="text-[1.2rem] font-semibold">
              How is your experience?
            </p>
          </div>
        );
      case 2:
        return (
          <div className=" mt-[1rem] flex flex-col">
            {renderStarRating()}
            <label
              htmlFor="name"
              className="text-[0.75rem] text-zinc-400 pl-[0.25rem]"
            >
              Explain us{" "}
              {errorMessages.content && (
                <span className="text-red-500 text-xs">
                  - {errorMessages.content}
                </span>
              )}
            </label>
            <textarea
              id="content"
              rows={2}
              value={details.content}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              className="w-full mt-[0.15rem] p-2 rounded-[8px] border-[2px] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37977793]"
            />
            <button
              onClick={handleNext}
              className="w-full mt-[0.5rem] bg-[#379979] text-[0.9rem] border-[2px] border-[#31876a] text-white px-[1rem] py-[0.35rem] rounded-[6px] hover:bg-[#2f8166] transition-colors"
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-2 mt-[1rem] flex flex-col">
            <div>
              <label
                htmlFor="name"
                className="text-[0.75rem] text-zinc-400 pl-[0.25rem]"
              >
                Name{" "}
                {errorMessages.name && (
                  <span className="text-red-500 text-xs">
                    - {errorMessages.name}
                  </span>
                )}
              </label>
              <input
                type="text"
                id="name"
                value={details.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-2 py-[0.35rem] rounded-[8px] border-[2px] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37977793]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-[0.75rem] text-zinc-400 pl-[0.25rem]"
              >
                Email{" "}
                {errorMessages.email && (
                  <span className="text-red-500 text-xs">
                    - {errorMessages.email}
                  </span>
                )}
              </label>
              <input
                type="email"
                id="email"
                value={details.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full px-2 py-[0.35rem] rounded-[8px] border-[2px] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37977793]"
              />
            </div>
            <button
              onClick={sendOTP}
              disabled={loading}
              style={{opacity: loading ? "70%" : ""}}
              className="w-full bg-[#379979] text-[0.9rem] border-[2px] border-[#31876a] text-white px-[1rem] py-[0.35rem] rounded-[6px] hover:bg-[#2f8166] transition-colors"
            >
              {loading ? "Submitting" : "Submit"}
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-2 mt-[1rem] flex flex-col">
            <p className="text-zinc-500 text-sm">We collect trusted reviews, so to maintain this we need to verify. </p>
            <div>
              {/* <label
                htmlFor="otp"
                className="text-[0.75rem] text-zinc-400 pl-[0.25rem]"
              >
                OTP{" "}
                
              </label> */}
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-2 py-[0.35rem] rounded-[8px] border-[2px] border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37977793]"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{opacity: loading ? "70%" : ""}}
              className="w-full bg-[#379979] text-[0.9rem] border-[2px] border-[#31876a] text-white px-[1rem] py-[0.35rem] rounded-[6px] hover:bg-[#2f8166] transition-colors"
            >
              {loading ? "Verifying" : "Verify"}
            </button>
          </div>
        );
      case 5:
        return (
          <div className=" text-center py-[1rem]">
            <p className="text-green-600 text-[1rem] font-semibold mb-4">
              🙏 Thank you for your feedback!
            </p>
            <button
              onClick={() => setToggle(false)}
              className=" text-xs  text-zinc-400 underline px-[1rem] py-[0.25rem]"
            >
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-min">
      <button
        className="px-[1rem] py-[0.5rem] bg-zinc-200 text-zinc-700 rounded-[8px] whitespace-nowrap"
        onClick={() => setToggle(true)}
      >
        Give us Feedback
      </button>

      {toggle && (
        <div className="absolute z-50 left-0 top-12 min-w-[18rem] mx-auto p-3 bg-zinc-50 rounded-[14px] shadow-sm border-[2px] border-zinc-200">
          {step < 4 && (
            <button
              onClick={() => setToggle(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}
          {step > 1 && step < 4 && (
            <button
              onClick={handleBack}
              className="absolute top-2 left-2 text-gray-400 hover:text-gray-700"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          {renderStepContent()}
          <p className="mt-[0.35rem] text-[0.5rem] text-zinc-300 text-center">
            Widget by{" "}
            <a
              href="https://trustflag.in"
              className="text-[#399d7c95] underline"
            >
              TrustFlag.in
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default WidgetComponent;
