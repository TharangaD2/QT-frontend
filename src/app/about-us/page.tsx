"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

import { Compass, Eye, Heart, CircleCheckBig, BrainCircuit, Blocks, Lightbulb, LucideIcon, Loader2 } from "lucide-react";
import { getPage } from "@/lib/wordpress";

// --- Types & Interfaces ---

interface Card {
    icon: LucideIcon;
    title: string;
    content: string;
    gradient: string;
    iconBg: string;
}

interface Excellence {
    title: string;
    description: string;
}

interface Reason {
    icon: LucideIcon;
    title: string;
    description: string;
}

// API Response Interfaces
interface WpPage {
    acf: {
        about_hero: {
            about_hero_title: string;
            about_hero_para: string;
            about_hero_image: { url: string; alt: string };
        }[];
        about_desc: {
            about_desc_title: string;
            about_desc_para: string;
            about_title: string;
            about_details: string;
            about_details2: string;
            about_image: { url: string; alt: string };
            service_page_nav: string;
            service_page2: string;
            service_page3: string;
        }[];
        excellence: (
            | {
                acf_fc_layout: "excellence_data";
                excellence_header: string;
            }
            | {
                acf_fc_layout: "excellence_card";
                excellence_card_title: string;
                excellence_card_para: string;
            }
        )[];
        reason_section: (
            | {
                acf_fc_layout: "reason_header";
                reason_title: string;
            }
            | {
                acf_fc_layout: "reason_data";
                reason_card_icon: string;
                reason_card_title: string;
                reason_card_para: string;
            }
        )[];
        mission_section: (
            | {
                acf_fc_layout: "mission_section_data";
                mission_sec_tag: string;
                mission_sec_title: string;
                mission_sec_para: string;
            }
            | {
                acf_fc_layout: "mission_card";
                mission_card_icon: string;
                mission_card_title: string;
                mission_card_para: string;
            }
            | {
                acf_fc_layout: "schedule_meet";
                schedule_text: string;
                schedule_para: string;
                schedule_btn_text: string;
            }
        )[];
    };
}

// --- Helper to map Dashicons to Lucide ---
const getIconComponent = (dashicon: string): LucideIcon => {
    switch (dashicon) {
        case "dashicons-yes-alt":
            return CircleCheckBig;
        case "dashicons-reddit":
            return BrainCircuit;
        case "dashicons-lightbulb":
            return Lightbulb;
        case "dashicons-screenoptions":
            return Blocks;
        case "dashicons-admin-collapse":
            return Compass;
        case "dashicons-hidden":
            return Eye;
        case "dashicons-heart":
            return Heart;
        default:
            return CircleCheckBig;
    }
};

