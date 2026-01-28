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
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <main className="w-full overflow-hidden">
            <section
                id="contact"
                className="relative py-20 overflow-hidden sm:py-28 bg-linear-to-b from-background via-accent/5 to-background"
            >
                <Navigation />
                <section
                    ref={ref}
                    id="home"
                    className="relative flex items-center justify-center overflow-hidden"
                >
                    <motion.div
                        style={{ y }}
                        className="absolute inset-0 overflow-hidden bg-cover bg-center bg-no-repeat"
                    >
                        {hero?.hero_image?.url && (
                            <Image
                                src={hero.hero_image.url}
                                alt={hero.hero_title || "Contact Us"}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40" />

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
                        style={{ opacity }}
                        className="relative z-10 px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
                        >
                            <span className="text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-white">
                                {hero?.hero_title || "Contact Us"}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-balance text-white"
                        >
                            {hero?.hero_para}
                        </motion.p>
                    </motion.div>
                </section>

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
                            className="space-y-8"
                        >
                            <div>
                                <h3 className="mb-6 text-2xl font-semibold">
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
                                            className="flex w-full max-w-full gap-4 p-4 border rounded-xl bg-card sm:max-w-[500px] border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                                        >
                                            <info.icon className="text-primary shrink-0" />
                                            <div>
                                                <h4 className="font-medium">{info.title}</h4>
                                                <p className="text-sm text-muted-foreground break-words">
                                                    {info.content}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    {content?.social_title || "Follow Us"}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-12 h-12 flex items-center justify-center border rounded-lg transition-colors ${social.color}`}
                                        >
                                            <social.icon />
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
                            <h3 className="mb-6 text-2xl font-semibold">
                                {content?.right_title || "Send Us a Message"}
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="p-6 sm:p-8 border rounded-2xl bg-card w-full max-w-full sm:max-w-[600px] border-border/50"
                            >
                                {Object.entries(formData).map(([key, val]) => {
                                    const isMessage = key === "message";
                                    const Component = isMessage ? Textarea : Input;

                                    return (
                                        <div key={key} className="mb-4">
                                            <Component
                                                name={key}
                                                value={val}
                                                onChange={handleChange}
                                                placeholder={key.toUpperCase()}
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
                                    className="w-full mt-16"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send className="ml-2" />
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
