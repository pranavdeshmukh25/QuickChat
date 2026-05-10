import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';


const SignUp = () => {
    const {setAuthUser } = useAuth()
    const navigate = useNavigate();
  const [inputData, setInputData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInputData({
      ...inputData, [e.target.id]: e.target.value
    });
  };

  const selectGender=(selectGender)=>{
        setInputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }

    console.log(inputData);

     const handelSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        if(inputData.password !== inputData.confirmPassword){
            setLoading(false)
            return toast.error("Password Dosen't match")
        }
        try {
            const register = await axios.post(`/api/auth/register`,inputData);
            const data = register.data;
            if(data.success === false){
                setLoading(false)
                toast.error(data.message)
                console.log(data.message);
            }
            toast.success(data?.message)
            localStorage.setItem('chatapp',JSON.stringify(data))
            setAuthUser(data)
            setLoading(false)
            navigate('/signin')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mx-auto px-6 py-8 sm:px-10 sm:py-10">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Sign Up</h1>
          <p className="text-xs sm:text-sm text-gray-400">Enter your details to create an account</p>
        </div>

        {/* Full Name Field */}
        <div className="mb-4 sm:mb-5">
          <input
            id='fullname'
            type='text'
            onChange={handleInput}
            placeholder='Enter full name'
            required
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* Username Field */}
        <div className="mb-4 sm:mb-5">
          <input
            id='username'
            type='text'
            onChange={handleInput}
            placeholder='Enter username'
            required
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4 sm:mb-5">
          <input
            id='email'
            type='email'
            onChange={handleInput}
            placeholder='Enter email'
            required
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 sm:mb-5 relative">
          <input
            id='password'
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={handleInput}
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
          >
            {showPassword
              ? <AiOutlineEyeInvisible className="w-5 h-5" />
              : <AiOutlineEye className="w-5 h-5" />
            }
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 sm:mb-5 relative">
          <input
            id='confirmPassword'
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            required
            onChange={handleInput}
            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10"
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            tabIndex={-1}
          >
            {showConfirmPassword
              ? <AiOutlineEyeInvisible className="w-5 h-5" />
              : <AiOutlineEye className="w-5 h-5" />
            }
          </button>
        </div>

        {/* Gender Selection */}
        <div className="mb-4 sm:mb-5">
          <p className="text-sm text-gray-500 mb-2">Gender</p>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="gender"
                value="male"
                 onChange={()=>selectGender('male')}
                checked={inputData.gender === 'male'} 
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="gender"
                value="female"
                checked={inputData.gender === 'female'}
                onChange={()=>selectGender('female')}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Female</span>
            </label>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-end mb-5 sm:mb-6 flex-wrap gap-y-2">
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition">
            Forgot password?
          </button>
        </div>

        {/* Sign Up Button */}
        <button
            onClick={handelSubmit}
            className="w-full py-2.5 sm:py-3 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Have Account */}
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-5">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:text-blue-600 font-medium transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;