// --- Presentational Component ---
function AboutDetailsContent({ data }: { data: WpPage }) {
    // Refs for scroll effects - moved inside this component to ensure hydration
    const sectionRef = useRef<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLElement | null>(null);
    const excellenceRef = useRef<HTMLElement | null>(null);
    const reasonRef = useRef<HTMLElement | null>(null);
    const missionRef = useRef<HTMLElement | null>(null);

    const missionInView = useInView(missionRef, {
        once: true,
        margin: "-120px",
    });
    const reasonInView = useInView(reasonRef, {
        once: true,
        margin: "-120px",
    });

    const excellenceInView = useInView(excellenceRef, {
        once: true,
        margin: "-120px",
    });
    const aboutInView = useInView(aboutRef, {
        once: true,
        margin: "-100px",
    });


    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

    const { acf } = data;
    const heroData = acf.about_hero?.[0];
    const descData = acf.about_desc?.[0];

    // Process Mission Section Data
    const missionSectionData = acf.mission_section?.find(
        (item) => item.acf_fc_layout === "mission_section_data"
    ) as any;

    const scheduleData = acf.mission_section?.find(
        (item) => item.acf_fc_layout === "schedule_meet"
    ) as any;

    const missionCardsRaw = acf.mission_section?.filter(
        (item) => item.acf_fc_layout === "mission_card"
    ) as any[];

    // Map Mission Cards
    const cards: Card[] = missionCardsRaw ? missionCardsRaw.map((item, index) => {
        const isEven = index % 2 === 0;
        return {
            icon: getIconComponent(item.mission_card_icon),
            title: item.mission_card_title,
            content: item.mission_card_para,
            gradient: isEven ? "from-primary/10 to-accent/10" : "from-accent/10 to-primary/10",
            iconBg: isEven ? "from-primary/20 to-accent/20" : "from-accent/20 to-primary/20",
        }
    }) : [];

    // Process Reason Section Data
    const reasonHeader = acf.reason_section?.find(item => item.acf_fc_layout === "reason_header") as any;
    const reasonCardsRaw = acf.reason_section?.filter(item => item.acf_fc_layout === "reason_data") as any[];

    const reason: Reason[] = reasonCardsRaw ? reasonCardsRaw.map(item => ({
        icon: getIconComponent(item.reason_card_icon),
        title: item.reason_card_title,
        description: item.reason_card_para
    })) : [];

    // Process Excellence Section Data
    const excellenceHeader = acf.excellence?.find(item => item.acf_fc_layout === "excellence_data") as any;
    const excellenceCardsRaw = acf.excellence?.filter(item => item.acf_fc_layout === "excellence_card") as any[];

    const excellence: Excellence[] = excellenceCardsRaw ? excellenceCardsRaw.map(item => ({
        title: item.excellence_card_title,
        description: item.excellence_card_para
    })) : [];

    return (
        <main className="w-full overflow-hidden">
            {/* Removed invalid <head> tag here */}

            {/* HERO SECTION */}
            <section ref={sectionRef} className="relative min-h-screen px-6  overflow-hidden">
                <Navigation />
                <section ref={ref} id="home" className="relative flex items-center justify-center overflow-hidden mt-24 ">
                    {/* Animated Background Shapes with Parallax */}
                    <motion.div style={{ y }} className="absolute inset-0 overflow-hidden bg-muted">
                        {heroData?.about_hero_image?.url ? (
                            <>
                                <Image
                                    src={heroData.about_hero_image.url}
                                    alt={heroData.about_hero_image.alt || "Hero Background"}
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-3d-section bg-cover bg-center bg-no-repeat" />
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
                            <span className="text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-white">
                                {heroData?.about_hero_title}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-muted-foreground text-balance text-white"
                        >
                            {heroData?.about_hero_para}
                        </motion.p>
                    </motion.div>
                </section>
            </section>

            {/* ABOUT SECTION */}
            <section
                id="about"
                ref={aboutRef}
                className="relative flex items-center min-h-screen px-4 sm:px-6  overflow-hidden"
            >
                {/* Parallax Background */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background"
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [0, -50]),
                    }}
                />

                <div className="w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 sm:mb-16 text-center mt-20"
                    >
                        <h2 className="mb-4 text-2xl sm:text-4xl md:text-5xl font-bold text-foreground">
                            {descData?.about_desc_title}
                        </h2>

                        <p className="max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground px-2">
                            {descData?.about_desc_para}
                        </p>
                    </motion.div>

                    <div className="container relative z-10 mx-auto lg:ml-11 ">
                        <motion.div
                            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20 "
                        >
                            {/* Text Section */}
                            <motion.div className="space-y-6">
                                <motion.h2
                                    className="sm:text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    {descData?.about_title}{" "}
                                </motion.h2>

                                <motion.div
                                    className="space-y-4 lg:text-lg md:text-xl leading-relaxed text-muted-foreground"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    <p>{descData?.about_details}</p>
                                    <p>{descData?.about_details2}</p>
                                </motion.div>

                                {/* Stats with Hover Zoom Animation */}
                                <motion.div
                                    className="flex flex-wrap gap-6 sm:gap-8 pt-4"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    {[
                                        { title: descData?.service_page_nav, href: "/business-consultancy" },
                                        { title: descData?.service_page2, href: "/application-implementation" },
                                        { title: descData?.service_page3, href: "/application-development" },
                                    ]
                                        .filter(item => item.title)
                                        .map((item, index) => (
                                            <motion.a
                                                key={index}
                                                href={item.href}
                                                whileHover={{ scale: 1.08 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="relative inline-block text-sm sm:text-base text-muted-foreground font-medium cursor-pointer
                             hover:text-primary transition-colors duration-300"
                                            >
                                                {item.title}

                                                {/* Hover Glow Effect */}
                                                <span className="absolute -inset-1 rounded-lg bg-primary/10 blur opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
                                            </motion.a>
                                        ))}
                                </motion.div>
                            </motion.div>

                            {/* Image Section */}
                            <motion.div
                                className="relative"
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.div
                                    className="relative overflow-hidden shadow-2xl rounded-2xl lg:mr-20"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {descData?.about_image?.url && (
                                        <Image
                                            src={descData.about_image.url}
                                            alt={descData.about_image.alt || "About Us"}
                                            width={500}
                                            height={350}
                                            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                                            unoptimized
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
                                </motion.div>

                                {/* Floating Glow */}
                                <motion.div
                                    className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-28 sm:h-28 bg-linear-to-br from-[oklch(0.62_0.18_195)] to-[oklch(0.55_0.15_200)] rounded-full blur-3xl opacity-30"
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/*Excellence SECTION */}
            <section id="excellence" ref={excellenceRef} className="relative  overflow-hidden sm:py-5 ">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
                <motion.div
                    className="absolute rounded-full top-40 left-20 w-96 h-96 bg-accent/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={excellenceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-foreground text-balance">
                            {excellenceHeader?.excellence_header}
                        </h2>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-3">
                        {excellence.map((excellence, index) => (
                            <div key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={excellenceInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, scale: 1.03 }}
                                    className="relative cursor-pointer group"
                                >
                                    <div className="h-full p-6 transition-all duration-300 border rounded-xl bg-card border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-gray-100">
                                        <h3 className="mb-3 text-lg font-semibold transition-colors text-foreground group-hover:text-primary">
                                            {excellence.title}
                                        </h3>

                                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                            {excellence.description}
                                        </p>

                                        <div className="absolute inset-0 transition-opacity opacity-0 rounded-xl bg-linear-to-br from-primary/5 to-accent/5 group-hover:opacity-100 -z-10" />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*Reason SECTION */}
            <section id="services" ref={reasonRef} className="relative  overflow-hidden sm:py-5 ">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
                <motion.div
                    className="absolute rounded-full top-40 left-20 w-96 h-96 bg-accent/10 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={reasonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-foreground text-balance">
                            {reasonHeader?.reason_title}
                        </h2>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-4">
                        {reason.map((reason, index) => (
                            <div key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={reasonInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -10, scale: 1.03 }}
                                    className="relative cursor-pointer group"
                                >
                                    <div className="h-full p-6 transition-all duration-300 border rounded-xl bg-card border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 } }}
                                            className="flex items-center justify-center mb-4 transition-all rounded-lg w-14 h-14 bg-linear-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 group-hover:shadow-lg group-hover:shadow-primary/20"
                                        >
                                            <reason.icon className="w-7 h-7 text-primary" />
                                        </motion.div>

                                        <h3 className="mb-3 text-lg font-semibold transition-colors text-foreground group-hover:text-primary">
                                            {reason.title}
                                        </h3>

                                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                            {reason.description}
                                        </p>

                                        <div className="absolute inset-0 transition-opacity opacity-0 rounded-xl bg-linear-to-br from-primary/5 to-accent/5 group-hover:opacity-100 -z-10" />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION SECTION */}
            <section
                id="mission"
                ref={missionRef}
                className="relative py-20 overflow-hidden sm:py-28 bg-linear-to-b from-background via-accent/5 to-background"
            >
                {/* Decorative elements */}
                <div className="absolute rounded-full top-20 right-10 w-72 h-72 bg-primary/5 blur-3xl" />
                <div className="absolute rounded-full bottom-20 left-10 w-96 h-96 bg-accent/5 blur-3xl" />

                <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {missionSectionData?.mission_sec_tag}
                        </motion.div>
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-foreground text-balance">
                            {missionSectionData?.mission_sec_title}
                        </h2>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground text-balance">
                            {missionSectionData?.mission_sec_para}
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                animate={missionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2 + index * 0.15,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="relative group"
                            >
                                <div
                                    className={`h-full p-8 rounded-2xl bg-linear-to-br ${card.gradient} border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10`}
                                >
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                        className={`w-16 h-16 rounded-xl bg-linear-to-br ${card.iconBg} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow`}
                                    >
                                        <card.icon className="w-8 h-8 text-primary" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="mb-4 text-2xl font-semibold text-foreground">{card.title}</h3>

                                    {/* Content */}
                                    <p className="leading-relaxed text-muted-foreground">{card.content}</p>

                                    {/* Decorative corner */}
                                    <div className="absolute w-8 h-8 transition-opacity border-t-2 border-r-2 rounded-tr-lg opacity-0 top-4 right-4 border-primary/20 group-hover:opacity-100" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex flex-col items-center gap-4 p-8 border sm:flex-row rounded-2xl bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 border-border/50">
                            <div className="flex-1 text-left">
                                <h3 className="mb-2 text-xl font-semibold text-foreground">
                                    {scheduleData?.schedule_text}
                                </h3>
                                <p className="text-muted-foreground">
                                    {scheduleData?.schedule_para}
                                </p>
                            </div>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 font-medium transition-shadow rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                            >
                                {scheduleData?.schedule_btn_text}
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// --- Main Container Component ---
export default function AboutDetails() {
    const [data, setData] = useState<WpPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wpData = await getPage("123");
                if (wpData) {
                    setData(wpData);
                }
            } catch (error) {
                console.error("Failed to fetch About page data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!data || !data.acf) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Failed to load content.
            </div>
        );
    }

    return <AboutDetailsContent data={data} />;
}