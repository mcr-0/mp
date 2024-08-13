import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MazedPromos - Get Access To Deals And Promos",
  description: "Play Games And Get Access to Over 30+ Deals And Promos",
};
import SessionProviderWrapper from "./SessionProviderWrapper"; // Zakładając, że jest w tym samym katalogu
import GoogleAds from "@/components/GoogleAds";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAds />
      </head>
      <body className={`${inter.className} bg-black`}>
        <div className="relative isolate min-h-screen overflow-hidden bg-blue-700">
          <div className="absolute left-0 right-0 top-0 -z-20 h-full min-h-screen w-full bg-gradient-to-b from-neutral-950/100 to-neutral-900/100"></div>
          <Image
            src="/blue-bg.png"
            width={1000}
            height={1000}
            alt="Background Image"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80"
          ></Image>
          <header className="z-50 mx-auto max-w-lg pt-2 text-center sm:px-6 lg:px-8">
            <div className="mb-2 flex items-center justify-center space-x-2 text-center text-xl text-white">
              <Link
                href="/"
                className="block w-12 justify-center text-left shadow-xl"
              >
                <Image
                  src="/logo.jpg"
                  height={400}
                  width={600}
                  alt="logo"
                  className="animate-spin-clockwise h-full w-full rounded-md object-cover"
                  priority
                ></Image>
              </Link>
              <div className="">
                <span className="animate-pulse">Status: </span>
                <span className="animate-pulse text-green-300">Available</span>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#8FFF00" />
                <path
                  d="M5 10L8.5 13.5L14.5 6.5"
                  stroke="#1E1E1E"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-black tracking-tighter text-neutral-100">
              Complete Two Steps <br />& Gain Access
            </h1>
            <h1 className="text-lg leading-8 tracking-tighter text-neutral-200">
              <span className="">To Deals And Promos* Now!</span>
            </h1>
          </header>
          <div className="relative m-4">
            <div className="isolate mx-auto min-h-96 w-full max-w-md items-center justify-center rounded-3xl bg-white p-2 shadow-lg ring-1 ring-black/5 backdrop-blur-md">
              <SessionProviderWrapper session={SessionProviderWrapper}>
                {children}
              </SessionProviderWrapper>
            </div>
          </div>
          <p className="mx-auto max-w-sm px-4 pb-20 text-center text-xs text-neutral-200">
            Use of any logos or trademarks are for reference purposes only. By
            using the website, you agree to our{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-neutral-100 underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-neutral-100 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </body>

      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
