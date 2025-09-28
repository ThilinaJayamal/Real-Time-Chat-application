import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import { EyeClosed, EyeIcon, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { isSigningUp, signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      signup(formData);
    }
  }

  const navigate = useNavigate()

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>

      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>

          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group:'>

              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center
            group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>

              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>

            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-8'>

            <div>
              <p className='text-sm mb-2'>Full Name</p>
              <div className="input w-full">
                <User />
                <input type="text" className="grow" placeholder="Jhon Doe"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>
            </div>

            <div>
              <p className='text-sm mb-2'>Email</p>
              <div className="input w-full">
                <Mail />
                <input type="email" className="grow" placeholder="example@mail.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <p className='text-sm mb-2'>Password</p>
              <div className="input w-full">
                <Lock />
                <input type={showPassword ? "text" : "password"} className="grow" placeholder="password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                {showPassword ?
                  <EyeClosed className='cursor-pointer' onClick={() => setShowPassword(false)} /> :
                  <EyeIcon className='cursor-pointer' onClick={() => setShowPassword(true)} />}
              </div>
            </div>

            <button className="btn btn-active btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? "Loading..." : "Create an account"}
            </button>
            
          </form>
          <p className='text-center'>Already have an account?{" "}
            <span className='font-semibold cursor-pointer underline' onClick={() => navigate("/login")}>Login</span></p>
        </div>
      </div>

      <div className='animate-pulse w-full h-full'>
        <div></div>
      </div>
    </div>
  )
}

export default SignupPage