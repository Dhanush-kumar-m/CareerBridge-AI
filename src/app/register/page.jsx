"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { loginUser } = useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    const registered = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const exists = registered.some((u) => u.email === formData.email);
    if (exists) {
      setError("Email is already registered");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    registered.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(registered));

    loginUser({
      name: formData.name,
      email: formData.email,
      role: "student",
    });

    alert("Account created and logged in successfully!");
    router.push("/");
  };

  return (
    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>
          Create Account
        </h1>

        <p>
          Join CareerBridge AI and
          start your placement journey.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={
            formData.confirmPassword
          }
          onChange={handleChange}
          required
        />

        <button type="submit">
          Create Account
        </button>

        <p className="auth-footer">

          Already have an account?

          <span
            onClick={() =>
              router.push("/login")
            }
          >
            Login
          </span>

        </p>

      </form>

    </div>
  );
}