"use client";
import { CheckCircle, Flag, ShareFat, Star } from "@phosphor-icons/react";
import React from "react";

export default function CompanyReviewPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 bg-blue-500 rounded-full mr-4"></div>
          <div>
            <h1 className="text-3xl font-bold">Company Name</h1>
            <p className="text-gray-600">Location • Industry</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="text-3xl font-bold">4.3</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star size={32} />
              ))}
            </div>
            <div className="text-sm text-gray-600">27,431 reviews</div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Visit Website
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Filter Reviews</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="rating"
                value="all"
                className="mr-2"
                defaultChecked
              />
              All Ratings
            </label>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  className="mr-2"
                />
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
            {[1, 2, 3].map((review) => (
              <div key={review} className="border p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-semibold">JD</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">John Doe</span>
                      <CheckCircle size={32} />
                    </div>
                    <div className="text-sm text-gray-600">New York City</div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star size={32} />
                  ))}
                </div>
                <p className="mb-2">
                  Great company! Their products are top-notch and customer
                  service is excellent.
                </p>
                <div className="text-sm text-gray-600 mb-2">
                  Reviewed on March 15, 2023
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
    </div>
  );
}
