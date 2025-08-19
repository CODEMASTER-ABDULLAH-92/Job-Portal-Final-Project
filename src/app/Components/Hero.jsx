"use client";

import React, { useRef } from "react";
import { data } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const Hero = () => {
  const imageRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { x: 30, opacity: 0 },
      { x: -60, opacity: 1, duration: 2 }
    );
  });

  return (
    <div className="pt-20 flex md:flex-row flex-col-reverse justify-between items-center">
      {/* Left */}
      <div className="md:max-w-[40%] w-full">
        <h1 className="text-5xl font-bold -tracking-tighter">
          Find Your Dream Job with HireMate
        </h1>
        <p className="mt-4 text-gray-700">
          Welcome to <span className="font-semibold">HireMate</span> — your
          trusted job portal. Whether you&apos;re a{" "}
          <span className="text-green-600 font-medium">fresh graduate</span> or
          an <span className="text-green-600 font-medium">experienced professional</span>,
          we connect you with top recruiters and companies. Explore thousands of
          opportunities, apply with ease, and take the next big step in your
          career journey.
        </p>
        <button className="py-3 mt-5 text-xl rounded-[10px] text-white px-10 bg-green-600 hover:bg-green-700 transition-colors duration-200">
          Explore Jobs
        </button>
      </div>

      {/* Right */}
      <div>
        <Image
          ref={imageRef}
          src={data.homeImage}
          alt="HireMate job portal"
          width={400}
          height={400}
          className="sm:h-96 h-64 w-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
