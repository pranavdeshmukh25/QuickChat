import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdEmail, MdLock, MdChat } from "react-icons/md";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig.js"


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
            const login = await axiosInstance.post(`/api/auth/login`, userInput);
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

const messages = [
  { id: 1, from: "Alex", text: "Hey! Did you finish the project? 🚀", time: "9:41 AM", mine: false, avatar: "A" },
  { id: 2, from: "You", text: "Almost done, just fixing a few bugs 😅", time: "9:42 AM", mine: true, avatar: "Y" },
  { id: 3, from: "Alex", text: "No worries, take your time!", time: "9:43 AM", mine: false, avatar: "A" },
  { id: 4, from: "You", text: "Thanks! Will ping you once it's live 🔥", time: "9:44 AM", mine: true, avatar: "Y" },
  { id: 5, from: "Alex", text: "Sounds great 👌", time: "9:45 AM", mine: false, avatar: "A" },
];
 
const features = [
  { icon: "💬", label: "Real-time messaging" },
  { icon: "🔒", label: "End-to-end encrypted" },
  { icon: "📁", label: "File & media sharing" },
  { icon: "🌐", label: "Works across all devices" },
];
 
  return (
     <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gray-950 font-sans">
 
      {/* ─────────────────────────────────────────
          LEFT — Login Form
      ───────────────────────────────────────── */}
      <div className="w-full lg:w-[42%] flex items-center justify-center px-6 py-12 lg:py-0 order-2 lg:order-1">
        <div className="w-full max-w-sm">
 
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">NexChat</span>
          </div>
 
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Sign in to your<br />
              <span className="text-blue-400">account</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Welcome back! Pick up right where you left off.
            </p>
          </div>
 
          {/* Email */}
          <div className="mb-4">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <MdEmail size={13} /> Email
            </label>
            <input
              id="email"
              type="email"
              onChange={handleInput}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />
          </div>
 
          {/* Password */}
          <div className="mb-5">
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
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700/80 text-white text-sm rounded-xl placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition pr-11"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword
                  ? <AiOutlineEyeInvisible size={18} />
                  : <AiOutlineEye size={18} />}
              </button>
            </div>
          </div>
 
          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 accent-blue-500 cursor-pointer"
              />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition">
              Forgot password?
            </button>
          </div>
 
          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition shadow-lg shadow-blue-500/25 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>
            ) : "Sign In"}
          </button>
 
          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
 
          {/* Sign Up */}
          <p className="text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Create one
            </Link>
          </p>
        </div>
      </div>
 
      {/* ─────────────────────────────────────────
          RIGHT — App Showcase Panel
      ───────────────────────────────────────── */}
      <div className="w-full lg:w-[58%] relative bg-gradient-to-br from-gray-900 via-[#0f1729] to-gray-950 flex items-center justify-center px-6 py-12 order-1 lg:order-2 overflow-hidden">
 
        {/* Background glow blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-40px] w-56 h-56 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
 
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(gray 1px, transparent 1px), linear-gradient(90deg, gray 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
 
        <div className="relative w-full max-w-md">
 
          {/* Tagline */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Live & Real-time
            </span>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Chat that feels<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                instant & natural
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Connect with teammates and friends through a fast, secure, and beautifully simple messaging experience.
            </p>
          </div>
 
          {/* Fake Chat Preview */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-2xl overflow-hidden shadow-2xl mb-6">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">A</div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Alex</p>
                <p className="text-emerald-400 text-xs mt-0.5">● Online</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              </div>
            </div>
 
            {/* Messages */}
            <div className="px-4 py-4 space-y-3 max-h-52 overflow-hidden">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.mine ? "flex-row-reverse" : ""}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${msg.mine ? "bg-blue-600" : "bg-gradient-to-br from-purple-500 to-indigo-600"}`}>
                    {msg.avatar}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.mine ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-800 text-gray-200 rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                  <span className="text-gray-600 text-[10px] mb-0.5 shrink-0">{msg.time}</span>
                </div>
              ))}
            </div>
 
            {/* Fake input bar */}
            <div className="px-4 py-3 border-t border-gray-800 flex items-center gap-3">
              <div className="flex-1 bg-gray-800 rounded-xl px-3 py-2 text-gray-600 text-xs">
                Type a message...
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>
            </div>
          </div>
 
          {/* Feature Pills */}
          <div className="grid grid-cols-2 gap-2.5">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 bg-gray-800/50 border border-gray-700/40 rounded-xl px-3 py-2.5">
                <span className="text-base">{f.icon}</span>
                <span className="text-gray-400 text-xs font-medium">{f.label}</span>
              </div>
            ))}
          </div>
 
        </div>
      </div>
    </div>
  );
}

export default SignIn