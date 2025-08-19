"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { data } from "../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const OurWorkingProcess = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // GSAP animation for fade-up effect
  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  // Updated job application steps
  const steps = [
    {
      index: 1,
      heading: "Submit Your Application",
      summary:
        "Fill out our online job application form with your personal details, resume, and cover letter tailored to the role.",
      minus: data.minus,
      plus: data.plus,
    },
    {
      index: 2,
      heading: "Initial Screening",
      summary:
        "Our HR team will review your application to ensure you meet the basic qualifications for the position.",
      minus: data.minus,
      plus: data.plus,
    },
    {
      index: 3,
      heading: "First Interview",
      summary:
        "You’ll have a virtual interview with our recruiter to discuss your experience, skills, and career goals.",
      minus: data.minus,
      plus: data.plus,
    },
    {
      index: 4,
      heading: "Technical Assessment",
      summary:
        "For technical roles, complete an assessment to showcase your problem-solving and role-specific skills.",
      minus: data.minus,
      plus: data.plus,
    },
    {
      index: 5,
      heading: "Final Interview & Offer",
      summary:
        "Meet with the hiring manager for the final interview. If selected, you’ll receive your offer letter!",
      minus: data.minus,
      plus: data.plus,
    },
  ];

  const toggleStep = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={containerRef}>
      {/* Header */}
      <div className="flex pb-10 sm:items-center items-start sm:flex-row flex-col gap-6">
        <span className="bg-[#B9FF66] py-2 px-4 rounded-[5px] text-3xl font-semibold">
          Our Hiring Process
        </span>
        <p className="text-lg text-gray-700">
          Step-by-step guide to landing your dream job with us
        </p>
      </div>

      {/* Steps Accordion */}
      <div className="space-y-6">
        {steps.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`border-[1px] border-black rounded-[21px] px-6 py-4 transition-colors duration-300 ${
                isOpen ? "bg-[#B9FF66]" : "bg-[#F3F3F3]"
              }`}
            >
              {/* Step Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleStep(index)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-5xl font-bold">
                    0{item.index}
                  </span>
                  <span className="text-lg md:text-xl">{item.heading}</span>
                </div>
                <Image
                  src={isOpen ? item.minus : item.plus}
                  alt="toggle icon"
                  width={40}
                  height={40}
                  className="transition-transform duration-300"
                />
              </div>

              {/* Step Content */}
              {isOpen && (
                <div className="mt-4 transition-all duration-500 ease-in-out">
                  <hr className="mb-4 border-black" />
                  <p className="text-gray-800">{item.summary}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurWorkingProcess;
