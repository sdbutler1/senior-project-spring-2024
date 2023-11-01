"use client";

// React components
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// Assets
import ShawU from "../../public/assets/ShawU.jpg";
import logo from "../../public/assets/shawlogin.png";

// icons
import { HiAtSymbol, HiFingerPrint, HiArrowLongLeft } from "react-icons/hi2";

export default function ForgotPassword() {
  const [showpassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-12">
      <div className="absolute h-screen w-screen flex items-center justify-center z-[-1000]">
        <div className="absolute h-screen w-screen flex items-center justify-center bg-black/30"></div>
        <Image
          src={ShawU}
          alt="logo"
          priority
          className="h-full w-full object-fit"
        />
      </div>
      <div className="h-auto w-80 sm:w-96 flex flex-col items-center justify-center gap-4 bg-[#fefefe] rounded-xl">
        <div className="h-auto w-full flex items-center justify-center my-4">
          <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
        </div>
        <div className="">
          <h2 className="text-center text-2xl sm:text-4xl font-bold leading-9 tracking-tight">
            Forgot Password
          </h2>
        </div>
        <div className="h-full w-80 sm:w-full flex items-center justify-center bg-[#8c2333] p-8 rounded-b-xl">
          <form className="w-full flex flex-col items-center justify-center gap-6">
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
            <label className="group w-full flex" htmlFor="password">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                id="password"
                name="password"
                type={`${showpassword ? "text" : "password"}`}
                placeholder="Current Password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword1(e.target.value)}
              />
              <span
                className="flex items-center justify-center text-xl -ml-8 cursor-pointer group"
                onClick={() => setShowPassword(!showpassword)}
              >
                <HiFingerPrint className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100 hover:opacity-100" />
              </span>
            </label>
            <label className="group w-full flex" htmlFor="password">
              <input
                className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                id="password"
                name="password"
                type={`${showpassword ? "text" : "password"}`}
                placeholder="New Password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword2(e.target.value)}
              />
              <span
                className="flex items-center justify-center text-xl -ml-8 cursor-pointer group"
                onClick={() => setShowPassword(!showpassword)}
              >
                <HiFingerPrint className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100 hover:opacity-100" />
              </span>
            </label>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="disabled:opacity-50 w-auto h-12 flex items-center justify-center text-md text-[#000] font-semibold bg-[#fff] rounded-md p-4 hover:bg-[#f6f6f6] hover:scale-95 cursor-pointer "
                disabled={!email || !password1 || !password2}
                onClick={() => router.push("/login")}

              >
                Reset Password
              </button>
              <div
                className="flex items-center justify-center gap-4 text-sm text-[#fff] hover:underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                <HiArrowLongLeft className="text-xl"/> 
                Go to Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
