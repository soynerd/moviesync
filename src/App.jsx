import React from "react";
import {Outlet, useNavigation} from 'react-router-dom'
import {Header} from "./components/layout/";
function App() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";
  return (
    <>
      
      <Header />
      {loading && <h1 className='text-purple-600 text-center text-3xl pt-5 bg-gradient-to-r from-blue-50 to-purple-100 py-5'>Loading...</h1>}
      <Outlet />
      {/* <MovieSection /> */}
      
      
      {/* <h1>react-router se navigation banao aaj</h1>
      <h2>loader ka bhi use kar lena</h2> */}
      
    </>
  )
}

export default App
