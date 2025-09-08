"use client";

import React, { useRef } from "react";
import { data } from "../assets/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const imageRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.8, ease: "power3.out" }
    );
  });

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
        {/* Left Content */}
        <div className="w-full md:max-w-[45%] text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Find Your <span className="text-green-600">Dream Job</span> with HireMate
          </h1>
          <p className="mt-6 text-gray-700 text-base sm:text-lg leading-relaxed">
            Welcome to <span className="font-semibold">HireMate</span> — your
            trusted job portal. Whether you&apos;re a{" "}
            <span className="text-green-600 font-medium">fresh graduate</span> or
            an <span className="text-green-600 font-medium">experienced professional</span>,
            we connect you with top recruiters and companies. Explore thousands of
            opportunities, apply with ease, and take the next big step in your
            career journey.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Link
              href="/jobs"
              className="px-8 py-3 text-lg rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-md"
            >
              Explore Jobs
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end w-full md:max-w-[50%]">
          <Image
            ref={imageRef}
            src={data.homeImage}
            alt="HireMate job portal"
            width={500}
            height={500}
            className="w-72 sm:w-96 md:w-[420px] lg:w-[500px] h-auto drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
