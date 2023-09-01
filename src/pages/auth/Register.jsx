import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import {DASHBOARD, LOGIN} from '../../lib/routes'
// import logo from '../assets/logo/Full logo.svg'
import { useRegister } from '../../hooks/auth'
import { emailValidate, passwordValidate, usernameValidate } from '../../utils/form-validate';

export default function Register() { 
  const {register, isRegisterLoading} = useRegister();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: null, email: null, password: null });

  async function handleRegister(e){
    e.preventDefault();

    const userNameError = validateField('username', userName, usernameValidate);
    const emailError = validateField('email', email, emailValidate);
    const passwordError = validateField('password', password, passwordValidate);

    if (userNameError || emailError || passwordError) {
      setErrors({
        username: userNameError,
        email: emailError,
        password: passwordError
      });

      setTimeout(() => {
        setErrors({ userName: null, email: null, password: null });
      }, 3000);      
      return;
    }

    const success = await register({
      username: userName,
      email: email,
      password: password,
      redirectTo: DASHBOARD,
    });
    if (success) {
      setUserName('');
      setEmail('');
      setPassword('');
      setErrors({ username: null, email: null, password: null });
    }
    console.log(userName, email, password, DASHBOARD)
  };


  const validateField = (fieldName, value, validationRules) => {
    let error = '';
    for (const rule in validationRules) {
      if (validationRules.hasOwnProperty(rule)) {
        const ruleValue = validationRules[rule];
        if (rule === 'required' && ruleValue.value && !value) {
          error = ruleValue.message;
        } else if (rule === 'minLength' && value.length < ruleValue.value) {
          error = ruleValue.message;
        } else if (rule === 'pattern' && !ruleValue.value.test(value)) {
          error = ruleValue.message;
        }
      }
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: error
    }));
    return error;
  };  
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-light'>

      {/* <img src={logo} alt="echo logo" className='w-[256px] h-[64px]'/> */}
      <div
        className='w-[30%] bg-white flex flex-col items-center pt-8 pb-8 pl-2 pr-2'
      >
        <h1 className='text-h5 font-bold font-head text-center'>Create your account.</h1>
        <p className='text-para text-center'>Enter the fields below to get started.</p>

        <form onSubmit={handleRegister} className='mt-8 min-w-[80%]'>
          {/* // USERNAME INPUT FIELD  */}
          <div className='relative'>
            <input
              type="text"
              placeholder='Enter your username'
              className={
                `block ${ errors.email === null ? 'mb-4' : 'mb-0' } pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50`
              }
              onChange={(e) => setUserName(e.target.value)}
              // required
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <AiOutlineUser className='text-base' />
            </span>
          </div>
          {errors.username !== null && (<div className='mt-1 text-small text-center mb-4 text-red-500'>{errors.username}</div>)}
          {/* // EMAIL INPUT FIELD  */}
          <div className='relative'>
            <input
              type="text"
              placeholder='Enter your email'
              className=
              {`block ${errors.email === null ? 'mb-4' : 'mb-0' } pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <AiOutlineMail className='text-base' />
            </span>
          </div>

          {errors.email !== null && (<div className='mt-1 text-small text-center mb-4 text-red-500'>{errors.email}</div>)}
          {/* // PASSWORD INPUT FIELD  */}
          <div className={`relative ${errors.password === null ? 'mb-8' : 'mb-0' }`}>
            <input
              type="password"
              placeholder='Enter your password'
              className= 'block pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50'   
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <AiOutlineLock className='text-base' />
            </span>
          </div>
          {errors.password !== null && (<div className='mt-1 text-small text-center mb-4 text-red-500'>{errors.password}</div>)}
          <button 
            className={`w-full ${isRegisterLoading ? 'opacity-50' : 'opacity-100'} bg-base text-white rounded-[64px] pt-2 pb-2 mb-8 relative`}
            disabled={isRegisterLoading ? true : false}
            >
          {isRegisterLoading ? 
          (<div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.842 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291l3 2.647A7.963 7.963 0 0120 12h4c0-3.042-1.135-5.842-3-7.938z"></path>
              </svg> Processing...</div>) : ("Sign Up")}        
          </button>
        </form>
      </div>
      <p className='text-small mt-8'>Already have an account? {" "} <Link to={LOGIN} className='underline text-base'>Login</Link>{" "}here!</p>
    </div>
  )
}
