import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        formData
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/mainpage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4
                    bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md
                      transform transition-all duration-300 hover:scale-105"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1
            className="text-4xl font-extrabold text-center text-gray-800 mb-6
                         drop-shadow-sm"
          >
            Helpdesk System
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-3 focus:ring-blue-400
                       transition duration-200 ease-in-out text-gray-700
                       placeholder-gray-400 shadow-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-3 focus:ring-blue-400
                       transition duration-200 ease-in-out text-gray-700
                       placeholder-gray-400 shadow-sm"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold text-lg
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
                       transition duration-300 ease-in-out transform hover:-translate-y-1
                       shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>

          <div className="flex justify-between text-sm pt-2">
            <Link
              to="/forgotpassword"
              className="text-blue-600 hover:text-blue-800 font-medium
                         transition duration-200 hover:underline"
            >
              Forgot Password
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium
                         transition duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4 font-medium">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
