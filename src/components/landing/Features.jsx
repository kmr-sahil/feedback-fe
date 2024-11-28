import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Features() {
  return (
    <div className="w-full flex flex-col gap-[2rem] my-[5rem] sm:my-[10rem]">
      <h2 className="text-3xl md:text-4xl font-bold text-center my-[2rem]">Features</h2>

      <div className="flex flex-wrap gap-[1.5rem] max-w-[70rem] mx-auto px-[1rem] sm:px-[1.5rem]">
        <Card className="flex-grow sm:w-[40%] rounded-3xl bg-white p-[1.5rem] shadow-none border-[2px] border-zinc-200">
          <CardContent className="flex flex-col gap-[1.5rem] p-0">
            <div className="flex items-center  rounded-lg bg-zinc-50 text-sm text-gray-600 relative overflow-hidden">
              <img src="/images/f1.png" alt="" className="object-contain" />
            </div>

            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-xl font-semibold text-gray-900">
                Review Collection through Widgets & Form
              </h2>
              <p className="text-gray-600 leading-relaxed text-[0.8rem]">
                Easily gather customer reviews with our simple, ready-to-use
                widget. Place it on your website, and start collecting feedback
                seamlessly — no additional customization or technical setup
                required.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow sm:w-[40%] rounded-3xl bg-white p-[1.5rem] shadow-none border-[2px] border-zinc-200">
          <CardContent className="flex flex-col gap-[1.5rem] p-0">
          <div className="flex items-center  rounded-lg bg-zinc-50 text-sm text-gray-600 relative overflow-hidden">
              <img src="/images/f2.png" alt="" className="object-contain" />
            </div>

            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-xl font-semibold text-gray-900">
                Get Visible on Our Trusted Review Platform
              </h2>
              <p className="text-gray-600 leading-relaxed text-[0.8rem]">
                Showcase your reviews on our widely recognized platform, helping
                potential customers find and trust your business. Stand out in
                your industry and build a stronger online presence through
                credible reviews.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow sm:w-[40%] rounded-3xl bg-white p-[1.5rem] shadow-none border-[2px] border-zinc-200">
          <CardContent className="flex flex-col gap-[1.5rem] p-0">
          <div className="flex items-center  rounded-lg bg-zinc-50 text-sm text-gray-600 relative overflow-hidden">
              <img src="/images/f4.png" alt="" className="object-contain" />
            </div>

            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-xl font-semibold text-gray-900">
                Manage and Grow with an Intuitive Dashboard
              </h2>
              <p className="text-gray-600 leading-relaxed text-[0.8rem]">
                Track, organize, and analyze feedback through our powerful
                dashboard. Monitor performance, respond to reviews, and gain
                actionable insights to foster continuous growth for your
                business.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-grow sm:w-[40%] rounded-3xl bg-white p-[1.5rem] shadow-none border-[2px] border-zinc-200">
          <CardContent className="flex flex-col gap-[1.5rem] p-0">
          <div className="flex items-center  rounded-lg bg-zinc-50 text-sm text-gray-600 relative overflow-hidden">
              <img src="/images/f3.png" alt="" className="object-contain" />
            </div>

            <div className="flex flex-col gap-[1rem]">
              <h2 className="text-xl font-semibold text-gray-900">
                Show Trust with Verified Reviews and Badges
              </h2>
              <p className="text-gray-600 leading-relaxed text-[0.8rem]">
                Highlight your credibility with our trusted badges and verified
                reviews. Display them across your website and marketing
                materials to strengthen customer confidence and drive
                conversions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Features;
