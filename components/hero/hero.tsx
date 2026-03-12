"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import EventInfo from "./event-info";
import Image from "next/image";
import RotatingIcon from "./rotating-icon";
import { motion } from "framer-motion";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Hero() {
  return (
    <section className={`${spaceGrotesk.className} relative lg:min-h-[calc(100vh-64px)] text-white py-8 md:py-8 px-4 overflow-x-hidden bg-[#191111]`}>
      {/* Background Image */}
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Mobile Background Left */}
      <div className="absolute inset-y-0 left-0 w-1/2 md:hidden opacity-70">
        <Image
          src="/hero-bg-2.png"
          alt="Hero Background Left"
          fill
          priority
          className="object-cover object-left"
        />
      </div>

      {/* Mobile Background Right */}
      <div className="absolute inset-y-0 right-0 w-1/2 md:hidden opacity-70">
        <Image
          src="/hero-bg-1.png"
          alt="Hero Background Right"
          fill
          priority
          className="object-cover object-right"
        />
      </div>

      <div className="mx-auto w-full max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] flex flex-col items-center justify-between">
        {/* Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block border-1 border-[#D411114D] bg-[#D411110D] mb-2"
        >
          <p className="text-[#D71D22] text-[10px] sm:text-xs md:text-sm uppercase font-mono tracking-wider flex items-center justify-center py-1 px-2 sm:px-4">
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect width="8" height="8" fill="#D41111" />
            </svg>

            <span className="truncate">System_Ready:_Version_20.26</span>
          </p>
        </motion.div>

        <div className="flex flex-col justify-between ">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl  md:leading-none font-bold text-center
                        "
            >
            {/* bg-gradient-to-r from-white via-white via-[45%] to-[#f07878] 
            bg-clip-text text-transparent */}
             
              DEVELOPER'S <br />
              DAY 2026
            </motion.h1>

            <div className="text-[#FFFFFFCC] py-4 flex items-center justify-between gap-2 border-t-1 border-[#39282880] border-b-1 font-light tracking-wide">

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="w-8 sm:w-16 md:w-44 h-[1px] bg-[#39282880]"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                className="text-xs sm:text-base md:text-lg lg:text-xl text-center flex-1" >
                BRUTE_LOGIC._REFINED_BY_DESIGN.
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="w-8 sm:w-16 md:w-44 h-[1px] bg-[#39282880]"
              />
            </div>
          </div>
          {/* Liberation Mono */}
          <div className="text-center py-2 text-sm text-[#D41111B2] uppercase tracking-widest font-mono">
            — The Ultimate Tech Fest Event —
          </div>

          {/* Event Time */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: "easeOut" }}
          >
            <EventInfo />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 mx-auto"
          >
            <Button
              as={Link}
              href="/register"
              className="outline-[#D41111] outline-2 bg-[#D41111] hover:bg-red-700 text-base text-white py-7 px-8 w-full sm:w-72"
              radius="none"
              endContent={<ArrowRightIcon className="w-5 h-5" />}
            >
              INITIALIZE_REGISTER
            </Button>
            <Button
              as={Link}
              href="/modules"
              className="outline-[#392828] outline-2 bg-transparent text-base text-white py-7 px-8 w-full sm:w-72"
              radius="none"
              endContent={<Squares2X2Icon className="w-5 h-5" />}
            >
              VIEW MODULES
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
