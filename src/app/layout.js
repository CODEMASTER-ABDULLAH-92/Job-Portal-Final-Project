import "./globals.css";
import { AppContextProvider } from "./Context/ContextApi";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ReactLenis } from 'lenis/react'
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "HireMate | Smart Job Portal Application",
  description:
    "HireMate is a full-stack job portal built with Next.js, React, Tailwind CSS, GSAP, and MongoDB. It features dual dashboards (User & Admin) with complete authentication, authorization, and email verification using NodeMailer. Users can build detailed profiles, apply for jobs, and manage applications seamlessly.",
  icons: {
    icon: "/LogoWhite.svg", // ✅ Make sure favicon.ico is placed in the public/ directory
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${grotesk.className} antialiased`}>
        <Toaster />
        <ReactLenis root />
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
