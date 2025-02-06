"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Article, GearSix, SignOut } from "@phosphor-icons/react";
import { useProjectContext } from "@/app/projectContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile sheet state
  const { isAuth, loading } = useProjectContext();

  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown state
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    if (isAuth && !loading) {
      setIsLoggedIn(true);
    }
  }, [isAuth, loading]);


  const handleReviewRoute = async () => {
    let userId: string = localStorage.getItem("userId") || "";
    console.log(userId);
    if (userId == null || userId == "") {
      try {
        console.log("here");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/giveId`,
          {
            withCredentials: true,
          }
        );

        userId = response.data.userId;
        localStorage.setItem("userId", userId);
        console.log("here1");
      } catch (error) {
        console.log(error);
        toast.error("Token expired, logout first and then login");
      }
    }
    console.log("here2");
    router.push(`/user/${userId}`);
  };

  return (
    <div className="fixed top-2 left-0 w-full flex justify-center px-2 py-2 z-20">
      <div className="w-[100%] max-w-[64rem] bg-white rounded-[1rem] border shadow-sm ">
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-2">
            <img
              className="w-8 md:h-8"
              src="/images/logo.svg"
              alt="TrustFlag Logo"
            />
            <h1 className="font-bold text-[1.25rem] md:text-[1.5rem] text-[#45474B]">
              Trustflag.in
            </h1>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center sm:gap-4 lg:gap-6">
            {/* Write a Review Button */}
            <Button
              variant="ghost"
              className="bg-[#45474B] text-white hover:bg-[#3e3f42] hover:text-white rounded-[0.5rem] px-6"
              onClick={() => router.push("/search")}
            >
              Write a Review
            </Button>

            {isLoggedIn ? (
              <div className="relative">
                {/* Profile Icon with Dropdown */}
                <button
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <UserCircle className="h-6 w-6" />
                  {/* <ChevronDown className="h-4 w-4" /> */}
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 min-w-[8rem] bg-zinc-50 border shadow-lg rounded-lg p-[0.35rem] z-50 cursor-pointer">
                    <p
                      onClick={() => handleReviewRoute()}
                      className="flex items-center gap-[0.35rem] px-1 py-[0.35rem] text-sm hover:bg-zinc-100"
                    >
                      <Article size={14} /> My Reviews
                    </p>
                    <Link
                      href="/account/setting"
                      className="flex items-center gap-[0.35rem] px-1 py-[0.35rem] text-sm hover:bg-zinc-100"
                    >
                      <GearSix size={14} /> Settings
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setIsLoggedIn(false);
                        router.push("/signin");
                      }}
                      className="flex items-center gap-[0.35rem] px-1 py-[0.35rem] text-sm hover:bg-zinc-100 w-full text-left"
                    >
                      <SignOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/signin")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4">
                  {/* Write a Review Button */}
                  <Button
                    variant="ghost"
                    className="bg-[#45474B] text-white hover:bg-[#3e3f42] hover:text-white rounded-[0.5rem] px-6"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/search");
                    }}
                  >
                    Write a Review
                  </Button>

                  {isLoggedIn ? (
                    <>
                      <a
                        href={`/user/${localStorage.getItem("userId")}`}
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        My Reviews
                      </a>
                      <Link
                        href="/settings"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("isLogin");
                          setIsLoggedIn(false);
                          setIsOpen(false);
                          router.push("/login");
                        }}
                        className="text-sm text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/login");
                      }}
                      className="text-sm text-left"
                    >
                      Login
                    </button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
