import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Moon, Sun, Rocket } from "lucide-react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about-us");
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about-us"
      className="relative py-20 overflow-hidden bg-gray-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path/to/space-bg.jpg')] bg-cover bg-center opacity-20"></div>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.1, scale: 0 }}
            animate={{ opacity: [0.1, 1, 0.1], scale: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-12"
          variants={itemVariants}
        >
          About Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="inline-block p-4 bg-blue-500 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Star size={48} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Mission
            </h3>
            <p className="text-gray-300">
              To inspire curiosity and foster understanding of our vast universe
              through immersive digital experiences.
            </p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="inline-block p-4 bg-purple-500 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Moon size={48} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To become the leading platform for space education and
              exploration, making the cosmos accessible to everyone.
            </p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="inline-block p-4 bg-orange-500 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sun size={48} className="text-white" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Values
            </h3>
            <p className="text-gray-300">
              Curiosity, Innovation, Accuracy, and Wonder guide our journey
              through the stars.
            </p>
          </motion.div>
        </div>
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-3xl font-semibold text-white mb-4">
            Join Us on Our Cosmic Journey
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Embark on an interstellar adventure and discover the wonders of our
            universe.
          </p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">Explore Now</span>
            <Rocket className="inline-block" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
