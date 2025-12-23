"use client";

import { useState, useRef } from "react";
import { motion,useScroll,useTransform,AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What types of projects does Quintessential Technologies specialize in?",
    answer:
      "We specialize in enterprise software development, AI/ML integration, cloud solutions, mobile applications, and digital transformation initiatives. Our expertise spans healthcare, finance, e-commerce, and IoT sectors.",
  },
  {
    question: "How long does a typical project take from start to finish?",
    answer:
      "Project timelines vary based on scope and complexity. A typical MVP can be delivered in 8-12 weeks, while enterprise solutions may take 6-12 months. We follow agile methodologies to ensure continuous delivery and feedback.",
  },
  {
    question: "What is your development process?",
    answer:
      "We follow an agile development approach with 2-week sprints. This includes discovery workshops, iterative design and development, continuous testing, and regular client reviews. We prioritize transparency and collaboration throughout the entire process.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. We provide flexible support packages tailored to your needs.",
  },
  {
    question: "How do you ensure project security and data privacy?",
    answer:
      "Security is built into every layer of our solutions. We implement industry-standard encryption, conduct regular security audits, follow OWASP guidelines, and ensure compliance with regulations like GDPR, HIPAA, and SOC 2.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Absolutely. We have extensive experience integrating with legacy systems, third-party APIs, and various enterprise platforms. We conduct thorough analysis to ensure seamless integration without disrupting your operations.",
  },
  {
    question: "What makes Quintessential Technologies different from other firms?",
    answer:
      "Our unique combination of technical excellence, industry expertise, and commitment to quality sets us apart. We focus on understanding your business goals, not just writing code. Our team brings deep domain knowledge and a track record of delivering measurable results.",
  },
  {
    question: "Do you work with startups or only established enterprises?",
    answer:
      "We work with organizations of all sizes, from early-stage startups to Fortune 500 companies. We offer tailored engagement models and pricing structures to match your stage of growth and budget.",
  },
];

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-24 overflow-hidden"
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-white ]"
        style={{ y: backgroundY }}
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.62 0.18 195) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.62 0.18 195) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] mb-6 shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <HelpCircle className="w-8 h-8 text-white" />
          </motion.div>

          <span className="block text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent mb-4">
            Got Questions?
          </span>

          <h2 className="text-4xl font-bold tracking-tight  md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-lg ">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`relative rounded-2xl bg-card/50 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? "border-primary/50 shadow-xl shadow-primary/10"
                      : "border-border/50 shadow-lg hover:border-primary/30"
                  }`}
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, oklch(0.62 0.18 195 / 0.05), transparent 70%)",
                    }}
                  />

                  {/* Question */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="relative z-10 flex items-start justify-between w-full gap-4 p-6 text-left cursor-pointer md:p-8"
                  >
                    <h3
                      className={`text-lg md:text-xl font-semibold transition-all duration-300 ${
                        isExpanded
                          ? "bg-gradient-to-r from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] bg-clip-text text-transparent"
                          : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {faq.question}
                    </h3>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isExpanded
                          ? "bg-gradient-to-br from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] shadow-lg"
                          : "bg-muted group-hover:bg-muted/80"
                      }`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 ${
                          isExpanded ? "text-white" : "text-foreground"
                        }`}
                      />
                    </motion.div>
                  </button>

                  {/* Expandable answer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="px-6 pb-6 md:px-8 md:pb-8"
                        >
                          <p className="leading-relaxed text-foreground/80">
                            {faq.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isExpanded && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      className="h-1 bg-gradient-to-r from-transparent via-[oklch(0.62_0.18_195)] to-transparent"
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 ">Still have questions?</p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] text-white font-semibold shadow-xl"
          >
           <a href="/contact"> Get in Touch</a>
          </motion.button>
          
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
