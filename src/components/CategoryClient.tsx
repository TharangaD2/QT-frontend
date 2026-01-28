"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
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

interface PostCard {
    category: string;
    card_title: string;
    card_desc: string;
    card_image: {
        url: string;
        alt: string;
        title: string;
    };
    link_page: string;
}

export default function CategoryClient({
    data,
    cards,
    loadingPosts,
    filterType
}: {
    data: WPBlogPage;
    cards: PostCard[];
    loadingPosts: boolean;
    filterType: string | null
}) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const generatedParticles = [...Array(12)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        }));
        setParticles(generatedParticles);
    }, []);

    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const ref = useRef(null);

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

    const hero = data.acf.blog_hero?.[0];

    return (
        <main className="w-full overflow-hidden">
            <section
                id="case-studies"
                ref={sectionRef}
                className="relative min-h-screen px-6 py-24 overflow-hidden"
            >
                <Navigation />
                <section ref={ref} id="home" className="relative flex items-center justify-center overflow-hidden">
                    <motion.div style={{ y }} className="absolute inset-0 overflow-hidden bg-blog bg-cover bg-center bg-no-repeat">
                        {hero?.hero_image?.url && (
                            <Image
                                src={hero.hero_image.url}
                                alt={hero.hero_title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40" />

                        <motion.div
                            className="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary/5 blur-3xl"
                            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute rounded-full top-40 right-20 w-96 h-96 bg-accent/10 blur-3xl"
                            animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute rounded-full bottom-20 left-1/3 w-72 h-72 bg-primary/8 blur-3xl"
                            animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {particles.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/20"
                            style={{ left: particle.left, top: particle.top }}
                            animate={{ y: [-20, 20], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
                        />
                    ))}

                    <motion.div style={{ opacity }} className="relative z-10 px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">
                                {filterType ? `${filterType} Insights` : hero?.hero_title}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-balance text-white/90 font-medium leading-relaxed"
                        >
                            {filterType ? `Explore our latest articles and insights about ${filterType}.` : hero?.hero_para}
                        </motion.p>
                    </motion.div>
                </section>

                <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

                <div className="container relative z-10 mx-auto mt-20">
                    {loadingPosts ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                            <p className="text-white/60">Fetching latest insights...</p>
                        </div>
                    ) : cards.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-[95rem]">
                            {cards.map((study, index) => (
                                <Link href={study.link_page || "#"} key={index} className="block w-full sm:w-[350px]">
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
                                        <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500">
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
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                            </motion.div>

                                            <div className="absolute inset-0 flex flex-col justify-end p-5">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/90 text-white backdrop-blur-md mb-3 shadow-lg border border-white/20">
                                                        {study.category}
                                                    </span>
                                                </motion.div>

                                                <motion.div
                                                    className="space-y-2"
                                                >
                                                    <h3 className="flex items-center gap-2 text-xl font-bold text-white tracking-tight leading-tight">
                                                        <span
                                                            className="line-clamp-2"
                                                            dangerouslySetInnerHTML={{ __html: study.card_title }}
                                                        />
                                                        <motion.div
                                                            animate={{
                                                                opacity: hoveredIndex === index ? 1 : 0,
                                                                x: hoveredIndex === index ? 0 : -10,
                                                            }}
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-primary-foreground shrink-0" />
                                                        </motion.div>
                                                    </h3>

                                                    <p className="text-white/70 line-clamp-2 text-xs leading-relaxed font-medium">
                                                        {study.card_desc}
                                                    </p>
                                                </motion.div>
                                            </div>

                                            <motion.div
                                                className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100 border-2 border-primary/50"
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-white/60 text-xl">No posts found for this category.</p>
                            <Link href="/blog" className="mt-8 inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all">
                                Back to Blog
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}
