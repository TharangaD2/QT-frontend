"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { getPage } from "@/lib/wordpress";

// --- Interfaces for WordPress Data ---
interface WPImage {
    url: string;
    alt: string;
    title: string;
}

interface WPVideo {
    url: string;
}

interface WPHeroSection {
    hero_image: WPImage | false;
    hero_vedio: WPVideo | false;
    hero_vedio_url: string;
    hero_tag: string;
    hero_para: string;
    hero_highlight: string;
    hero_btn_text: string;
    hero_btn_link: string;
}

interface WPAboutAnalytics {
    count: string;
    count_label: string;
}

interface WPAboutSection {
    about_tag: string;
    about_title: string;
    about_para: string;
    about_section_analytics: WPAboutAnalytics[];
    about_button_text: string;
    about_btn_link: { title: string; url: string };
}

interface WPServiceCard {
    service_image: WPImage;
    service_title: string;
    card_para: string;
    full_para: string;
    arrow_img: WPImage;
}

interface WPServicesGrid {
    service_tag: string;
    highlight_tag: string;
    service_title: string;
    dm_service_card: WPServiceCard[];
}

interface WPVideoSection {
    section_tag: string;
    section_title: string;
    section_btn_text: string;
    btn_link: string;
    vedio_clip: WPVideo | false;
    vedio_url: string;
}

interface WPReasonItem {
    reason_title: string;
    reason_para: string;
}

interface WPReasonSection {
    tag: string;
    title: string;
    reason_para: string;
    reason_list: WPReasonItem[];
}

interface WPSubscribeSection {
    tag: string;
    title: string;
    short_des: string;
}

interface WPDigitalMarketingPage {
    acf: {
        hero_section: WPHeroSection[];
        about_section: WPAboutSection[];
        services_grid: WPServicesGrid[];
        vedio_section: WPVideoSection[];
        reason_section: WPReasonSection[];
        subscribe_sec: WPSubscribeSection[];
    };
}

