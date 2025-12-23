"use client";

import { useState, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 bottom-8 right-8"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-12 h-12 transition-shadow rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 group"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
