"use client"
import React, { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [details, setDetails] = useState({
    name: "",
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

  const signup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/auth/signup",
        details,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={details.name}
        onChange={handleChange}
      />
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
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}

export default SignupPage;