export default function DigitalMarketing() {
    const [data, setData] = useState<WPDigitalMarketingPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<WPServiceCard | null>(null);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wpData = await getPage("digital-marketing");
                if (wpData) {
                    setData(wpData);
                }
            } catch (error) {
                console.error("Failed to fetch digital marketing data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Failed to load content.</p>
            </div>
        );
    }

    const hero = data.acf.hero_section?.[0];
    const about = data.acf.about_section?.[0];
    const servicesGrid = data.acf.services_grid?.[0];
    const videoSection = data.acf.vedio_section?.[0];
    const reasonSection = data.acf.reason_section?.[0];
    const subscribe = data.acf.subscribe_sec?.[0];

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <div className="min-h-screen bg-background overflow-hidden font-poppins">
            <Navigation />
            <main className="w-full bg-white text-gray-800">

                {/* ================= HERO SECTION ================= */}
                <section
                    ref={heroRef}
                    className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
                >
                    {/* Parallax background */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden"
                        style={{ y: heroY }}
                    >
                        {(hero?.hero_vedio && hero.hero_vedio.url) || hero?.hero_vedio_url ? (
                            <video
                                src={hero?.hero_vedio_url || (hero?.hero_vedio ? hero.hero_vedio.url : "")}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : hero?.hero_image ? (
                            <Image
                                src={hero.hero_image.url}
                                alt={hero.hero_para || "Hero image"}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        ) : (
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/img/digital-hero.png')" }}
                            />
                        )}

                        {/* Floating particles (similar to services page) */}
                        {particles.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-white/20"
                                style={{ left: particle.left, top: particle.top }}
                                animate={{ y: [-20, 20], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
                            />
                        ))}
                    </motion.div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    <motion.div
                        className="relative z-10 max-w-5xl px-6 text-center"
                        style={{ opacity: heroOpacity }}
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                        >
                            {hero?.hero_tag}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                        >
                            {hero?.hero_para} <br />
                            <span style={{ color: '#EC9E35' }} className="">
                                {hero?.hero_highlight}
                            </span>
                        </motion.h1>

                        {hero?.hero_btn_text && (
                            <Link href={hero.hero_btn_link || "/contact"}>
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-[#EC9E35] hover:text-white transition"
                                >
                                    {hero.hero_btn_text}
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                </section>

                {/* ================= ABOUT SECTION ================= */}
                {about && (
                    <section className="py-20 bg-gray-50 overflow-hidden">
                        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="text-sm font-semibold mb-2" style={{ color: '#1C2961' }}>
                                    {about.about_tag}
                                </p>
                                <h2 className="text-3xl font-bold mb-4" style={{ color: '#1C2961' }}>
                                    {about.about_title}
                                </h2>

                                <p className="leading-relaxed" style={{ color: '#1C2961' }}>
                                    {about.about_para}
                                </p>

                                <div className="flex flex-wrap gap-12 mt-8">
                                    {about.about_section_analytics?.map((stat, i) => (
                                        <div key={i}>
                                            <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>{stat.count}</p>
                                            <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>{stat.count_label}</p>
                                        </div>
                                    ))}
                                </div>

                                {about.about_button_text && (
                                    <Link href={about.about_btn_link?.url || "/about"}>
                                        <button className="mt-8 px-6 py-3 border rounded-lg transition" style={{ borderColor: '#1C2961', color: '#1C2961' }}>
                                            {about.about_button_text}
                                        </button>
                                    </Link>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/img/world-map.png"
                                    alt="Global Presence"
                                    className="w-full"
                                />
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ================= SERVICES SECTION ================= */}
                {servicesGrid && (
                    <section className="py-20">
                        <div className="max-w-6xl mx-auto px-6">
                            <h2 className="text-center text-5xl font-bold mb-12">
                                <p className="mb-3 text-sm font-medium">
                                    {servicesGrid.service_tag}
                                </p>
                                <span className="text-blue-600 text-5xl">{servicesGrid.highlight_tag}</span><br />
                                {servicesGrid.service_title}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                                {servicesGrid.dm_service_card?.map((service, index) => (
                                    <motion.div
                                        key={`${service.service_title}-${index}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        onClick={() => setSelectedService(service)}
                                        className="text-white rounded-xl p-8 hover:-translate-y-2 transition flex flex-col items-center text-center w-[270px] h-[380px] cursor-pointer group"
                                        style={{ backgroundColor: '#1C2961' }}
                                    >
                                        <div className="w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {service.service_image?.url && (
                                                <img
                                                    src={service.service_image.url}
                                                    alt={service.service_title}
                                                    className="w-full h-full object-contain"
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4">{service.service_title}</h3>
                                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                                            {service.card_para}
                                        </p>
                                        <div className="mt-auto transition-transform group-hover:translate-x-1">
                                            {service.arrow_img?.url && (
                                                <img src={service.arrow_img.url} alt="arrow" className="w-8 h-8 object-contain" />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Service Details Modal */}
                        <AnimatePresence>
                            {selectedService && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedService(null)}
                                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl text-white"
                                        style={{ backgroundColor: '#1C2961' }}
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setSelectedService(null)}
                                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                                        >
                                            <X className="w-6 h-6 text-gray-300" />
                                        </button>

                                        <div className="overflow-y-auto max-h-[90vh] p-8 md:p-12">
                                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                                                <div className="w-20 h-20 flex items-center justify-center shrink-0">
                                                    {selectedService.service_image?.url && (
                                                        <img
                                                            src={selectedService.service_image.url}
                                                            alt={selectedService.service_title}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold mb-4">{selectedService.service_title}</h2>
                                                    <p className="text-gray-300 leading-relaxed text-wrap">
                                                        {selectedService.full_para || selectedService.card_para}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                )}

                {/* ================= VIDEO SECTION ================= */}
                {videoSection && (
                    <section className="w-full bg-[#D1D3DC] py-20 overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="mb-3 text-sm font-medium text-blue-700">
                                    {videoSection.section_tag}
                                </p>

                                <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[#1E2B6D] md:text-5xl">
                                    {videoSection.section_title}
                                </h1>

                                <div className="mt-6">
                                    <Link
                                        href={videoSection.btn_link || "/contact"}
                                        className="inline-flex items-center justify-center rounded-full border-2 border-[#1E2B6D] px-6 py-2 text-sm font-semibold text-[#1E2B6D] transition hover:bg-[#1E2B6D] hover:text-white"
                                    >
                                        {videoSection.section_btn_text}
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="mt-14 flex justify-center"
                            >
                                <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl aspect-video">
                                    {(videoSection.vedio_clip && videoSection.vedio_clip.url) || videoSection.vedio_url ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="h-auto w-full object-cover"
                                        >
                                            <source src={videoSection.vedio_url || (videoSection.vedio_clip ? videoSection.vedio_clip.url : "")} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <Image
                                            src="/img/digital-hero.png"
                                            alt="Product UI Preview"
                                            width={1200}
                                            height={700}
                                            className="h-auto w-full object-cover"
                                            priority
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* ================= REASON SECTION (Why Choose / FAQ) ================= */}
                {reasonSection && <FAQ section={reasonSection} />}

                {/* ================= NEWSLETTER ================= */}
                {subscribe && (
                    <section className="py-20 bg-gradient-to-r from-[#0B1C3F] to-[#132B6B] text-white">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto px-6 text-center"
                        >
                            <p className="text-sm uppercase tracking-wide mb-2">
                                {subscribe.tag}
                            </p>

                            <h2 className="text-3xl font-bold mb-4">
                                {subscribe.title}
                            </h2>

                            <p className="text-gray-300 mb-8">
                                {subscribe.short_des}
                            </p>

                            <form className="grid md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-2 text-left">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Name"
                                        className="bg-transparent border-b border-white/30 py-2 outline-none focus:border-white transition-colors text-white placeholder:text-white/20"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 text-left">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="bg-transparent border-b border-white/30 py-2 outline-none focus:border-white transition-colors text-white placeholder:text-white/20"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 text-left">
                                    <input
                                        id="mobile"
                                        type="tel"
                                        placeholder="Mobile Number"
                                        className="bg-transparent border-b border-white/30 py-2 outline-none focus:border-white transition-colors text-white placeholder:text-white/20"
                                    />
                                </div>
                            </form>

                            <button className="mt-12 px-10 py-3 bg-white text-[#0B1C3F] font-bold rounded-full hover:scale-105 transition-transform shadow-lg">
                                Subscribe Now
                            </button>
                        </motion.div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

const FAQ: React.FC<{ section: WPReasonSection }> = ({ section }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="relative min-h-screen px-6 py-24 overflow-hidden bg-white"
        >
            <motion.div
                className="absolute inset-0 bg-white"
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <span className="block text-2xl font-semibold tracking-widest text-[#3F80EC] mb-4">
                        {section.tag}
                    </span>

                    <h2 className="text-4xl font-bold tracking-tight md:text-4xl lg:text-4xl">
                        {section.title}
                    </h2>

                    <p className="max-w-2xl mx-auto mt-4 text-lg">
                        {section.reason_para}
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {section.reason_list?.map((reason, index) => {
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
                                    onMouseEnter={() => setExpandedIndex(index)}
                                    onMouseLeave={() => setExpandedIndex(null)}
                                    className={`relative rounded-2xl bg-card/50 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${isExpanded
                                        ? "border-primary/50 shadow-xl shadow-primary/10"
                                        : "border-border/50 shadow-lg hover:border-primary/30"
                                        }`}
                                >
                                    <motion.div
                                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                        style={{
                                            background:
                                                "radial-gradient(circle at 50% 0%, oklch(0.62 0.18 195 / 0.05), transparent 70%)",
                                        }}
                                    />

                                    <div className="relative z-10 flex items-start justify-between w-full gap-4 p-6 text-left md:p-8">
                                        <h3 className="text-lg md:text-xl font-semibold transition-all duration-300 text-[#1C2961]">
                                            {reason.reason_title}
                                        </h3>
                                    </div>

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
                                                        {reason.reason_para}
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
            </div>
        </section>
    );
};

