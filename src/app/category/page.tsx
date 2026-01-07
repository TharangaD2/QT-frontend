"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { getPage } from "@/lib/wordpress";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

interface WPPost {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    link: string;
    slug: string;
    class_list: string[];
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
        'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    };
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
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch basic blog page layout/hero from ACF
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

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        }>
            <CategoryContentWrapper data={data} />
        </Suspense>
    );
}

function CategoryContentWrapper({ data }: { data: WPBlogPage }) {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const [posts, setPosts] = useState<WPPost[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true);
            try {
                const { getCategoryBySlug, getPostsByCategory, getPosts } = await import("@/lib/wordpress");

                let fetchedPosts = [];
                if (type && type !== "All") {
                    const category = await getCategoryBySlug(type);
                    if (category) {
                        fetchedPosts = await getPostsByCategory(category.id);
                    }
                } else {
                    fetchedPosts = await getPosts(20);
                }
                setPosts(fetchedPosts);
            } catch (err) {
                console.error("Error fetching category posts:", err);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchPosts();
    }, [type]);

    return <BlogContent data={data} posts={posts} loadingPosts={loadingPosts} filterType={type} />;
}

// --- Blog Content Component (Presentational) ---
function BlogContent({ data, posts, loadingPosts, filterType }: { data: WPBlogPage; posts: WPPost[]; loadingPosts: boolean; filterType: string | null }) {
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

    // Map standard WP Posts to our Card format
    const cards = posts.map(post => {
        // Extract category name from class_list or embedded term
        let categoryName = "Insights";
        if (post._embedded?.['wp:term']) {
            const terms = post._embedded['wp:term'][0];
            if (terms && terms.length > 0) categoryName = terms[0].name;
        } else if (post.class_list) {
            const catClass = post.class_list.find(c => c.startsWith('category-'));
            if (catClass) categoryName = catClass.replace('category-', '').toUpperCase();
        }

        return {
            category: categoryName,
            card_title: post.title.rendered,
            card_desc: post.excerpt.rendered.replace(/<[^>]*>?/gm, ''), // Strip HTML
            card_image: {
                url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder-blog.jpg",
                alt: post.title.rendered,
                title: post.title.rendered
            },
            link_page: `/${post.slug}`
        };
    });

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
                                {filterType ? `${filterType} Insights` : hero?.hero_title}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-3xl mx-auto mb-10 text-lg sm:text-xl text-balance text-white/90 font-medium leading-relaxed"
                        >
                            {filterType ? `Explore our latest articles and insights about ${filterType}.` : hero?.hero_para}
                        </motion.p>
                    </motion.div>
                </section>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />

                <div className="container relative z-10 mx-auto mt-20">
                    {loadingPosts ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                            <p className="text-white/60">Fetching latest insights...</p>
                        </div>
                    ) : cards.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-[95rem]">
                            {cards.map((study, index) => (
                                <Link href={study.link_page || "#"} key={index} className="block w-full sm:w-[350px]">
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
                                        <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-500">
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
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                            </motion.div>

                                            {/* Overlay Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-5">
                                                {/* Category badge */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/90 text-white backdrop-blur-md mb-3 shadow-lg border border-white/20">
                                                        {study.category}
                                                    </span>
                                                </motion.div>

                                                {/* Title + Description */}
                                                <motion.div
                                                    className="space-y-2"
                                                >
                                                    <h3 className="flex items-center gap-2 text-xl font-bold text-white tracking-tight leading-tight">
                                                        <span
                                                            className="line-clamp-2"
                                                            dangerouslySetInnerHTML={{ __html: study.card_title }}
                                                        />
                                                        <motion.div
                                                            animate={{
                                                                opacity: hoveredIndex === index ? 1 : 0,
                                                                x: hoveredIndex === index ? 0 : -10,
                                                            }}
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-primary-foreground shrink-0" />
                                                        </motion.div>
                                                    </h3>

                                                    <p className="text-white/70 line-clamp-2 text-xs leading-relaxed font-medium">
                                                        {study.card_desc}
                                                    </p>
                                                </motion.div>
                                            </div>

                                            {/* Hover Border Glow */}
                                            <motion.div
                                                className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none rounded-2xl group-hover:opacity-100 border-2 border-primary/50"
                                            />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-white/60 text-xl">No posts found for this category.</p>
                            <Link href="/blog" className="mt-8 inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/80 transition-all">
                                Back to Blog
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}
