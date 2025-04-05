import React, { useEffect } from 'react'
import axios from 'axios'
function Profile() {
  useEffect(() => {
    const data = {name:"naveen", email:"jhatu@gmail.com"}
    async function getData() {
      try {
        const response = await axios.get("http://localhost:3000/test", {
          withCredentials : true,
          headers :{
            "Content-Type": "application/json",
          }
        })
        console.log("data send sussessfully", response.data.data);
      } catch (err) {
        console.log("Unable to send data to /test")
      }
    }
    getData();
    
    
  })

  return (
    <div>Hello from Profile</div>
  )
}

export default Profile