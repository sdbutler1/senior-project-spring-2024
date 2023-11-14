"use client";

// React components
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// Components
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/config/firebase";
import LoggingInLoading from "@/components/global/LoggingInLoading";

// Assets
import ShawU from "../../public/assets/ShawU.jpg";
import logo from "../../public/assets/shawlogin.png";

// icons
import { HiAtSymbol, HiArrowLongLeft } from "react-icons/hi2";

interface UserData {
  email: string;
}

export default function ForgotPassword() {
  const { setLoading2 } = useGlobalLoading();
  const { setTranslateAlert } = useGlobalAlert();
  const { logout, user } = useAuth();
  const [userList, setUserList] = React.useState<UserData[] | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    forgetEmail: "",
  });

  React.useEffect(() => {
    const collectionRef = collection(db, "authEmails");

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const userDataList: UserData[] = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists()) {
            const data = doc.data() as UserData;
            userDataList.push(data);
          } else {
            console.log("Document does not exist");
          }
        });
        setUserList(userDataList);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const isEmailInUserList =
    userList && userList.some((user) => user.email === formData.forgetEmail);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isEmailInUserList) {
      try {
        await sendPasswordResetEmail(auth, formData.forgetEmail);
        setTranslateAlert(
          true,
          "Check email to continue reset process",
          "success"
        );
        setTimeout(() => {
          setLoading2(true, 0, 1000);
          router.push("/login");
          logout();
        }, 4000);
      } catch (err) {
        if (err instanceof Error) {
          setTranslateAlert(
            true,
            "Unable to reset password. Try again",
            "error"
          );
          setTimeout(() => {
            setLoading2(true, 0, 1000);
          }, 4000);
        }
      }

      setFormData({
        forgetEmail: "",
      });
    } else {
      setTranslateAlert(true, "Email not found. Try again", "error");
    }
  };

  useEffect(() => {
    setLoading2(true, 0, 1000);
    setFormData({
      forgetEmail: "",
    });
  }, [setLoading2, setFormData]);

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
        <div className="h-auto w-80 sm:w-96 flex flex-col items-center justify-center gap-4 bg-[#fefefe] rounded-xl">
          <div className="h-auto w-full flex items-center justify-center my-4">
            <Image src={logo} alt="logo" className="w-4/6 h-auto" priority />
          </div>
          <div className="h-1/6 w-full flex flex-col items-center justify-start text-3xl sm:text-4xl text-[#8c2333] font-sans font-bold mb-1">
            <h1>Department of</h1>
            <div>Computer Science</div>
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
                  onClick={() => {
                    router.push(`${user ? "/" : "/login"}`);
                    setLoading2(true, 0, 500);
                  }}
                >
                  <HiArrowLongLeft className="text-xl" />
                  {user ? "Go to Home" : "Go to Login"}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
