import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Input from "../components/Input";
import axios from "axios";
import {
  FaEnvelope,
  FaArrowLeft,
  FaShieldAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { IoWarning, IoCheckmarkCircle } from "react-icons/io5";

function ForgotPwd() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message || "Password reset link sent to your email!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/30 to-pink-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl">
                <MdLock className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-lg font-medium mb-4">
              Don't worry, we've got you covered
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <FaEnvelope className="mr-2 text-blue-600" />
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500
                            transition-all duration-300 text-gray-800 placeholder-gray-500
                            hover:bg-white hover:shadow-lg"
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            {message && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start space-x-3">
                <IoCheckmarkCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 text-sm mb-1">
                    Email Sent Successfully!
                  </h4>
                  <p className="text-green-700 text-sm mb-2">{message}</p>
                  <p className="text-green-600 text-xs">
                    Redirecting you to login page in a moment...
                  </p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <IoWarning className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 text-sm mb-1">
                    Reset Failed
                  </h4>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
            <Loader
              type="submit"
              disabled={loading}
              label="Send Reset Link"
              loadingLabel="Sending Reset Link..."
              icon={FaPaperPlane}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white
                          bg-gradient-to-r from-blue-600 to-purple-600
                          hover:from-blue-700 hover:to-purple-700
                          focus:outline-none focus:ring-4 focus:ring-blue-500/30
                          transition-all duration-300 transform hover:scale-105
                          shadow-xl hover:shadow-2xl
                          flex items-center justify-center space-x-3
                          ${
                            loading
                              ? "cursor-not-allowed opacity-70 transform-none"
                              : ""
                          }`}
            />
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 pt-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:underline"
              >
                <FaArrowLeft className="text-xs" />
                <span>Back to Sign In</span>
              </Link>
              <Link
                to="/signup"
                className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                <FaShieldAlt className="text-xs" />
                <span>Create Account</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPwd;
