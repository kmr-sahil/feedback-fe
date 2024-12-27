// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { ProjectProvider } from "./projectContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    //   {children}
    // </ThemeProvider>
    <ProjectProvider>{children}</ProjectProvider>
  );
}
