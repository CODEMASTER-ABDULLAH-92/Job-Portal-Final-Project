"use client";
import React from "react";

const TestimonialHire = () => {
  return (
    <div className="relative max-w-[550px] p-8 bg-[#191A23] border-2 border-[#B9FF66] rounded-3xl shadow-lg">
      {/* Speech bubble text */}
      <p className="text-white text-lg leading-relaxed">
        “We have been working with Positivus for the past year and have seen a
        significant increase in website traffic and leads as a result of their
        efforts. The team is professional, responsive, and truly cares about the
        success of our business. We highly recommend Positivus to any company
        looking to grow their online presence.”
      </p>

      {/* Speech bubble tail */}
      <div
        className="absolute -bottom-3 left-16 w-6 h-6 bg-[#191A23] rotate-45 border-b-2 border-r-2 border-[#B9FF66]"
        style={{ boxShadow: "2px 2px 0 #B9FF66" }}
      ></div>
    </div>
  );
};

export default TestimonialHire;
