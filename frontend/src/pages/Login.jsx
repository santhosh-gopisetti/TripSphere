import React, { useState } from "react";
import BASE_URL from "../utils/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setStatus("Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1200);
      } else {
        setStatus(data.message || "Login failed.");
      }
    } catch {
      setStatus("Login failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-sky-50 font-poppins">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-sky-700 text-center">Login to TripSphere</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-sky-200 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border border-sky-200 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {status && <p className="text-center mt-4 text-sky-700">{status}</p>}
        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/register" className="text-sky-700 font-semibold">Register</a>
        </p>
      </form>
    </section>
  );
};

export default Login; 