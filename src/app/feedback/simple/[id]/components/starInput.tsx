"use client"
import { Star } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const StartInput = ({rating, setRating}: any) => {

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
  return (
    
    <div className="w-[100%] flex justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none mx-[0.15rem]"
          >
            <Star
              size={48}
              weight={star <= rating ? "fill" : "regular"}
              className={` ${
                star <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-zinc-300"
              }`}
            />
          </motion.button>
        ))}
      </div>
  );
};

export default StartInput;
