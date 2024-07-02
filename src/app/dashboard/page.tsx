"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DashboardPage() {
  const [login, setLogin] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/responses", {
          withCredentials: true,
        });
        setResponses(response.data);
        console.log(response);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setLogin(true);
        }
        console.log(error);
      }
    };

    fetch();
  }, []);
  return <div>hii</div>;
}

export default DashboardPage;
