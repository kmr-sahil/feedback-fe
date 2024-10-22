"use client"

import React, { useState } from "react"
import Image from "next/image"

// Mock data for companies
const companies = [
  { id: 1, name: "TechCorp", category: "Technology", location: "New York, NY", rating: 4.5, website: "https://techcorp.com", logo: "/placeholder.svg" },
  { id: 2, name: "EcoSolutions", category: "Environmental", location: "San Francisco, CA", rating: 4.2, website: "https://ecosolutions.com", logo: "/placeholder.svg" },
  { id: 3, name: "HealthPlus", category: "Healthcare", location: "Chicago, IL", rating: 3.8, website: "https://healthplus.com", logo: "/placeholder.svg" },
  { id: 4, name: "FinanceWise", category: "Finance", location: "Boston, MA", rating: 4.7, website: "https://financewise.com", logo: "/placeholder.svg" },
  { id: 5, name: "EduLearn", category: "Education", location: "Austin, TX", rating: 4.0, website: "https://edulearn.com", logo: "/placeholder.svg" },
]

const categories = ["Technology", "Environmental", "Healthcare", "Finance", "Education"]

export default function CompanySearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [rating, setRating] = useState(0)

  const filteredCompanies = companies.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || company.category === category) &&
      (location === "" || company.location.toLowerCase().includes(location.toLowerCase())) &&
      company.rating >= rating
    )
  })

  return (
    <div className="container max-w-[60rem] mx-auto p-4 font-sans">
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search for a company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex flex-wrap gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="City or ZIP code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`px-3 py-1 border ${
                    rating >= value ? 'bg-yellow-400 border-yellow-500' : 'bg-gray-100 border-gray-300'
                  } ${value === 1 ? 'rounded-l' : ''} ${value === 5 ? 'rounded-r' : ''}`}
                  aria-label={`${value} star${value !== 1 ? 's' : ''} and above`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <Image src={company.logo} alt={`${company.name} logo`} width={64} height={64} className="object-contain" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-600">{company.category}</p>
              <p className="text-sm text-gray-600">{company.location}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-semibold">{company.rating.toFixed(1)}</span>
              </div>
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}