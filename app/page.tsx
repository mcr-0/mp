"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoveRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LandingPage() {
  const saEvent = (eventName: string) => {
    if (typeof window !== "undefined" && window.sa_event) {
      window.sa_event(eventName);
      console.log(eventName);
    } else {
      console.log("error");
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsButtonDisabled(value.length < 4);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isButtonDisabled) {
      event.preventDefault();
    } else {
      gtag_report_conversion("get-started");
      saEvent("registered");
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-100/70 to-white/40 p-3">
      <div id="top-info">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
          <span className="relative flex">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
              <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.47663 5.14451C8.43564 5.0565 8.34737 5.00002 8.25013 5.00002H5.28762L8.21137 0.383761C8.26012 0.306768 8.26311 0.209268 8.21913 0.129522C8.17513 0.0495118 8.09111 0 8.00011 0H4.00011C3.90536 0 3.81885 0.0534962 3.77637 0.138252L0.0263616 7.63827C-0.0123982 7.71552 -0.00815015 7.80752 0.037348 7.88126C0.0831098 7.955 0.163354 8 0.250102 8H2.82085L0.019594 14.653C-0.02816 14.7668 0.0143499 14.8988 0.119584 14.9633C0.160073 14.988 0.205073 15 0.249839 15C0.321587 15 0.392339 14.9692 0.441353 14.9113L8.44138 5.41123C8.50411 5.33676 8.51761 5.23275 8.47663 5.14451Z"
                  fill="white"
                />
              </svg>
            </span>
          </span>
        </div>
        <p className="pt-2 text-center text-xl font-bold text-red-700">
          Play Games & Level Up!
        </p>
      </div>
      <div
        id="hero"
        className="bg-blue relative -top-2 z-0 mx-auto h-56 w-full -rotate-2 scale-75"
      >
        <div className="bg-blue absolute -left-1 -top-0 mx-auto h-56 w-full -rotate-3 overflow-hidden rounded-xl bg-cyan-500 shadow-lg ring-1 backdrop-blur-sm"></div>
        <div className="bg-blue absolute mx-auto h-56 w-full overflow-hidden rounded-xl bg-cyan-600 shadow ring-1 backdrop-blur-sm">
          <Image
            src="/coins.avif"
            className="absolute bottom-0 right-0 top-0 -ml-48 max-w-lg brightness-110"
            alt="reward"
            width={1800}
            height={900}
            priority
          ></Image>
        </div>
        <div className="bg-blue absolute mx-auto h-56 w-full rotate-3 overflow-hidden rounded-xl bg-cyan-600 shadow ring-1 backdrop-blur-sm">
          <Image
            src="/coins.avif"
            className="absolute bottom-0 right-0 top-0 -ml-48 max-w-lg brightness-110"
            alt="reward"
            width={1800}
            height={900}
            priority
          ></Image>
          <h3 className="absolute right-2 top-4 z-20 text-right text-4xl font-black tracking-tighter text-cyan-700">
            62,500 V-
            <br />
            Bucks*
          </h3>
          <h3 className="text-md absolute bottom-2 right-2 z-20 text-right tracking-tighter text-cyan-100">
            Worth Up To $500
          </h3>
        </div>
      </div>
      <div>
        <p className="-mt-6 mb-4 text-center text-xs tracking-tight text-neutral-600">
          Offer not sponsored-endorsed by this brand.
        </p>
        {/* <Image
          src="/fortnite_v2.png"
          width={400}
          height={300}
          alt="image"
          className="mx-auto px-8 py-2"
          priority
        ></Image> */}
        <h1 className="px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
          Complete Two{" "}
          <span className="bg-gradient-to-b from-gray-500 via-indigo-700 to-gray-800 bg-clip-text text-transparent">
            Quick And Easy Steps
          </span>{" "}
          To Receive Reward Access
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4 p-4 md:flex-nowrap">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            type="text"
            id="email"
            placeholder="Enter Epic Username..."
            value={inputValue}
            onChange={handleInputChange}
            className="border-1 h-14 w-full rounded-lg border-neutral-300 bg-white text-center text-lg font-bold text-neutral-800 shadow"
          />
        </div>
        <Link
          href={isButtonDisabled ? "#" : "get-started"}
          onClick={handleClick}
          className="w-full"
        >
          <Button
            className="h-16 w-full rounded-full bg-blue-600 text-lg font-bold"
            variant="default"
            disabled={isButtonDisabled}
          >
            Get Started <MoveRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="-mb-4 w-full text-center text-xs leading-tight tracking-tight text-neutral-600">
          <strong>We never ask for your password. </strong>
          <br />
          <br />
          ^Upon completion 2 steps
        </p>
      </div>
    </div>
  );
}
