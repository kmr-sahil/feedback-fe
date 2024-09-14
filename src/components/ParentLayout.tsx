import React from "react";

const ParentLayout = ({ children }: any) => {
  return (
    <div className="max-w-[80rem] mx-auto mt-[1rem] relative">{children}</div>
  );
};

export default ParentLayout;
