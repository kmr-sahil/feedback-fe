"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function UserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/self/data`,
        { withCredentials: true }
      );
      console.log(response);
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      toast.error("An error occurred while fetching user details");
    }
  };

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Name updated successfully");
      } else {
        toast.error("Failed to update name");
      }
    } catch (error) {
      toast.error("An error occurred while updating name");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    // if (newPassword.length < 8) {
    //   toast.error("New password must be at least 8 characters long");
    //   return;
    // }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/password`,

        { curr: currentPassword, newPass: newPassword },
        { withCredentials: true }
      );
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user`,
        {
          withCredentials: true,
        }
      );
      
    } catch (error:any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {

    fetchProjects();

  },[])

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <form
        onSubmit={handleNameUpdate}
        className="mb-8 flex flex-col items-end bg-zinc-50 p-[1rem] rounded-[12px] shadow-sm"
      >
        <div className="flex gap-[1rem] w-full">
          <div className="flex-grow">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="email">Email</label>
            <Input id="email" value={email} disabled />
          </div>
        </div>
        <Button type="submit" className="mt-4 bg-[#379777]" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordChange}
        className="mb-8 flex flex-col items-end bg-zinc-50 p-[1rem] rounded-[12px] shadow-sm"
      >
        <div className="w-full flex flex-col gap-[1rem]">
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="mt-4 bg-[#379777]">
          {isLoading ? "Changing Password..." : "Change Password"}
        </Button>
      </form>

      <form
        onSubmit={handleNameUpdate}
        className="mb-8 flex flex-col items-end bg-zinc-50 p-[1rem] rounded-[12px] shadow-sm"
      ></form>
    </div>
  );
}
