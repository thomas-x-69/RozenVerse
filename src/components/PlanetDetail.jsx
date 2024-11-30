import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarryBackground from "./StarryBackground";
import LOGO from "../assets/LOGO.png";

const PlanetDetail = ({ allItems }) => {
  const { id } = useParams();
  const item = allItems.find((item) => item.name === id);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="min-h-screen text-white relative">
      <StarryBackground className="scale-[0.5]" />
      <div className="relative z-10">
        <header className="flex justify-between items-center p-4 ">
          <Link to="/">
            <img src={LOGO} alt="Rozen Verse" className="h-10" />
          </Link>
          <nav></nav>
          <button className="bg-white text-black px-6 py-2 rounded-[12px]">
            Explore
          </button>
        </header>

        <main className="container mx-auto px-20 py-10">
          <motion.div
            className="bg-gray-600 bg-opacity-50 backdrop-blur-[.5px] rounded-3xl p-8 shadow-lg py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
              <motion.div
                className="md:w-[25rem] mr-20"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <motion.img
                  src={item.img}
                  alt={item.name}
                  className="w-full rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>

              <motion.div
                className="md:w-1/2 space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-6xl font-bold mb-8 text-white"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {item.name}
                </motion.h1>
                <motion.p
                  className="text-xl max-w-2xl mb-4 bg-white bg-opacity-20 rounded-xl p-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {item.description}
                </motion.p>
                <motion.p
                  className="text-lg bg-white bg-opacity-20 rounded-xl p-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  {item.detailText}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default PlanetDetail;
