"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { getPage } from "@/lib/wordpress";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// --- Interfaces for WordPress Data ---
interface WPImage {
  url: string;
  alt: string;
  title: string;
}

interface WPHeroData {
  hero_title: string;
  hero_para: string;
  hero_image: WPImage;
}

interface WPCardData {
  category: string;
  card_title: string;
  card_desc: string;
  card_image: WPImage;
  link_page: string;
}

interface WPBlogPage {
  acf: {
    blog_hero: WPHeroData[];
    blog_card: WPCardData[];
  };
}

// --- Main Blog Page Component (Container) ---
export default function BlogPage() {
  const [data, setData] = useState<WPBlogPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wpData = await getPage("blog");
        if (wpData) {
          setData(wpData);
        }
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Failed to load blog content.</p>
      </div>
    );
  }

  return <BlogContent data={data} />;
}

// --- Blog Content Component (Presentational) ---
function BlogContent({ data }: { data: WPBlogPage }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generatedParticles = [...Array(12)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ref = useRef(null);

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const hero = data.acf.blog_hero?.[0];
  const cards = data.acf.blog_card || [];

  return (
    <main className="w-full overflow-hidden">
      <section
        id="case-studies"
        ref={sectionRef}
        className="relative min-h-screen px-6 py-24 overflow-hidden"
      >
        <Navigation />
        <section ref={ref} id="home" className="relative flex items-center justify-center overflow-hidden">
          {/* Animated Background Shapes with Parallax */}
          <motion.div style={{ y }} className="absolute inset-0 overflow-hidden bg-blog bg-cover bg-center bg-no-repeat">
            {hero?.hero_image?.url && (
              <Image
                src={hero.hero_image.url}
                alt={hero.hero_title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-black/40" />

            <motion.div
              className="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary/5 blur-3xl"
              animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full top-40 right-20 w-96 h-96 bg-accent/10 blur-3xl"
              animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full bottom-20 left-1/3 w-72 h-72 bg-primary/8 blur-3xl"
              animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [-20, 20], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
            />
          ))}

          {/* Content */}
          <motion.div style={{ opacity }} className="relative z-10 px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">
                {hero?.hero_title}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-balance text-white/90 font-medium leading-relaxed"
            >
              {hero?.hero_para}
            </motion.p>
          </motion.div>
        </section>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

        <div className="container relative z-10 mx-auto mt-20 px-4">

          {/* Masonry Grid */}
          <div className="grid gap-8 mx-auto md:grid-cols-2 lg:grid-cols-2 max-w-7xl">
            {cards.map((study, index) => (
              <Link href={`/category?type=${study.category}`} key={index} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="cursor-pointer group"
                >
                  <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                    {/* Background image */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {study.card_image?.url && (
                        <Image
                          src={study.card_image.url}
                          alt={study.card_title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </motion.div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      {/* Category badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/90 text-white backdrop-blur-md mb-4 shadow-lg border border-white/20">
                          {study.category}
                        </span>
                      </motion.div>

                      {/* Title + Description */}
                      <motion.div
                        className="space-y-3"
                      >
                        <h3 className="flex items-center gap-3 text-3xl font-extrabold text-white tracking-tight">
                          {study.card_title}
                          <motion.div
                            animate={{
                              opacity: hoveredIndex === index ? 1 : 0,
                              x: hoveredIndex === index ? 0 : -10,
                            }}
                          >
                            <ExternalLink className="w-6 h-6 text-primary-foreground" />
                          </motion.div>
                        </h3>

                        <p className="text-white/80 line-clamp-3 text-base leading-relaxed font-medium">
                          {study.card_desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Hover Border Glow */}
                    <motion.div
                      className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-3xl group-hover:opacity-100 border-2 border-primary/50"
                    />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
