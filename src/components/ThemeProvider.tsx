"use client";
import React, { useEffect, useState } from "react";

const ThemeProvider = ({ children }:any) => {
    const [theme, setTheme] = useState(() => {
      // Initialize theme from local storage or default to light mode
      return typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light";
    });
  
    useEffect(() => {
      document.body.classList.remove("light", "dark"); // Clear previous classes
      document.body.classList.add(theme); // Apply the new theme
      localStorage.setItem("theme", theme); // Store the theme in local storage
    }, [theme]);
  
    return (
      <div>
        {children}
      </div>
    );
  };
  
  export default ThemeProvider;