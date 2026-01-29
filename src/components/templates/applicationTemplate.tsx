"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ApplicationData } from "@/data/applicationsData";

export default function ApplicationTemplate({ data }: { data: ApplicationData }) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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
                            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
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
                <div id="main-content" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                {data.introduction.title}
                            </h2>
                            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                                {data.introduction.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-xl aspect-square lg:mt-20">
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

                {/* CUSTOMER SUCCESS */}
                <section className="bg-gradient-to-b from-white to-gray-50 py-28 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {data.customerSuccess.title}
                            </h2>
                            <p className="mt-4 text-gray-600 text-lg">
                                {data.customerSuccess.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {data.customerSuccess.cards.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 text-center"
                                >
                                    <div className="relative w-[140px] h-[70px] mx-auto mb-6">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* VIDEO SECTION */}
                <section className="py-24 bg-white px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
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
            </main>

            <Footer />
        </>
    );
}
