import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [LoginInfo , setLoginInfo] = useState({
    email : "",
    password : ""
  })
  const naviagte = useNavigate();
  const handleChange = (e) => {
    const {name , value} = e.target;
    console.log(name,value);
    const copyLoginInfo = {...LoginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const {email,password} = LoginInfo;
    if(!email || !password){
      return handleError('All fields are require...');
    }
    try {
      const url = 'https://auth-backend-qxkj.vercel.app/api/v1/login'
      const response = await fetch(url,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(LoginInfo)
      });
      const result = await response.json();
      const {success,message,error,jwt_token,user} = result ;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwt_token)
        localStorage.setItem('loggedInUser',user.name);
        setTimeout(()=>{
          naviagte('/home');
        },1000)
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        const details = error?.details[0].message;
        handleError(details);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form action="" onSubmit={handleLogin}>

        <div>
          <label htmlFor="email">Email</label>
          <input type="text"
          onChange={handleChange}
          name='email'
          value={LoginInfo.email}
          autoFocus
          placeholder='Enter Your Email'
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input type="password"
          onChange={handleChange}
          name='password'
          value={LoginInfo.password}
          />
        </div>
        <button>Submit</button>
        <span>Doesn't have account?
          <Link to='/signup'>SignUp</Link>
        </span>
      </form>
        <ToastContainer/>
    </div>
  )
}

export default Login
