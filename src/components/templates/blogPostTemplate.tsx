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

                        <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium tracking-wide border-b border-gray-100 pb-8">
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
                        </div>
                    </header>

                    {/* Featured Image (if available, show it naturally below title) */}
                    {data.featuredImage && (
                        <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] relative">
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
                            className="prose prose-lg sm:prose-xl max-w-none 
                                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                                prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-10
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                                prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700
                                [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:mt-10 [&>h3]:mb-4"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </article>

                </div>
            </div>

            <Footer />
        </main>
    );
}
