import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserAsync,
  selectAuthStatus,
  selectLoggedInUser,
} from "./AuthSlice";
import { Navigate } from "react-router";

const Signup = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [profile, setProfile] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(selectLoggedInUser);
  const authStatus = useSelector(selectAuthStatus);

  const handleProfileUpload = () => {
    inputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const img = e.target.files[0];
    console.log(img);
    setProfile(img);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-96 mb-2">
          <div className="text-2xl font-bold mb-4 text-center border-b-2">
            <div className="mb-4">Sign up</div>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              dispatch(createUserAsync(data));
            })}
            noValidate
          >
            <div className="mb-4">
              {/* profile picture upload */}
              <div>
                <div
                  className="flex justify-center items-baseline relative cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleProfileUpload}
                >
                  <div className="relative w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    {profile ? (
                      <img
                        className="w-16 h-16 object-cover"
                        src={URL.createObjectURL(profile)}
                        alt="pp"
                      />
                    ) : (
                      <svg
                        className="absolute w-16 h-16 text-gray-400 -left-1 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}

                    <div
                      className={`absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white font-medium opacity-0 transition-opacity ${
                        isHovered ? "opacity-100" : ""
                      }`}
                    >
                      Edit
                    </div>
                  </div>
                </div>
                <div className="text-center underline hidden">
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              {/* Sign up form start here */}
              <label className="block text-gray-700 mb-1" htmlFor="username">
                Full Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                id="name"
                placeholder="Full name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs">Full name is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="username">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                id="email"
                placeholder="@gmail.com"
                {...register("email", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-xs">email is required</p>
              )}
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700 mb-1" htmlFor="username">
                Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                type="text"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `at least 8 characters
                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                            - Can contain special characters`,
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="termsAgreed"
                >
                  Agree to Terms & Conditions
                </label>
                <input
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  type="checkbox"
                  id="termsAgreed"
                  {...register("termsAgreed", { required: true })}
                />
              </div>
              {errors.termsAgreed && (
                <p className="text-red-500 text-xs">
                  You must agree to the terms
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Sign Up
            </button>
          </form>
          {authStatus === "failed" ? (
            <p className="text-red-500 text-center text-md p-3">
              Username or email already exists
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
