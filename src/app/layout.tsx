import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/socialSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qintella | Leading Software Development & IT Consulting Services",
    template: "%s | Qintella"
  },
  description: "Qintella provides cutting-edge software development, mobile apps, and IT consulting services to help businesses scale and innovate.",
  metadataBase: new URL("https://www.qintella.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Qintella | Leading Software Development & IT Consulting Services",
    description: "Qintella provides cutting-edge software development, mobile apps, and IT consulting services to help businesses scale and innovate.",
    url: "https://www.qintella.com",
    siteName: "Qintella",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/img/logo_icon.png",
        width: 800,
        height: 600,
        alt: "Qintella Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qintella | Leading Software Development & IT Consulting Services",
    description: "Qintella provides cutting-edge software development, mobile apps, and IT consulting services to help businesses scale and innovate.",
    images: ["/img/logo_icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Qintella",
  "url": "https://www.qintella.com",
  "logo": "https://www.qintella.com/img/logo_icon.png",
  "sameAs": [
    "https://www.linkedin.com/company/qintella",
    "https://www.instagram.com/qintella"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service"
  }
};

import JsonLd from "@/components/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN for social icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="icon" type="image/png" href="/img/logo_icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <JsonLd data={organizationData} />
        {children}

        <SocialSidebar />
      </body>
    </html>
  );
}
