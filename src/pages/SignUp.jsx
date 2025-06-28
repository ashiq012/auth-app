import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function SignUp() {
  const [signupInfo , setSignupInfo] = useState({
    name : "",
    email : "",
    password : ""
  })
  const naviagte = useNavigate();
  const handleChange = (e) => {
    const {name , value} = e.target;
    console.log(name,value);
    const copySignUp = {...signupInfo};
    copySignUp[name] = value;
    setSignupInfo(copySignUp);
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {name , email,password} = signupInfo;
    if(!name || !email || !password){
      return handleError('All fields are require...');
    }
    try {
      const url = 'https://auth-backend-qxkj.vercel.app/api/v1/signup'
      const response = await fetch(url,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const {success,message,error} = result ;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          naviagte('/login');
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
      <h1>SignUp</h1>
      <form action="" onSubmit={handleSignUp}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text"
          onChange={handleChange}
          name='name'
          value={signupInfo.name}
          autoFocus
          placeholder='Enter Your Name'
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text"
          onChange={handleChange}
          name='email'
          value={signupInfo.email}
          autoFocus
          placeholder='Enter Your Email'
          />
        </div>
        <div>
          <label htmlFor="name">Password</label>
          <input type="password"
          onChange={handleChange}
          name='password'
          value={signupInfo.password}
          />
        </div>
        <button>Submit</button>
        <span>already have account?
          <Link to='/login'>Login</Link>
        </span>
      </form>
        <ToastContainer/>
    </div>
  )
}

export default SignUp
