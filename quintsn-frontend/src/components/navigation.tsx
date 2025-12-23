"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface NavItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesHover, setIsServicesHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
   
    {
      name: "Services",
      submenu: [
        { name: "Business Consultancy", href: "/businessConsultancy" },
        { name: "Application Implementation", href: "/appMaintenance" },
        { name: "Application Development", href: "/appDevelopment" },
        { name: "Digital Marketing", href: "/" },
        { name: "Artificial Inteligent (AI)", href: "/" },
      ],
    },
    { name: "Blog", href: "/blog" },
     { name: "About", href: "/aboutDetails" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border bg-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
              <div className="w-24 sm:w-32 md:w-40 h-8 sm:h-9 md:h-16 overflow-hidden rounded-lg">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 text-left">
            {navItems.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesHover(true)}
                  onMouseLeave={() => setIsServicesHover(false)}
                >
                  <button className="flex items-center px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all">
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
                  className="relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
                </motion.a>
              )
            )}

            <Button size="sm" className="ml-2 lg:ml-4" asChild>
              <a href="/contact">Schedule A Meeting</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-accent " 
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
                item.submenu ? (
                  <div key={item.name}>
                    <button
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isServicesOpen ? "rotate-180" : ""
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
                              className="block px-4 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
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
                    className="block px-4 py-3 text-sm font-medium transition-colors rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}

              <Button className="w-full mt-2" asChild>
                <a
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
