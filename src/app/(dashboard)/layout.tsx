import DashboardLayout from "@/components/DashboardLayout";
import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-[70rem] mx-auto">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}

export default Layout;
