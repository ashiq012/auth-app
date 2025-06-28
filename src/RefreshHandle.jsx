import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

function RefreshHandle({setisAuthenticated}) {
    const location = useLocation();
    const navigate  = useNavigate ();
    useEffect ( () =>{
        if(localStorage.getItem('token')){
            setisAuthenticated(true);
            if(location.pathname === "/" ||
                location.pathname === "/signin" ||
                location.pathname === "/login" 
            ){
                navigate('/home',{replace:false})
            }
        }
    },[location,navigate,setisAuthenticated])
  return (
    null    
)
}

export default RefreshHandle