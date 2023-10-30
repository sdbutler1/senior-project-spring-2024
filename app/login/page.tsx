"use client";

// React components
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components

// Assets
import logo from "../../public/assets/shawlogin.png";
import ShawU from "../../public/assets/ShawUSign.jpg";

// icons
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type Props = {};

const Login = (props: Props) => {
  const [isauthBarOpen, setauthBarOpen] = useState(true);
  const [showpassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const toggleauthSideBar = () => {
    setauthBarOpen(!isauthBarOpen);
  };

  const translateAuth = isauthBarOpen;

  return (
    <div className="relative w-screen h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      <Image
        src={ShawU}
        alt="logo"
        className="absolute h-screen w-screen object-cover -z-[1000]"
        priority
      />
      <div
        className={`w-[20rem] sm:w-[26rem] xl:w-[26rem] h-[35rem] flex flex-col items-center justify-center bg-[#FFFFFF] rounded-l-lg border-r border-slate-200 transition-transform duration-700 z-20 ${
          translateAuth
            ? "translate-y-[50%] lg:translate-x-[50%] lg:translate-y-0 "
            : "translate-y-[-100%] lg:translate-x-0 lg:translate-y-0 "
        }`}
      >
        <div className="h-full w-full flex items-center justify-center">
          <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
        </div>
        <div className="h-[25rem] xl:h-full w-full flex flex-col items-center justify-center text-3xl sm:text-4xl text-[#8c2333] font-sans font-bold">
          <h1>Department of</h1>
          <div>Computer Science</div>
        </div>
        <div className="h-full w-full flex items-center justify-center">
          <button
            className="w-20 h-12 flex items-center justify-center text-md text-[#fff] tracking-wider font-semibold bg-[#950a2b] rounded-md p-4 hover:bg-[#870827] hover:scale-95 cursor-pointer"
            onClick={toggleauthSideBar}
          >
            {isauthBarOpen ? (
              <AiOutlineArrowRight className="text-3xl" />
            ) : (
              <AiOutlineArrowLeft className="text-3xl" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`relative w-[20rem] sm:w-[26rem] xl:w-[26rem] h-[35rem] flex flex-col items-center justify-center gap-8 bg-[#8c2333] p-8 rounded-r-lg transition-transform duration-700 ${
          isauthBarOpen
            ? "translate-y-[100%] lg:translate-x-[-50%] lg:translate-y-0 z-10 rounded-l-lg"
            : "translate-y-[-50%] lg:translate-x-0 lg:translate-y-0 z-20 lg:z-10 rounded-l-none"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <div className="relative w-full h-auto flex flex-col items-center justify-center">
            <label className="group w-full flex" htmlFor="password">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
              />
              <span className="flex items-center justify-center text-xl -ml-8 cursor-pointer group">
                <HiAtSymbol className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100" />
              </span>
            </label>
          </div>
          <div className="relative w-full h-auto flex flex-col items-center justify-center">
            <label className="group w-full flex" htmlFor="password">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                id="password"
                name="password"
                type={`${showpassword ? "text" : "password"}`}
                placeholder="Password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="flex items-center justify-center text-xl -ml-8 cursor-pointer group"
                onClick={() => setShowPassword(!showpassword)}
              >
                <HiFingerPrint className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100 hover:opacity-100" />
              </span>
            </label>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="disabled:opacity-50 w-28 h-12 flex items-center justify-center text-md text-[#000] font-semibold bg-[#fff] rounded-md p-4 hover:bg-[#f6f6f6] hover:scale-95 cursor-pointer "
              disabled={!email || !password}
            >
              Sign In
            </button>
            <div
              className="text-sm text-[#fff] hover:underline cursor-pointer"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password
            </div>
          </div>
        </div>
        <div className="absolute top-4 -left-4 h-auto w-auto lg:hidden flex items-center justify-end bg-[#fff] p-2 rotate-180 rounded-full">
          <ArrowForwardIosIcon
            className="text-xl text-[#000] hover:text-[#f4b461] hover:scale-105 cursor-pointer"
            onClick={toggleauthSideBar}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
