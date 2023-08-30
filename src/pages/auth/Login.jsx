import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import {REGISTER} from '../../lib/routes'
// import logo from '../assets/logo/Full logo.svg'
import {isLogin} from '../../hooks/auth'

export default function Login() { 
  const [login, isLoginLoading] = useLogin();
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  



  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-light'>

      {/* <img src={logo} alt="echo logo" className='w-[256px] h-[64px]'/> */}
      <div
        className='w-[30%] bg-white rounded-[8px] flex flex-col items-center pt-8 pb-8'
      >
        <h1 className='text-h5 font-bold font-head'>Welcome back!</h1>
        <p className='text-para text-center'>Enter your credentials to access your account.</p>

        <form action="" className='mt-8 min-w-[80%]'>
          <div className='relative mb-4'>
            <input
              type="text"
              placeholder='Enter your email'
              className='block mb-4 pt-2 pb-2 pr-8 pl-2 w-full rounded-[8px] border-2 border-base focus:border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50'
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <AiOutlineMail className='text-base' />
            </span>
          </div>

          <div className='relative mb-8'>
            <input
              type="password"
              placeholder='Enter your password'
              className='block mb-4 pt-2 pb-2 pr-8 pl-2 w-full rounded-[8px] border-2 border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50 placeholder:font-body'
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <AiOutlineLock className='text-base' />
            </span>
          </div>

          <button 
            className={`w-full ${isLoading ? 'opacity-50' : 'opacity-100'} bg-base text-white rounded-[8px] pt-2 pb-2 mb-8 relative`}
            onClick={handleSignIn} 
            disabled={isLoading ? true : false}
            >

          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.842 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291l3 2.647A7.963 7.963 0 0120 12h4c0-3.042-1.135-5.842-3-7.938z"></path>
              </svg>
              Processing...
            </div>
              ) : (
                "Sign In"
              )}
              
          </button>

          <p className='text-small text-center'>Forgot your password ?
            {"  "}
            <span><Link className='text-base underline'>Reset password</Link>.</span>
          </p>
        </form>
      </div>
      <p className='text-small mt-8'>Don't have an account? {" "} <Link to={REGISTER} className='underline text-base'>Register</Link>{" "}here!</p>
    </div>
  )
}
