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
      <body
        className={`${inter.className} relative -z-20 h-full w-full bg-black bg-gradient-to-r from-neutral-900 via-blue-800 to-neutral-900`}
      >
        <div className="fixed bottom-0 left-0 right-0 -z-10 h-full w-full object-cover object-center opacity-50">
          <Image
            src="/blue-bg.png"
            alt="Background Image"
            className="h-full w-full object-cover opacity-100"
            width={1907}
            height={877}
            priority
          ></Image>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-10 h-20 w-full bg-gradient-to-t from-black to-black/0"></div>
        <header className="mx-auto bg-gradient-to-b from-black to-black/0 py-1 text-center sm:px-6 lg:px-8">
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
              {/* <span className="animate-pulse">Status: </span> */}
              <span className="animate-pulse text-orange-400">
                Limited spots available
              </span>
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

          <h1 className="bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-5xl font-black tracking-tighter text-transparent">
            Get Access ^{" "}
          </h1>
          <h1 className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-xl font-bold leading-8 tracking-tighter text-transparent">
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
        <p className="mx-auto max-w-sm px-4 pb-20 text-center text-xs text-neutral-400">
          We are not affiliated with any of the games or companies shown on this
          website. Use of any logos or trademarks are for reference purposes
          only. By using the website, you agree to our{" "}
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
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
