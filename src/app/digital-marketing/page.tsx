
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import DigitalMarketingClient from "@/components/DigitalMarketingClient";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const seoHead = await getRankMathSEO("/digital-marketing");
    if (!seoHead) return {};
    return parseRankMathMetadata(seoHead);
}

export default async function DigitalMarketing() {
    const pageData = await getPage("digital-marketing");
    const seoHead = await getRankMathSEO("/digital-marketing");
    const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

    if (!pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Failed to load content. Please try again later.</p>
            </div>
        );
    }

    return (
        <>
            {jsonLdData.map((data, index) => (
                <JsonLd key={index} data={data} />
            ))}
            <DigitalMarketingClient pageData={pageData} />
        </>
    );
}
