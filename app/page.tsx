"use client";

// react components
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

// components
import { useAuth } from "@/context/AuthContext";

// assets
import slide1Photo from "@/public/assets/comSciWallPic.jpg";
import slide2Photo from "@/public/assets/integrity.jpg";
import slide3Photo from "@/public/assets/robotics.webp";
import slide4Photo from "@/public/assets/ccer.webp";

import event1 from "@/public/assets/gala.jpeg";
import event2 from "@/public/assets/reachProject.webp";
import event3 from "@/public/assets/minismester-2023.jpg";
import event4 from "@/public/assets/symposium.png";

import shawubadge from "@/public/assets/shawubadge.png";

// icons
import { MdKeyboardControlKey } from "react-icons/md";
import { MdOutlineArrowRightAlt } from "react-icons/md";

type Props = {};

const Homepage = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const photoUrl = "";
  const slides = [slide1Photo, slide2Photo, slide3Photo, slide4Photo];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center gap-12 md:gap-2 pb-12">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[35rem] w-full flex items-center justify-center"
      >
        <div className="absolute h-full w-full flex items-center justify-center bg-black/20 z-0"></div>
        <Image
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-fill"
        />
        <div className="absolute top-1/2 left-1/2 h-20 w-full flex items-center justify-between p-2 transform -translate-x-1/2 -translate-y-1/2 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevSlide}
          >
            <MdKeyboardControlKey className="text-[4rem] text-[#da8029] -rotate-90" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextSlide}
          >
            <MdKeyboardControlKey className="text-[4rem] text-[#da8029] rotate-90" />
          </motion.button>
        </div>
        <div className="absolute -bottom-4 h-auto w-full flex items-center justify-end gap-4 sm:pr-20">
          <Link
            href={"https://www.shawu.edu/"}
            target="blank"
            className="h-10 w-24 md:w-32 bg-[#7d1f2e] flex items-center justify-center text-xs md:text-sm text-white font-semibold rounded-md hover:bg-[#f4a645] shadow-xl"
          >
            ShawU
          </Link>
          <Link
            href={"https://www.shawcomputerscience.com/"}
            target="blank"
            className="h-10 w-24 md:w-32 bg-[#7d1f2e] flex items-center justify-center text-xs md:text-sm text-white text-center font-semibold rounded-md hover:bg-[#f4a645] shadow-xl"
          >
            CS Department
          </Link>
          <Link
            href={"https://bearsnet.shawu.edu/ics"}
            target="blank"
            className="h-10 w-24 md:w-32 bg-[#7d1f2e] flex items-center justify-center text-xs md:text-sm text-white font-semibold rounded-md hover:bg-[#f4a645] shadow-xl"
          >
            BearsNet
          </Link>
          <Link
            href={"https://moodle.shawu.edu/"}
            target="blank"
            className="h-10 w-24 md:w-32 bg-[#7d1f2e] flex items-center justify-center text-xs md:text-sm text-white font-semibold rounded-md hover:bg-[#f4a645] shadow-xl"
          >
            Moodle
          </Link>
        </div>
      </motion.div>
      <div className="absolute top-4 left-0 w-full flex items-center justify-center z-10">
        <div className="w-auto flex items-center justify-center gap-4 px-4">
          <div
            className={`h-3 w-3 flex items-center justify-center ${
              currentSlide === 0 ? "bg-[#ff9b3e]" : "bg-[#7d1f2e]"
            } rounded-full transition-colors duration-300`}
          ></div>
          <div
            className={`h-3 w-3 flex items-center justify-center ${
              currentSlide === 1 ? "bg-[#ff9b3e]" : "bg-[#7d1f2e]"
            } rounded-full transition-colors duration-300`}
          ></div>{" "}
          <div
            className={`h-3 w-3 flex items-center justify-center ${
              currentSlide === 2 ? "bg-[#ff9b3e]" : "bg-[#7d1f2e]"
            } rounded-full transition-colors duration-300`}
          ></div>{" "}
          <div
            className={`h-3 w-3 flex items-center justify-center ${
              currentSlide === 3 ? "bg-[#ff9b3e]" : "bg-[#7d1f2e]"
            } rounded-full transition-colors duration-300`}
          ></div>
        </div>
      </div>
      <div className="h-auto 2xl:h-[30rem] w-full flex flex-col-reverse lg:flex-row items-center justify-start gap-8 lg:gap-0 p-4 my-16 xl:my-0">
        <div className="h-full w-full lg:w-2/4 flex flex-col items-center justify-center gap-8 lg:gap-0 2xl:border-r">
          <div className="h-full w-3/4 flex items-end justify-center text-4xl lg:text-7xl text-[#7d1f2e] font-semibold">
            Mission
          </div>
          <div className="h-full w-5/6 flex items-center justify-center text-sm lg:text-lg font-semibold leading-10">
            Shaw University exists to advance knowledge, facilitate student
            learning and achievement, to enhance the spiritual and ethical
            values of its students, and to transform a diverse community of
            learners into future global leaders.
          </div>
        </div>
        <div className="h-full w-full lg:w-2/4 flex items-start justify-center">
          <Image
            src={shawubadge}
            alt="shawubadge"
            className="h-3/4 w-2/4 object-contain"
          />
        </div>
      </div>
      <div className="card h-auto 2xl:h-96 w-full flex flex-col 2xl:flex-row items-center justify-center my-2 sm:my-16 xl:my-0">
        <div className="flex items-center justify-center gap-8">
          <div className="card__content shadow-xl">
            <div className="card__front">
              <h3 className="card__title">Respect</h3>
            </div>
            <div className="card__back">
              <p className="card__body">This would be some</p>
            </div>
          </div>
          <div className="card__content">
            <div className="card__front">
              <h3 className="card__title">Integrity</h3>
            </div>
            <div className="card__back">
              <p className="card__body">This would be some</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="card__content">
            <div className="card__front">
              <h3 className="card__title">Responsibility</h3>
            </div>
            <div className="card__back">
              <p className="card__body">This would be some</p>
            </div>
          </div>
          <div className="card__content">
            <div className="card__front">
              <h3 className="card__title">Professionalism</h3>
            </div>
            <div className="card__back">
              <p className="card__body">This would be some</p>
            </div>
          </div>
        </div>
        <div className="card__content">
          <div className="card__front">
            <h3 className="card__title">Honesty</h3>
          </div>
          <div className="card__back">
            <p className="card__body">This would be some</p>
          </div>
        </div>
      </div>
      <div className="h-auto 2xl:h-96 w-full flex flex-col items-center justify-center">
        <div className="h-16 w-5/6 sm:w-3/6 flex items-center justify-center bg-[#7d1f2e] text-white">
          <h1 className="font-semibold">Upcoming Events</h1>
        </div>
        <div className="h-full w-full 2xl:w-3/6 flex flex-col 2xl:flex-row items-center justify-center gap-8">
          <div className="w-5/6 sm:w-1/2 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative h-full w-full md:w-2/4 flex flex-col items-center justify-center shadow-xl">
              <div className="absolute top-0 left-0 h-20 w-20 flex flex-col items-center justify-center text-sm font-semibold bg-[#f4a645] shadow-xl">
                <span className="text-xl">20</span>
                <span>Nov</span>
                <span>2023</span>
              </div>
              <div className="h-4/6 w-full flex items-center justify-center bg-gray-800">
                <Image
                  src={event1}
                  alt="event1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-2/6 w-full flex flex-col items-center justify-center gap-1 bg-white p-3">
                <span className="w-full flex items-center justify-center font-semibold text-base">
                  Title
                </span>
                <span className="w-full flex items-center justify-center text-[13px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <span className="w-full flex items-center justify-end text-xs cursor-pointer">
                  View <MdOutlineArrowRightAlt className="text-lg" />
                </span>
              </div>
            </div>
            <div className="relative h-full w-full md:w-2/4 flex flex-col items-center justify-center shadow-xl">
              <div className="absolute top-0 left-0 h-20 w-20 flex flex-col items-center justify-center text-sm font-semibold bg-[#f4a645] shadow-xl">
                <span className="text-xl">21</span>
                <span>Nov</span>
                <span>2023</span>
              </div>
              <div className="h-4/6 w-full flex items-center justify-center bg-gray-800">
                <Image
                  src={event2}
                  alt="event1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-2/6 w-full flex flex-col items-center justify-center gap-1 bg-white p-3">
                <span className="w-full flex items-center justify-center font-semibold text-base">
                  Title
                </span>
                <span className="w-full flex items-center justify-center text-[13px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <span className="w-full flex items-center justify-end text-xs cursor-pointer">
                  View <MdOutlineArrowRightAlt className="text-lg" />
                </span>
              </div>
            </div>
          </div>
          <div className="w-5/6 sm:w-1/2 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative h-full w-full md:w-2/4 flex flex-col items-center justify-center shadow-xl">
              <div className="absolute top-0 left-0 h-20 w-20 flex flex-col items-center justify-center text-sm font-semibold bg-[#f4a645] shadow-xl">
                <span className="text-xl">1</span>
                <span>Dec</span>
                <span>2023</span>
              </div>
              <div className="h-4/6 w-full flex items-center justify-center bg-gray-800">
                <Image
                  src={event3}
                  alt="event1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-2/6 w-full flex flex-col items-center justify-center gap-1 bg-white p-3">
                <span className="w-full flex items-center justify-center font-semibold text-base">
                  Title
                </span>
                <span className="w-full flex items-center justify-center text-[13px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <span className="w-full flex items-center justify-end text-xs cursor-pointer">
                  View <MdOutlineArrowRightAlt className="text-lg" />
                </span>
              </div>
            </div>
            <div className="relative h-full w-full md:w-2/4 flex flex-col items-center justify-center shadow-xl">
              <div className="absolute top-0 left-0 h-20 w-20 flex flex-col items-center justify-center text-sm font-semibold bg-[#f4a645] shadow-xl">
                <span className="text-xl">21</span>
                <span>Dec</span>
                <span>2023</span>
              </div>
              <div className="h-4/6 w-full flex items-center justify-center bg-gray-800">
                <Image
                  src={event4}
                  alt="event1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-2/6 w-full flex flex-col items-center justify-center gap-1 bg-white p-3">
                <span className="w-full flex items-center justify-center font-semibold text-base">
                  Title
                </span>
                <span className="w-full flex items-center justify-center text-[13px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </span>
                <span className="w-full flex items-center justify-end text-xs cursor-pointer">
                  View <MdOutlineArrowRightAlt className="text-lg" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
