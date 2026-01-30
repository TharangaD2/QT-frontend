import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import SocialSidebar from "@/components/socialSidebar";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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

        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1209898950573074');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1209898950573074&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LHNW4SRSPF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LHNW4SRSPF');
          `}
        </Script>
        <JsonLd data={organizationData} />
        {children}

        <SocialSidebar />
        <Toaster />
      </body>
    </html>
  );
}
