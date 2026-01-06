"use client";

import ThreeDImageRing from "./ui/imageRing";


export default function ImageRing() {
  const items = [
    { url: "/img/C3.jpg", label: "Business Consultancy", href: "/business-consultancy" },
    { url: "/img/C2.jpg", label: "App Implementation", href: "/application-implementation" },
    { url: "/img/C9.jpg", label: "App Development", href: "/application-development" },
    { url: "/img/C5.jpg", label: "Digital Marketing", href: "/" },
    { url: "/img/C10.jpg", label: "AI", href: "/" },
    { url: "/img/C6.jpg", label: "Blog", href: "/blog" },
    { url: "/img/C7.jpg", label: "SAP Business One", href: "/businessOne" },
    { url: "/img/C4.jpg", label: "SAP by design", href: "/" },
    { url: "/img/C1.jpg", label: "Microsoft", href: "/" },
    { url: "/img/C8.jpg", label: "SAGE ERP", href: "/" },

  ];

  return (
    <div className="w-full h-[600px] overflow-hidden">

      <ThreeDImageRing images={items} />
    </div>

  );
}
