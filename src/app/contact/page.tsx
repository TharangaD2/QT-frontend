"use client";

import { motion, useInView,useTransform ,useScroll} from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navigation from "@/components/navigation";

import Footer from "@/components/footer";

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

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const contactInfo: ContactInfo[] = [
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
        <head>
          <title>Contact Quintessential Technologies UAE | CRM & ERP Help</title>
        </head>

        <Navigation />
        <section ref={ref} id="home" className="relative flex items-center justify-center  overflow-hidden ">
      {/* Animated Background Shapes with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden  bg-contact bg-cover bg-center bg-no-repeat">
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
            Contact Us
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-muted-foreground text-balance text-white"
        >
          Connect with UAE’s Trusted CRM & ERP Solutions Provider Send Us an Inquiry
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

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>

                <div className="space-y-4 ">
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
      
                      className="flex w-full max-w-full gap-4 p-4 border rounded-xl bg-card sm:max-w-[500px]bg-card border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
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

              {/* SOCIAL */}
              <div>
                <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      className={`w-12 h-12 flex items-center justify-center border rounded-lg ${social.color}`}
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="mb-6 text-2xl font-semibold">Send Us a Message</h3>

              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 border rounded-2xl bg-card w-full max-w-full sm:max-w-[600px]"
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
                        className={`w-full ${
          isMessage
            ? "min-h-[140px] resize-none"
            : ""
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

          {/* MAP */}
          <div className="flex items-center justify-center h-[300px] sm:h-[350px] border rounded-xl mt-14 overflow-hidden">
            <iframe
              title="Office Location - Dubai"
              src="https://maps.google.com/maps?q=No:%20401,%20Mohammad%20Saleh%20Al%20Gurg,%20Dubai,%20UAE&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
