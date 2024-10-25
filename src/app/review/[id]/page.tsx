"use client";

import { CheckCircle, Flag, ShareFat, Star } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

// Interfaces for type safety
interface AdjustForm {
  isEmailReq: boolean;
  isNameInputReq: boolean;
  isNameReq: boolean;
}

interface Response {
  responseId: number;
  projectId: string;
  type: string;
  content: string;
  star: number;
  name?: string;
  email?: string;
  createdAt: string;
}

interface Project {
  projectId: string;
  userId: string;
  name: string;
  website: string;
  description?: string;
  logoUrl?: string;
  adjustForm: AdjustForm;
  totalReviews?: number;
  avgRating?: number;
  country?: string;
  category?: string;
  createdAt: string;
  responses: Response[];
}

interface ApiResponse {
  message: string;
  response: Project[];
}

export default function CompanyReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const website = searchParams.get('website') || params.id; // Try both query param and route param
  
  const [companyData, setCompanyData] = useState<Project | null>(null);

  const fetchReviews = async () => {
    if (!website) return;

    try {
      const res = await axios.get<ApiResponse>(`http://localhost:8080/v1/company/review?website=${website}`);
      setCompanyData(res.data.response[0]);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [website]);

  if (!website) {
    return <div className="container mx-auto p-4">No website parameter provided</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {companyData && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-blue-500 rounded-full mr-4">
                <img src={companyData.logoUrl || ""} alt={`${companyData.name} logo`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{companyData.name}</h1>
                <p className="text-gray-600">{companyData.country} • {companyData.category}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="text-3xl font-bold">{companyData.avgRating || 0}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={32} fill={i < (companyData.avgRating || 0) ? "#FFD700" : "#ccc"} />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{companyData.totalReviews} reviews</div>
              </div>
              <a href={`https://${companyData.website}`} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Visit Website
                </button>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <h2 className="text-xl font-semibold mb-4">Filter Reviews</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="rating" value="all" className="mr-2" defaultChecked />
                  All Ratings
                </label>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="radio" name="rating" value={rating} className="mr-2" />
                    {rating} {rating === 1 ? "Star" : "Stars"}
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="mb-8">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {companyData.responses.map((review) => (
                  <div key={review.responseId} className="border p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-semibold">{review.name?.charAt(0) || "N/A"}</span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">{review.name || "Anonymous"}</span>
                          <CheckCircle size={32} />
                        </div>
                        <div className="text-sm text-gray-600">{review.email || "No email provided"}</div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={32} fill={i < review.star ? "#FFD700" : "#ccc"} />
                      ))}
                    </div>
                    <p className="mb-2">{review.content}</p>
                    <div className="text-sm text-gray-600 mb-2">
                      Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-gray-800">
                        <ShareFat size={32} />
                        Share
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-800">
                        <Flag size={32} />
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}