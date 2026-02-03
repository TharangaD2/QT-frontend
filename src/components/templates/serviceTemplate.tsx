"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface TechnologyItem {
  name: string;
  logo: string;
}



export default function ServiceTemplate({ data }: { data: any }) {
  const ref = useRef(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generatedParticles = [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);
  const isInView = useInView(ref, { once: true });
  const duplicated =
    data.technologies && data.technologies.length > 0
      ? [...data.technologies, ...data.technologies]
      : [];

  const techList = data.technologies && data.technologies.length > 0 ? data.technologies : [];

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
      <Navigation isDarkBg={true} />

      <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        {/* HERO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          {data.heroVideo ? (
            <video
              src={data.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          ) : data.heroImage ? (
            <Image
              src={data.heroImage}
              alt={data.heroTitle || "Hero Section"}
              fill
              className="object-cover opacity-40"
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-black opacity-40" />
          )}
        </div>

        {/* Hero Text */}
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-widest uppercase text-gray-300 mb-3"
          >
            {data.heroTag || "Grow your business with us"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {data.heroTitle} <br />
            {data.heroHighlight && (
              <span style={{ color: '#EC9E35' }}>
                {data.heroHighlight}
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-sm md:text-xl lg:text-lg text-gray-200 max-w-3xl mx-auto px-4"
          >
            {data.heroDescription}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-[#EC9E35] hover:text-white transition"
          >
            {data.heroBtnText || "Schedule a Meeting"}
          </motion.button>
        </div>
      </section>

      <section className="px-4 py-24 relative overflow-hidden">

        {/* SECTIONS */}
        {data.sections.map((section: any, i: number) => (
          <div
            key={i}
            className={`container mx-auto my-24 grid md:grid-cols-2 gap-12 lg:ml-20 items-center ${section.imageSide === "left"
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
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 lg:mr-28 ">{section.title}</h2>
              {Array.isArray(section.text)
                ? section.text.map((p: string, idx: number) => (
                  <p key={idx} className="text-sm md:text-xl lg:text-lg leading-relaxed mb-4">{p}</p>
                ))
                : <p className="text-sm md:text-xl lg:text-lg leading-relaxed lg:mr-40">{section.text}</p>}
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
                  className="object-cover"
                  unoptimized
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
            {data.featureTitle || "Why you should Choose Us?"}
          </h2>
        </motion.div>

        {data.featureItems.map((featureItems: any, i: number) => (
          <div
            key={i}
            className={`container mx-auto my-24 grid md:grid-cols-2  items-center lg:ml-32  ${featureItems.imageSide === "left"
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
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6">{featureItems.title}</h2>
              {Array.isArray(featureItems.text)
                ? featureItems.text.map((p: string, idx: number) => (
                  <p key={idx} className="text-sm sm:text-lg md:text-lg leading-relaxed mb-4 ">{p}</p>
                ))
                : <p className="text-sm sm:text-lg md:text-lg leading-relaxed lg:mr-48 ">{featureItems.text}</p>}
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
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
        ))}

        {/* PRODUCTS / TECHNOLOGIES */}
        <div className="container mx-auto mt-32">
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12">
            {data.technologyTitle || "Products we offer"}
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
                  x: [0, -1 * techList.length * (100 + 24)],
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
                    <div className="relative w-[80px] sm:w-[120px] h-[80px] sm:h-[120px] rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, oklch(0.62 0.18 195 / 0.1), transparent 70%)",
                        }}
                      />
                      <motion.div
                        className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 filter group-hover:grayscale-0"
                        whileHover={{ filter: "grayscale(0%)" }}
                      >
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </motion.div>
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
