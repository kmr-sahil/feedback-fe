"use client"
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  setDetails: React.Dispatch<
    React.SetStateAction<{
      logoUrl: string;
      name: string;
      description: string;
      website: string;
      country: string;
      category: string;
    }>
  >;
}

const FileUpload: React.FC<FileUploadProps> = ({ setDetails }) => {
  const [file, setFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const upload = async (file: File) => {
    try {
      console.log(file);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/helper/s3/signed_url`,
        {
          content_type: file.type,
        }
      );

      const { signedUrl, fileLink } = response.data.data;

      if (!signedUrl) {
        toast("Error happened, Please try again.");
        return;
      }

      // Upload the file using the pre-signed URL
      await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Update the logo URL in both local state and setDetails
      setDetails((prevDetails) => ({ ...prevDetails, logoUrl: fileLink }));
      setLogoUrl(fileLink);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Error during file upload");
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set file in state
      upload(selectedFile); // Trigger upload
    }
  };

  return (
    <div
      onClick={handleDivClick}
      className="border-special border-dashed border-backgroundThree w-[6rem] h-[6rem] rounded-[12px] flex justify-center items-center cursor-pointer overflow-hidden"
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Uploaded logo"
          className="h-[6rem] object-cover"
        />
      ) : (
        <span className="text-center">Upload your logo</span>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default FileUpload;
