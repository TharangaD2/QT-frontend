"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface WPImage {
    url: string;
    alt: string;
    title: string;
}

interface WPHeroData {
    hero_title: string;
    hero_para: string;
    hero_image: WPImage;
}

interface WPCardData {
    category: string;
    card_title: string;
    card_desc: string;
    card_image: WPImage;
    link_page: string;
}

interface WPBlogPage {
    acf: {
        blog_hero: WPHeroData[];
        blog_card: WPCardData[];
    };
}

export default function BlogClient({ data }: { data: WPBlogPage }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const hero = data.acf.blog_hero?.[0];
    const cards = data.acf.blog_card || [];

    return (
        <main className="w-full overflow-hidden">
            <Navigation isDarkBg={true} />
            <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
                {hero?.hero_image?.url ? (
                    <Image
                        src={hero.hero_image.url}
                        alt={hero.hero_title || "Hero Background"}
                        fill
                        className="object-cover opacity-40"
                        priority
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 bg-blog bg-cover bg-center bg-no-repeat opacity-40" />
                )}

                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                    >
                        {(hero as any)?.hero_tag || "Insights & Updates"}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        {hero?.hero_title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-3xl mx-auto mt-6 text-lg sm:text-xl text-white/90"
                    >
                        {hero?.hero_para}
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-[#EC9E35] hover:text-white transition"
                        onClick={() => {
                            const caseStudiesSection = document.getElementById("case-studies");
                            if (caseStudiesSection) {
                                caseStudiesSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {(hero as any)?.hero_btn_text || "Explore Blog"}
                    </motion.button>
                </div>
            </section>

            <section id="case-studies" className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

                <div className="container relative z-10 mx-auto mt-20 px-4">
                    <div className="grid gap-8 mx-auto md:grid-cols-2 lg:grid-cols-2 max-w-7xl">
                        {cards.map((study, index) => (
                            <Link href={`/category?type=${study.category}`} key={index} className="block">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -8 }}
                                    onHoverStart={() => setHoveredIndex(index)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                                        <motion.div
                                            className="absolute inset-0"
                                            animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {study.card_image?.url && (
                                                <Image
                                                    src={study.card_image.url}
                                                    alt={study.card_title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </motion.div>

                                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/90 text-white backdrop-blur-md mb-4 shadow-lg border border-white/20">
                                                    {study.category}
                                                </span>
                                            </motion.div>

                                            <motion.div
                                                className="space-y-3"
                                            >
                                                <h3 className="flex items-center gap-3 text-3xl font-extrabold text-white tracking-tight">
                                                    {study.card_title}
                                                    <motion.div
                                                        animate={{
                                                            opacity: hoveredIndex === index ? 1 : 0,
                                                            x: hoveredIndex === index ? 0 : -10,
                                                        }}
                                                    >
                                                        <ExternalLink className="w-6 h-6 text-primary-foreground" />
                                                    </motion.div>
                                                </h3>

                                                <p className="text-white/80 line-clamp-3 text-base leading-relaxed font-medium">
                                                    {study.card_desc}
                                                </p>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-3xl group-hover:opacity-100 border-2 border-primary/50"
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main >
    );
}
