import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { store } from "../app/store";
import { login, logout } from "../app/loginSlice";

export default function HomePage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-col items-center text-center px-6 py-40">
      {/* Animated Intro */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-gray-900 mb-4"
      >
        Welcome to MovieSync
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }}
        className="text-lg text-gray-700 max-w-2xl"
      >
        Discover movies, TV shows, and anime. Get detailed information, watch trailers, and explore what's trending!
      </motion.p>
      
      {/* Animated Button with Link */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Link 
          to="/anime" 
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold block"
        >
          Explore Now
        </Link>
      </motion.div>
    </div>
  );
}
