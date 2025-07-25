import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPwd() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message || "Password reset link sent to your email!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
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
            className="text-4xl font-extrabold text-center text-gray-800 mb-2
                         drop-shadow-sm"
          >
            Forgot Password
          </h1>
          <p className="text-md text-center text-gray-600 mb-6 font-medium leading-relaxed">
            Don't worry, enter your email below and we will send you a link to
            reset your password.
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Submit
          </button>

          <div className="flex justify-between text-sm pt-2">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium
                         transition duration-200 hover:underline"
            >
              Back to Sign In
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium
                         transition duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {message && (
            <p className="text-center mt-4 font-medium text-green-600">
              {message}
            </p>
          )}
          {error && (
            <p className="text-center mt-4 font-medium text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPwd;
