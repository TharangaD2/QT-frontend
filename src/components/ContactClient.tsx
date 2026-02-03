"use client";

import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { getIconComponent } from "@/lib/icons";

interface WPImage {
    url: string;
    alt: string;
    title: string;
}

interface WPHeroData {
    acf_fc_layout: "hero_data";
    hero_title: string;
    hero_para: string;
    hero_image: WPImage;
}

interface WPContentData {
    acf_fc_layout: "data";
    left_title: string;
    right_title: string;
    social_title: string;
}

interface WPContactDetail {
    acf_fc_layout: "contact_details";
    contact_label: string;
    contact_data: string;
}

interface WPLocationData {
    acf_fc_layout: "location";
    label: string;
    location_url: string;
}

interface WPSocialMediaData {
    acf_fc_layout: "social_media_data";
    soical_icon: string;
    social_link: {
        title: string;
        url: string;
        target: string;
    };
}

interface WPContactPage {
    acf: {
        contact_page: WPHeroData[];
        content_data: WPContentData[];
        contact_data: WPContactDetail[];
        location_data: WPLocationData[];
        social_media: WPSocialMediaData[];
    };
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface ContactInfo {
    icon: React.ComponentType<any>;
    title: string;
    content: string;
    link: string;
}

interface SocialLink {
    icon: React.ComponentType<any>;
    name: string;
    link: string;
    color: string;
}

export default function ContactClient({ data }: { data: WPContactPage }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const sectionRef = useRef<HTMLElement | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success("Message sent successfully!", {
            description: "We'll get back to you as soon as possible.",
            icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitting(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const hero = data.acf.contact_page?.[0];
    const content = data.acf.content_data?.[0];
    const wpContactData = data.acf.contact_data || [];
    const wpSocialMedia = data.acf.social_media || [];
    const wpLocation = data.acf.location_data?.[0];

    const defaultContactInfo: ContactInfo[] = [
        {
            icon: Mail,
            title: "Email Us",
            content: "sales@quintsn.com",
            link: "mailto:sales@quintsn.com",
        },
        {
            icon: Phone,
            title: "Call Us",
            content: "+971 561 289 803",
            link: "tel:+971561289803",
        },
        {
            icon: MessageCircle,
            title: "Whatsapp",
            content: "+971 561 289 803",
            link: "https://wa.me/971561289803",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            content: "No:401, Mohammad Saleh al GURG, Dubai, UAE",
            link: "#",
        },
    ];

    const contactInfo: ContactInfo[] = wpContactData.length > 0
        ? wpContactData.map((item) => {
            let icon = Mail;
            let link = "#";
            const label = item.contact_label.toLowerCase();

            if (label.includes("email")) {
                icon = Mail;
                link = `mailto:${item.contact_data}`;
            } else if (label.includes("phone")) {
                icon = Phone;
                link = `tel:${item.contact_data.replace(/\s+/g, "")}`;
            } else if (label.includes("address")) {
                icon = MapPin;
            } else if (label.includes("whatsapp")) {
                icon = MessageCircle;
                link = `https://wa.me/${item.contact_data.replace(/\+/g, "").replace(/\s+/g, "")}`;
            }

            return {
                icon,
                title: item.contact_label,
                content: item.contact_data,
                link,
            };
        })
        : defaultContactInfo;

    const socialLinks: SocialLink[] = wpSocialMedia.length > 0
        ? wpSocialMedia.map((item) => {
            const icon = getIconComponent(item.soical_icon);
            const colorMap: Record<string, string> = {
                "dashicons-facebook-alt": "hover:text-blue-600",
                "dashicons-whatsapp": "hover:text-green-600",
                "dashicons-instagram": "hover:text-pink-600",
                "dashicons-linkedin": "hover:text-blue-700",
                "dashicons-email-alt": "hover:text-primary",
            };

            return {
                icon,
                name: item.social_link.title || item.soical_icon.replace("dashicons-", ""),
                link: item.social_link.url,
                color: colorMap[item.soical_icon] || "hover:text-primary",
            };
        })
        : [];

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <main className="w-full overflow-hidden">
            <Navigation isDarkBg={true} />
            <section ref={sectionRef} className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
                {hero?.hero_image?.url ? (
                    <Image
                        src={hero.hero_image.url}
                        alt={hero.hero_title || "Contact Us"}
                        fill
                        className="object-cover opacity-40"
                        priority
                        unoptimized
                    />
                ) : (
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" />
                )}

                <div className="relative z-10 max-w-5xl px-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm tracking-widest uppercase text-gray-300 mb-3"
                    >
                        {(hero as any)?.hero_tag || "Reach out to us"}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    >
                        {hero?.hero_title || "Contact Us"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-3xl mx-auto mt-6 text-sm md:text-xl text-white/90 px-4"
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
                            const contactSection = document.getElementById("contact-section");
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        {(hero as any)?.hero_btn_text || "Get In Touch"}
                    </motion.button>
                </div>
            </section>

            <section
                id="contact-section"
                className="relative py-20 overflow-hidden sm:py-28 bg-linear-to-b from-background via-accent/5 to-background"
            >

                <div className="absolute rounded-full top-20 left-10 w-96 h-96 bg-primary/5 blur-3xl" />
                <div className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-accent/5 blur-3xl" />

                <div
                    ref={ref}
                    className="relative z-10 px-4 mx-auto mt-16 max-w-7xl sm:px-6 lg:px-8"
                >
                    <div className="grid items-start gap-12 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 md:space-y-8"
                        >
                            <div>
                                <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold">
                                    {content?.left_title || "Contact Information"}
                                </h3>

                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <motion.a
                                            key={info.title}
                                            href={info.link}
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={
                                                isInView
                                                    ? { opacity: 1, y: 0, scale: 1 }
                                                    : { opacity: 0, y: 30, scale: 0.95 }
                                            }
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.1 + index * 0.08,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{ y: -8, scale: 1.03 }}
                                            className="flex w-full max-w-full gap-3 md:gap-4 p-3 md:p-4 border rounded-xl bg-card sm:max-w-[500px] border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                                        >
                                            <info.icon className="text-primary shrink-0" />
                                            <div>
                                                <h4 className="text-sm md:text-base font-medium">{info.title}</h4>
                                                <p className="text-xs md:text-sm text-muted-foreground break-words">
                                                    {info.content}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold">
                                    {content?.social_title || "Follow Us"}
                                </h3>
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border rounded-lg transition-colors ${social.color}`}
                                        >
                                            <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold">
                                {content?.right_title || "Send Us a Message"}
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="p-4 md:p-8 border rounded-2xl bg-card w-full max-w-full sm:max-w-[600px] border-border/50"
                            >
                                {Object.entries(formData).map(([key, val]) => {
                                    const isMessage = key === "message";
                                    const Component = isMessage ? Textarea : Input;

                                    return (
                                        <div key={key} className="mb-4">
                                            <label className="block mb-2 text-sm font-medium text-foreground capitalize">
                                                {key} <span className="text-red-500">*</span>
                                            </label>
                                            <Component
                                                name={key}
                                                value={val}
                                                onChange={handleChange}
                                                placeholder={`Enter your ${key}`}
                                                required
                                                className={`w-full ${isMessage ? "min-h-[140px] resize-none" : ""
                                                    }`}
                                            />
                                        </div>
                                    );
                                })}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-8 md:mt-16"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center h-[300px] sm:h-[350px] border rounded-xl mt-14 overflow-hidden border-border/50">
                        <iframe
                            title={wpLocation?.label || "Office Location - Dubai"}
                            src={wpLocation?.location_url || "https://maps.google.com/maps?q=No:%20401,%20Mohammad%20Saleh%20Al%20Gurg,%20Dubai,%20UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
