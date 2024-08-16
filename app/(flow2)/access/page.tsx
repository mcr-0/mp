"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
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
import CardTwo from "@/components/CardTwo";
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
const baseUrl = "https://rewards.coinmaster.com/rewards/rewards.html?c=";
const params = [
  "pe_RICHvkvSkl_20240722",
  "pe_RICHHwvdJo_20240722",
  "pe_RICHoeyXYA_20240722",
  "pe_RICHdENJnN_20240722",
  "pe_RICHFQhHQo_20240722",
  "pe_FCBHFEsix_20240814",
  "pe_INSReLppm_20240814",
  "pe_CHATBJoatED_20240814",
  "pe_FCBuuPOIy_20240813",
  "pe_INSfFKVwS_20240813",
];
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

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
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
                Log out
              </Button>
            </div>
          </div>
          <div className="container rounded-2xl bg-neutral-100 p-4">
            <div className="w-full text-center dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <Badge className="absolute left-1/2 top-11 -translate-x-1/2 transform">
                Premium Access
              </Badge>
              <h5 className="mb-4 mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Your access has been unlocked! Discover Exclusive Offers Below.
                Updated Weekly!
              </h5>
              <p>
                You must be 18 or older to receive your reward. Please register
                with valid info & complete 2-3 deals to receive your reward.
              </p>
              <div className="h-96">
                <CardTwo />
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
                      Your access code 27301:
                    </p>
                    <Link href="https://mazerewards.com/access.php">
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
