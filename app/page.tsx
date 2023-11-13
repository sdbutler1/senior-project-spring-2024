"use client";

// react components
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import homepageImage from '@/public/assets/hompageimage.jpeg'
import shawBear from '@/public/assets/shaw-logo.png'
import shawSign from '@/public/assets/shawusign.png'
import cyberimg from '@/public/assets/cyberimage.png'
import shawBadge from '@/public/assets/shawubadge.png'

import { motion, useAnimate, stagger } from "framer-motion"



import { Anton, Fira_Code, Handjet, JetBrains_Mono, Josefin_Slab, Jost, Jura, Lobster, Merienda, Petrona, Playfair_Display, Raleway, Tourney } from 'next/font/google'
const fira = Raleway({ subsets: ['latin'] })

// global states

//components
import { useAuth } from "@/context/AuthContext";
import Image from 'next/image';
import { useGlobalSideBar } from '@/globalStates/useGlobalSideBar';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { isSidebarOpen, isSidebarHidden } = useGlobalSideBar();

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);


  useEffect(() => {
    animate("li", { 
      opacity: 1,
      x: "1rem",
    }, { 
      type: 'spring',
      damping: 5,
      delay: stagger(0.5, { startDelay: 0.15 }),
    })
  })

  return (
    <div className={`bg-slate-100`}>
      <div className={`
      ${(isSidebarOpen && isSidebarHidden) ? 'lg:w-[calc(100vw-16rem)]' :
        !isSidebarOpen && !isSidebarHidden ? '':
        'lg:w-[calc(100vw-5rem)]'
      } relative w-screen h-[calc(100vh-5rem)] transform transition-width duration-500 flex flex-col`}> 
      
      <div className='h-20 md:h-24 2xl:h-48 relative w-full flex items-center justify-center'>
        <Image
          src={shawSign}
          alt='shaw sign'
          className='w-[40%] md:w-[25%] relative z-[5] h-full object-'
        />
        <div className='w-[60%] md:w-[75%] bg-shaw-garnet relative h-full z-[10] flex items-center justify-center'>
          <h1
            className='flex-1 text-lg md:text-4xl 2xl:text-[4rem]
              font-extrabold tracking-tight text-center text-white
              before:absolute before:-left-48 before:top-0 before:w-48 before:h-full before:bg-gradient-to-l before:from-shaw-garnet before:to-transparent 
              '
            >Department of Computer Science</h1>
        </div>
      
      </div>

      <div className='flex-1 relative w-full h-full flex flex-col items-center justify-center'>
        <div className='absolute top-5 left-0 text-[1.5rem] text-black'>
          <ul
            className='w-24 h-30 text-sm md:text-lg lg:text-xl'
            ref={scope}
          >
            <li className='opacity-0 w-fit px-4 py-1 rounded-r-full bg-shaw-yellow my-1 shadow-lg'>Respect</li>
            <li className='opacity-0 w-fit px-4 py-1 rounded-r-full bg-shaw-yellow my-1 shadow-lg'>Integrity</li>
            <li className='opacity-0 w-fit px-4 py-1 rounded-r-full bg-shaw-yellow my-1 shadow-lg'>Responsibility</li>
            <li className='opacity-0 w-fit px-4 py-1 rounded-r-full bg-shaw-yellow my-1 shadow-lg'>Professionalism</li>
            <li className='opacity-0 w-fit px-4 py-1 rounded-r-full bg-shaw-yellow my-1 shadow-lg'>Honesty</li>
          </ul>
        </div>
          <div className='h-[40%] lg:h-[50%] flex justify-center z-10 '>
            <div className='w-[80%] md:w-[50%] text-2xl md:text-4xl'>
              <h1 className='text-slate-700 w-fit flex items-center justify-center gap-2'><span className='text-shaw-yellow font-extrabold'>Hello </span>Dr. Brown,
                <Image
                  src={shawBear}
                  alt='Shaw Bear Icon'
                  className='inline w-12'
                />
              </h1>
              <p className='text-xl md:text-2xl font-light'>Welcome to the Shaw University <span className=''>Department of Computer Science</span>.</p>
              <div className='mt-5 w-full text-lg flex flex-col items-center justify-center gap-2'>
                <Link href={'/'} className='w-full text-center px-4 py-1 bg-shaw-garnet/80 hover:bg-shaw-garnet hover:text-shaw-yellow duration-100 hover:scale-105 text-white font-bold rounded'>Profile</Link>
                <Link href={'/'} className='w-full text-center px-4 py-1 bg-shaw-garnet/80 hover:bg-shaw-garnet hover:text-shaw-yellow duration-100 hover:scale-105 text-white font-bold rounded'>Logout</Link>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 0.2,
            }}
            className='w-[80%] md:w-[70%] lg:w-[50%] absolute'>
            <Image
              src={shawBadge}
              alt='Shaw University Logo'
              className='w-full opacity-10'
              unoptimized
            />
          </motion.div>
      </div>
      </div>
    </div>
  );
}
