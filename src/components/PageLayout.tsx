import React from "react";

const PageLayout = ({ children }: any) => {
  return (
    <div className="w-[70%] flex-grow flex flex-col gap-[1.25rem]">
      {children}
    </div>
  );
};

export default PageLayout;
