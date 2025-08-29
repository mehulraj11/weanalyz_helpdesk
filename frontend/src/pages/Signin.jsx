import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
      <div
        className="relative bg-white bg-opacity-80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-lg
                   flex flex-col items-center transition-all duration-500 hover:scale-105 border-gray-200 border"
      >
        <span className="absolute top-[-40px] left-[-40px] w-24 h-24 bg-gradient-to-br from-blue-400 to-pink-500 opacity-50 rounded-full blur-lg"></span>
        <span className="absolute bottom-[-40px] right-[-40px] w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 opacity-50 rounded-full blur-lg"></span>

        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 drop-shadow-lg tracking-tight">
            Helpdesk System
          </h1>
          <p className="text-center text-lg text-gray-600 font-medium mb-6">
            Sign in to your account
          </p>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-6 py-4 bg-white/80 border border-gray-300 rounded-xl
                      focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-pink-500
                      transition text-gray-800 placeholder-gray-400 shadow-md
                      hover:shadow-lg"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-6 py-4 bg-white/80 border border-gray-300 rounded-xl
                      focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-500
                      transition text-gray-800 placeholder-gray-400 shadow-md
                      hover:shadow-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white
                        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                        hover:from-pink-600 hover:to-blue-600
                        focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2
                        transition duration-300 transform hover:-translate-y-1
                        shadow-xl hover:shadow-2xl
                        flex items-center justify-center gap-2
                        ${
                          loading
                            ? "cursor-not-allowed opacity-70 hover:from-pink-500 hover:to-blue-500"
                            : ""
                        }`}
          >
            {loading && (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            Sign In
          </button>

          <div className="flex justify-between text-sm pt-2">
            <Link
              to="/forgotpassword"
              className="text-purple-600 hover:text-pink-600 font-semibold transition duration-200 hover:underline"
            >
              Forgot Password
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-purple-600 font-semibold transition duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mt-4 font-semibold animate-pulse">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
