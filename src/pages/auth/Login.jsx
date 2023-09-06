import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { DASHBOARD, REGISTER } from "../../lib/routes";
// import logo from '../assets/logo/Full logo.svg'
import { useLogin } from "../../hooks/auth";
import { emailValidate, passwordValidate } from "../../utils/form-validate";

export default function Login() {
  // const [isLoading, setLoading] = useState(false);

  const { login, isLoginLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });

  async function handleSignIn(e) {
    e.preventDefault();

    const emailError = validateField("email", email, emailValidate);
    const passwordError = validateField("password", password, passwordValidate);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });

      setTimeout(() => {
        setErrors({ email: null, password: null });
      }, 3000);

      return;
    }

    // setLoading(true);

    const success = await login({
      email: email,
      password: password,
      redirectTo: DASHBOARD,
    });

    if (success) {
      setEmail("");
      setPassword("");
      setErrors({ email: null, password: null });
    }
    // setLoading(false);
  }

  const validateField = (fieldName, value, validationRules) => {
    let error = "";

    for (const rule in validationRules) {
      if (validationRules.hasOwnProperty(rule)) {
        const ruleValue = validationRules[rule];
        if (rule === "required" && ruleValue.value && !value) {
          error = ruleValue.message;
        } else if (rule === "minLength" && value.length < ruleValue.value) {
          error = ruleValue.message;
        } else if (rule === "pattern" && !ruleValue.value.test(value)) {
          error = ruleValue.message;
        }
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));

    return error;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-light">
      {/* <img src={logo} alt="echo logo" className='w-[256px] h-[64px]'/> */}
      <div className="w-[30%] bg-white flex flex-col items-center pt-8 pb-8 pl-2 pr-2">
        <h1 className="text-h5 font-bold font-head text-center">
          Welcome back!
        </h1>
        <p className="text-para text-center">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSignIn} className="mt-8 min-w-[80%]">
          {/* // EMAIL INPUT FIELD  */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email"
              className={`block ${
                errors.email === null ? "mb-4" : "mb-0"
              } pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AiOutlineMail className="text-base" />
            </span>
          </div>

          {errors.email !== null && (
            <div className="mt-1 text-small text-center mb-4 text-red-500">
              {errors.email}
            </div>
          )}

          {/* // PASSWORD INPUT FIELD  */}

          <div
            className={`
                        relative ${errors.password === null ? "mb-8" : "mb-0"}
                    `}
          >
            <input
              type="password"
              placeholder="Enter your password"
              className="block pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:outline-none focus:ring focus:border-light placeholder:text-gray-50"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AiOutlineLock className="text-base" />
            </span>
          </div>

          {errors.password !== null && (
            <div className="mt-1 text-small text-center mb-4 text-red-500">
              {errors.password}
            </div>
          )}

          <button
            className={`w-full ${
              isLoginLoading ? "opacity-50" : "opacity-100"
            } bg-base text-white rounded-[64px] pt-2 pb-2 mb-8 relative`}
            disabled={isLoginLoading ? true : false}
          >
            {isLoginLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.842 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4a4 4 0 004-4h4zm-2-5.291l3 2.647A7.963 7.963 0 0120 12h4c0-3.042-1.135-5.842-3-7.938z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-small text-center">
            Forgot your password ?{"  "}
            <span>
              <Link className="text-base underline">Reset password</Link>.
            </span>
          </p>
        </form>
      </div>
      <p className="text-small mt-8">
        Don't have an account?{" "}
        <Link to={REGISTER} className="underline text-base">
          Sign Up
        </Link>{" "}
        here!
      </p>
    </div>
  );
}
