"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getPage } from "@/lib/wordpress";
import { DigitalMarketingPageData, ServiceCard, FullParaData, FullParaPoint, FullParaKeyPoint, FullParaSection } from "@/types/digital-marketing";

export default function DigitalMarketing() {
    const [pageData, setPageData] = useState<DigitalMarketingPageData | null>(null);
    const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPage("digital-marketing");
                setPageData(data);
            } catch (error) {
                console.error("Error fetching digital marketing page:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Failed to load content. Please try again later.</p>
            </div>
        );
    }

    const acf = pageData.acf;
    const hero = acf.hero_section?.[0];
    const about = acf.about_section?.[0];
    const servicesGrid = acf.services_grid?.[0];
    const videoSec = acf.vedio_section?.[0];
    const reasonSec = acf.reason_section?.[0];
    const subscribe = acf.subscribe_sec?.[0];

    return (
        <div className="min-h-screen bg-background overflow-hidden font-poppins">
            <Navigation />
            <main className="w-full bg-white text-gray-800">

                {/* ================= HERO SECTION ================= */}
                <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
                    {hero?.hero_vedio ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                        >
                            <source src={hero.hero_vedio.url} type="video/mp4" />
                        </video>
                    ) : hero?.hero_image ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url(${hero.hero_image.url})` }}
                        />
                    ) : (
                        <div className="absolute inset-0 opacity-40" />
                    )}

                    <div className="relative z-10 max-w-5xl px-6 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                        >
                            {hero?.hero_tag || "Grow your business with us"}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold leading-tight"
                        >
                            {hero?.hero_para || "Crafting Prestige Online"} <br />
                            <span style={{ color: '#EC9E35' }}>
                                {hero?.hero_highlight || "Quintessential Technologies"}
                            </span>
                        </motion.h1>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-[#EC9E35] hover:text-white transition"
                        >
                            {hero?.hero_btn_text || "Schedule a Meeting"}
                        </motion.button>
                    </div>
                </section>

                {/* ================= ABOUT SECTION ================= */}
                <section className="py-20 bg-gray-50 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-sm font-semibold mb-2" style={{ color: '#1C2961' }}>
                                {about?.aboout_tag || "Who we are"}
                            </p>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1C2961' }}>
                                {about?.about_title || "Where Vision Meets Digital Mastery"}
                            </h2>

                            <p className="leading-relaxed" style={{ color: '#1C2961' }}>
                                {about?.about_para || "Quintessential Technologies is a full-service digital transformation and marketing agency..."}
                            </p>

                            <div className="flex gap-12 mt-8">
                                {about?.about_section_analytics?.map((stat, idx) => (
                                    <div key={idx}>
                                        <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>{stat.count}</p>
                                        <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>{stat.count_label}</p>
                                    </div>
                                )) || (
                                        <>
                                            <div>
                                                <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>01</p>
                                                <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>Years in Service</p>
                                            </div>
                                            <div>
                                                <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>10+</p>
                                                <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>Projects Completed</p>
                                            </div>
                                        </>
                                    )}
                            </div>

                            <button className="mt-8 px-6 py-3 border rounded-lg transition" style={{ borderColor: '#1C2961', color: '#1C2961' }}>
                                {about?.about_button_text || "About Us"}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={about?.about_sec_img?.url}
                                alt={about?.about_sec_img?.alt || "Global Presence"}
                                className="w-full"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ================= SERVICES SECTION ================= */}
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-6">

                        <h2 className="text-center text-5xl font-bold mb-12">
                            <p className="mb-3 text-sm font-medium">
                                {servicesGrid?.service_tag || "We enable"}
                            </p>

                            <span className="text-blue-600 text-5xl">{servicesGrid?.highlight_tag || "Prestige Services"}</span><br />
                            {servicesGrid?.service_title || "& Solutions offered by us"}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                            {(servicesGrid?.dm_service_card || []).map((service, index) => (
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
                                        <img src={service.arrow_img ? service.arrow_img.url : "/img/arrow.png"} alt="arrow" className="w-8 h-8 object-contain" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Service Details n Modal*/}
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
                                                {Array.isArray(selectedService.full_para) && selectedService.full_para.length > 0 ? (
                                                    (selectedService.full_para as FullParaData[]).slice(0, 1).map((fullPara, index) => (
                                                        <div key={index} className="space-y-8 text-gray-300">
                                                            {fullPara.sub_title && (
                                                                <div>
                                                                    <h3 className="text-2xl font-bold mb-4 text-white">{fullPara.sub_title}</h3>
                                                                    <p className="leading-relaxed">
                                                                        {fullPara.para1}<br />
                                                                        {fullPara.para2}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {(fullPara.title || fullPara.para) && (
                                                                <div>
                                                                    {fullPara.title && <h4 className="text-xl font-bold mb-3 text-[#EC9E35]">{fullPara.title}</h4>}
                                                                    {fullPara.para && <p className="leading-relaxed">{fullPara.para}</p>}
                                                                </div>
                                                            )}

                                                            {fullPara.point_title1 && Array.isArray(fullPara.points) && fullPara.points.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-xl font-bold mb-3 text-[#EC9E35]">{fullPara.point_title1}</h4>
                                                                    <ul className="list-disc pl-5 space-y-2">
                                                                        {fullPara.points.map((point: FullParaPoint, i: number) => (
                                                                            <li key={i}>{point.point}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {fullPara.subtitle2 && Array.isArray(fullPara.keypoints) && fullPara.keypoints.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-xl font-bold mb-3 text-[#EC9E35]">{fullPara.subtitle2}</h4>
                                                                    <div className="space-y-4">
                                                                        {fullPara.keypoints.map((item: FullParaKeyPoint, i: number) => (
                                                                            <div key={i}>
                                                                                <strong className="block text-white">{item.heading}</strong>
                                                                                <span className="text-gray-400">{item.shortpara}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {Array.isArray(fullPara.points_data) && (fullPara.points_data as FullParaSection[]).map((section: FullParaSection, idx: number) => (
                                                                <div key={idx}>
                                                                    {section.point_title2 && (
                                                                        <h4 className="text-xl font-bold mb-3 text-[#EC9E35]">{section.point_title2}</h4>
                                                                    )}
                                                                    {Array.isArray(section.points) && section.points.length > 0 && (
                                                                        <ul className="list-disc pl-5 space-y-2">
                                                                            {section.points.map((p: { pointlist: string }, i: number) => (
                                                                                <li key={i}>{p.pointlist}</li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            ))}

                                                            {fullPara.booking_title && (
                                                                <div className="bg-white/10 p-6 rounded-xl border border-white/20 text-center">
                                                                    <h4 className="text-xl font-bold mb-2 text-white">{fullPara.booking_title}</h4>
                                                                    <p className="mb-6">
                                                                        {fullPara.booking_para1}
                                                                        {fullPara.booking_para2}
                                                                    </p>
                                                                    <Link href={fullPara.book_btn_link || "/contact"} className="inline-block px-8 py-3 bg-[#EC9E35] text-white font-bold rounded-full hover:scale-105 transition-transform">
                                                                        {fullPara.book_btn_text || "Book Now"}
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {typeof selectedService.full_para === 'string' ? selectedService.full_para : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* ================= VIDEO/CTA SECTION ================= */}
                <section className="w-full bg-[#D1D3DC] py-20 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="mb-3 text-sm font-medium text-blue-700">
                                {videoSec?.section_tag || "We enable"}
                            </p>

                            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[#1E2B6D] md:text-5xl">
                                {videoSec?.section_title || "Bring Your Business Ideas to Life"}
                            </h1>

                            <div className="mt-6">
                                <Link
                                    href={videoSec?.btn_link || "/contact"}
                                    className="inline-flex items-center justify-center rounded-full border-2 border-[#1E2B6D] px-6 py-2 text-sm font-semibold text-[#1E2B6D] transition hover:bg-[#1E2B6D] hover:text-white"
                                >
                                    {videoSec?.section_btn_text || "Schedule a Meeting"}
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
                                {videoSec?.vedio_clip?.url ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-auto w-full object-cover"
                                    >
                                        <source src={videoSec.vedio_clip.url} type="video/mp4" />
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

                {/* ================= FAQ/REASONS SECTION ================= */}
                <FAQ reasonSec={reasonSec} />

                {/* ================= NEWSLETTER ================= */}
                <section className="relative py-20 bg-gradient-to-r from-[#0B1C3F] to-[#132B6B] text-black overflow-hidden">
                    {subscribe?.background && (
                        <div className="absolute inset-0">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={subscribe.background.url} type="video/mp4" />
                            </video>
                        </div>
                    )}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto px-6 text-center"
                    >
                        <p className="text-sm uppercase tracking-wide mb-2">
                            {subscribe?.tag || "Join our elite client list"}
                        </p>

                        <h2 className="text-3xl font-bold mb-4">
                            {subscribe?.title || "Stay Tuned To Our Updates And Useful Info We Enjoy Sharing."}
                        </h2>

                        <p className="text-gray-300 mb-8">
                            {subscribe?.short_des || "We are looking forward to hear from you so don’t hesitate to contact us."}
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
            </main>
            <Footer />
        </div>
    );
}

const FAQ: React.FC<{ reasonSec?: any }> = ({ reasonSec }) => {
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
                        {reasonSec?.tag || "Why Choose"}
                    </span>

                    <h2 className="text-4xl font-bold tracking-tight  md:text-4xl lg:text-4xl">
                        {reasonSec?.title || "Quintessential Technologies"}
                    </h2>

                    <p className="max-w-2xl mx-auto mt-4 text-lg ">
                        {reasonSec?.reason_para || "At Quintessential Technologies, we don’t just market brands, we build digital authority..."}
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {(reasonSec?.reason_list || []).map((faq: any, index: number) => {
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

                                    <div
                                        className="relative z-10 flex items-start justify-between w-full gap-4 p-6 text-left md:p-8"
                                    >
                                        <h3
                                            className="text-lg md:text-xl font-semibold transition-all duration-300 text-[#1C2961]"
                                        >
                                            {faq.reason_title}
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
                                                        {faq.reason_para}
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
