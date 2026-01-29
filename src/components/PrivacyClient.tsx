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
    const sectionRef = useRef<HTMLElement | null>(null);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const { acf } = data;
    const heroData = acf.privacy_policy_hero?.[0];
    const contentData = acf.privacy_policy_content?.[0];
    const points = acf.points || [];

    return (
        <main className="w-full overflow-hidden">
            <Navigation isDarkBg={true} />
            <section ref={sectionRef} className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
                {heroData?.privacy_hero_image?.url ? (
                    <Image
                        src={heroData.privacy_hero_image.url}
                        alt={heroData.privacy_hero_image.alt || "Privacy Policy"}
                        fill
                        className="object-cover opacity-40"
                        priority
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 bg-app-maintence bg-cover bg-center bg-no-repeat opacity-40" />
                )}

                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                    >
                        {(heroData as any)?.privacy_hero_tag || "Policy & Compliance"}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        {heroData?.privacy_hero_title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-3xl mx-auto mt-6 text-lg sm:text-xl text-white/90"
                    >
                        {heroData?.privacy_hero_para}
                    </motion.p>
                </div>
            </section>

            <div className="bg-gray-50 py-20 px-6">

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
