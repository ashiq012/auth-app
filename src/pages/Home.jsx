import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {
  const [loggedInUser,setloggedInUser] = useState('')
  //protected route info
  const [protect,setProtect]=useState('')
  const navigate = useNavigate();
  useEffect(()=>{
    setloggedInUser(localStorage.getItem("loggedInUser"))
  },[])
  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logout')
    setTimeout(()=>{
        navigate('/login')
    },1000)
  }
  // Protected Route
  const Protected = async () => {
    try {
      const url = 'http://localhost:4000/api/v1/protected'
      const headers = {
        headers : {
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers)
      const result = await response.json();
      console.log(result);
      setProtect(result)
    } catch (error) {
      handleError(error);
    }
  }
  useEffect( ()=>{
    Protected()
  },[])
  return (
    <div>
      <h1>{loggedInUser}</h1>
       <h3>{protect.message}</h3>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home