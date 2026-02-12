"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ApplicationData } from "@/data/applicationsData";



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
                            className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                        >
                            Advanced Solutions
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                        >
                            {data.hero.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-3xl mx-auto mt-6 text-lg sm:text-xl text-white/90"
                        >
                            {data.hero.description}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
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
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {data.introduction.title}
                            </h2>
                            <p className="max-w-3xl mx-auto text-gray-600 text-sm md:text-lg leading-relaxed">
                                {data.introduction.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
                            <div>
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
                            </div>

                            <div>
                                <p className="text-gray-700 mb-10 leading-relaxed text-lg">
                                    {data.mainContent.text}
                                </p>

                                <div className="space-y-6 mb-10">
                                    {data.mainContent.features.map((feature, index) => {
                                        const isExpanded = expandedIndex === index;

                                        return (
                                            <div key={index} className="border-b border-gray-200 pb-6">
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className="w-full flex justify-between items-start text-left"
                                                >
                                                    <div>
                                                        <h3 className="text-2xl font-semibold text-gray-900">
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
                                                                <p className="text-gray-600 max-w-xl">
                                                                    {feature.description}
                                                                </p>
                                                                {feature.subFeatures.map((sub, i) => (
                                                                    <div key={i}>
                                                                        <h4 className="text-lg font-semibold text-gray-900">
                                                                            {sub.title}
                                                                        </h4>
                                                                        <p className="mt-1 text-gray-600 leading-relaxed max-w-xl">
                                                                            {sub.description}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>

                                {data.pdfLink && (
                                    <a
                                        href={data.pdfLink.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-primary hover:bg-primary/90 transition text-white font-medium px-8 py-3 rounded-md shadow-md"
                                    >
                                        {data.pdfLink.text}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* VIDEO SECTION */}
                <section className="py-16 md:py-24 bg-white px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                                {data.video.title}
                            </h2>
                        </div>

                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${data.video.youtubeId}`}
                                title={data.video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>

                {/* TAB SECTION */}
                {data.tabSection && (
                    <section className="py-16 md:py-24 bg-gray-50 px-6">
                        <div className="max-w-7xl mx-auto">
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
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center"
                                >
                                    {/* Image */}
                                    {data.tabSection.tabs[activeTab].image && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative w-full h-[300px] md:h-[400px] "
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
                                            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                                        >
                                            {data.tabSection.tabs[activeTab].title}
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8"
                                        >
                                            {data.tabSection.tabs[activeTab].description}
                                        </motion.p>

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
                                                className="inline-block bg-primary hover:bg-primary/90 transition text-white font-medium px-8 py-3 rounded-md shadow-md uppercase tracking-wider"
                                            >
                                                {data.tabSection.tabs[activeTab].buttonText}
                                            </motion.a>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </section>
                )}

                {/* QUICK CONTACT SECTION */}
                <section className="py-16 md:py-24 bg-white px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Section */}
                        <div className="lg:pr-10">
                            <h4 className="text-lg md:text-xl font-bold mb-6 text-gray-900">{data.quickContact?.tag || "Reach Us"}</h4>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">{data.quickContact?.title || "Quick Contact"}</h2>
                            <p className="text-gray-700 text-sm md:text-lg mb-8 leading-relaxed">
                                {data.quickContact?.para || "Call our hotline for a quick inquiry. If you can wait, send us a message here. We will get back to you within 3 working days. Schedule a call for an online meeting appointment."}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition shadow-lg"
                                onClick={() => {
                                    // Navigate to contact or handle action
                                    window.location.href = data.quickContact?.btnLink || "/contact";
                                }}
                            >
                                {data.quickContact?.btnText}
                            </motion.button>
                        </div>

                        {/* Map Section */}
                        <div className="w-full h-[200px] lg:h-[300px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                            <iframe
                                title="Office Location"
                                src={data.locationUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1751683141873!2d55.23054007500027!3d25.123540883887027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433dcb9cb5b7%3A0x9b3a2fdbb9f2b2d0!2sAl%20Quoz%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2sus!4v1670000000000!5m2!1sen!2sus"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </section>





            </main>

            <Footer />
        </>
    );
}
