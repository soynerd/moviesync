import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import { store } from "../app/store";
import { login } from "../app/loginSlice";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    
    if (isLogin) {   
        const data = { username: e.target[0].value, password: e.target[1].value, };
      try {
        const res = await axios.post("http://localhost:3000/auth/login",data,  {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
        if( res.status === 200){
          store.dispatch(login({username : res.data.username}));
          navigate("/profile");

        }
        if(res.status === 403){
          setError(res.data.message);
          setTimeout(() => {
            setError("");
          }, 4000);
          e.target[1].value = "";
        }
      } catch (error) {
        console.log("Login :: Local :: Error", error);
      }
    }else{
      const data = {
        fname : e.target[0].value,
        lname : e.target[1].value,
        email : e.target[2].value,
        username : e.target[3].value,
        password : e.target[4].value
      }
      try {
        console.log(data)
        const res = await axios.post("http://localhost:3000/auth/signup",data,  {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
        if( res.status === 200){
          store.dispatch(login({username : res.data.username}));
          navigate("/profile");

        }
        
        if(res.status === 403){
          setError(res.data.message);
          setTimeout(() => {
            setError("");
          }, 4000);
        }
      } catch (error) {
        console.log("Signup :: Local :: Error", error);
      }
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100">
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: 0 }} 
            animate={{ opacity: 1, x: -50 }} 
            exit={{ opacity: 0, x: 0, scale: 0.8 }} 
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
          >
            ❌ {error}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        key={isLogin ? "login" : "signup"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            {isLogin ? "Login to MovieSync" : "Sign Up for MovieSync"}
          </h2>

          <motion.form
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={(e)=>handleSubmit(e)}
          >
            {!isLogin && (
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                />
              </div>
              
            )}
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </motion.form>

          <div className="text-center my-4 text-gray-500">or</div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 py-2 rounded-md" onClick={handleGoogleLogin}>
            <FcGoogle size={20} />{" "}
            {isLogin ? "Login with Google" : "Sign Up with Google"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-blue-500 cursor-pointer ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
