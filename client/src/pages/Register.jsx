import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import BlurCircle from "../components/BlurCircle";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      await register(payload);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="container relative mx-auto px-2 py-2 pb-4 bg-black-500/50 border border-primary/50 rounded-lg shadow-md my-40 w-1/3">
      <BlurCircle top="-100px" right="-120px" />
      <BlurCircle bottom="-100px" left="-100px" />
      <h1 className="text-center text-2xl font-bold mt-5 text-primary flex gap-1 justify-center items-center">
        Welcome to <img src={assets.logo} alt="" />
      </h1>
      <h2 className="text-center text-sm text-white mt-4">
        Please fill in the details to create an account
      </h2>
      <div className="mb-4 flex justify-center gap-4 mt-5 flex-col items-center">
        <button className="bg-blue-500 p-2 w-1/2 rounded-md hover:bg-blue-600 cursor-pointer">
          Continue with Facebook
        </button>
        <button className="bg-red-500 p-2 w-1/2 rounded-md hover:bg-red-600 cursor-pointer">
          Continue with Google
        </button>
      </div>
      <div className="flex items-center my-4 w-2/3 mx-auto">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-white">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="text"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="email"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="password"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-white"
              htmlFor="confirm-password"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2 rounded-md transition cursor-pointer"
        >
          Register
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-white">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
