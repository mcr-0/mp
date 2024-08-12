import Link from "next/link";
export default function GoogleAds() {
  return (
    <div className="bg-white">
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
                    It was very simple, just had to download and use free apps!
                    THX!
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
              We are not affiliated with any of the games or companies shown on
              this website. Use of any logos or trademarks are for reference
              purposes only. By using the website, you agree to our
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
    </div>
  );
}
