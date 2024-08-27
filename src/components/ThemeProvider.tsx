"use client";
import React, { useEffect } from "react";

const ThemeProvider = ({ children }:any) => {

    const theme = localStorage.getItem("theme");
  
    useEffect(() => {
      //document.body.classList.remove("light", "dark"); // Clear previous classes
      if(theme){
      document.body.classList.add(theme); // Apply the new theme
      localStorage.setItem("theme", theme); // Store the theme in local storage
      } else {
        document.body.classList.add("dark"); // Apply the new theme
      localStorage.setItem("theme", "dark");
      }
    }, [theme]);
  
    return (
      <div>
        {children}
      </div>
    );
  };
  
  export default ThemeProvider;