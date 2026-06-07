import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdPerson, MdAlternateEmail, MdEmail, MdLock } from "react-icons/md";
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig.js'
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
            const register = await axiosInstance.post(`/api/auth/register`,inputData);
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

    const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "256bit", label: "Encryption" },
];
 
const perks = [
  { icon: "⚡", title: "Instant delivery", desc: "Messages arrive in milliseconds" },
  { icon: "🔒", title: "Private & secure", desc: "End-to-end encryption by default" },
  { icon: "🌍", title: "Always available", desc: "Sync across all your devices" },
];

  return (
     <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gray-950">
 
      {/* ─────────────────────────────────────────
          LEFT — Sign Up Form
      ───────────────────────────────────────── */}
      <div className="w-full lg:w-[42%] flex items-center justify-center px-6 py-12 lg:py-8 order-2 lg:order-1">
        <div className="w-full max-w-sm">
 
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">NexChat</span>
          </div>
 
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Create your<br />
              <span className="text-blue-400">account</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Join thousands of users already chatting.
            </p>
          </div>
 
          {/* Full Name */}
          <div className="mb-3">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <MdPerson size={13} /> Full Name
            </label>
            <input
              id="fullname"
              type="text"
              onChange={handleInput}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />
          </div>
 
          {/* Username */}
          <div className="mb-3">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <MdAlternateEmail size={13} /> Username
            </label>
            <input
              id="username"
              type="text"
              onChange={handleInput}
              placeholder="johndoe"
              required
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />
          </div>
 
          {/* Email */}
          <div className="mb-3">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <MdEmail size={13} /> Email
            </label>
            <input
              id="email"
              type="email"
              onChange={handleInput}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />
          </div>
 
          {/* Password + Confirm — side by side */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Password */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                <MdLock size={13} /> Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInput}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition pr-9"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
                </button>
              </div>
            </div>
 
            {/* Confirm Password */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                <MdLock size={13} /> Confirm
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleInput}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition pr-9"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={16} /> : <AiOutlineEye size={16} />}
                </button>
              </div>
            </div>
          </div>
 
          {/* Gender */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gender</p>
            <div className="grid grid-cols-2 gap-3">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  onClick={() => selectGender(g)}
                  className={`py-2 rounded-xl border text-sm font-medium transition capitalize ${
                    inputData.gender === g
                      ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-gray-800/60 border-gray-700/60 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                  }`}
                >
                  {g === "male" ? "👨 Male" : "👩 Female"}
                </button>
              ))}
            </div>
          </div>
 
          {/* Forgot password link */}
          <div className="flex justify-end mb-5">
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition">
              Forgot password?
            </button>
          </div>
 
          {/* Sign Up Button */}
          <button
            onClick={handelSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition shadow-lg shadow-blue-500/25 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : "Create Account"}
          </button>
 
          {/* Sign In Link */}
          <p className="text-center text-xs text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
 
      {/* ─────────────────────────────────────────
          RIGHT — App Showcase Panel
      ───────────────────────────────────────── */}
      <div className="w-full lg:w-[58%] relative bg-gradient-to-br from-gray-900 via-[#0f1729] to-gray-950 flex items-center justify-center px-6 py-12 order-1 lg:order-2 overflow-hidden">
 
        {/* Glow blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-40px] w-56 h-56 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
 
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(gray 1px, transparent 1px), linear-gradient(90deg, gray 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
 
        <div className="relative w-full max-w-md">
 
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Free to join
          </span>
 
          {/* Headline */}
          <h2 className="text-3xl font-bold text-white leading-snug mb-3">
            One account.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Endless conversations.
            </span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Sign up in seconds and start connecting with the people who matter most — anytime, anywhere.
          </p>
 
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-800/50 border border-gray-700/40 rounded-2xl px-4 py-4 text-center">
                <p className="text-white text-xl font-bold">{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
 
          {/* Perks list */}
          <div className="space-y-3">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-4 bg-gray-800/40 border border-gray-700/30 rounded-2xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-xl bg-gray-700/60 flex items-center justify-center text-lg shrink-0">
                  {p.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{p.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
 
          {/* Social proof avatars */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-rose-500", "bg-amber-500"].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 ${color} flex items-center justify-center text-xs font-bold text-white`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              <span className="text-white font-semibold">10,000+</span> people joined this month
            </p>
          </div>
 
        </div>
      </div>
    </div>
  );
};

export default SignUp;