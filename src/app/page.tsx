import { Button } from "@/components/ui/button";
import PublicNavbar from "@/components/PublicNavbar";
import Hero from "@/components/landing/Hero";
import Highlight from "@/components/landing/Highlight";
import Reason from "@/components/landing/Reason";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <div className="w-full relative text-[#45474B]">
      <PublicNavbar />
      <Hero />

      <Highlight />

      <Reason />

      <Features />

      <div
        className="w-full flex flex-col gap-[4rem] px-[4rem] justify-center items-center py-[10rem]"
        id="start"
      >
        <img className="w-[5rem] rotate-12" src="/images/logo.svg" alt="" />

        <h1 className="max-w-[60rem] mx-auto text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight min-[120px]:leading-[3rem] md:leading-tight lg:leading-[5rem]">
          <Balancer>
            {" "}
            Start building{" "}
            <span className="bg-[#379777] px-[0.75rem] sm:px-[1rem] rounded-[8px] sm:rounded-[12px] text-[#fff] ">
              Trust
            </span>
            , with your{" "}
            <span className="bg-[#F4CE14] px-[0.75rem] sm:px-[1rem] rounded-[8px] sm:rounded-[12px] text-[#805f1c]">
              customers
            </span>{" "}
          </Balancer>
          today.
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <a href="/business/signup">
            <Button className="bg-[#45474B] hover:bg-[#45474B]/90 text-white rounded-[0.75rem] px-8 py-8 text-[1.5rem]">
              Start a Business Account
            </Button>
          </a>
          <Button
            variant="outline"
            className="rounded-[0.75rem] px-8 py-8 text-[1.5rem]"
          >
            Talk to founders
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
