"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  ChevronRight,
  MoveRight,
  Coins,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PreloaderTwo from "@/components/Preloader";
import CoinMasterLinks from "@/components/CoinMasterLinks";
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
  const [coinMaster, setCoinMaster] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [clickedOffers, setClickedOffers] = useState<Set<number>>(new Set());
  const [completedOffers, setCompletedOffers] = useState<Set<number>>(
    new Set(),
  );
  const [completedTasks, setCompletedTasks] = useState<number>(() => {
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
            (offer: Offer) => offer.offerid === 48853,
          );
          setSelectedOffers(filteredSelectedOffers);
          const coinMaster = data.offers.filter(
            (offer: Offer) => offer.offerid === 57813,
          );
          setCoinMaster(coinMaster);
        }
      } catch (err) {
        console.error("Frontend Fetch Error:", err);
        setError("Failed to fetch offers");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Minimalny czas wyświetlania 2 sekundy
      }
    };
    fetchOffers();
  }, []);

  const handleCheck = async () => {
    if (!session || !session.user?.username) {
      console.error("User is not authenticated or session is missing");
      return;
    }
    alert(
      "Have you completed the required level? Great! It may take up to few hours to verify your progress. Feel free to come back anytime soon and check again.",
    );

    try {
      setIsLoading(true);
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: session.user.username,
        }),
      });
      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to load completion data:", errorData.message);
        return;
      }

      const data = await response.json();
      const { completedOffers } = data; // Wydobywamy clickedOfferCount z odpowiedzi
      console.log(
        `The 'clickedOffer' event has occurred ${completedOffers} times.`,
      );
      setCompletedTasks(completedOffers);

      console.log("User data:", data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending activity:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  const handleOfferClick = async (
    offerid: number,
    aff_sub4_value: any,
    event: React.MouseEvent,
  ) => {
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
        console.log("saved event");

        if (!response.ok) {
          console.error("Failed to save activity");
        }
      } catch (error) {
        console.error("Error sending activity:", error);
      }
    }
  };

  if (loading) {
    return <PreloaderTwo />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="mx-auto flex w-full flex-col gap-2">
      {session ? (
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-center rounded-2xl pl-4">
            <div id="top-info" className="w-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                <span className="relative flex">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
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
                Change username
              </Button>
            </div>
          </div>
          <div className="container rounded-2xl bg-neutral-100 p-4">
            <div className="w-full text-center dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <Badge className="absolute left-1/2 top-11 -translate-x-1/2 transform">
                Step II
              </Badge>
              <h5 className="mb-4 mt-2 text-left text-2xl font-bold text-gray-900 dark:text-white">
                Final Step - Download, Play & Level Up!
              </h5>

              <ul className="coin-master">
                {coinMaster.map((offer) => (
                  <li key={offer.offerid} className="mb-2">
                    <Accordion type="single" className="mb-2 hidden w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          How to complete in 30 minutes?
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="mb-4 text-left text-sm leading-snug">
                            After installing Coin Master and finishing the
                            introduction, and once you&apos;ve used up your
                            initial spins, you can return to generate{" "}
                            <u>extra spins</u> by clicking the button below:
                          </p>
                          <CoinMasterLinks />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Link
                      href={`${offer.link}`}
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
                            Coin Master
                          </h3>
                          <p className="max-h-13 block overflow-hidden text-[14px] leading-tight text-gray-900">
                            Download & play until you complete Village 3 (est.
                            completion time: ~15 mins. if you use extra Free
                            Spins below)
                          </p>
                        </div>
                        <div>
                          <div className="block w-20 rounded-3xl bg-blue-700 p-1 text-center text-xs font-semibold leading-5 text-white">
                            Get
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mb-2 bg-yellow-100 p-4">
                <p className="mb-4 text-left text-sm leading-snug">
                  TIP: Once you&apos;ve used up your initial spins, you can
                  return to generate <u>extra spins</u> by clicking the button
                  below:
                </p>
                <CoinMasterLinks />
              </div>
              <ul>
                {selectedOffers.map((offer) => (
                  <li key={offer.offerid} className="mb-2">
                    <Link
                      href={`${offer.link}`}
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
                            {offer.offerid === 48853
                              ? "Travel Town"
                              : offer.name_short && offer.offerid === 55462
                                ? "Discover A Podcast"
                                : offer.name_short && offer.offerid === 43096
                                  ? "Play For 1 Minute"
                                  : offer.name_short}
                          </h3>
                          <p className="max-h-13 block overflow-hidden text-[14px] leading-tight text-gray-900">
                            {/* {offer.offerid === 58205
                              ? "The Inspiring Women Leadership Lab"
                              : offer.adcopy && offer.offerid === 55462
                                ? "A Book with Legs"
                                : offer.adcopy && offer.offerid === 43096
                                  ? "Adventure Game - Evertale"
                                  : offer.adcopy} */}

                            {offer.offerid === 48853
                              ? "Download & play until you complete Level 9 (est. completion time: ~15 mins.)"
                              : offer.adcopy && offer.offerid === 57813
                                ? "Download & play until you reach Village 4"
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

              <div className="completed-apps relative rounded-xl bg-slate-200 p-4 text-left shadow">
                <div className="free-spins hidden">
                  <div className="flex">
                    <h1 className="mb-2 text-left text-2xl font-bold text-gray-700">
                      Free Spins for Coin Master:
                    </h1>
                  </div>
                  <p>
                    Come back any time to use Extra Free Spins. Click links
                    below to receive 15, 25 or even 50 extra spins.
                  </p>
                  <div className="free-spins flex items-center justify-center"></div>
                </div>
                <p className="completed-instruction text-md my-2 text-center font-semibold leading-tight text-neutral-800">
                  80% of users complete this step in less than 1 hour
                </p>

                {isLoading ? (
                  <>
                    <Button
                      className="h-16 w-full rounded-full bg-blue-800 text-lg font-bold hover:bg-blue-700"
                      variant="default"
                      type="submit"
                      disabled={isButtonDisabled}
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking completion...
                    </Button>
                  </>
                ) : (
                  <Button
                    className="h-16 w-full rounded-full bg-blue-800 text-lg font-bold hover:bg-blue-700"
                    variant="default"
                    disabled={isButtonDisabled}
                    onClick={handleCheck}
                  >
                    Check completion <RefreshCw className="ml-2" />
                  </Button>
                )}
              </div>

              {completedTasks < 1 && <></>}
              {completedTasks < 2 && completedTasks >= 1 && (
                <div className="completion-status relative mt-4 rounded-xl bg-yellow-100 p-4 text-left shadow">
                  <div className="offer-content">
                    {/* Ten div będzie widoczny tylko, jeśli completedTasks jest mniejsze niż 2 */}
                    <div id="completed">
                      <div className="mb-2 flex">
                        <h1 className="mx-auto text-xl font-bold text-gray-700">
                          Completed: {completedTasks}/2
                        </h1>
                      </div>
                      <Button
                        className="h-16 w-full rounded-full bg-black text-lg font-bold"
                        variant="default"
                        disabled
                      >
                        Finish <Coins className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {completedTasks >= 2 && (
                <div className="completion-status relative mt-4 rounded-xl bg-yellow-100 p-4 text-left shadow">
                  <div className="w-full">
                    <p className="py-2 text-center text-xl font-bold text-green-700">
                      Your access has been unlocked.
                    </p>
                    <Link href="/access">
                      <Button
                        className="h-16 w-full rounded-full bg-blue-600 text-lg font-bold"
                        variant="default"
                      >
                        Get MazedPromos <MoveRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
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
