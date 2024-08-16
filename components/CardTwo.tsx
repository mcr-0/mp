/**
 * Card Two
 * Created by Sillyui.com
 * Please check the license at https://www.sillyui.com/important/license
 * before using it commercially.
 */

"use client";

import { motion } from "framer-motion";
// Interface defining the properties for the Card component
interface CardProps {
  id: number; // Identifier for the card
  rotate: number; // Initial rotation of the card in degrees
  xOffset: number; // Horizontal offset multiplier for positioning
  offer_name: string; // Title for the card
}

// Card component accepting props defined in CardProps interface
const Card = ({ id, rotate, xOffset }: CardProps) => {
  return (
    <motion.div
      className="h-72 w-60 cursor-pointer rounded-lg border-2 bg-white p-4 shadow-lg hover:border-gray-400"
      initial={{ y: -100, opacity: 0, rotate: rotate, x: xOffset * id }} // Start state with vertical offset, transparency, rotation and horizontal offset
      animate={{ y: 0, opacity: 1 }} // Animate to visible at initial vertical position
      whileHover={{ y: -20, rotate: 0, zIndex: 10 }} // Effects when hovered: lift up, rotate to 0, increase z-index
      transition={{
        type: "spring", // Use spring physics for animation
        stiffness: 300, // Spring stiffness, controls how rigid the spring is
        damping: 15, // Damping, controls how oscillations slow down
      }}
      style={{ zIndex: id }} // Inline style to control stacking order based on the id
    >
      {/* <div className="mb-4 h-32 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer" /> */}
      <img
        src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/01/00bcfa0319c7e24446f9ddaaeb57f15e.jpg"
        className="h-32 rounded-xl"
      />
      <a href="#">
        <h5 className="mb-2 mt-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          PlayStation $500
        </h5>
      </a>
      <p className="mb-3 text-xs font-normal text-gray-700 dark:text-gray-400">
        *UPON COMPLETION OF PURCHASE & PROGRAM REQUIREMENTS.
      </p>
      <a
        href="https://rewarduplevel.com/aff_c?offer_id=176&aff_id=9484&source=mp"
        className="inline-flex items-center rounded-lg text-center text-lg font-medium text-gray-800"
      >
        Claim
        <svg
          className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </motion.div>
  );
};

// Component rendering a collection of cards
const CardTwo = () => {
  const rotationDegrees = [-10, -5, 5, 10]; // Define rotation degrees for each card
  const xOffset = 0; // Define a base x-offset for card positioning
  const offer_name = "Playstation Bonus $500"; // Define titles for each card
  // const offer_url = [
  //   "https://rewarduplevel.com/aff_c?offer_id=176&aff_id=9484&source=mp",
  // ]; // Define titles for each card

  return (
    <div className="custom-bg-image flex items-center justify-center">
      <div className="m-10 flex flex-col px-16 sm:w-full sm:flex-col md:flex-row">
        {[...Array(1)].map((_, index) => (
          <Card
            key={index} // Unique key for React's rendering optimization
            id={4 - index} // ID passed in descending order to stack cards
            rotate={rotationDegrees[index]} // Apply specific rotation from the array
            xOffset={xOffset} // Apply horizontal offset
            offer_name={offer_name[index]} // Pass the title for each card
          />
        ))}
      </div>
    </div>
  );
};

export default CardTwo; // Export CardTwo as the default export of the module
