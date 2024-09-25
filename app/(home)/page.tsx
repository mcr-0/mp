"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, MoveRight, Loader2 } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // router.push("https://mazedpromos.com");
  };
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const saEvent = (eventName: string) => {
    if (typeof window !== "undefined" && window.sa_event) {
      window.sa_event(eventName);
      console.log(eventName);
    } else {
      console.log("error");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsername(username);
    setIsButtonDisabled(username.length < 4);
  };

  useEffect(() => {
    setIsLoading(false);
    setIsButtonDisabled(false);
    setIsInputDisabled(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Ten efekt uruchomi się tylko raz, po załadowaniu komponentu

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    saEvent("registered");
    window.gtag_report_conversion();
    const form = event.target as HTMLFormElement; // Asercja typu

    const formData = new FormData(form); // Teraz TypeScript wie, że `form` to `HTMLFormElement`
    const username = formData.get("username") as string; // Możesz bezpiecznie uzyskać wartość

    try {
      const res = await fetch("/api/register-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.accountExists) {
          await signIn("credentials", {
            redirect: false,
            username: username,
          });
          router.push("/step-2-play"); // Replace '/success' with your desired route
        } else {
          // Po udanej rejestracji lub logowaniu, zaloguj użytkownika za pomocą NextAuth
          await signIn("credentials", {
            redirect: false,
            username: username,
          });
          // setMessage("Success!");
          router.push("/step-1"); // Replace '/success' with your desired route
          setIsLoading(false);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Unexpected error:`);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-blue-100 to-blue-500/100 ring-1">
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
        <p className="text-md mb-4 px-6 pt-4 text-center font-bold leading-tight tracking-tight text-red-600">
          Check if you are eligible
        </p>
      </div>
      <div id="hero" className="bg-blue z-0 mx-auto w-3/4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <Image
            src="/fortnite_v2.png"
            className="brightness-110"
            alt="reward"
            width={1800}
            height={900}
            priority
          ></Image>
        </motion.div>
        {/* <div className="">
        <Image
          src="/fortnite_v2.png"
          width={400}
          height={300}
          alt="image"
          className="mx-auto px-8 py-2"
          priority
        ></Image>
        <h1 className="px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
          Complete Two{" "}
          <span className="bg-gradient-to-b from-gray-500 via-indigo-700 to-gray-800 bg-clip-text text-transparent">
            Quick And Easy Steps
          </span>{" "}
          To Receive Reward Access
        </h1>
      </div> */}
      </div>
      <div className="flex w-full flex-col gap-4 p-4 md:flex-nowrap">
        {session ? (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, ease: "easeOut", duration: 0.2 }}
            >
              <h1 className="my-2 px-2 text-center text-2xl font-bold leading-tight tracking-tight text-neutral-800">
                Check your progress
              </h1>
              <p>
                Signed in as{" "}
                <span className="font-semibold text-blue-700">
                  {session.user.username}
                </span>
              </p>
              <Link href="/step-2-play">
                <Button
                  className="my-4 h-16 w-full rounded-full bg-black text-lg font-bold"
                  variant="default"
                >
                  Continue
                </Button>
              </Link>

              <div className="text-center">
                <Button variant="link" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div>
            <h1 className="leading-tighter my-2 bg-gradient-to-r from-indigo-950 to-indigo-600 bg-clip-text pb-2 text-center text-2xl font-bold tracking-tight text-transparent">
              Enter epic username
            </h1>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <Select disabled={isButtonDisabled}>
                <SelectTrigger className="border-1 hidden h-14 w-full justify-center rounded-sm border-neutral-300 px-4 text-lg font-bold text-neutral-900 placeholder-neutral-800 shadow">
                  <SelectValue
                    placeholder="Choose your device"
                    className="text-center"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mo">Mobile</SelectItem>
                  <SelectItem value="pc">PC/Mac</SelectItem>
                  <SelectItem value="ps">Playstation</SelectItem>
                  <SelectItem value="ns">Nintendo Switch</SelectItem>
                  <SelectItem value="xb">Xbox</SelectItem>
                </SelectContent>
              </Select>
              <Input
                name="username"
                required
                ref={inputRef}
                onChange={handleInputChange}
                value={username}
                type="text"
                disabled={isInputDisabled}
                id="username"
                placeholder="joshcanoel"
                autoFocus
                className="border-1 h-14 w-full rounded-sm border-neutral-300 bg-white text-center text-lg font-bold text-neutral-900 placeholder-gray-100 placeholder-opacity-100 shadow"
              ></Input>

              {isLoading ? (
                <>
                  <Button
                    className="h-14 w-full bg-black text-lg font-bold"
                    variant="default"
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="h-14 w-full bg-yellow-400 text-lg font-bold text-gray-900 hover:text-white"
                    variant="default"
                    disabled={isButtonDisabled}
                  >
                    Continue <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-center text-xs text-white">
                    We will never ask for your password.
                  </p>
                </>
              )}
            </form>
          </div>
        )}
        {message && <p className="text-center text-green-700">{message}</p>}
      </div>
    </div>
  );
}
