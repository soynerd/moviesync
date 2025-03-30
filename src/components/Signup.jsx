import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Create Account</h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-xl"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        
        <div className="my-4 text-center text-gray-400">or sign up with</div>

        <button
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:shadow-md transition duration-300 shadow-2xl"
        >
          <FcGoogle size={24} />
          <span className="text-gray-700">Google</span>
        </button>


        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account? <a href="#" className="text-purple-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;