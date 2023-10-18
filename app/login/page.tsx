"use client";

// React components
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components

// Assets
import logo from "../../public/assets/shaw.png";
import ShawU from "../../public/assets/ShawUSign.jpg";
import google from "../../public/assets/google-icon.png";
import microsoft from "../../public/assets/microsoft-icon.png";

// icons
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi2";

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
    <div className="relative w-screen h-screen flex items-center justify-center">
      <Image
        src={ShawU}
        alt="logo"
        className="absolute h-screen w-screen object-cover -z-[1000]"
        priority
      />
      <div
        className={`w-[26rem] h-[35rem] flex flex-col items-center justify-center gap-8 bg-[#FFFFFF] rounded-l-lg border-r border-slate-200 transition-transform duration-700 z-20 ${
          translateAuth ? "translate-x-[50%] " : "translate-x-0 "
        }`}
      >
        <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
        <div className="text-2xl lg:text-4xl text-[#8c2333] text-center font-sans font-bold mb-4">
          Department of Computer Science
        </div>
        <button
          className="w-28 h-12 flex items-center justify-center text-md text-[#fff] font-semibold bg-[#950a2b] rounded-md p-4 hover:bg-[#870827] hover:scale-95 cursor-pointer"
          onClick={toggleauthSideBar}
        >
          Log in
        </button>
      </div>
      <div
        className={`w-[26rem] h-[35rem] flex flex-col items-center justify-center gap-8 bg-[#8c2333] p-8 rounded-r-lg transition-transform duration-700 z-10 ${
          isauthBarOpen ? "translate-x-[-50%]" : "translate-x-0"
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h4 className="text-2xl text-[#fff] font-bold mb-4">Sign In</h4>
          <div className="w-full flex items-center justify-center gap-4 text-[#000] text-center bg-[#fff] p-[0.6rem] rounded-md hover:scale-95 cursor-pointer">
            <Image
              className="w-[20px] h-auto"
              src={google}
              alt="google"
              priority
            ></Image>
            <h4 className="text-[1.1rem] font-semibold">
              Continue with Google
            </h4>
          </div>
          <div className="w-full flex items-center justify-center gap-4 text-[#000] text-center bg-[#fff] p-[0.6rem] rounded-md hover:scale-95 cursor-pointer">
            <Image
              className="w-[20px] h-auto ml-5"
              src={microsoft}
              alt="microsoft"
              priority
            ></Image>
            <h4 className="text-[1.1rem] font-semibold">
              Continue with Microsoft
            </h4>
          </div>
          <h4 className="text-2xl text-[#fff] font-bold mt-4">Or</h4>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {/* <div className="mt-4">
          <label className="text-red-500">{loginError}</label>
          </div> */}
          <div className="relative w-full h-12 flex flex-col items-center justify-center">
            <label className="w-full" htmlFor="email">
              <div className="flex">
                <input
                  className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="flex items-center justify-center text-xl text-white/50 -ml-8">
                  <HiAtSymbol />
                </span>
              </div>
            </label>
            {/* <label className="absolute top-12 text-red-500">{emailError}</label> */}
          </div>
          <div className="relative w-full h-16 flex flex-col items-center justify-start">
            <label className="w-full" htmlFor="password">
              <div className="flex">
                <input
                  className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white"
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
                  <HiFingerPrint className="text-white/50 hover:text-white" />
                </span>
              </div>
            </label>
            {/* <label className="absolute top-12 text-red-500">{passwordError}</label> */}
          </div>
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
    </div>
  );
};

export default Login;
