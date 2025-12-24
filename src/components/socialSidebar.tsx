"use client";

import { useEffect, useState } from "react";
import { getPage } from "@/lib/wordpress";

interface WPSocialMediaData {
    acf_fc_layout: "social_media_data";
    soical_icon: string;
    social_link: {
        title: string;
        url: string;
        target: string;
    };
}

export default function SocialSidebar() {
    const [socials, setSocials] = useState<WPSocialMediaData[]>([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const wpData = await getPage("contact");
                if (wpData?.acf?.social_media) {
                    setSocials(wpData.acf.social_media);
                }
            } catch (error) {
                console.error("Failed to fetch sidebar socials:", error);
            }
        };
        fetchSocials();
    }, []);

    const getSidebarClass = (icon: string) => {
        if (icon.includes("facebook")) return "facebook";
        if (icon.includes("instagram")) return "instagram";
        if (icon.includes("linkedin")) return "linkedin";
        if (icon.includes("whatsapp")) return "whatsapp";
        if (icon.includes("email") || icon.includes("envelope")) return "email";
        return "";
    };

    const getFontAwesomeIcon = (icon: string) => {
        if (icon.includes("facebook")) return "fab fa-facebook-f";
        if (icon.includes("instagram")) return "fab fa-instagram";
        if (icon.includes("linkedin")) return "fab fa-linkedin-in";
        if (icon.includes("whatsapp")) return "fab fa-whatsapp";
        if (icon.includes("email") || icon.includes("envelope")) return "fa-solid fa-envelope";
        return "fa-solid fa-link";
    };

    const getSocialName = (item: WPSocialMediaData) => {
        if (item.social_link.title) return item.social_link.title;
        const icon = item.soical_icon;
        if (icon.includes("facebook")) return "Facebook";
        if (icon.includes("instagram")) return "Instagram";
        if (icon.includes("linkedin")) return "LinkedIn";
        if (icon.includes("whatsapp")) return "WhatsApp";
        if (icon.includes("email") || icon.includes("envelope")) return "Email";
        return "Social";
    };

    if (socials.length === 0) {
        // Return original static fallback if no data yet (to avoid layout shift or empty sidebar)
        return (
            <div className="social-sidebar">
                <a href="https://facebook.com/QuintessentialTechnologies" className="facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                    <span className="ml-5">Facebook</span>
                </a>
                <a href="https://instagram.com/quintessentialtechnology" className="instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                    <span className="ml-5">Instagram</span>
                </a>
                <a href="https://linkedin.com/company/quintessential-technologie" className="linkedin" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                    <span className="ml-5">LinkedIn</span>
                </a>
                <a href="https://wa.me/971561289803" className="whatsapp" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                    <span className="ml-5">WhatsApp</span>
                </a>
                <a href="#schedule" className="meeting">
                    <i className="fa-solid fa-calendar-check"></i>
                    <span className="ml-5">Schedule Meeting</span>
                </a>
            </div>
        );
    }

    return (
        <div className="social-sidebar">
            {socials.map((item, index) => (
                <a
                    key={index}
                    href={item.social_link.url}
                    className={getSidebarClass(item.soical_icon)}
                    target={item.social_link.target || "_blank"}
                    rel="noopener noreferrer"
                >
                    <i className={getFontAwesomeIcon(item.soical_icon)}></i>
                    <span className="ml-5">{getSocialName(item)}</span>
                </a>
            ))}
            <a href="#schedule" className="meeting">
                <i className="fa-solid fa-calendar-check"></i>
                <span className="ml-5">Schedule Meeting</span>
            </a>
        </div>
    );
}
