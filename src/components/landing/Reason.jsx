import React from "react";

function Reason() {
  return (
    <div className="bg-[#379777] text-white py-[7rem] px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-[4rem]">
          <span className=" text-[#F4CE14]">3 reasons </span> to choose <span className="bg-[#313335] px-[1rem] py-[0.5rem] rounded-[12px] text-[#fff]">Trustflag</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#313335] rounded-3xl p-8 min-h-[500px] flex flex-col">
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
            <div className="mt-auto relative h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </div>
                  <div className="absolute top-[-80px] left-[-100px] space-y-2">
                    {[
                      "Product guides",
                      "API docs",
                      "Change-logs",
                      "Blogs",
                      "Static pages",
                    ].map((text, index) => (
                      <div
                        key={text}
                        className={`
                      px-4 py-2 rounded-full text-sm font-medium
                      ${
                        index === 0
                          ? "bg-blue-100 text-blue-700"
                          : index === 1
                          ? "bg-purple-100 text-purple-700"
                          : index === 2
                          ? "bg-yellow-100 text-yellow-700"
                          : index === 3
                          ? "bg-green-100 text-green-700"
                          : "bg-cyan-100 text-cyan-700"
                      }
                    `}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#313335] rounded-3xl p-8 min-h-[500px] flex flex-col">
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
            <div className="mt-auto relative h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="flex justify-center gap-20 mb-4">
                    <div className="px-4 py-2 rounded-full bg-blue-400 text-white">
                      Blog
                    </div>
                    <div className="px-4 py-2 rounded-full bg-purple-400 text-white">
                      Doc
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4" />
                  <div className="flex justify-center gap-4">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-700 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#313335] rounded-3xl p-8 min-h-[500px] flex flex-col">
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
            <div className="mt-auto relative h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-[1.5rem] text-green-400">$</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-600 text-white">
                    Devs
                  </div>
                  <div className="w-16 h-16 rounded-lg bg-purple-500 flex items-center justify-center">
                    <span className="text-[1.5rem] text-white">⌛</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reason;
