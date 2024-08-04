"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";

type Offer = {
  offerid: number;
  name: string;
  name_short: string;
  description: string;
  adcopy: string;
  picture: string;
  payout: string;
  country: string;
  device: string;
  link: string;
  epc: string;
  boosted: boolean;
  ctype: string;
  cvr: string;
};

const OffersPage = () => {
  const saEvent = (eventName: string) => {
    if (typeof window !== "undefined" && window.sa_event) {
      window.sa_event(eventName);

      console.log(eventName);
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    saEvent("registered");
  }, []);

  const [value, setValue] = React.useState("");
  const handleChange = (value: string) => {
    setValue(value);
    if (value === "1111") {
      window.location.href = "/57813"; // Zastąp '/newpage' adresem URL, na który chcesz przekierować użytkownika
    }
  };

  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //   useEffect(() => {
  //     const fetchOffers = async () => {
  //       try {
  //         const response = await fetch("/api/fetchOffers");
  //         const data = await response.json();

  //         if (data.error) {
  //           setError(data.error);
  //         } else {
  //           const filteredOffer = data.offers.find(
  //             (offer: Offer) => offer.offerid === 48204,
  //           );
  //           setOffer(filteredOffer || null);
  //         }
  //       } catch (err) {
  //         console.error("Frontend Fetch Error:", err);
  //         setError("Failed to fetch offers");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchOffers();
  //   }, []);

  //   useEffect(() => {
  //     if (!loading && !offer && !error) {
  //       window.location.replace("/access");
  //     }
  //   }, [loading, offer, error]);

  //   if (loading) {
  //     return <div className="p-8 text-center text-xl">Loading...</div>;
  //   }

  //   if (error) {
  //     return <div className="text-red-500">Error: {error}</div>;
  //   }

  //   if (!offer) {
  //     return null; // To avoid rendering anything if no offer is found and before redirect happens
  //   }

  return (
    <div className="mx-auto w-full">
      <div className="container mx-auto my-4">
        {/* <Image src="/tiktok.avif" alt="TikTok" width={128} height={128} className="rounded-xl mx-auto my-4 w-16 h-16"></Image> */}

        <div className="w-full text-center sm:p-8 dark:border-gray-700 dark:bg-gray-800">
          <Image
            src="/tiktok.avif"
            alt="TikTok"
            width={128}
            height={128}
            className="mx-auto my-4 -mt-12 h-24 w-24 rounded-xl border-4 border-white bg-white"
          ></Image>

          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Create A TikTok Account & Follow Us!
          </h5>
          <p className="text-base leading-relaxed text-gray-800 sm:text-lg dark:text-gray-400">
            1) Create A New Account
            <br />
            2) Follow{" "}
            <span className="rounded-xl bg-purple-700 px-2 text-white">
              @mazerewards
            </span>
            <br />
            3) Send A Message &quot;
            <span className="font-semibold text-black">CODE</span>&quot;
            <br />
            {/* <span className="italic text-neutral-400">
              Code will be sent automatically!
            </span> */}
          </p>
          <br />
          {/* <h1 className="text-2xl text-center font-bold ">
            Step 2 - Follow & <br />
            Message Us "CODE"
            <br /> To Get An Access Code:
          </h1> */}

          <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 rtl:space-x-reverse">
            <Link
              //href={offer.link}
              href="https://www.tiktok.com/@mazerewards"
              target="_blank"
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 sm:w-auto dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="me-3 h-7 w-7"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Download TikTok</div>
                <div className="-mt-1 font-sans text-sm font-semibold">
                  App Store
                </div>
              </div>
            </Link>
            <p className="text-md mt-4 text-center">
              Already have an account? <br />
              <Link
                href="https://www.tiktok.com/@mazerewards"
                target="_blank"
                className="font-semibold underline"
              >
                Click here!
              </Link>
            </p>
            {/* <a
              href="#"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                ></path>
              </svg>
              <div className="text-left rtl:text-right">
                <div className="mb-1 text-xs">Download on the</div>
                <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
              </div>
            </a> */}
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-300 p-4">
        <h5 className="mb-2 mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Enter Your Code
        </h5>

        <div className="mx-auto mb-4 w-fit space-y-2">
          <div className="rounded-xl bg-white">
            <InputOTP maxLength={4} value={value} onChange={handleChange}>
              <InputOTPGroup>
                <InputOTPSlot
                  className="h-16 w-12 border-neutral-900"
                  index={0}
                />
                <InputOTPSlot
                  className="h-16 w-12 border-neutral-900"
                  index={1}
                />
                <InputOTPSlot
                  className="h-16 w-12 border-neutral-900"
                  index={2}
                />
                <InputOTPSlot
                  className="h-16 w-12 border-neutral-900 pr-1"
                  index={3}
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="text-center text-sm">
            {value === "" ? (
              <>Enter your access code</>
            ) : (
              <>You entered: {value}</>
            )}
          </div>
        </div>
        {/* <Link
          href="#"
          className="block rounded-full bg-blue-600 px-6 py-3 text-center text-xl font-semibold text-white"
        >
          Continue
        </Link> */}

        {/* <Link href="tiktok" className="w-full">
          <Button
            className="h-16 w-full rounded-xl text-lg font-semibold"
            variant="destructive"
          >
            Continue
          </Button>
        </Link> */}
      </div>
      {/* <div className="bg-green-100 px-8  mt-6 w-full">
        <h1 className="text-2xl  pt-4 text-center font-bold mt-6">How to get it?</h1>
        <br />
        <p>1. Create a TikTok account if you don't have it already.</p>
        <p>2. Search our profile @ONLYFORG</p>
        <p>3. Follow us</p>
        <p>4. Send us a message "CODE" to get your unique access code.</p>
        <p>5. Enter your access code above.</p>
      </div> */}
    </div>
  );
};

export default OffersPage;
