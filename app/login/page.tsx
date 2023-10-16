"use client";

// react components
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// assets
import logo from "../../public/assets/shaw.png";
import Cookies from "js-cookie";

type Props = {};

const login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 1) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    handleLogin();
  };

  const testAuthData = {
    username: email,
    password: password,
  };
  const authenticateUser = (username: string, password: string) => {
    if (
      username === testAuthData.username &&
      password === testAuthData.password
    ) {
      const userData = {
        username,
        password,
      };
      const expirationTime = new Date(new Date().getTime() + 60000);
      Cookies.set("auth", JSON.stringify(userData), {
        expires: expirationTime,
      });
      return true;
    }
    return false;
  };
  const handleLogin = () => {
    const isAuthenticated = authenticateUser(email, password);
    if (isAuthenticated) {
      router.push("/home");
    } else {
      setLoginError("Invalid login. Please try again");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#ffffff] border">
      <div className="mb-4">
        <Image
          src={logo}
          alt="logo"
          width="400"
          style={{ height: "auto" }}
          priority
        />
      </div>
      <div className="text-5xl text-[#8c2333] font-sans font-bold mt-8">
        Department of Computer Science
      </div>
      <div className="w-96 h-80 flex flex-col items-center justify-start p-4 gap-8">
        <div className="mt-4">
          <label className="text-red-500">{loginError}</label>
        </div>
        <div className="relative w-full h-12 flex flex-col items-center justify-center mt-4">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full h-full bg-[#fff] text-[#000] p-2 border-2 rounded-lg border-red-800 placeholder-gray-800"
          />
          <label className="absolute top-12 text-red-500">{emailError}</label>
        </div>
        <div className="relative w-full h-12 flex flex-col items-center justify-start mt-4">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full h-full bg-[#fff] text-[#000] p-2 border-2 rounded-lg border-red-800 placeholder-gray-800"
          />
          <label className="absolute top-12 text-red-500">{passwordError}</label>
        </div>
        <div
          className="w-24 h-12 flex items-center justify-center text-[#fffs] bg-[#950a2b] rounded-md p-4 hover:bg-[#870827] mt-4"
          onClick={onButtonClick}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default login;
