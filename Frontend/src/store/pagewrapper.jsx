// // PageWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.97,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ height: "100%", overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
