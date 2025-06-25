import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Welcome Back</h2>
        

        <form className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition duration-300 shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">or continue with</div>

        <button
          className="w-full flex items-center justify-center gap-3 bg-white border py-3 rounded-xl shadow-sm hover:shadow-md transition duration-300"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700">Google</span>
        </button>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? <a href="#" className="text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
