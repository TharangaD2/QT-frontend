"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { getPage } from "@/lib/wordpress";

interface NavItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
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
    navigation: WPNavigationData[];
  };
}

export default function Navigation({ isDarkBg = false }: { isDarkBg?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesHover, setIsServicesHover] = useState(false);
  const [data, setData] = useState<WPContactPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wpData = await getPage("contact");
        if (wpData) {
          setData(wpData);
        }
      } catch (error) {
        console.error("Failed to fetch navigation data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navData = data?.acf.navigation?.[0];

  const navItems: NavItem[] = navData ? navData.nav_items.map((item) => {
    const navItem: NavItem = {
      name: item.menu_name,
      href: typeof item.menu_link === 'object' ? item.menu_link.url : (item.menu_link || "#"),
    };

    if (item.sub_menu && Array.isArray(item.sub_menu)) {
      navItem.submenu = item.sub_menu
        .filter((sub) => typeof sub.sub_menu === 'object')
        .map((sub) => {
          const subObj = sub.sub_menu as { title: string; url: string };
          return {
            name: subObj.title,
            href: subObj.url,
          };
        });
    }

    return navItem;
  }) : [
    { name: "Home", href: "/" },
    {
      name: "Services",
      submenu: [
        { name: "Business Consultancy", href: "/business-consultancy" },
        { name: "Application Implementation", href: "/application-implementation" },
        { name: "Application Development", href: "/application-development" },
        { name: "Digital Marketing", href: "/digital-marketing" },
        { name: "Artificial Inteligent (AI)", href: "/artificial-intelligent" },
      ],
    },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const logoUrl = navData?.logo?.url || "/img/logo.png";
  const btnText = navData?.btn_text || "Schedule A Meeting";
  const btnLink = navData?.btn_link || "/contact";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border bg-gray-200"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
              <div className="w-28 sm:w-48 md:w-50 h-10 sm:h-14 md:h-20 overflow-hidden rounded-lg">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 text-left">
            {navItems.map((item) =>
              item.submenu && item.submenu.length > 0 ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesHover(true)}
                  onMouseLeave={() => setIsServicesHover(false)}
                >
                  <button className={`flex items-center px-3 lg:px-4 py-2 text-sm font-medium transition-all ${isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : isDarkBg
                      ? "text-white hover:text-white/80"
                      : "text-muted-foreground hover:text-foreground"
                    }`}>
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>

                  <AnimatePresence>
                    {isServicesHover && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 w-56 lg:w-60 p-2 mt-2 bg-card border border-border rounded-lg shadow-lg"
                      >
                        {item.submenu.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors group ${isScrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : isDarkBg
                      ? "text-white hover:text-white/80"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
                </motion.a>
              )
            )}


          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors hover:bg-accent ${!isScrolled && isDarkBg ? "text-white" : ""
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t bg-card border-border text-left"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) =>
                item.submenu && item.submenu.length > 0 ? (
                  <div key={item.name}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-xs md:text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-1 space-y-1"
                        >
                          {item.submenu.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-2 text-xs md:text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                              onClick={() =>
                                setIsMobileMenuOpen(false)
                              }
                            >
                              {sub.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-xs md:text-sm font-medium transition-colors rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
