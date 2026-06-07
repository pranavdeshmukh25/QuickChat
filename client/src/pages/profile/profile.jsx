import React, { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosConfig'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  MdOutlineModeEdit,
  MdCheck,
  MdClose,
  MdCameraAlt,
  MdPerson,
  MdAlternateEmail,
  MdEmail,
  MdWc,
  MdLock,
} from "react-icons/md";
import { useAuth } from "../../context/authContext";
import Avatar from '../../components/avatar';


const Profile = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    profilepic: ''
  });
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    profilepic: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false);
  const {setAuthUser} = useAuth();

    const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/user/profile');
      if (response.data.success) {
        setUserInfo(response.data.user);
        setFormData(response.data.user);
        setPreviewImage(response.data.user.profilepic || '');
      }
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to load profile', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    fetchUserProfile();
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          profilepic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/api/user/profile/update', formData);
      if (response.data.success) {
        setUserInfo(response.data.user);
        setAuthUser(response.data.user); // Update user in context
        localStorage.setItem('chatapp',JSON.stringify(response.data.user));
        setIsEditing(false);
        showMessage('Profile updated successfully', 'success');
      }
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to update profile', 'error');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setPreviewImage(userInfo.profilepic || '');
    setIsEditing(false);
    setMessage('');
  };

    const initials = formData.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

    const fields = [
    { label: "Full Name", name: "fullname", type: "text", icon: <MdPerson size={16} />, placeholder: "Enter full name" },
    { label: "Username", name: "username", type: "text", icon: <MdAlternateEmail size={16} />, placeholder: "Enter username" },
    { label: "Email", name: "email", type: "email", icon: <MdEmail size={16} />, placeholder: "Enter email" },
  ];

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div  className="w-full min-h-screen">
      <div className="w-full bg-gray-900 shadow-2xl overflow-hidden border border-gray-800">
 
        {/* Cover Banner */}
        <div className="relative h-28 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          />
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition"
            >
              <MdClose size={16} />
            </button>
          )}
        </div>
 
        {/* Avatar */}
        <div className="relative flex justify-center -mt-12 mb-3 px-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full border-4 border-gray-900 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden shadow-xl flex items-center justify-center">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Avatar name={formData.fullname || formData.username} size="xl" className="cursor-pointer" />
              )}
            </div>
            {isEditing && (
              <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                <MdCameraAlt size={22} className="text-white" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>
 
        {/* Name & Status */}
        <div className="text-center px-6 mb-5">
          <h2 className="text-lg font-bold text-white leading-tight">{formData.fullname}</h2>
          <p className="text-sm text-gray-400">@{formData.username}</p>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Online</span>
          </div>
        </div>
 
        {/* Toast Message */}
        {message && (
          <div className={`mx-6 mb-4 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${messageType === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
            <MdCheck size={16} />
            {message}
          </div>
        )}
 
        {/* Fields */}
        <div className="px-6 space-y-3 mb-4">
          {fields.map(({ label, name, type, icon, placeholder }) => (
            <div key={name}>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                {icon} {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                disabled={!isEditing || loading}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed placeholder-gray-600 transition"
              />
            </div>
          ))}
 
          {/* Gender */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              <MdWc size={16} /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditing || loading}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition appearance-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
 
          {/* Password (edit mode only) */}
          {isEditing && (
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                <MdLock size={16} /> New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Leave empty to keep current"
                  disabled={loading}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-60 pr-10 placeholder-gray-600 transition"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                </button>
              </div>
              <p className="text-gray-600 text-xs mt-1 pl-1">Minimum 6 characters</p>
            </div>
          )}
        </div>
 
        {/* Action Buttons */}
        <div className="px-6 pb-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-blue-500/20"
            >
              <MdOutlineModeEdit size={17} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50 shadow-lg shadow-emerald-500/20"
              >
                <MdCheck size={17} />
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-xl transition disabled:opacity-50"
              >
                <MdClose size={17} />
                Cancel
              </button>
            </div>
          )}
        </div>
 
      </div>
    </div>
  )
}

export default Profile