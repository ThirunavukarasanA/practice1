import React from "react";
import Logo from "../Asset/images/Grop.png";

export default function MmsLoginPage() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="h-[100vh] overflow-hidden relative bg-gradient-to-tr from-[#000F3D] to-[#1449E9] flex justify-around items-center">
          <div className="">
            {/* <div className="flex justify-center pb-2">
              <img src={Logo} className="h-full w-[20%]"/>
            </div> */}
            <h1 className="text-white relative left-10 pl-2 font-bold text-[2.25rem] font-sans">
              <span className="absolute -top-16 -left-32 justify-start text-[9rem]">M</span> aterial <br /> anagement
              System
            </h1>
            {/* <p className="text-white mt-1">
              Material Management System That will help to get your department
              materials
            </p> */}
          </div>
          <div className="absolute text-white -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute text-white -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute text-white -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-b-8"></div>
          <div className="absolute text-white -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-b-8"></div>
        </div>
        <div className="p-10 ">
          {/* <h1 class="text-[#06132D] font-bold text-[2rem] mb-1">
            Hello Again!
          </h1> */}
          <p class="text-[2rem] font-semibold text-center text-gray-600 mb-7">
            Welcome to MMS
          </p>
          <form className="px-24">
            <div className="flex justify-center pb-5">
              <img src={Logo} className="h-full w-[70%]" />
            </div>
            <div className="">
              <div className="">
                <div className="pb-4 flex">
                  {/* Email icon Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute m-3 text-[#B2B3B4] text-h3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                  <input
                    placeholder="Email"
                    className="border-2 rounded-lg w-full border-[#7a7b7c] py-2 px-10"
                  />
                </div>
                <div className="pb-4 flex">
                  {/* password icon svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute m-3 text-[#B2B3B4] text-h3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <input
                    placeholder="Password"
                    className="border-2 rounded-lg w-full border-[#7a7b7c] py-2 px-10"
                  />
                </div>
                <div className="pb-4">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#0C2556] transition hover:bg-[#06132D] w-full py-2 text-white"
                  >
                    Login
                  </button>
                </div>
                <p className="px-1 hover:underline underline-offset-1">
                  <a href="#">Forget Password</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
