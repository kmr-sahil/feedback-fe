"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import PublicNavbar from "@/components/PublicNavbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions, countryOptions } from "@/lib/options";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Company {
  projectId: string;
  userId: string;
  name: string;
  website: string;
  description: string | null;
  logoUrl: string;
  adjustForm: {
    isNameReq: boolean;
    isEmailReq: boolean;
    isNameInputReq: boolean;
  };
  totalReviews: number;
  avgRating: number;
  country: string;
  category: string;
  createdAt: string;
}

export default function CompanySearch() {
  const router = useRouter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(10); // Limit can be constant
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch companies from API
  const fetchCompanies = async (reset = false) => {
    if (category == "all") {
      setCategory("");
    }
    if (location == "all") {
      setLocation("");
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`,
        {
          params: {
            searchTerm,
            category,
            location,
            rating,
            offset: reset ? 0 : offset,
            limit,
          },
        }
      );

      const newCompanies = res.data.response;
      setCompanies(reset ? newCompanies : [...companies, ...newCompanies]);

      // Update offset and hasMore state
      setOffset(reset ? newCompanies.length : offset + newCompanies.length);
      setHasMore(newCompanies.length >= limit);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies(true); // Reset data on filter change
  }, [searchTerm, category, location, rating]);

  const filteredCompanies = companies.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || company.category === category) &&
      (location === "" ||
        company.country.toLowerCase().includes(location.toLowerCase())) &&
      company.avgRating >= rating
    );
  });

  return (
    <div className="flex flex-col relative gap-[1rem] justify-center items-center">
      <PublicNavbar />
      <div className="w-full rounded-b-[3rem] md:rounded-b-[8rem] space-y-4 bg-[#379777] px-[1rem] pt-[12rem] pb-[2rem] sm:px-[4rem] lg:px-[16rem] md:pt-[15rem] md:pb-[3rem] text-[#45474B]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-full p-3 md:p-4 border border-gray-300 rounded-[16px] text-[1rem] md:text-[1.2rem]"
          ></input>
          <Button
            type="submit"
            className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-[#45474B] rounded-[0.5rem]"
          >
            <Search className="h-4 w-4" />
            <span className="text-[1rem]">Search</span>
          </Button>
        </div>

        {!showAdvanced && (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full text-xs text-[#F5F7F8] underline flex justify-center items-center text-center"
          >
            Advanced options
            <ChevronDown className="h-3 w-3 ml-1" />
          </button>
        )}
        {showAdvanced && (
          <div className=" flex flex-wrap gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className=" w-[180px] bg-white">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <span className="mr-2 text-[#F5F7F8]">Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className={`px-3 py-1 border ${
                      rating >= value
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-gray-100 border-gray-300"
                    } ${value === 1 ? "rounded-l" : ""} ${
                      value === 5 ? "rounded-r" : ""
                    }`}
                    aria-label={`${value} star${
                      value !== 1 ? "s" : ""
                    } and above`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-[100%] max-w-[70rem] mx-auto space-y-4 flex flex-col justify-center items-center px-[1rem]">
        {filteredCompanies.map((company) => (
          <div
            key={company.projectId}
            onClick={() => router.push(`review/${company.website}`)}
            className="w-[100%] cursor-pointer flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-[#F5F7F8] text-[#45474B]"
          >
            <img
              src={company?.logoUrl || "/placeholder.svg"}
              alt={`${company.name} logo`}
              width={64}
              height={64}
              className="object-contain"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-600">{company.category}</p>
              <p className="text-sm text-gray-600">{company.country}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-semibold">
                  {company.avgRating ? company.avgRating.toFixed(1) : 0}
                </span>
              </div>
              <a
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>
        ))}

        {hasMore && (
          <button
            onClick={() => fetchCompanies(false)} // Load more data
            className="px-2 py-1 mt-4 bg-zinc-50 rounded border-[1px] border-zinc-200 hover:bg-zinc-100 text-[#45474B]"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
