import { Metadata } from 'next';
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import BlogClient from "@/components/BlogClient";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const seoHead = await getRankMathSEO("/blog");
  if (!seoHead) return { title: "Blog" };
  return parseRankMathMetadata(seoHead);
}

export default async function BlogPage() {
  const data = await getPage("blog");
  const seoHead = await getRankMathSEO("/blog");
  const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Failed to load blog content.</p>
      </div>
    );
  }

  return (
    <>
      {jsonLdData.map((ld, index) => (
        <JsonLd key={index} data={ld} />
      ))}
      <BlogClient data={data} />
    </>
  );
}
