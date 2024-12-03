"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, ChevronDown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile sheet state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown state
  const profileRef = useRef(null);
  const router = useRouter();

  // Check login status from localStorage
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin) {
      const loginDate = new Date(isLogin);
      const currentDate = new Date();
      const daysDifference = Math.floor(
        (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference <= 30) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("isLogin");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-2 left-0 w-full flex justify-center px-2 py-2 z-20">
      <div className="w-[90%] max-w-[1200px] bg-white rounded-[1rem] border shadow-sm">
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
              className="bg-[#45474B] text-white hover:bg-[#45474B]/90 rounded-[0.5rem] px-6"
              onClick={() => router.push("/search")}
            >
              Write a Review
            </Button>

            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                {/* Profile Icon with Dropdown */}
                <button
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <UserCircle className="h-6 w-6" />
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg p-2">
                    <Link
                      href="/my-reviews"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Reviews
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("isLogin");
                        setIsLoggedIn(false);
                        router.push("/login");
                      }}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
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
                    className="bg-[#45474B] text-white hover:bg-[#45474B]/90 rounded-[0.5rem] px-6"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/search");
                    }}
                  >
                    Write a Review
                  </Button>

                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/my-reviews"
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        My Reviews
                      </Link>
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
