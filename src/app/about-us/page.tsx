import { Metadata } from 'next';
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import AboutUsClient from "@/components/AboutUsClient";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
    const seoHead = await getRankMathSEO("/about-us");
    if (!seoHead) return { title: "About Us" };
    return parseRankMathMetadata(seoHead);
}

export default async function AboutUsPage() {
    // Note: The original code used getPage("123"), which might be a specific ID for the About Us page
    const data = await getPage("123");
    const seoHead = await getRankMathSEO("/about-us");
    const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

    if (!data || !data.acf) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Failed to load content.
            </div>
        );
    }

    return (
        <>
            {jsonLdData.map((ld, index) => (
                <JsonLd key={index} data={ld} />
            ))}
            <AboutUsClient data={data} />
        </>
    );
}