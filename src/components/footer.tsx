"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { getPage } from "@/lib/wordpress";
import { getIconComponent } from "@/lib/icons";

type FooterLink = {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
};

type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  link: string;
  color: string;
};

interface WPContactDetail {
  acf_fc_layout: "contact_details";
  contact_label: string;
  contact_data: string;
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

interface WPSubMenu {
  sub_menu: {
    title: string;
    url: string;
    target: string;
  } | string;
}

interface WPNavigationItem {
  menu_name: string;
  menu_link: {
    title: string;
    url: string;
    target: string;
  } | string;
  sub_menu: WPSubMenu[] | false;
}

interface WPLogo {
  url: string;
  alt: string;
}

interface WPNavigationData {
  acf_fc_layout: "nav_items";
  logo: WPLogo;
  nav_items: WPNavigationItem[];
  btn_text: string;
  btn_link: string;
}

interface WPContactPage {
  acf: {
    contact_data: WPContactDetail[];
    social_media: WPSocialMediaData[];
    navigation: WPNavigationData[];
  };
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [data, setData] = React.useState<WPContactPage | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const wpData = await getPage("contact");
        if (wpData) {
          setData(wpData);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navData = data?.acf.navigation?.[0];

  const dynamicServices = navData ? (
    navData.nav_items
      .find(item => item.menu_name.toLowerCase().includes("services"))
      ?.sub_menu || []
  )
    .filter((sub): sub is WPSubMenu => typeof sub.sub_menu === 'object')
    .map((sub) => {
      const subObj = sub.sub_menu as { title: string; url: string };
      return {
        name: subObj.title,
        href: subObj.url,
      };
    }) : [
    { name: "Business Consultancy", href: "/business-consultancy" },
    { name: "Application Implementation", href: "/application-implementation" },
    { name: "Application Development", href: "/application-development" },
    { name: "Digital Marketing", href: "/digital-marketing" },
    { name: "Artificial Inteligent (AI)", href: "/artificial-intelligent" },
  ];

  const dynamicApplications = navData ? (
    navData.nav_items
      .find(item => {
        const name = item.menu_name.toLowerCase();
        return name.includes("applications") || name.includes("erp");
      })
      ?.sub_menu || []
  )
    .filter((sub): sub is WPSubMenu => typeof sub.sub_menu === 'object')
    .map((sub) => {
      const subObj = sub.sub_menu as { title: string; url: string };
      return {
        name: subObj.title,
        href: subObj.url,
      };
    }) : [
    { name: "SAP Business One", href: "/businessOne" },
    { name: "SAP by Design", href: "/sapDesign" },
    { name: "Microsoft Dynamic 365", href: "#" },
    { name: "SAGE ERP 300", href: "#" },
    { name: "Oracle Netsuit", href: "#" },
  ];

  const footerLinks: Record<string, FooterLink[]> = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about-us" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
    Services: dynamicServices,
    Applications: dynamicApplications,
  };

  const wpSocialMedia = data?.acf.social_media || [];
  const wpContactData = data?.acf.social_media ? data.acf.contact_data : [];

  const defaultSocialLinks: SocialLink[] = [
    {
      icon: MessageCircle,
      name: "WhatsApp",
      link: "https://wa.me/971561289803",
      color: "hover:text-green-600",
    },
    {
      icon: Facebook,
      name: "Facebook",
      link: "https://facebook.com/QuintessentialTechnologies",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      link: "https://instagram.com/quintessentialtechnology",
      color: "hover:text-pink-600",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      link: "https://linkedin.com/company/quintessential-technologie",
      color: "hover:text-blue-700",
    },
  ];

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
    : defaultSocialLinks;

  const contactDetails = wpContactData.reduce((acc: any, item) => {
    const label = item.contact_label.toLowerCase();
    if (label.includes("email")) acc.email = item.contact_data;
    if (label.includes("phone")) acc.phone = item.contact_data;
    if (label.includes("address")) acc.address = item.contact_data;
    return acc;
  }, {
    email: "sales@quintsn.com",
    phone: "+971 561 289 803",
    address: "No:401, Mohammad Saleh al GURG, Dubai, UAE."
  });

  return (
    <footer className="border-t border-border/50 bg-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-10 pb-5">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-10 lg:gap-12">

          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-[200px] rounded-lg">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="object-contain w-full h-8 md:h-full"
                />
              </div>
            </Link>

            <p className="mb-2 text-[12px] md:text-[14px] leading-relaxed text-muted-foreground">
              Quintessential Technologies: ERP and Business Technology Consulting for Growth.
              We empower Trading & Service companies across MENA, North America, and MEA.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground transition-all ${social.color} hover:border-current`}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6 text-[12px] md:text-sm">
            <h3 className="mb-4 font-semibold capitalize text-foreground text-sm md:text-base">Contact</h3>

            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              {contactDetails.email}
            </a>

            <a
              href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {contactDetails.phone}
            </a>

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{contactDetails.address}</span>
            </div>
          </div>

          {/* Footer Navigation Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-2 font-semibold capitalize text-foreground text-sm md:text-base">{section}</h3>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.submenu ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                        >
                          {link.name}
                          <ChevronDown
                            className={`w-3 h-3 transition-transform ${isServicesOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isServicesOpen ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                          <ul className="pl-4 space-y-1 border-l border-border/50 ml-1">
                            {link.submenu.map((sub) => (
                              <li key={sub.name}>
                                <a
                                  href={sub.href}
                                  className="text-[13px] text-muted-foreground/80 hover:text-primary transition-colors"
                                >
                                  {sub.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[12px] md:text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section – No space after copyright */}
        <div className="border-t ">
          <p className="text-[10px] md:text-xs text-muted-foreground text-center">
            Copyright © {currentYear}  Quintessential LLC ERP Consulting Services, Developments, and AI Solutions. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
