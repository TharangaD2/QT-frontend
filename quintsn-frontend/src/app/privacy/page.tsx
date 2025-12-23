"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

import { motion,useScroll,useTransform } from "framer-motion";
import { useRef } from "react";


export default function PrivacyPolicy() {
   const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });
  
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <main className="w-full overflow-hidden">
    <Navigation/>
    <div className="min-h-screen bg-gray-50 py-20 px-6">
        <section ref={ref} id="home" className="relative flex items-center justify-center  overflow-hidden ">
      {/* Animated Background Shapes with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden  bg-app-maintence bg-cover bg-center bg-no-repeat">
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
            Privacy Policy
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-muted-foreground text-balance text-white"
        >
         Quintessential Technologies is committed to protecting your privacy. 
        </motion.p>

        

       
      </motion.div>
    </section>
      <div className="max-w-4xl ml-28   p-8 md:p-12">
        
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Effective Date: <span className="font-medium">21st July 2024</span>
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          At <strong>Quintessential Technologies</strong>, we are committed to 
          protecting your privacy. This Privacy Policy explains how we 
          collect, use, disclose, and safeguard your personal information 
          when you visit our website <strong>www.quintsn.com</strong>.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          1. Information We Collect
        </h2>

        <p className="text-gray-700 mb-3 font-medium">a. Personal Information</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          When you interact with our Site, you may provide personal information such as:
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Any other details you provide when contacting us</li>
        </ul>

        <p className="text-gray-700 mb-3 font-medium">b. Non-Personal Information</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          We may automatically collect non-personal data, including:
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device details</li>
          <li>Pages visited</li>
          <li>Time spent on pages</li>
        </ul>

        <p className="text-gray-700 mb-3 font-medium">c. Third-Party Data</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Information from third-party analytics or social platforms 
          (e.g., Google Analytics).
        </p>

        {/* 2. How We Use Your Information */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          2. How We Use Your Information
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li>Provide and improve our services</li>
          <li>Respond to inquiries and support requests</li>
          <li>Process communications and business transactions</li>
          <li>Send marketing or promotional content (if opted-in)</li>
          <li>Enhance website performance and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        {/* 3. Sharing Information */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          3. How We Share Your Information
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          We do not sell or rent your personal information. We may share data with:
        </p>

        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li>
            <strong>Service Providers</strong>: Hosting, analytics, and marketing partners.
          </li>
          <li>
            <strong>Legal Authorities</strong>: If required by law or legal process.
          </li>
        </ul>

        {/* 4. Cookies */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          4. Cookies and Tracking Technologies
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Our Site may use cookies to improve user experience. You may choose 
          to disable cookies via browser settings, but some features may not work properly.
        </p>

        {/* 5. Data Security */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          5. Data Security
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          We apply industry-standard security measures to protect your information. 
          However, no method of data transmission online is completely secure.
        </p>

        {/* 6. Your Rights */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          6. Your Rights
        </h2>

        <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
          <li>Access or update your personal data</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your data</li>
          <li>Withdraw consent for marketing</li>
        </ul>

        <p className="text-gray-700 mb-4">
          To exercise your rights, contact us at{" "}
          <strong>sales@quintsn.com</strong>.
        </p>

        {/* 7. Third-Party Links */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          7. Third-Party Links
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Our Site may include links to external websites. We are not responsible for the 
          privacy practices of third-party sites.
        </p>

        {/* 8. Security Measures */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          8. Security Measures
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          We use encryption, secure servers, and other safeguards to protect your data. 
          Still, no digital system is 100% secure.
        </p>

        {/* 9. Changes */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          9. Changes to This Privacy Policy
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          We may revise this Privacy Policy. The updated version will reflect a new effective date:
          <strong> 1st January 2025</strong>.
        </p>

        {/* 10. Contact */}
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          10. Contact Us
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Quintessential Technologies<br />
          No: 401, Mohammad Saleh Al GURG, Dubai, UAE<br />
          Phone: <strong>+971 561 289 803</strong><br />
          Email: <strong>sales@quintsn.com</strong>
        </p>
      </div>
    </div>
    <Footer/>
    </main>
  );
}
