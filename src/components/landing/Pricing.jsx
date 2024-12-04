import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "@/components/PublicNavbar";
import {
  Check,
  Code2,
  FileText,
  Globe,
  Star,
  Users,
} from "lucide-react";

function Pricing() {
  return (
    <div className="flex flex-col gap-[1rem] my-[2rem]">
      <h2 className="text-xl md:text-3xl font-bold text-center">Pricing</h2>

      <Card className="w-full max-w-[60rem] mx-auto rounded-3xl border border-gray-200">
        <CardHeader className="space-y-1 p-6">
          <div className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="font-medium text-xl">
            Free, yes heard right we are rolling out beta so we free
          </h3>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-6">
          <div className="flex items-baseline text-2xl font-semibold">
            $0
            <span className="ml-1 text-sm font-normal text-gray-500">
              /month
            </span>
          </div>
          <Button className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white">
            Get started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Free</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Headless mode for solo bloggers",
                "WYSIWYG markdown editor",
                "GitHub backup",
                "Image CDN and optimization",
                "Unlimited API usage",
                "Powerful blog dashboard",
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Pricing;
