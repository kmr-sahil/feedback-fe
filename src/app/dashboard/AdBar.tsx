import React from 'react'

function AdBar() {
  return (
    <div className="w-[20%] flex flex-col gap-[1.5rem]">
      <div className="flex justify-between rounded-[12px] px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium">
        <h3>PotionAI</h3>
        <img src="/images/dropdown.svg" alt="" />
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <p>All</p>
          <span>17</span>
        </button>

        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#FF0000]">
          <p>Issue</p>
          <span>3</span>
        </button>

        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#FF8000]">
          <p>Suggestion</p>
          <span>1</span>
        </button>

        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#DF07BC]">
          <p>Loved</p>
          <span>9</span>
        </button>

        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#858585]">
          <p>Other</p>
          <span>0</span>
        </button>
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <p>Only Best ones</p>
          <span>17</span>
        </button>

        <button className="flex justify-between px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <p>Both</p>
          <span>3</span>
        </button>

        <button className="flex justify-center px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <div className="flex gap-[8px]">
            <img src="/images/plus.svg" alt="" />
            <p>Create new view</p>
          </div>
        </button>
      </div>

      <div className="flex flex-col rounded-[12px] overflow-hidden gap-[0.1rem]">
        <button className="flex justify-start px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <div className="flex gap-[8px]">
            <img src="/images/help.svg" alt="" />
            <p>Help</p>
          </div>
        </button>
        <button className="flex justify-start px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <div className="flex gap-[8px]">
            <img src="/images/help.svg" alt="" />
            <p>Form</p>
          </div>
        </button>
        <button className="flex justify-start px-[1rem] py-[14px] bg-[#4747FF] bg-opacity-[8%] font-medium text-[#4747FF]">
          <div className="flex gap-[8px]">
            <img src="/images/help.svg" alt="" />
            <p>Setting</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AdBar