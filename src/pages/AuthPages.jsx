import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User } from 'lucide-react';

// Reusable Glass Input Component
const GlassInput = ({ icon: Icon, register, name, rules, errors, type = "text", placeholder }) => (
  <div className="mb-4 relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-300" />
    </div>
    <input
      type={type}
      {...register(name, rules)}
      placeholder={placeholder}
      className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors[name] ? 'border-red-400' : 'border-white/10'} rounded-xl backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
    />
    {errors[name] && <span className="text-red-400 text-xs mt-1 block">{errors[name].message}</span>}
  </div>
);

export function AuthPage(){
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data for API:", data);
    // TODO: Trigger your Axios POST /api/auth/login or /register here
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black flex items-center justify-center p-4">
      {/* Glassmorphic Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-300 mt-2">
            {isLogin ? 'Sign in to access your workspaces' : 'Join to start collaborating in real-time'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <GlassInput
              icon={User} register={register} name="displayName" placeholder="Display Name"
              rules={{ required: "Display name is required" }} errors={errors}
            />
          )}
          
          <GlassInput
            icon={Mail} register={register} name="email" type="email" placeholder="Email Address"
            rules={{ 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
            }} 
            errors={errors}
          />
          
          <GlassInput
            icon={Lock} register={register} name="password" type="password" placeholder="Password"
            rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }} 
            errors={errors}
          />

          <button type="submit" className="w-full py-3 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-300 hover:text-white text-sm transition-colors">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};