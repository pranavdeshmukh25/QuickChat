import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from "../../utils/axiosConfig.js"


const SignIn = () => {
    const {setAuthUser} = useAuth();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
 
    const handleInput = (e) => {
        setUserInput({
            ...userInput, [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const login = await axios.post(`/api/auth/login`, userInput);
            const data = login.data;
            if (data.success === false) {
                setLoading(false)
            }
            toast.success(data.message)
            localStorage.setItem('chatapp',JSON.stringify(data));
            setAuthUser(data)
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
 
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md px-10 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-400">Enter your credentials to continue</p>
        </div>
 
        {/* Email Field */}
        <div className="mb-5">
          <input
            id='email'
            type='email'
            onChange={handleInput}
            placeholder='Enter your email'
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>
 
        {/* Password Field */}
        <div className="mb-5 relative">
          <input
            id='password'
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={handleInput}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            ) : (
              <AiOutlineEye className="w-5 h-5" />
            )}
          </button>
        </div>
 
        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-500">Remember me</span>
          </label>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition">
            Forgot password?
          </button>
        </div>
 
        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
 
        {/* Create Account */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium transition">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn