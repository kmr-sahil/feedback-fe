"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const navItems = [
    
    // {
    //   name: "Solutions",
    //   href: "#",
    //   dropdownItems: [
    //     { name: "Solution 1", href: "/solution-1" },
    //     { name: "Solution 2", href: "/solution-2" },
    //     { name: "Solution 3", href: "/solution-3" },
    //   ],
    // },
    // {
    //   name: "Features",
    //   href: "#",
    //   dropdownItems: [
    //     { name: "Feature 1", href: "/feature-1" },
    //     { name: "Feature 2", href: "/feature-2" },
    //     { name: "Feature 3", href: "/feature-3" },
    //   ],
    // },
    { name: "Solutions", href: "/#solution" },
    { name: "Features", href: "/#features" },
    { name: "For Business", href: "/#start" },
  ];

  return (
    <div className="fixed top-2 left-0 w-full flex justify-center px-2 py-2 z-20">
      <div className="w-[90%] max-w-[1200px] bg-white rounded-[1rem] border shadow-sm">
        <div className="flex h-14 items-center justify-between px-4">
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

          <div className="hidden md:flex items-center sm:gap-4 lg:gap-6">
            {navItems.map((item) =>
              (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="bg-[#45474B] text-white hover:bg-[#393a3c] hover:text-white rounded-[0.5rem] px-6 hidden md:block"
              onClick={() => router.push('/search')}
            >
              Write a Review
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) =>
                    (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                  <Button
                    variant="ghost"
                    className="bg-[#45474B] text-white hover:bg-[#393a3c] hover:text-white rounded-[0.5rem] px-6"
                    onClick={() => router.push('/search')}
                  >
                    Write a Review
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
