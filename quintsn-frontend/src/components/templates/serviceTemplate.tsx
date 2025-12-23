"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface TechnologyItem {
  name: string;
  logo: string;
}

const technologies: TechnologyItem[] = [
  { name: "React", logo: "/img/home1.png" },
  { name: "TypeScript", logo: "/img/home2.png" },
  { name: "Node.js", logo: "/img/home3.png" },
  { name: "Python", logo: "/img/home4.png" },
  { name: "AWS", logo: "/img/home5.png" },
  { name: "Docker", logo: "/img/home6.png" },
  { name: "Kubernetes", logo: "/img/home7.png" },
  { name: "TensorFlow", logo: "/img/home8.png" },
  { name: "PostgreSQL", logo: "/img/home9.png" },
];

export default function ServiceTemplate({ data }: { data: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const duplicated = [...technologies, ...technologies];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { margin: "-100px", once: true });

  return (
    <>
      <Navigation />

      <section className="px-4 py-24 min-h-screen relative overflow-hidden">
        <head>
          <title>{data.title}</title>
        </head>
        {/* HERO */}
        <section
      ref={ref}
      className="relative h-[400px]  flex items-center justify-center overflow-hidden mb-24"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 overflow-hidden bg-cover bg-center bg-no-repeat h-[400px] sm:h-[600px]"
        style={{
          backgroundImage: `url(${data.heroImage})`,
          y,
        }}
      >
        {/* Floating shapes */}
        <motion.div
          className="absolute w-40 h-40 sm:w-64 sm:h-64 rounded-full top-20 left-10 bg-primary/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full top-40 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute rounded-full bottom-20 left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-primary/8 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, 20], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Text */}
            {/* Hero Text */}
      <motion.div
        className="relative z-10 px-4 text-center max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}   // ← ALWAYS ANIMATE ON PAGE LOAD
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ opacity }}
      >
        <motion.h1
          className="sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}   // ← FIXED
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {data.heroTitle}
        </motion.h1>

        <motion.p
          className="  md:text-xl lg:text-lg text-white max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}   // ← FIXED
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {data.heroDescription}
        </motion.p>
      </motion.div>

    </section>

        {/* SECTIONS */}
        {data.sections.map((section: any, i: number) => (
          <div
            key={i}
            className={`container mx-auto my-24 grid md:grid-cols-2 gap-12 lg:ml-20 items-center ${
              section.imageSide === "left"
                ? "md:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className=" sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 lg:mr-28 ">{section.title}</h2>
              {Array.isArray(section.text)
                ? section.text.map((p: string, idx: number) => (
                    <p key={idx} className="  md:text-xl lg:text-lg leading-relaxed mb-4 text-justify">{p}</p>
                  ))
                : <p className="md:text-xl lg:text-lg leading-relaxed text-justify lg:mr-40">{section.text}</p>}
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:mr-40"
            >
              <div className="w-full relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] sm:aspect-[4/3] ">
                <Image
                  src={section.image}
                  fill
                  alt={section.title}
                  className="object-cover w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                />
              </div>
            </motion.div>
          </div>
        ))}

        {/* FEATURES */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Why you should Choose Us?
          </h2>
        </motion.div>

        {data.featureItems.map((featureItems: any, i: number) => (
          <div
            key={i}
            className={`container mx-auto my-24 grid md:grid-cols-2  items-center lg:ml-32  ${
              featureItems.imageSide === "left"
                ? "md:[&>div:first-child]:order-2"
                : ""
            }`}
          >
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6">{featureItems.title}</h2>
              {Array.isArray(featureItems.text)
                ? featureItems.text.map((p: string, idx: number) => (
                    <p key={idx} className="text-base sm:text-lg md:text-lg leading-relaxed mb-4 ">{p}</p>
                  ))
                : <p className="text-base sm:text-lg md:text-lg leading-relaxed text-justify lg:mr-48 ">{featureItems.text}</p>}
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:mr-48"
            >
              <div className="w-full relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9] sm:aspect-[4/3]">
                <Image
                  src={featureItems.image}
                  fill
                  alt={featureItems.title}
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        ))}

        {/* PRODUCTS / TECHNOLOGIES */}
        <div className="container mx-auto mt-32">
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold mb-12">
            Products we offer
          </h2>

          {/* Auto-scrolling carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute top-0 bottom-0 left-0 z-10 w-20 sm:w-32 bg-linear-to-r from-background to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 z-10 w-20 sm:w-32 bg-linear-to-l from-background to-transparent" />

            <div className="py-8 overflow-hidden">
              <motion.div
                className="flex gap-6 sm:gap-12"
                animate={{
                  x: [0, -1 * technologies.length * (100 + 24)],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {duplicated.map((tech, idx) => (
                  <motion.div
                    key={`${tech.name}-${idx}`}
                    className="flex-shrink-0 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, oklch(0.62 0.18 195 / 0.1), transparent 70%)",
                        }}
                      />
                      <motion.img
                        src={tech.logo}
                        alt={tech.name}
                        className="relative z-10 object-contain w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 filter group-hover:grayscale-0"
                        whileHover={{ filter: "grayscale(0%)" }}
                      />
                      <motion.div
                        className="absolute left-0 right-0 text-center transition-opacity duration-300 opacity-0 bottom-2 group-hover:opacity-100"
                        initial={{ y: 10 }}
                        whileHover={{ y: 0 }}
                      >
                        <span className="text-xs sm:text-sm font-semibold bg-linear-to-r from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent">
                          {tech.name}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
