import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MazedPromos - Get Access To Deals And Promos",
  description: "Play Games And Get Access to Over 30+ Deals And Promos",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11255487453"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11255487453');
            `,
          }}
        />
        <Script
          id="gtag-report-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-11255487453/QIz6CJWVvccZEN23hPcp',
                    'event_callback': callback
                });
                return false;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.sa_event = function(eventName) {
                  console.log('Event:', eventName);
                };
              `,
          }}
        />
      </head>
      <body className={`${inter.className} `}>
        <div className="relative isolate min-h-screen overflow-hidden bg-black px-4">
          <Image
            src="/blue-bg.png"
            alt="Background Image"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-80"
            width={1907}
            height={877}
            priority
          ></Image>

          <div className="fixed bottom-0 left-0 right-0 z-10 h-20 w-full"></div>
          <header className="mx-auto py-1 text-center sm:px-6 lg:px-8">
            <Link href="/" className="mx-auto block w-16 shadow-xl">
              <Image
                src="/logo.jpg"
                height={400}
                width={600}
                alt="logo"
                className="h-full w-full rounded-md object-cover"
                priority
              ></Image>
            </Link>
            <div className="flex items-center justify-center space-x-2 text-center text-xl text-white">
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
                  stroke-width="1.5"
                />
              </svg>
            </div>

            <h1 className="bg-gradient-to-r from-black to-blue-700 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
              Get Access ^{" "}
            </h1>
            <h1 className="bg-gradient-to-r from-black to-blue-600 bg-clip-text text-xl font-bold leading-8 tracking-tighter text-transparent">
              <span className="">To Deals And Promos Now!</span>
            </h1>

            <p className="mt-0 text-xs font-semibold uppercase text-neutral-200">
              ^Upon completion two steps
            </p>
          </header>
          <div className="relative p-4">
            <div className="isolate mx-auto w-full max-w-sm items-center justify-center rounded-3xl bg-white/70 p-2 shadow-lg ring-1 ring-black/5 backdrop-blur-md">
              {children}
            </div>
          </div>

          <p className="mx-auto max-w-sm px-4 pb-20 text-center text-xs text-neutral-200">
            We are not affiliated with any of the games or companies shown on
            this website. Use of any logos or trademarks are for reference
            purposes only. By using the website, you agree to our{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-neutral-300 underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="text-neutral-300 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <section className="reviews bg-gray-200 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Reviews</h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                What our customers are saying about us
              </p>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-900">
                        Frank Gammon
                      </h4>
                      <p className="text-gray-500">May 20, 2024</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-600">
                      This is amazing!! 🥳 I tried it yesterday and actually got
                      my reward, thank you so much!
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-900">
                        Adam Edwards
                      </h4>
                      <p className="text-gray-500">April 18, 2024</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-600">
                      I just saw an ad and decided to try it out to make a
                      surprise for my brother! Is it for real?
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h4 className="text-xl font-bold text-gray-900">
                        Alice Johnson
                      </h4>
                      <p className="text-gray-500">March 15, 2024</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.12c.969 0 1.371 1.24.588 1.81l-3.335 2.42a1 1 0 00-.363 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.335-2.42a1 1 0 00-1.175 0l-3.335 2.42c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.363-1.118L2.107 9.373c-.783-.57-.381-1.81.588-1.81h4.12a1 1 0 00.95-.69l1.286-3.946z"></path>
                      </svg>
                    </div>
                    <p className="mt-2 text-gray-600">
                      It was very simple, just had to download and use free
                      apps! THX!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="how-does-it-work mx-auto mb-8 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 mt-10 text-center text-3xl font-extrabold text-gray-900">
            How does it work?
          </h1>
          <div className="space-y-6">
            <div className="flex items-center rounded-lg bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
                1
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 1: Enter your username
                </h2>
                <p className="mt-2 text-gray-600">
                  After that you will get full instruction how to get access to
                  MazedPromos
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white">
                2
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 2: Follow the Instructions
                </h2>
                <p className="mt-2 text-gray-600">
                  Carefully follow the instructions step by step. Download (2)
                  Apps and use them to unlock the content
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white">
                3
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Step 3: Review and Finish
                </h2>
                <p className="mt-2 text-gray-600">
                  You will be redirected automatically and receive access to
                  MazedPromos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-gray-800 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="text-center text-white md:text-left">
                <h4 className="text-lg font-bold">MazedPromos</h4>
                <p className="mt-1 text-gray-400">2024 MazedPromos.</p>
              </div>

              <p className="line m-4 mx-auto max-w-md py-6 text-justify text-xs text-gray-400">
                We are not affiliated with any of the games or companies shown
                on this website. Use of any logos or trademarks are for
                reference purposes only. By using the website, you agree to our
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-neutral-300 underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-neutral-300 underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </footer>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
