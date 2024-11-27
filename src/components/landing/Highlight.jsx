import React from 'react'
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

function Highlight() {

    const companies = [
        { name: "Company 1", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 2", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 3", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 4", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 5", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 6", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 7", logo: "/placeholder.svg?height=30&width=120" },
        { name: "Company 8", logo: "/placeholder.svg?height=30&width=120" },
      ];

  return (
    <div className="max-w-[80rem] mx-auto px-4 py-12 my-[10rem]">
    {/* Company Logos */}
    <div className="text-center mb-[10rem]">
      <p className="text-sm text-muted-foreground mb-8">
        Trusted by top engineering teams worldwide.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-60">
        {companies.map((company, index) => (
          <Image
            key={index}
            src={company.logo}
            alt={company.name}
            width={120}
            height={30}
            className="max-w-[120px] h-auto grayscale"
          />
        ))}
      </div>
    </div>

    {/* Hero Section */}
    <div className='bg-zinc-50 p-[2rem] rounded-[16px] border-[2px] border-zinc-200'>
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          The ultimate platform for managing testimonials and reviews.
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Collect, organize, and display customer feedback with ease.
          Designed for businesses seeking effortless control and
          customization — no clutter, no stress, no compromises.
        </p>
        <Button
          size="lg"
          className="bg-[#45474B] hover:bg-[#45474B]/90 text-white rounded-[0.5rem]"
        >
          Get Started
        </Button>
      </div>
      <div className="relative">
        <Image
          src="/placeholder.svg?height=600&width=800"
          alt="Documentation Interface"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>

    {/* Features and Testimonial Grid */}
    <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
      <div className="space-y-4">
        {/* Top 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-8 rounded-xl border bg-white shadow-sm">
            <FileText className="w-6 h-6 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">
              Collect reviews via forms, widgets and our review platfrom
              seamlessly.
            </p>
          </div>

          <div className="p-8 rounded-xl border bg-white shadow-sm">
            <Code2 className="w-6 h-6 text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">
              Showcase trusted reviews to your website to gain credibilty
              among your customer.
            </p>
          </div>
        </div>
        {/* Bottom Full Width */}
        <div className="p-8 rounded-xl border bg-white shadow-sm">
          <Users className="w-6 h-6 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">
            Use customer reviews and our analytics dashboard to grow your
            business at pace. Solving customer problems made easier.
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <div className="lg:pl-8">
        <blockquote className="space-y-6">
          <p className="text-xl text-gray-600">
            "Trustflag makes managing reviews and feedback 10x easier, and a
            open review platform for users discover your business."
          </p>
          <figcaption className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Brandon Strittmatter"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">Sahil Kumar</div>
              <div className="text-sm text-gray-500">
                Founder, TrustFlag
              </div>
            </div>
          </figcaption>
        </blockquote>
      </div>
    </div>
    </div>
  </div>
  )
}

export default Highlight