"use client";

import { motion } from "framer-motion";

import Navigation from "@/components/navigation";


import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrollToTop";

import ScrollProgress from "@/components/scrollProgress";

import ImageRing from "@/components/imageRing";
import Home from "@/components/home";


export default function HomePage() {
  return (
    <motion.div
      className="min-h-screen bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >

      <ScrollProgress />
      <Navigation />

      <Home />


      <Footer />
      <ScrollToTop />


    </motion.div>
  );
}
