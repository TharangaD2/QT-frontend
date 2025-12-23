import { motion,useScroll,useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./button";

export default function BusinessOneHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex items-center justify-center  overflow-hidden ">
      {/* Animated Background Shapes with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden  bg-business-one bg-cover bg-center bg-no-repeat">
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
          className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
        >
          {" "}
          <span className="text-transparent text-white bg-clip-text">
            SAP Business One
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-muted-foreground text-balance text-white"
        >
          Discover a single, affordable ERP solution for managing your entire company.
        </motion.p>


      </motion.div>
    </section>
  );
}
