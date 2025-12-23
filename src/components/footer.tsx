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
} from "lucide-react";

type FooterLink = {
  name: string;
  href: string;
};

type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  link: string;
  color: string;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterLink[]> = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/aboutDetails" },
      { name: "Services", href: "/servicesDetails" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
    Applications: [
      { name: "SAP Business One", href: "/businessOne" },
      { name: "SAP by Design", href: "/sapDesign" },
      { name: "Microsoft Dynamic 365", href: "#services" },
      { name: "SAGE ERP 300", href: "#services" },
      { name: "Oracle Netsuit", href: "#services" },
    ],
  };

  const socialLinks: SocialLink[] = [
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

  return (
    <footer className="border-t border-border/50 bg-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-10 pb-5">
        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-[200px] rounded-lg">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>

            <p className="mb-2 text-[14px] leading-relaxed text-muted-foreground text-justify mr-10">
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
          <div className="space-y-6 text-sm">
            <h3 className="mb-4 font-semibold capitalize text-foreground">Contact</h3>

            <a
              href="mailto:sales@quintsn.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              sales@quintsn.com
            </a>

            <a
              href="tel:+971561289803"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              +971 561 289 803
            </a>

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>No:401, Mohammad Saleh al GURG, Dubai, UAE.</span>
            </div>
          </div>

          {/* Footer Navigation Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-2 font-semibold capitalize text-foreground">{section}</h3>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section – No space after copyright */}
        <div className="border-t ">
          <p className="text-xs text-muted-foreground text-center">
            Copyright © {currentYear} ERP & CRM Consulting Services | Powered by ERP & CRM Consulting Services
          </p>
        </div>
      </div>
    </footer>
  );
}
