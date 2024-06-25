"use client"
import axios from "axios";
import React, { useEffect } from "react";

function DashboardPage() {
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/responses", {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetch()
  }, []);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
