import React from "react";
import Image from "next/image";

function Reason() {
  return (
    <div className="bg-[#379777] text-white py-[4rem] sm:py-[7rem] relative px-4 z-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-[4rem] min-[120px]:leading-[3rem]">
          <span className=" text-[#F4CE14]">3 reasons </span> to choose{" "}
          <span className="bg-[#313335] px-[1rem] py-[0.5rem] rounded-[12px] text-[#fff]">
            Trustflag
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#313335] rounded-3xl p-8 flex flex-col ">
            <div className="space-y-4 mb-8">
              <h3 className="text-[1.5rem] font-semibold leading-tight">
                Effortless Feedback Collection
              </h3>
              <p className="text-gray-400 text-[0.9rem]">
                Easily gather reviews in two simple ways: through our website’s
                dedicated form or via the widget you set up. Both methods ensure
                a seamless process for capturing customer feedback without the
                need for customization or technical expertise.
              </p>
            </div>
            <div className="mt-auto relative">
              <img
                src="/images/r1.png"
                alt="img"
                className=" rounded-lg mx-auto"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#313335] rounded-3xl p-8 flex flex-col ">
            <div className="space-y-4 mb-8">
              <h3 className="text-[1.5rem] font-semibold leading-tight">
                Build Credibility with Trustworthy Reviews
              </h3>
              <p className="text-gray-400 text-[0.9rem]">
                Showcase your company’s reviews on our trusted platform while
                boosting your credibility using custom badges and widgets.
                Establish trust with your audience and stand out as a reliable
                business in your industry.{" "}
              </p>
            </div>
            <div className="mt-auto relative object-cover">
              <img
                src="/images/r2.png"
                alt="img"
                className=" rounded-lg mx-auto "
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#313335] rounded-3xl p-8 flex flex-col">
            <div className="space-y-4 mb-8">
              <h3 className="text-[1.5rem] font-semibold leading-tight">
                Actionable Analytics for Continuous Growth
              </h3>
              <p className="text-gray-400 text-[0.9rem]">
                Gain valuable insights through detailed analytics to identify
                trends, address gaps, and refine your services. Empower your
                business to deliver better experiences and foster growth with
                informed decisions.{" "}
              </p>
            </div>
            <div className="mt-auto relative object-cover">
              <img
                src="/images/r3.png"
                alt="img"
                className=" rounded-lg object-cover ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reason;
