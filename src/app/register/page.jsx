"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { signupUser } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signupUser(formData.email, formData.password, formData.name);
      alert("Account created successfully! Check email (if confirmation enabled) or continue.");
      router.push("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
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