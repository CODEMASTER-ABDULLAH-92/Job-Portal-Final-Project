"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Clock
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const featureRefs = useRef([]);
  const statRefs = useRef([]);
  const teamRefs = useRef([]);

  // GSAP animations
  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    featureRefs.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", end: "bottom 60%", toggleActions: "play none none reverse" },
          delay: i * 0.2,
        }
      );
    });

    statRefs.current.forEach((stat, i) => {
      gsap.fromTo(
        stat,
        { innerText: 0 },
        {
          innerText: stat.getAttribute("data-target"),
          duration: 2,
          scrollTrigger: { trigger: stat, start: "top 85%", toggleActions: "play none none reverse" },
          delay: i * 0.3,
          snap: { innerText: 1 },
          onUpdate: function() {
            const value = Math.ceil(this.targets()[0].innerText);
            stat.innerText = value.toLocaleString();
          }
        }
      );
    });

    teamRefs.current.forEach((member, i) => {
      gsap.fromTo(
        member,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: member, start: "top 85%", toggleActions: "play none none reverse" },
          delay: i * 0.2,
        }
      );
    });

    gsap.fromTo(
      ".cta-section",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 85%", toggleActions: "play none none reverse" },
      }
    );
  }, []);

  const features = [
    {
      img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      title: "Precision Job Matching",
      description: "AI-powered algorithm analyzes your skills, experience, and preferences to match you with the perfect job opportunities."
    },
    {
      img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures. We prioritize your privacy and confidentiality."
    },
    {
      img: "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg",
      title: "Career Insights",
      description: "Get valuable insights into market trends, salary benchmarks, and skill demand to advance your career strategically."
    },
    {
      img: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg",
      title: "Employer Connections",
      description: "Build meaningful connections with top employers who value your unique skills and professional background."
    },
    {
      img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      title: "Quick Application Process",
      description: "Apply to multiple jobs with a single profile. Save time with our streamlined application system."
    },
    {
      img: "https://images.pexels.com/photos/3184462/pexels-photo-3184462.jpeg",
      title: "Global Opportunities",
      description: "Access job opportunities from around the world, with options for remote, hybrid, or relocation positions."
    }
  ];

  const stats = [
    { value: 50000, label: "Active Job Seekers" },
    { value: 1200, label: "Partner Companies" },
    { value: 95000, label: "Successful Placements" },
    { value: 98, label: "Satisfaction Rate (%)" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former HR director with 15+ years of experience in talent acquisition and workforce development.",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator specializing in AI and machine learning applications for the recruitment industry.",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
    },
    {
      name: "Jessica Williams",
      role: "Head of Partnerships",
      bio: "Expert in building relationships with top employers and expanding our network of opportunities.",
      img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50" ref={sectionRef}>
      
      {/* Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 
            ref={headingRef}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 opacity-0"
          >
            About <span className="text-green-600">HireMate</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Revolutionizing the job search experience with intelligent matching, 
            personalized insights, and meaningful connections between talent and opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              At HireMate, we believe that finding the right job should be a rewarding journey, 
              not a frustrating challenge.
            </p>
            <p className="text-lg text-gray-700">
              We combine cutting-edge technology with human insight to build bridges between 
              talented professionals and organizations where they can thrive and make an impact.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  ref={el => statRefs.current[index] = el}
                  data-target={stat.value}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  0
                </div>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Choose HireMate?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0"
            >
              <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden">
                <Image src={feature.img} alt={feature.title} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image 
                src="https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                HireMate was founded in 2018 by a team of HR professionals and technologists 
                who were frustrated with the inefficiencies in the job market.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What started as a simple matching algorithm has evolved into a comprehensive 
                platform that serves both job seekers and employers with equal dedication.
              </p>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>5+ years of connecting talent with opportunity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Our Leadership Team</h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16">
          Meet the passionate professionals dedicated to transforming your job search experience
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              ref={el => teamRefs.current[index] = el}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center opacity-0"
            >
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-green-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 bg-green-600 text-white opacity-0">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Job?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with HireMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/jobs" 
              className="bg-white text-green-600 font-semibold px-8 py-4 rounded-lg hover:bg-green-50 transition-colors"
            >
              Browse Jobs
            </Link>
            <Link 
              href="/login" 
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
