import React from "react";

function MainBar() {
  return (
    <div className="flex-grow w-[40%] flex flex-col">
      <div className="flex flex-col bg-[#4747FF] bg-opacity-[8%] rounded-[12px] px-[1.2rem] py-[1rem] gap-[1rem]">
        <div className="flex justify-between">
          <div className="flex gap-[0.5rem] items-center">
            <span className="w-2 h-2 rounded-full bg-pink-600"></span>
            <p className="text-pink-600">Liked</p>
          </div>
          <img className="" src="/images/bookmark.svg" alt="" />
        </div>
        <div className="flex flex-col">
            <h3 className="font-medium">Sahil Kumar</h3>
            <p className="text-[12px] font-light">11.sahil.kmr@gmail.com</p>
        </div>
        <p>I sent a link to all of my customers and I've had twenty testimonials in two days. It's obviously very easy to use, otherwise they wouldn't be flooding us with testimonials.</p>
        <div className="flex justify-between">

            <div className="flex gap-[0.25rem]">

                <img src="/images/star.svg" alt="" />
                <img src="/images/star.svg" alt="" />
                <img src="/images/star.svg" alt="" />

            </div>

            <p className="text-[12px] font-light">10 hours ago</p>

        </div>
      </div>
    </div>
  );
}

export default MainBar;
