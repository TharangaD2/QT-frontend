"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ApplicationData } from "@/data/applicationsData";



const ReadMore = ({ text, limit = 150 }: { text: string; limit?: number }) => {
    const [isReadMore, setIsReadMore] = useState(true);
    if (!text) return null;

    return (
        <>
            {/* Desktop: Show full text */}
            <span className="hidden md:inline">{text}</span>

            {/* Mobile: Truncated text with toggle */}
            <span className="md:hidden">
                {text.length <= limit ? (
                    text
                ) : (
                    <>
                        {isReadMore ? text.slice(0, limit) + "..." : text}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsReadMore(!isReadMore);
                            }}
                            className="ml-1 text-primary font-bold hover:underline focus:outline-none"
                        >
                            {isReadMore ? "Read More" : "Read Less"}
                        </button>
                    </>
                )}
            </span>
        </>
    );
};

export default function ApplicationTemplate({ data }: { data: ApplicationData }) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Navigation isDarkBg={true} />

            <main className="w-full overflow-hidden">
                {/* HERO SECTION */}
                <section ref={sectionRef} className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
                    {data.hero.heroImage ? (
                        <Image
                            src={data.hero.heroImage}
                            alt={data.hero.title}
                            fill
                            className="object-cover opacity-40"
                            priority
                            unoptimized
                        />
                    ) : (
                        <div className={`absolute inset-0 ${data.hero.bgClass} bg-cover bg-center bg-no-repeat opacity-40`} />
                    )}

                    <div className="relative z-10 max-w-5xl px-6 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-[10px] md:text-sm tracking-widest uppercase text-gray-300 mb-3"
                        >
                            Advanced Solutions
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                        >
                            {data.hero.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-3xl mx-auto mt-6 text-sm md:text-xl text-white/90"
                        >
                            <ReadMore text={data.hero.description} limit={120} />
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-[#EC9E35] hover:text-white transition"
                            onClick={() => {
                                const mainContent = document.getElementById("main-content");
                                if (mainContent) {
                                    mainContent.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </section>

                {/* INTRODUCTION & FEATURES */}
                <div id="main-content" className="py-16 md:py-24 px-6 text-gray-800">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {data.introduction.title}
                            </h2>
                            <div className="max-w-3xl mx-auto text-gray-600 text-xs md:text-lg leading-relaxed">
                                <ReadMore text={data.introduction.description} limit={150} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="relative w-full max-w-xl aspect-square">
                                    <Image
                                        src={data.mainContent.image}
                                        alt={data.introduction.title}
                                        fill
                                        className="object-contain"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="text-gray-700 mb-10 leading-relaxed text-sm md:text-lg">
                                    <ReadMore text={data.mainContent.text} limit={200} />
                                </div>

                                <div className="space-y-6 mb-10">
                                    {data.mainContent.features.map((feature, index) => {
                                        const isExpanded = expandedIndex === index;

                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="border-b border-gray-200 pb-6"
                                            >
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className="w-full flex justify-between items-start text-left"
                                                >
                                                    <div>
                                                        <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
                                                            {feature.title}
                                                        </h3>
                                                    </div>
                                                    <motion.span
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="mt-2"
                                                    >
                                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                                    </motion.span>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-8 space-y-6">
                                                                <p className="text-xs md:text-base text-gray-600 max-w-xl">
                                                                    {feature.description}
                                                                </p>
                                                                {feature.subFeatures.map((sub, i) => (
                                                                    <div key={i}>
                                                                        <h4 className="text-sm md:text-lg font-semibold text-gray-900">
                                                                            {sub.title}
                                                                        </h4>
                                                                        <p className="mt-1 text-xs md:text-base text-gray-600 leading-relaxed max-w-xl">
                                                                            {sub.description}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {data.pdfLink && (
                                    <motion.a
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        href={data.pdfLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-primary hover:bg-primary/90 transition text-white font-medium px-8 py-3 rounded-md shadow-md text-sm md:text-base"
                                    >
                                        {data.pdfLink.text}
                                    </motion.a>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* VIDEO SECTION */}
                <section className="py-16 md:py-24 bg-white px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="text-center mb-14">
                            <h2 className="text-xl md:text-4xl font-bold text-gray-900">
                                {data.video.title}
                            </h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl"
                        >
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${data.video.youtubeId}`}
                                title={data.video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                </section>

                {/* TAB SECTION */}
                {data.tabSection && (
                    <section className="py-16 md:py-24 bg-gray-50 px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-7xl mx-auto"
                        >
                            {/* Tab Navigation */}
                            <div className="flex overflow-x-auto scrollbar-hide gap-8 sm:gap-12 md:justify-center mb-16 pb-2 border-b border-gray-100">
                                {data.tabSection.tabs.map((tab, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setActiveTab(index)}
                                        onMouseEnter={() => { }} // Just to trigger hover states if needed
                                        initial="initial"
                                        whileHover="hover"
                                        className={`relative pb-4 text-xs md:text-lg tracking-widest transition-colors duration-300 whitespace-nowrap flex items-center ${activeTab === index
                                            ? "text-primary font-bold"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        <span className="flex items-center">
                                            <span>{tab.label.split(' ')[0]}</span>
                                            <motion.span
                                                variants={{
                                                    initial: { width: 0, opacity: 0, marginLeft: 0 },
                                                    hover: { width: "auto", opacity: 1, marginLeft: 4 }
                                                }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="overflow-hidden whitespace-nowrap"
                                            >
                                                {tab.label.split(' ').slice(1).join(' ')}
                                            </motion.span>
                                        </span>
                                        {activeTab === index && (
                                            <motion.div
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="w-full"
                                >
                                    {data.tabSection.tabs[activeTab].cards && data.tabSection.tabs[activeTab].cards!.length > 0 ? (
                                        /* Marquee Cards Layout */
                                        <div className="relative overflow-hidden py-10">
                                            <motion.div
                                                className="flex gap-4 md:gap-6"
                                                animate={{
                                                    x: [0, -1 * data.tabSection.tabs[activeTab].cards!.length * (324)], // 324 is approximate width + gap
                                                }}
                                                transition={{
                                                    x: {
                                                        repeat: Infinity,
                                                        repeatType: "loop",
                                                        duration: 30, // Slower duration for better readability
                                                        ease: "linear",
                                                    },
                                                }}
                                                drag="x" // Enable drag for manual exploration
                                                dragConstraints={{ left: -1 * data.tabSection.tabs[activeTab].cards!.length * 324, right: 0 }}
                                            >
                                                {[...data.tabSection.tabs[activeTab].cards!, ...data.tabSection.tabs[activeTab].cards!].map((card, cardIndex) => (
                                                    <motion.div
                                                        key={cardIndex}
                                                        className="flex-shrink-0 w-[260px] md:w-[300px] bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                                                    >
                                                        {card.icon && (
                                                            <div className="relative w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                                                                <Image
                                                                    src={card.icon}
                                                                    alt={card.title}
                                                                    fill
                                                                    className="object-contain"
                                                                    unoptimized
                                                                />
                                                            </div>
                                                        )}
                                                        <h4 className="text-xs md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-primary transition-colors">
                                                            {card.title}
                                                        </h4>
                                                        <div className="text-[10px] md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
                                                            <ReadMore text={card.text} limit={50} />
                                                        </div>
                                                        {card.buttonText && card.buttonLink && (
                                                            <a
                                                                href={card.buttonLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-primary text-[10px] md:text-sm font-semibold hover:gap-2 transition-all"
                                                            >
                                                                {card.buttonText}
                                                                <span className="ml-1">→</span>
                                                            </a>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    ) : (
                                        /* Default Image/Text Layout */
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                            {/* Image */}
                                            {data.tabSection.tabs[activeTab].image && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="relative w-full h-[200px] md:h-[400px]"
                                                >
                                                    <Image
                                                        src={data.tabSection.tabs[activeTab].image!}
                                                        alt={data.tabSection.tabs[activeTab].title}
                                                        fill
                                                        className="object-contain p-4"
                                                        unoptimized
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Text Content */}
                                            <div className="">
                                                <motion.h3
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="text-xl md:text-4xl font-bold text-gray-900 mb-6"
                                                >
                                                    {data.tabSection.tabs[activeTab].title}
                                                </motion.h3>

                                                <div className="text-gray-600 text-sm md:text-xl leading-relaxed mb-8">
                                                    <ReadMore text={data.tabSection.tabs[activeTab].description} limit={150} />
                                                </div>

                                                {data.tabSection.tabs[activeTab].buttonText && (
                                                    <motion.a
                                                        href={data.tabSection.tabs[activeTab].buttonLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="inline-block bg-primary hover:bg-primary/90 transition text-white text-xs md:text-base font-medium px-8 py-3 rounded-md shadow-md uppercase tracking-wider"
                                                    >
                                                        {data.tabSection.tabs[activeTab].buttonText}
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </section>
                )}

                {/* QUICK CONTACT SECTION */}
                <section className="py-16 md:py-24 bg-white px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Text Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:pr-10"
                        >
                            <h4 className="text-sm md:text-xl font-bold mb-6 text-gray-900">{data.quickContact?.tag || "Reach Us"}</h4>
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">{data.quickContact?.title || "Quick Contact"}</h2>
                            <div className="text-gray-700 text-xs md:text-lg mb-8 leading-relaxed">
                                <ReadMore text={data.quickContact?.para || "Call our hotline for a quick inquiry. If you can wait, send us a message here. We will get back to you within 3 working days. Schedule a call for an online meeting appointment."} limit={150} />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-md bg-primary text-white text-sm md:text-base font-semibold hover:bg-primary/90 transition shadow-lg"
                                onClick={() => {
                                    // Navigate to contact or handle action
                                    window.location.href = data.quickContact?.btnLink || "/contact";
                                }}
                            >
                                {data.quickContact?.btnText}
                            </motion.button>
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full h-[200px] lg:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-gray-100"
                        >
                            <iframe
                                title="Office Location"
                                src={data.locationUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1751683141873!2d55.23054007500027!3d25.123540883887027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433dcb9cb5b7%3A0x9b3a2fdbb9f2b2d0!2sAl%20Quoz%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2sus!4v1670000000000!5m2!1sen!2sus"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                </section>





            </main>

            <Footer />
        </>
    );
}
