"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, MoveRight, Loader2 } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const saEvent = (eventName: string) => {
    if (typeof window !== "undefined" && window.sa_event) {
      window.sa_event(eventName);
      console.log(eventName);
    } else {
      console.log("error");
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsername(username);
    // setIsButtonDisabled(username.length < 4);
  };

  const handleAuth = async (event: React.FormEvent) => {
    // event.preventDefault();
    // setIsLoading(true);
    // saEvent("registered");
    // window.gtag_report_conversion();

    try {
      const res = await fetch("/api/auth/register-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        // Po udanej rejestracji lub logowaniu, zaloguj użytkownika za pomocą NextAuth
        await signIn("credentials", {
          redirect: false,
          username: username,
        });
        setMessage("User authenticated successfully!");
        router.push("/get-started"); // Replace '/success' with your desired route
        setIsLoading(false);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Unexpected error:`);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-white to-blue-100/100 p-2">
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
        {/* <p className="py-4 text-center text-xl font-bold tracking-tight text-red-700">
          Complete Four Steps To Receive Exclusive Rewards Access
        </p> */}
        <p className="px-6 pt-4 text-center text-2xl font-bold leading-tight tracking-tight text-red-600">
          Follow us <MoveRight className="inline h-5 w-5" /> Play Free Games{" "}
          <MoveRight className="inline h-5 w-5" /> Level Up!
        </p>
      </div>
      <div
        id="hero"
        className="bg-blue relative z-0 mx-auto h-48 w-full scale-75 text-center"
      >
        <div className="bg-blue absolute -left-1 -top-1 mx-auto h-56 w-full animate-pulse overflow-hidden rounded-xl bg-cyan-600 ring-1 backdrop-blur-sm">
          <Image
            src="/coins.avif"
            className="absolute bottom-0 right-0 top-0 -ml-48 max-w-lg brightness-110"
            alt="reward"
            width={1800}
            height={900}
            priority
          ></Image>
          <h3 className="absolute right-2 top-4 z-20 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-right text-4xl font-black tracking-tighter text-transparent">
            62,500 V
            <br />
            Bucks^
          </h3>
          <h3 className="text-md absolute bottom-2 right-2 z-20 text-right font-semibold tracking-tighter text-cyan-100">
            Worth Up To $500
          </h3>
        </div>
        <div className="bg-blue absolute left-1 top-1 mx-auto h-56 w-full overflow-hidden rounded-xl bg-cyan-600 ring-1 backdrop-blur-sm">
          <Image
            src="/coins.avif"
            className="absolute bottom-0 right-0 top-0 -ml-48 max-w-lg brightness-110"
            alt="reward"
            width={1800}
            height={900}
            priority
          ></Image>
          <h3 className="absolute right-2 top-4 z-20 bg-gradient-to-r from-cyan-950 to-cyan-600 bg-clip-text text-right text-4xl font-black tracking-tighter text-transparent">
            62,500 V-
            <br />
            Bucks^
          </h3>
          <h3 className="absolute bottom-2 right-2 z-20 rounded bg-white/40 text-right text-xs font-semibold tracking-tighter text-cyan-950">
            ^Worth Up To $500 <br /> Offer not sponsored or endorsed by this
            brand.
          </h3>
        </div>
        {/* <p className="absolute -bottom-14 block w-full rounded text-xs text-neutral-500">
          Offer not sponsored-endorsed by this brand.
        </p> */}
      </div>
      <div className="">
        {/* <Image
          src="/fortnite_v2.png"
          width={400}
          height={300}
          alt="image"
          className="mx-auto px-8 py-2"
          priority
        ></Image> */}
        {/* <h1 className="px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
          Complete Two{" "}
          <span className="bg-gradient-to-b from-gray-500 via-indigo-700 to-gray-800 bg-clip-text text-transparent">
            Quick And Easy Steps
          </span>{" "}
          To Receive Reward Access
        </h1> */}
      </div>
      <div className="flex w-full flex-col gap-4 p-4 md:flex-nowrap">
        {session ? (
          <div className="text-center">
            <h1 className="my-2 px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
              Check your progress
            </h1>
            <p>
              Signed in as{" "}
              <span className="font-semibold text-blue-700">
                {session.user.username}
              </span>
            </p>
            <Link href="/get-started">
              <Button
                className="my-4 h-16 w-full rounded-full bg-black text-lg font-bold"
                variant="default"
              >
                Continue
              </Button>
            </Link>
            <div className="text-center">
              <Button variant="link" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <h1 className="my-2 px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
              Receive Access Now
            </h1>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <Input
                name="username"
                onChange={handleInputChange}
                value={username}
                required
                type="text"
                id="email"
                placeholder="Enter your epic username..."
                className="border-1 h-14 w-full rounded-lg border-neutral-300 bg-white text-center text-lg font-bold text-neutral-800 shadow"
              ></Input>
              {isLoading ? (
                <>
                  <Button
                    className="h-16 w-full rounded-full bg-black text-lg font-bold"
                    variant="default"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Veryfing...
                  </Button>
                </>
              ) : (
                <Button
                  className="h-16 w-full rounded-full bg-black text-lg font-bold"
                  variant="default"
                  disabled={isButtonDisabled}
                >
                  Get Started <MoveRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </form>
          </div>
        )}
        {/* {message && <p className="text-green-700">{message}</p>} */}
      </div>
    </div>
  );
}
