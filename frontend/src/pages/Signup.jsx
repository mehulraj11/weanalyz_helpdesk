import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

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

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData
      );

      setMessage(res.data.message || "Signup successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
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
            Helpdesk System
          </h1>
          <p className="text-xl text-center text-gray-600 mb-6 font-medium">
            Sign up here
          </p>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-3 focus:ring-blue-400
                       transition duration-200 ease-in-out text-gray-700
                       placeholder-gray-400 shadow-sm"
          />

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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-3 focus:ring-blue-400
                       transition duration-200 ease-in-out text-gray-700
                       shadow-sm appearance-none bg-white pr-8"
          >
            <option value="user">User</option>
            <option value="operation">Operation Team</option>
            <option value="technical">Technical Team</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold text-lg
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2
                       transition duration-300 ease-in-out transform hover:-translate-y-1
                       shadow-lg hover:shadow-xl"
          >
            Sign Up
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
              className="text-blue-600 hover:text-blue-800 font-medium
                         transition duration-200 hover:underline"
            >
              Sign In
            </Link>
          </div>

          {message && (
            <p className="text-center mt-4 font-medium text-blue-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
