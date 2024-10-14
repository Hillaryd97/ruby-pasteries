import React, { useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaExclamationCircle,
} from "react-icons/fa";

const LoginRegister = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        setToken(data);
        // navigate("/account");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              fullname: formData.fullname,
            },
          },
        });
        if (error) throw error;
        setToken(data);

        // navigate("/account");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[30rem]">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Login" : "Register"}
        </h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <div className="flex items-center border rounded-md">
                <FaUser className="mx-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  name="fullname"
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-3 py-2 placeholder-gray-300 border-none focus:outline-none"
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border rounded-md">
              <FaEnvelope className="mx-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 placeholder-gray-300 border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border rounded-md">
              <FaLock className="mx-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 placeholder-gray-300 border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              {isLogin ? "Need an account?" : "Already have an account?"}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <FaExclamationCircle className="inline mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
