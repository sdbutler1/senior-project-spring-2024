"use client";

// React components
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-12">
      <div className="">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Forgot Password
        </h2>
      </div>

      <div className="w-96">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => resetEmail()}
              disabled={!email}
              className="disabled:opacity-40 flex w-full justify-center rounded-md bg-[#8c2333] px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#870827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Send Forgot Password Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
