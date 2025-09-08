"use client";

import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-200">
        
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have a question, idea, or just want to say hello? Fill out the form
            below and we’ll get back to you shortly.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                placeholder="Write your message..."
                // rows="5"
                rows={5}
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 transition duration-300 rounded-xl text-gray-900 font-bold shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              alt="Contact Us"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
