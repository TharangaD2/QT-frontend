"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, User } from "lucide-react";

interface BlogPostTemplateProps {
    data: {
        title: string;
        content: string;
        date: string;
        author?: string;
        category?: string;
        featuredImage?: string;
    };
}

export default function BlogPostTemplate({ data }: BlogPostTemplateProps) {
    const ref = useRef(null);

    return (
        <main className="w-full bg-background overflow-x-hidden">
            <Navigation />

            {/* Main Content Area */}
            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Title and Meta Info */}
                    <header className="mb-12">
                        {data.category && (
                            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                {data.category}
                            </span>
                        )}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                            <span dangerouslySetInnerHTML={{ __html: data.title }} />
                        </h1>

                        {/*<div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium tracking-wide border-b border-gray-100 pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            {data.author && (
                                <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                                    <User className="w-4 h-4 text-primary" />
                                    <span>{data.author}</span>
                                </div>
                            )}
                        </div>*/}
                    </header>

                    {/* Featured Image (if available, show it naturally below title) */}
                    {data.featuredImage && (
                        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] relative max-w-2xl mx-auto">
                            <Image
                                src={data.featuredImage}
                                alt={data.title}
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <article>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="wp-content max-w-none prose-lg sm:prose-xl"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </article>

                </div>
            </div>

            <Footer />
        </main>
    );
}