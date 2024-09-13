"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { ChevronRight, MoveRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  const cid = uuidv4();
  const router = useRouter();
  const { data: session } = useSession();
  const [value, setValue] = useState("");
  const [offer, setOffer] = useState<Offer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [boostedOffers, setBoostedOffers] = useState<Offer[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<Offer[]>([]);
  const [clickedOffers, setClickedOffers] = useState<Set<number>>(new Set());
  const [completedOffers, setCompletedOffers] = useState<Set<number>>(
    new Set(),
  );
  const [completedTasks, setCompletedTasks] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("completedTasks")) || 0;
    }
    return 0;
  });
  const [countdowns, setCountdowns] = useState<{ [key: number]: Countdown }>(
    {},
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
          const filteredSelectedOffers = data.offers.filter(
            (offer: Offer) =>
              offer.offerid === 55462 || // A Book with Legs Podcast
              offer.offerid === 58205 || // The Inspiring Women Leadership Lab
              offer.offerid === 58571 || // The Inspiring Women Leadership Lab
              offer.offerid === 46391 || // The Inspiring Women Leadership Lab
              offer.offerid === 43096, // Evertale
          );
          setSelectedOffers(filteredSelectedOffers);
        }
      } catch (err) {
        console.error("Frontend Fetch Error:", err);
        setError("Failed to fetch offers");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  const handleOfferClick = async (
    offerid: number,
    aff_sub4_value: any,
    event: React.MouseEvent,
  ) => {
    setCompletedTasks((prevCompletedTasks) => {
      const newCompletedTasks = prevCompletedTasks + 1;
      // Zapisanie nowej wartości w localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("completedTasks", newCompletedTasks.toString());
      }
      return newCompletedTasks;
    });

    if (!session || !session.user?.username) {
      console.error("User is not authenticated or session is missing");
      return;
    }
    if (!clickedOffers.has(offerid)) {
      try {
        const response = await fetch("/api/saveActivity", {
          method: "POST", // Metoda POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offerid,
            aff_sub4_value,
            username: session.user.username,
          }),
        });
        console.log(aff_sub4_value);

        if (!response.ok) {
          console.error("Failed to save activity");
        }
      } catch (error) {
        console.error("Error sending activity:", error);
      }
    }
  };
  const handleTiktokOfferClick = async (
    offerid: number,
    aff_sub4_value: any,
    event: React.MouseEvent,
  ) => {
    const newCompletedTasks = 1;
    setCompletedTasks(newCompletedTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("completedTasks", newCompletedTasks.toString());
    }
    if (!session || !session.user?.username) {
      console.error("User is not authenticated or session is missing");
      return;
    }
    try {
      const response = await fetch("/api/saveActivity", {
        method: "POST", // Metoda POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerid,
          aff_sub4_value,
          username: session.user.username,
        }),
      });
      window.location.reload();

      if (!response.ok) {
        console.error("Failed to save activity");
      }
    } catch (error) {
      console.error("Error sending activity:", error);
    }
  };
  const handleTiktokFollowClick = async (
    cid: string,
    event: React.MouseEvent,
  ) => {
    const newCompletedTasks = 1;
    setCompletedTasks(newCompletedTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("completedTasks", newCompletedTasks.toString());
    }
    if (!session || !session.user?.username) {
      console.error("User is not authenticated or session is missing");
      return;
    }
    try {
      const offerid = 1;
      const response = await fetch("/api/saveActivity", {
        method: "POST", // Metoda POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cid,
          offerid,
          username: session.user.username,
        }),
      });
      window.location.reload();

      if (!response.ok) {
        console.error("Failed to save activity");
      }
    } catch (error) {
      console.error("Error sending activity:", error);
    }
  };
  useEffect(() => {
    // Aktualizuje stan, jeśli localStorage się zmieni (opcjonalnie)
    const storedCompletedTasks = Number(localStorage.getItem("completedTasks"));
    if (storedCompletedTasks !== completedTasks) {
      setCompletedTasks(storedCompletedTasks);
    }
  }, [completedTasks]);
  if (loading) {
    return (
      <div className="p-8 text-center text-xl text-neutral-800">Loading...</div>
    );
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="mx-auto flex w-full flex-col gap-2">
      {session ? (
        <div className="flex flex-col gap-2">
          <div className="container flex justify-center rounded-2xl">
            <div id="top-info" className="w-full">
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
              <p className="text-md font-sem flex gap-2 pt-2 text-center leading-tight tracking-tight text-neutral-700">
                <svg
                  className="feather feather-user"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-sm font-semibold leading-relaxed">
                  {session.user.username}{" "}
                </span>
              </p>
            </div>
            <div className="justify-end text-right">
              <Button
                variant="link"
                className="text-xs text-neutral-800 underline"
                onClick={handleSignOut}
              >
                Log Out
              </Button>
            </div>
          </div>
          <div className="container rounded-2xl bg-neutral-100 p-4">
            <div className="w-full text-center dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <Badge className="absolute left-1/2 top-11 -translate-x-1/2 transform">
                Start now!
              </Badge>
              <h5 className="mb- mt-2 text-xl font-bold text-gray-900 dark:text-white">
                Complete any task below
              </h5>
              <Drawer>
                <DrawerTrigger>
                  <ul className="hidden">
                    <li className="mb-2">
                      <div className="offer flex rounded pb-4">
                        <img
                          src="/tiktok.avif"
                          alt="offer"
                          height={64}
                          width={64}
                          className="h-16 w-16 rounded-xl"
                        />
                        <div className="-mb-2 ml-2 flex w-full items-center gap-2 border-b-[1px] border-gray-300 pb-2">
                          <div className="w-full text-left">
                            <h3 className="text-[14px] font-medium leading-relaxed">
                              Follow our TikTok
                            </h3>
                            <p className="block max-h-12 text-[14px] leading-tight text-gray-900">
                              Sign up if you don&apos;t have an account!
                            </p>
                          </div>
                          <div>
                            <div className="block w-20 rounded-3xl bg-[#ff3b5c] p-1 text-center text-xs font-bold leading-5 text-white">
                              Follow
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <div className="mb-2 flex flex-col gap-2">
                      <Image
                        src="/Artboard.png"
                        width={2000}
                        height={2000}
                        className="mx-auto w-24 rounded-full"
                        alt="avatar"
                        priority
                      ></Image>
                      <h2 className="text-xl">@mazerewards</h2>
                      <p className="text-xs">10,000+ Followers</p>
                      {/* <Button className="mx-auto h-12 w-full bg-[#ff3b5c]">
                        Follow
                      </Button> */}
                    </div>
                  </DrawerHeader>
                  <DrawerFooter>
                    <ul className="w-full">
                      {boostedOffers.map((offer) => (
                        <li key={offer.offerid}>
                          <a
                            href={offer.link}
                            className=""
                            target="_blank"
                            onClick={(event) => {
                              const url = new URL(event.currentTarget.href);
                              url.searchParams.set("aff_sub4", cid);
                              event.currentTarget.href = url.href; // Zaktualizowanie href linku
                              const aff_sub4_value =
                                url.searchParams.get("aff_sub4");
                              handleTiktokOfferClick(
                                offer.offerid,
                                aff_sub4_value,
                                event,
                              );
                            }}
                          >
                            <Button className="w-full bg-[#ff3b5c]">
                              {" "}
                              Sign up for TikTok
                            </Button>
                          </a>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://tiktok.com/@mazerewards?t=8opvSUtA3oc&_r=1"
                      target="_blank"
                      onClick={(event) => handleTiktokFollowClick(cid, event)}
                      className="w-full"
                    >
                      <Button className="w-full bg-neutral-200 text-neutral-800 hover:bg-neutral-300">
                        I already have an account!
                      </Button>
                    </a>
                    <DrawerClose>
                      <Button variant="link" className="w-full">
                        Change task
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <ul>
                {boostedOffers.map((offer) => (
                  <li key={offer.offerid} className="mb-2">
                    <Link
                      href={offer.link}
                      className="offer flex rounded pb-4"
                      target="_blank"
                      onClick={(event) => {
                        const url = new URL(event.currentTarget.href);
                        url.searchParams.set("aff_sub4", cid);
                        event.currentTarget.href = url.href; // Zaktualizowanie href linku
                        const aff_sub4_value = url.searchParams.get("aff_sub4");
                        handleOfferClick(offer.offerid, aff_sub4_value, event);
                      }}
                    >
                      <img
                        src={offer.picture}
                        alt="offer"
                        height={64}
                        width={64}
                        className="h-16 w-16 rounded-lg"
                      />
                      <div className="-mb-2 ml-2 flex w-full items-center gap-2 border-b-[1px] border-gray-300 pb-2">
                        <div className="w-full text-left">
                          <h3 className="text-[14px] font-medium leading-relaxed">
                            {offer.offerid === 58205
                              ? "Discover A Podcast"
                              : offer.name_short && offer.offerid === 55462
                                ? "Discover A Podcast"
                                : offer.name_short && offer.offerid === 43096
                                  ? "Play For 1 Minute"
                                  : offer.name_short}
                          </h3>
                          <p className="max-h-13 block overflow-hidden text-[14px] leading-tight text-gray-900">
                            {offer.offerid === 58205
                              ? "The Inspiring Women Leadership Lab"
                              : offer.adcopy && offer.offerid === 55462
                                ? "A Book with Legs"
                                : offer.adcopy && offer.offerid === 43096
                                  ? "Adventure Game - Evertale"
                                  : offer.adcopy}
                          </p>
                        </div>
                        <div>
                          <div className="block w-20 rounded-3xl bg-blue-700 p-1 text-center text-xs font-semibold leading-5 text-white">
                            {offer.offerid === 58205 || offer.offerid === 55462
                              ? "Listen"
                              : "Get"}
                          </div>
                        </div>
                      </div>
                    </Link>
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
              <div className="completed-apps relative rounded-xl bg-slate-200 p-4 text-left shadow">
                <div>
                  {completedTasks < 2 && (
                    <div className="offer-content">
                      {/* Ten div będzie widoczny tylko, jeśli completedTasks jest mniejsze niż 2 */}
                      <div id="completed">
                        <div className="mb-2 flex">
                          <h1 className="mx-auto text-xl font-bold text-gray-700">
                            Completed: {completedTasks}/2
                          </h1>
                        </div>
                        <Button
                          className="h-16 w-full rounded-full bg-blue-600 text-lg font-bold"
                          variant="default"
                          disabled
                        >
                          Claim Now <MoveRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {completedTasks >= 2 && (
                    <div className="w-full">
                      <p className="py-2 text-center text-xl font-bold text-green-700">
                        Great work! Step 1 has been fully finished.
                      </p>
                      <Link href="/step-2">
                        <Button
                          className="h-16 w-full rounded-full bg-blue-600 text-lg font-bold"
                          variant="default"
                        >
                          Go to Step 2 <MoveRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container rounded-2xl bg-white p-4 text-center">
          Log in first.
          <Link href="./">
            <Button variant="default" className="w-full">
              Click here
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OffersPage;
