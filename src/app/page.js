"use client";
import FooterHireMate from "./Components/FooterHireMate";
import Hero from "./Components/Hero";
import HomeCard from "./Components/HomeCard";
import Navbar from "./Components/Navbar";
import OurWorkingProcess from "./Components/OurWorkingProcess";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { data } from "./assets/assets";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  useGSAP(() => {
    const cards = [
      { ref: card1Ref, x: -300 },
      { ref: card2Ref, x: 300 },
      { ref: card3Ref, x: -300 },
      { ref: card4Ref, x: 300 },
      { ref: card5Ref, x: -300 },
      { ref: card6Ref, x: 300 },
    ];

    cards.forEach(({ ref, x }) => {
      gsap.fromTo(
        ref.current,
        { x, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <Navbar />
      <Hero />

      {/* Job Portal Features */}
      <div className="grid grid-cols-1 pb-40 gap-10 sm:grid-cols-2 px-4 overflow-clip py-20">
        <div ref={card1Ref}>
          <HomeCard
            mainHeading1="Find"
            mainHeading2="Jobs"
            arrowGreen={data.arrowGreen}
            mainImage={data.ll4}
            headingBg="#B9FF66"
            bgColor="#F3F3F3"
            borderColor="black"
            text="#000"
          />
        </div>

        <div ref={card2Ref}>
          <HomeCard
            mainHeading1="Post a"
            mainHeading2="Job"
            arrowGreen={data.arrowGreen}
            mainImage={data.ll1}
            headingBg="#FFFFFF"
            bgColor="#B9FF66"
            borderColor="black"
            text="#000"
          />
        </div>

        <div ref={card3Ref}>
          <HomeCard
            mainHeading1="Smart"
            mainHeading2="Matching"
            arrowGreen={data.arrowWhite}
            mainImage={data.ll6}
            headingBg="#FFFFFF"
            bgColor="#000000"
            borderColor="black"
            text="#FFF"
          />
        </div>

        <div ref={card4Ref}>
          <HomeCard
            mainHeading1="Career"
            mainHeading2="Guidance"
            arrowGreen={data.arrowGreen}
            mainImage={data.ll2}
            headingBg="#B9FF66"
            bgColor="#F3F3F3"
            borderColor="black"
            text="#000"
          />
        </div>

        <div ref={card5Ref}>
          <HomeCard
            mainHeading1="Company"
            mainHeading2="Profiles"
            arrowGreen={data.arrowGreen}
            mainImage={data.ll5}
            headingBg="#FFFFFF"
            bgColor="#B9FF66"
            borderColor="black"
            text="#000"
          />
        </div>

        <div ref={card6Ref}>
          <HomeCard
            mainHeading1="Application"
            mainHeading2="Tracking"
            arrowGreen={data.arrowWhite}
            mainImage={data.ll3}
            headingBg="#FFFFFF"
            bgColor="#000000"
            borderColor="black"
            text="#FFF"
          />
        </div>
      </div>

      <OurWorkingProcess />
      <FooterHireMate />
    </div>
  );
}
