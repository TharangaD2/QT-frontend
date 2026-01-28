import { Metadata } from 'next';
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd, getCategoryBySlug, getPostsByCategory, getPosts } from "@/lib/wordpress";
import CategoryClient from "@/components/CategoryClient";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
    const { type } = await searchParams;
    const path = type ? `/category?type=${type}` : "/category";
    const seoHead = await getRankMathSEO(path);

    if (seoHead) {
        return parseRankMathMetadata(seoHead);
    }

    return {
        title: type ? `${type} Insights` : "Insights",
    };
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

export default async function CategoryPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const { type } = await searchParams;

    // Fetch basic blog page layout/hero from ACF
    const data = await getPage("blog");
    const path = type ? `/category?type=${type}` : "/category";
    const seoHead = await getRankMathSEO(path);
    const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

    let fetchedPosts: WPPost[] = [];
    try {
        if (type && type !== "All") {
            const category = await getCategoryBySlug(type);
            if (category) {
                fetchedPosts = await getPostsByCategory(category.id);
            }
        } else {
            fetchedPosts = await getPosts(20);
        }
    } catch (err) {
        console.error("Error fetching category posts:", err);
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-gray-600">Failed to load blog content.</p>
            </div>
        );
    }

    // Map standard WP Posts to our Card format
    const cards = fetchedPosts.map((post: WPPost) => {
        let categoryName = "Insights";
        if (post._embedded?.['wp:term']) {
            const terms = post._embedded['wp:term'][0];
            if (terms && terms.length > 0) categoryName = terms[0].name;
        } else if (post.class_list) {
            const catClass = post.class_list.find((c: string) => c.startsWith('category-'));
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
        <>
            {jsonLdData.map((ld, index) => (
                <JsonLd key={index} data={ld} />
            ))}
            <CategoryClient
                data={data}
                cards={cards}
                loadingPosts={false}
                filterType={type || null}
            />
        </>
    );
}
