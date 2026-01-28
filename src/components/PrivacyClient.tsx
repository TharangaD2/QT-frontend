"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

interface WPImage {
    url: string;
    alt: string;
}

interface ListPoint {
    list_item: string;
}

interface SubPointData {
    sub_point: string;
    para: string;
    list_point: ListPoint[] | false;
}

interface PrivacyPoint {
    acf_fc_layout: "point_data";
    main_point: string;
    sub_point_data: SubPointData[];
}

interface PrivacyHero {
    acf_fc_layout: "hero_data";
    privacy_hero_title: string;
    privacy_hero_para: string;
    privacy_hero_image: WPImage;
}

interface PrivacyContentItem {
    acf_fc_layout: "content_data";
    content_title: string;
    content_date: string;
    content_para: string;
}

interface WpPrivacyPage {
    acf: {
        privacy_policy_hero: PrivacyHero[];
        privacy_policy_content: PrivacyContentItem[];
        points: PrivacyPoint[];
    };
}

export default function PrivacyClient({ data }: { data: WpPrivacyPage }) {
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
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const { acf } = data;
    const heroData = acf.privacy_policy_hero?.[0];
    const contentData = acf.privacy_policy_content?.[0];
    const points = acf.points || [];

    return (
        <main className="w-full overflow-hidden">
            <Navigation />
            <div className="min-h-screen bg-gray-50 py-20 px-6">
                <section
                    ref={ref}
                    id="home"
                    className="relative flex items-center justify-center overflow-hidden"
                >
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 overflow-hidden bg-app-maintence bg-cover bg-center bg-no-repeat"
                    >
                        {heroData?.privacy_hero_image?.url && (
                            <Image
                                src={heroData.privacy_hero_image.url}
                                alt={heroData.privacy_hero_image.alt || "Privacy Policy"}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        )}
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

                    {particles.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/20"
                            style={{
                                left: particle.left,
                                top: particle.top,
                            }}
                            animate={{
                                y: [-20, 20],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                            }}
                        />
                    ))}

                    <motion.div
                        style={{ opacity: opacityTransform }}
                        className="relative z-10 px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
                        >
                            <span className="text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-white">
                                {heroData?.privacy_hero_title}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-muted-foreground text-balance text-white"
                        >
                            {heroData?.privacy_hero_para}
                        </motion.p>
                    </motion.div>
                </section>

                <div className="max-w-4xl mx-auto lg:ml-28 p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {contentData?.content_title}
                    </h1>

                    <p className="text-sm text-gray-500 mb-8">
                        {contentData?.content_date}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        {contentData?.content_para}
                    </p>

                    {points.map((point, pIndex) => (
                        <div key={pIndex} className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                                {pIndex + 1}. {point.main_point}
                            </h2>

                            {point.sub_point_data?.map((sub, sIndex) => (
                                <div key={sIndex} className="mb-4">
                                    {sub.sub_point && (
                                        <p className="text-gray-700 mb-3 font-medium">
                                            {sub.sub_point}
                                        </p>
                                    )}
                                    {sub.para && (
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {sub.para}
                                        </p>
                                    )}
                                    {sub.list_point && Array.isArray(sub.list_point) && (
                                        <ul className="list-disc pl-6 text-gray-700 mb-4">
                                            {sub.list_point.map((item, lIndex) => (
                                                <li key={lIndex}>{item.list_item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
