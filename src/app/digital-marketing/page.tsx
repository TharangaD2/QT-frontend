"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, X, CheckCircle2 } from "lucide-react";

export default function DigitalMarketing() {
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

    return (
        <div className="min-h-screen bg-background overflow-hidden font-poppins">
            <Navigation />
            <main className="w-full bg-white text-gray-800">

                {/* ================= HERO SECTION ================= */}
                <section className="relative min-h-screen bg-black text-white flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/img/digital-hero.png')] bg-cover bg-center opacity-40" />
                    <div className="relative z-10 max-w-5xl px-6 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                        >
                            Grow your business with us
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold leading-tight"
                        >
                            Crafting Prestige Online <br />
                            Step into the Future with{" "}<br />
                            <span style={{ color: '#EC9E35' }} className="">
                                Quintessential Technologies
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
                            Schedule a Meeting
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
                                Who we are
                            </p>
                            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1C2961' }}>
                                Where Vision Meets <br /> Digital Mastery
                            </h2>

                            <p className="leading-relaxed" style={{ color: '#1C2961' }}>
                                Quintessential Technologies is a full-service digital transformation and marketing agency dedicated to helping businesses grow, scale, and lead in the digital era. We combine strategic thinking, creative excellence, and advanced technology to craft impactful digital solutions that deliver measurable results. From startups to established enterprises, we partner with brands to elevate their online presence and drive sustainable growth.
                            </p>

                            <div className="flex gap-12 mt-8">
                                <div>
                                    <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>01</p>
                                    <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>Years in Service</p>
                                </div>
                                <div>
                                    <p className="text-7xl font-bold" style={{ color: '#1C2961' }}>10+</p>
                                    <p className="text-sm opacity-70" style={{ color: '#1C2961' }}>Projects Completed</p>
                                </div>
                            </div>

                            <button className="mt-8 px-6 py-3 border rounded-lg transition" style={{ borderColor: '#1C2961', color: '#1C2961' }}>
                                About Us
                            </button>
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

                {/* ================= SERVICES SECTION ================= */}
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-6">

                        <h2 className="text-center text-5xl font-bold mb-12">
                            <p className="mb-3 text-sm font-medium">
                                We enable
                            </p>

                            <span className="text-blue-600 text-5xl">Prestige Services</span><br /> & Solutions
                            offered by us
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
                            {services.map((service, index) => (
                                <motion.div
                                    key={`${service.title}-${index}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setSelectedService(service)}
                                    className="text-white rounded-xl p-8 hover:-translate-y-2 transition flex flex-col items-center text-center w-[270px] h-[380px] cursor-pointer group"
                                    style={{ backgroundColor: '#1C2961' }}
                                >
                                    <div className="w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {service.icon.startsWith('/') ? (
                                            <img
                                                src={service.icon}
                                                alt={service.title}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-4xl">{service.icon}</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
                                        {service.description}
                                    </p>
                                    <div className="mt-auto transition-transform group-hover:translate-x-1">
                                        <img src="/img/arrow.png" alt="arrow" className="w-8 h-8 object-contain" />
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
                                                {selectedService.icon.startsWith('/') ? (
                                                    <img
                                                        src={selectedService.icon}
                                                        alt={selectedService.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-4xl">{selectedService.icon}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {selectedService.longDescription || selectedService.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <section className="w-full bg-[#D1D3DC] py-20 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Small label */}
                            <p className="mb-3 text-sm font-medium text-blue-700">
                                We enable
                            </p>

                            {/* Heading */}
                            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-[#1E2B6D] md:text-5xl">
                                Bring Your <br />
                                Business Ideas <br />
                                to Life
                            </h1>

                            {/* CTA */}
                            <div className="mt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full border-2 border-[#1E2B6D] px-6 py-2 text-sm font-semibold text-[#1E2B6D] transition hover:bg-[#1E2B6D] hover:text-white"
                                >
                                    Schedule a Meeting
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-14 flex justify-center"
                        >
                            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
                                <Image
                                    src="/img/digital-hero.png"
                                    alt="Product UI Preview"
                                    width={1200}
                                    height={700}
                                    className="h-auto w-full object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <FAQ />

                {/* ================= NEWSLETTER ================= */}
                <section className="py-20 bg-gradient-to-r from-[#0B1C3F] to-[#132B6B] text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto px-6 text-center"
                    >
                        <p className="text-sm uppercase tracking-wide mb-2">
                            Join our elite client list
                        </p>

                        <h2 className="text-3xl font-bold mb-4">
                            Stay Tuned To Our Updates And Useful Info We Enjoy Sharing.
                        </h2>

                        <p className="text-gray-300 mb-8">
                            We are looking forward to hear from you so don’t hesitate to contact us.
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

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What types of projects does Quintessential Technologies specialize in?",
        answer:
            "We specialize in enterprise software development, AI/ML integration, cloud solutions, mobile applications, and digital transformation initiatives. Our expertise spans healthcare, finance, e-commerce, and IoT sectors.",
    },
    {
        question: "How long does a typical project take from start to finish?",
        answer:
            "Project timelines vary based on scope and complexity. A typical MVP can be delivered in 8-12 weeks, while enterprise solutions may take 6-12 months. We follow agile methodologies to ensure continuous delivery and feedback.",
    },
    {
        question: "What is your development process?",
        answer:
            "We follow an agile development approach with 2-week sprints. This includes discovery workshops, iterative design and development, continuous testing, and regular client reviews. We prioritize transparency and collaboration throughout the entire process.",
    },
    {
        question: "Do you provide ongoing support and maintenance?",
        answer:
            "Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. We provide flexible support packages tailored to your needs.",
    },
    {
        question: "How do you ensure project security and data privacy?",
        answer:
            "Security is built into every layer of our solutions. We implement industry-standard encryption, conduct regular security audits, follow OWASP guidelines, and ensure compliance with regulations like GDPR, HIPAA, and SOC 2.",
    },
    {
        question: "Can you integrate with our existing systems?",
        answer:
            "Absolutely. We have extensive experience integrating with legacy systems, third-party APIs, and various enterprise platforms. We conduct thorough analysis to ensure seamless integration without disrupting your operations.",
    },
    {
        question: "What makes Quintessential Technologies different from other firms?",
        answer:
            "Our unique combination of technical excellence, industry expertise, and commitment to quality sets us apart. We focus on understanding your business goals, not just writing code. Our team brings deep domain knowledge and a track record of delivering measurable results.",
    },
    {
        question: "Do you work with startups or only established enterprises?",
        answer:
            "We work with organizations of all sizes, from early-stage startups to Fortune 500 companies. We offer tailored engagement models and pricing structures to match your stage of growth and budget.",
    },
];

const FAQ: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    const toggleExpand = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="relative min-h-screen px-6 py-24 overflow-hidden bg-white"
        >
            {/* Background animation */}
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
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >


                    <span className="block text-2xl font-semibold tracking-widest text-[#3F80EC] mb-4">
                        Why Choose
                    </span>

                    <h2 className="text-4xl font-bold tracking-tight  md:text-4xl lg:text-4xl">
                        Quintessential Technologies
                    </h2>

                    <p className="max-w-2xl mx-auto mt-4 text-lg ">
                        At Quintessential Technologies, we don’t just market brands, we build digital authority. Our approach combines strategy, creativity, and measurable performance to deliver results that truly matter to your business.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => {
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
                                    {/* Hover glow */}
                                    <motion.div
                                        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                                        style={{
                                            background:
                                                "radial-gradient(circle at 50% 0%, oklch(0.62 0.18 195 / 0.05), transparent 70%)",
                                        }}
                                    />

                                    {/* Question */}
                                    <div
                                        className="relative z-10 flex items-start justify-between w-full gap-4 p-6 text-left md:p-8"
                                    >
                                        <h3
                                            className="text-lg md:text-xl font-semibold transition-all duration-300 text-[#1C2961]"
                                        >
                                            {faq.question}
                                        </h3>
                                    </div>

                                    {/* Expandable answer */}
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
                                                        {faq.answer}
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

const services = [
    {
        title: "Digital Marketing",
        icon: "/img/social.png",
        description:
            "All sorts of digital marketing services including SMM, Email, Content, CRO, Influencer Marketing and many more",
        longDescription: "Our comprehensive digital marketing strategy is designed to amplify your brand's presence across all digital touchpoints. We focus on data-driven approaches to ensure every campaign delivers maximum ROI.",
        features: ["Social Media Management", "Email Marketing Campaigns", "Conversion Rate Optimization", "Influencer Partnerships", "Growth Hacking Strategies"]
    },
    {
        title: "SEO Optimization",
        icon: "/img/seo.png",
        description:
            "Improve search visibility and ranking on Google.",
        longDescription: "Unlock organic growth through strategic search engine optimization. We go beyond keywords to build technical authority and content relevance that search engines love.",
        features: ["Technical SEO Audits", "Keyword Research & Strategy", "On-Page Optimization", "Backlink Building", "Performance Tracking"]
    },
    {
        title: "Web Development",
        icon: "/img/social.png",
        description:
            "High-performance, scalable websites and applications.",
        longDescription: "We build modern, responsive, and blazing-fast websites using the latest technologies. Our development process focuses on scalability, security, and exceptional user experience.",
        features: ["Custom Web Applications", "E-commerce Solutions", "Content Management Systems", "API Integrations", "Progressive Web Apps"]
    },
    {
        title: "Mobile Applications",
        icon: "/img/social.png",
        description:
            "User-friendly mobile apps with modern UI/UX.",
        longDescription: "Transform your ideas into powerful mobile experiences. We develop native and cross-platform mobile apps that offer seamless performance and intuitive user interfaces.",
        features: ["iOS & Android Development", "React Native Apps", "App Store Optimization", "User Experience (UX) Design", "Backend Integration"]
    },
    {
        title: "Chatbot Development",
        icon: "/img/social.png",
        description:
            "Automated customer engagement and support solutions.",
        longDescription: "Enhance customer satisfaction and streamline support with intelligent automation. Our chatbots leverage AI to provide instant, helpful responses 24/7.",
        features: ["AI-Powered Responses", "Multi-platform Integration", "Lead Generation Hooks", "Natural Language Processing", "Support Automation"]
    },
    {
        title: "Branding & Design",
        icon: "/img/social.png",
        description:
            "Logos, visual identity, and brand storytelling.",
        longDescription: "Your brand is more than just a logo. We help you define your unique identity and tell a compelling story that resonates with your target audience.",
        features: ["Logo & Brand Guidelines", "Visual Identity Design", "Brand Messaging", "Print Media Assets", "UI/UX Prototyping"]
    },
    {
        title: "Content Creation",
        icon: "/img/social.png",
        description:
            "Blogs, videos, graphics, and digital media content.",
        longDescription: "Engage your audience with high-quality, relevant content. We create multimedia assets that inform, entertain, and convert your target market.",
        features: ["Copywriting & Blogging", "Video Production", "Graphic Design", "Motion Graphics", "Content Strategy Planning"]
    },
    {
        title: "Sales & Marketing",
        icon: "/img/seo.png",
        description:
            "Integrated strategies to convert leads into customers.",
        longDescription: "Bridging the gap between marketing and sales to drive revenue. We implement tools and strategies that ensure your sales funnel is efficient and effective.",
        features: ["Sales Funnel Optimization", "Lead Nurturing Workflows", "CRM Implementation", "Sales Enablement Tools", "Performance Analytics"]
    }
];