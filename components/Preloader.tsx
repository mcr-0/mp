"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PreloaderTwo() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loaderVariants = {
    start: { opacity: 1 },
    end: { opacity: 0, transition: { duration: 0.5 } },
  };

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        handleAnimationComplete();
      }, 500); // give some time to read "100" before fading out
    }
  }, [progress]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // more pronounced pop effect
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="custom-bg-image relative h-80 w-full rounded-xl">
      <div className="flex h-full w-full items-center justify-center">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial="visible"
              animate={progress === 100 ? "end" : "visible"}
              variants={loaderVariants}
              className="absolute z-50 flex h-full w-full items-center justify-center bg-white"
            >
              <div className="text-center text-xl font-bold text-neutral-400">
                {progress}%
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="mx-auto w-full items-center"
            >
              <div className="mx-auto w-full max-w-xs rounded-lg bg-white p-4 shadow-md duration-300 hover:scale-[1.04] hover:cursor-pointer">
                <div className="h-52 overflow-hidden rounded-t-lg bg-gray-100 hover:cursor-pointer" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
