import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/login",
        form
      );
      // simpan token dan flag login
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200">
      <div className="bg-white shadow-xl rounded-2xl flex overflow-hidden max-w-5xl w-full">
        {/* Form Section */}
        <div className="flex-1 p-10 flex flex-col justify-center space-y-4">
          <img src="/images/logo.png" alt="" className="w-20" />
          <p className="text-sm text-gray-600">Welcome back !!!</p>
          <h2 className="text-4xl font-bold text-gray-800">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="w-full bg-pink-400 text-white font-semibold py-2 rounded-md hover:bg-pink-500 transition"
            >
              LOGIN →
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-pink-500 font-semibold hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:block flex-1 bg-blue-100 rounded-l-3xl flex items-center justify-center p-8">
          <img
            src="/images/login.png"
            alt="Login"
          />
        </div>
      </div>
    </div>
  );
}
