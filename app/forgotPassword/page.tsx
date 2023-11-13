"use client";

// React components
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";

// Components
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/firebase";
import Alert from "@/components/global/Alert";
import LoggingInLoading from "@/components/global/LoggingInLoading";

// Assets
import ShawU from "../../public/assets/ShawU.jpg";
import logo from "../../public/assets/shawlogin.png";

// icons
import { HiAtSymbol, HiArrowLongLeft } from "react-icons/hi2";

export default function ForgotPassword() {
  const { setLoading2 } = useGlobalLoading();
  const { user } = useAuth();
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
  });
  const [translateAlert, setTranslateAlert] = useState(false);

  const [formData, setFormData] = useState({
    forgetEmail: "",
  });

  const translateAlertPopUp = () => {
    setTranslateAlert(!translateAlert);
    const timer = setTimeout(() => {
      setTranslateAlert(!translateAlert);
      setLoading2(true, 0, 1500);
      router.push("/login");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, formData.forgetEmail);
      setAlertMessage({ message: "Check your email", type: "success" });
      translateAlertPopUp();
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage({ message: err.message, type: "error" });
      }
    }

    setFormData({
      forgetEmail: "",
    });
  };

  useEffect(() => {
    if (user) {
      setLoading2(true, 0, 1500);
      router.push("/");
    }
  }, [router, user, setLoading2]);

  return (
    <>
      <LoggingInLoading />
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
        {alertMessage && (
          <Alert
            translateAlert={translateAlert}
            message={alertMessage.message}
            type={alertMessage.type}
          />
        )}
        <div className="h-auto w-80 sm:w-96 flex flex-col items-center justify-center gap-4 bg-[#fefefe] rounded-xl">
          <div className="h-auto w-full flex items-center justify-center my-4">
            <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
          </div>
          <div className="">
            <h2 className="text-center text-2xl sm:text-3xl font-bold leading-9 tracking-tight">
              Forgot Password
            </h2>
          </div>
          <div className="h-full w-80 sm:w-full flex items-center justify-center bg-[#8c2333] p-8 rounded-b-xl">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center justify-center gap-6"
            >
              <label htmlFor="forgetEmail" className="group w-full flex">
                <input
                  className="w-full text-[#fff] bg-transparent p-4 border-b border-gray-300 placeholder:text-white/75 focus:placeholder:text-white outline-none"
                  id="forgetEmail"
                  name="forgetEmail"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={formData.forgetEmail}
                  onChange={(e: any) =>
                    setFormData((formData) => ({
                      ...formData,
                      forgetEmail: e.target.value,
                    }))
                  }
                />
                <span className="flex items-center justify-center text-xl -ml-8 cursor-pointer group">
                  <HiAtSymbol className="flex items-center justify-center text-xl text-white opacity-50 transition-opacity duration-100 group-focus-within:opacity-100" />
                </span>
              </label>
              <div className="flex flex-col items-center justify-center gap-4">
                <button
                  type="submit"
                  className="disabled:opacity-50 w-auto h-12 flex items-center justify-center text-md text-[#000] font-semibold bg-[#fff] rounded-md p-4 hover:bg-[#f6f6f6] hover:scale-95 cursor-pointer "
                  disabled={
                    !formData.forgetEmail.includes("@") ||
                    !formData.forgetEmail.includes(".shawu.edu")
                  }
                >
                  Reset Password
                </button>
                <div
                  className="flex items-center justify-center gap-4 text-sm text-[#fff] hover:underline cursor-pointer"
                  onClick={() => (
                    router.push("/login"), setLoading2(true, 0, 500)
                  )}
                >
                  <HiArrowLongLeft className="text-xl" />
                  Go to Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
