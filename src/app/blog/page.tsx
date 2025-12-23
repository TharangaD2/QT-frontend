"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useState,useRef } from "react";
interface CaseStudy {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    title: "Zoho",
    category: "E-Commerce",
    description:
      "Built a scalable marketplace handling 10M+ transactions monthly with AI-powered recommendations.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
    tags: ["React", "AWS", "AI/ML"],
  },
  {
    title: "Artificial Intelligent (AI)",
    category: "Healthcare",
    description:
      "HIPAA-compliant platform streamlining patient care across 50+ clinics with real-time data sync.",
    image:
      "/img/AI.jpg",
    tags: ["Node.js", "PostgreSQL", "Security"],
  },
  {
    title: "Microsoft",
    category: "Finance",
    description:
      "Award-winning mobile banking app with biometric authentication and instant payments.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    tags: ["React Native", "Blockchain", "Security"],
  },
  {
    title: "SAP",
    category: "Analytics",
    description:
      "Real-time business intelligence platform processing 1TB+ data daily with predictive insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tags: ["Python", "TensorFlow", "Data Science"],
  },
  
];

export default function BlogPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ref = useRef(null);



  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
   <main className="w-full overflow-hidden">
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-24 overflow-hidden"
    >
       <Navigation/>
         <section ref={ref} id="home" className="relative flex items-center justify-center  overflow-hidden ">
      {/* Animated Background Shapes with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden  bg-blog bg-cover bg-center bg-no-repeat">
        <motion.div
          className="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full top-40 right-20 w-96 h-96 bg-accent/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bottom-20 left-1/3 w-72 h-72 bg-primary/8 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6  font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
        >
          {" "}
          <span className="text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-white">
            The Blog
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-10 lg:text-lg md:text-xl text-muted-foreground text-balance text-white"
        >
          Here, we share the latest insights on digital marketing, CRM solutions, AI tools, and technology strategies tailored 
          for businesses. Stay ahead with expert tips, case studies, and market trends.
        </motion.p>

        

      
      </motion.div>
    </section>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
     
      <div className="container relative z-10 mx-auto mt-20">
        

        {/* Masonry Grid */}
        <div className="grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-2 max-w-7xl">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="cursor-pointer group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Background image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[oklch(0.12_0.02_240)] via-[oklch(0.12_0.02_240)]/80 to-transparent" />
                </motion.div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Category badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0.8,
                      y: hoveredIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block px-3 py-1 text-xs font-semibold border rounded-full bg-primary/20 backdrop-blur-sm border-primary/30 text-primary">
                      {study.category}
                    </span>
                  </motion.div>

                  {/* Title + Description */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: hoveredIndex === index ? 0 : 20,
                      opacity: hoveredIndex === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                      {study.title}

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          x: hoveredIndex === index ? 0 : -10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.div>
                    </h3>

                    <p className="text-sm text-white/80">{study.description}</p>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-white/10 backdrop-blur-sm text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Hover Border Glow */}
                <motion.div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 195 / 0.3), oklch(0.55 0.15 200 / 0.3))",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </main>
  );
}
