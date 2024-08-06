"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

type Countdown = {
  current: number;
  initial: number;
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
  const completedFirstStep = (event: any) => {
    saEvent("first_step_completed");
  };

  const [value, setValue] = React.useState("");
  const [boostedOffers, setBoostedOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [countdowns, setCountdowns] = useState<{ [key: number]: Countdown }>(
    {},
  );
  const [completedTasks, setCompletedTasks] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("completedTasks")) || 0;
    }
    return 0;
  });
  const [clickedOffers, setClickedOffers] = useState<Set<number>>(new Set());
  const [completedOffers, setCompletedOffers] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/fetchOffers");
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          const filteredBoostedOffers = data.offers.filter(
            (offer: Offer) => offer.boosted,
          );
          setBoostedOffers(filteredBoostedOffers);
        }
        //   saEvent("first_step_loaded");
        //   const filteredBoostedOffers = data.offers
        //     .map((offer: Offer) => {
        //       if (offer.offerid === 54541) {
        //         return {
        //           ...offer,
        //           adcopy: "Follow us: @mazerewards",
        //           img: "tiktok.avif",
        //         };
        //       }
        //       return offer;
        //     })
        //     .filter((offer: Offer) => offer.boosted);
        //   setBoostedOffers(filteredBoostedOffers);
        // }
      } catch (err) {
        console.error("Frontend Fetch Error:", err);
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (const [offerid, countdown] of Object.entries(countdowns)) {
      if (countdown.current > 0) {
        const timer = setTimeout(() => {
          setCountdowns((prev) => ({
            ...prev,
            [Number(offerid)]: {
              ...prev[Number(offerid)],
              current: prev[Number(offerid)].current - 1,
            },
          }));
        }, 1000);
        timers.push(timer);
      } else if (
        countdown.current === 0 &&
        !completedOffers.has(Number(offerid))
      ) {
        setCountdowns((prev) => ({
          ...prev,
          [Number(offerid)]: { current: 0, initial: countdown.initial },
        }));
        setCompletedTasks((prev) => prev + 1);
        setCompletedOffers((prev) => new Set(prev).add(Number(offerid)));
      }
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [countdowns, completedOffers]);

  useEffect(() => {
    localStorage.setItem("completedTasks", String(completedTasks));
  }, [completedTasks]);

  const handleOfferClick = (offerid: number, event: React.MouseEvent) => {
    // event.preventDefault();
    if (!clickedOffers.has(offerid)) {
      setClickedOffers(new Set(clickedOffers.add(offerid)));
      let countdownTime = 60;
      if (offerid === 48204) {
        countdownTime = 5;
      } else if (offerid === 10002) {
        countdownTime = 30;
      }
      setCountdowns((prev) => ({
        ...prev,
        [offerid]: { current: countdownTime, initial: countdownTime },
      }));
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="1-step px-2">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
        <span className="relative flex">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
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
      <p className="pt-4 text-center text-xl font-bold text-green-700">
        You are eligible!
      </p>

      <h3 className="mb-4 mt-4 text-left text-2xl font-semibold text-zinc-900">
        Complete tasks below:
      </h3>

      <ul>
        {boostedOffers.map((offer) => (
          <li key={offer.offerid} className="mb-2">
            <a
              href={offer.link}
              className="offer flex rounded pb-4"
              target="_blank"
              onClick={(event) => handleOfferClick(offer.offerid, event)}
            >
              <img
                src={offer.picture}
                alt="offer"
                height={64}
                width={64}
                className="h-14 w-14 rounded-lg"
              />
              <div className="-mb-2 ml-2 flex w-full items-center gap-2 border-b-[1px] border-gray-300 pb-2">
                <div className="w-full text-left">
                  <h3 className="text-[14px] font-medium leading-tight">
                    {offer.name_short}
                  </h3>
                  <p className="block max-h-10 overflow-hidden text-[12px] text-gray-900">
                    {offer.adcopy}
                  </p>
                </div>
                <div>
                  <div className="block w-20 rounded-3xl bg-blue-700 p-1 text-center text-xs font-semibold leading-5 text-white">
                    Get
                  </div>
                </div>
              </div>
            </a>
            {countdowns[offer.offerid] &&
              ((countdowns[offer.offerid].initial -
                countdowns[offer.offerid].current) /
                countdowns[offer.offerid].initial) *
                100 <
                100 && (
                <div className="">
                  <Progress
                    value={
                      ((countdowns[offer.offerid].initial -
                        countdowns[offer.offerid].current) /
                        countdowns[offer.offerid].initial) *
                      100
                    }
                  />
                </div>
              )}
          </li>
        ))}
      </ul>
      <p className="completed-instruction mb-2 text-xs text-neutral-800">
        95% of users complete this in less than 5 minutes
      </p>
      <div className="completed-apps relative my-3 rounded-xl bg-slate-200 p-4 text-left shadow">
        <div className="flex">
          <h1 className="text-left text-2xl font-bold text-gray-700">
            Completed: {completedTasks}/2
          </h1>
        </div>

        <div className="check-button mx-auto">
          <div className="flex items-center justify-between">
            {Object.values(countdowns).some(
              (countdown) => countdown.current > 0,
            ) && (
              <div className="">
                <p className="pt-4 text-center text-xl font-bold text-green-500">
                  Checking completion...
                </p>
              </div>
            )}

            {completedTasks > 1 && (
              <div className="w-full">
                <p className="py-2 text-xl font-bold text-green-700">
                  Great work! Step 1 has been fully finished.
                </p>
                <Link
                  href="/step-2000"
                  onClick={completedFirstStep}
                  className="focus:shadow-outline mt-2 flex w-full items-center justify-center rounded-2xl bg-blue-700 px-4 py-2 font-bold leading-10 text-white hover:bg-blue-700 focus:outline-none"
                >
                  <span>Continue</span>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="loading me-3 ms-2 hidden h-10 w-4 animate-spin text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
