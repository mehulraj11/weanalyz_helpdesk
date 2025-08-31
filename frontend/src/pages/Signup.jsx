import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/utility/Loader";
import Input from "../components/utility/Input";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaShieldAlt,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { MdSupportAgent, MdKeyboardArrowDown } from "react-icons/md";
import {
  IoWarning,
  IoCheckmarkCircle,
  IoInformationCircle,
} from "react-icons/io5";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData
      );
      setMessage(res.data.message || "Account created successfully!");
      setMessageType("success");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/30 to-pink-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl">
                <MdSupportAgent className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Helpdesk System
            </h1>
            <p className="text-gray-600 text-lg font-medium mb-4">
              Create your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <FaUser className="mr-2 text-blue-600" />
                Username
              </label>
              <div className="relative">
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Choose a unique username"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500
                            transition-all duration-300 text-gray-800 placeholder-gray-500
                            hover:bg-white hover:shadow-lg"
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <FaEnvelope className="mr-2 text-purple-600" />
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500
                            transition-all duration-300 text-gray-800 placeholder-gray-500
                            hover:bg-white hover:shadow-lg"
                />
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <FaLock className="mr-2 text-indigo-600" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500
                            transition-all duration-300 text-gray-800 placeholder-gray-500
                            hover:bg-white hover:shadow-lg"
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center">
                  <IoInformationCircle className="mr-2" />
                  Password Requirements:
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Mix of uppercase and lowercase letters</li>
                  <li>• Include numbers and special characters</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                            focus:outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500
                            transition-all duration-300 text-gray-800 hover:bg-white hover:shadow-lg
                            appearance-none cursor-pointer"
                >
                  <option value="user">User - Standard Access</option>
                  <option value="operation">Operations Team</option>
                  <option value="technical">Technical Team</option>
                  <option value="admin">Administrator</option>
                </select>
                <FaUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <MdKeyboardArrowDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {message && (
              <div
                className={`p-4 rounded-2xl border-2 flex items-start space-x-3 ${
                  messageType === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {messageType === "success" ? (
                  <IoCheckmarkCircle className="text-lg mt-0.5 flex-shrink-0" />
                ) : (
                  <IoWarning className="text-lg mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold text-sm">
                    {messageType === "success"
                      ? "Registration Successful!"
                      : "Registration Error"}
                  </h4>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            )}
            <Loader
              type="submit"
              loading={loading}
              label="Create Account"
              loadingLabel="Creating Account..."
              icon={<FaUserPlus />}
              className="w-full py-4 rounded-xl font-bold text-lg text-white
            bg-gradient-to-r from-blue-600 to-purple-600
            hover:from-blue-700 hover:to-purple-700
            focus:outline-none focus:ring-4 focus:ring-blue-500/30
            transition-all duration-300 transform hover:scale-105
            shadow-xl hover:shadow-2xl
            flex items-center justify-center space-x-3
            disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 pt-4">
              <Link
                to="/forgotpassword"
                className="flex items-center space-x-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:underline"
              >
                <FaShieldAlt className="text-xs" />
                <span>Forgot Password?</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
              >
                <FaUserShield className="text-xs" />
                <span>Already have account?</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
