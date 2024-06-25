"use client";
import React, { useState } from "react";
import axios from "axios";

function SigninPage() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const signin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/signin",
        details,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={details.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={details.password}
        onChange={handleChange}
      />
      <button onClick={signin}>Sign In</button>
    </div>
  );
}

export default SigninPage;
