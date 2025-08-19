"use client"; // Only needed if you'll add state/animations later

import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomeCard = ({
  mainHeading1,
  mainHeading2,
  arrowGreen,
  mainImage,
  headingBg = "#B9FF66",
  bgColor = "#F3F3F3",
  borderColor = "black",
  text = "#000000",
  linkTo = "/",
}) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-10 rounded-3xl border-b-4 min-h-[320px] md:min-h-[260px] w-full"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderStyle: "solid",
      }}
    >
      {/* Left Section */}
      <div className="flex flex-col justify-between h-full w-full md:w-auto order-2 md:order-1 mt-4 md:mt-0">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            <span
              style={{ backgroundColor: headingBg }}
              className="p-1 inline-block"
            >
              {mainHeading1}
            </span>
            <br />
            <span
              style={{ backgroundColor: headingBg }}
              className="p-1 inline-block"
            >
              {mainHeading2}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={arrowGreen}
            alt="Arrow icon pointing right"
            width={32}
            height={32}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <Link
            href={linkTo}
            className="text-sm sm:text-base md:text-lg font-medium hover:underline"
            style={{ color: text }}
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end">
        <Image
          src={mainImage}
          alt={`${mainHeading1} illustration`}
          width={160}
          height={160}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
        />
      </div>
    </div>
  );
};

export default HomeCard;
