import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

function Hero() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-textColor text-center gap-4 pt-[10rem] px-[1rem] ">
      <div className="max-w-4xl mx-auto text-center space-y-6 mt-[rem]">
        <Balancer>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[3rem] md:leading-tight lg:leading-[6rem]">
            Build{" "}
            <span className="bg-[#379777] pl-[0.75rem] pr-[0.95rem] sm:pl-[1rem] sm:pr-[1.5rem] rounded-[8px] sm:rounded-[12px] text-[#fff] ">
              Trust
            </span>
            , Grow Your{" "}
            <span className="bg-[#F4CE14] pl-[0.75rem] pr-[0.95rem] sm:pl-[1rem] sm:pr-[1.5rem] rounded-[8px] sm:rounded-[12px] text-[#805f1c]">
              Business
            </span>
          </h1>
        </Balancer>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Easily collect, manage, and showcase customer feedback to boost
          credibility and attract more users.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="bg-[#45474B] hover:bg-[#45474B]/90 text-white rounded-[0.5rem] px-8"
          >
            Sign up for free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-[0.5rem] px-8 py-5"
          >
            Talk to founders
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          No credit card required.
        </p>
      </div>

      {/* Dashboard Preview */}
      <div className="w-full max-w-6xl mx-auto mt-16 md:mt-16 relative">
        <div className="aspect-[4/2] relative rounded-lg overflow-hidden shadow-2xl ">
          <Image
            src="/images/hero3.png"
            alt="TrustFlag Dashboard Preview"
            fill
            className="object-cover mt-[1rem]"
            priority
          />
        </div>

        {/* Gradient overlay for image bottom */}
        {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" /> */}
      </div>
    </div>
  );
}

export default Hero;
