import { Metadata } from 'next';
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import PrivacyClient from "@/components/PrivacyClient";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const seoHead = await getRankMathSEO("/privacy");
  if (!seoHead) return { title: "Privacy Policy" };
  return parseRankMathMetadata(seoHead);
}

export default async function PrivacyPage() {
  // The previous code was using ID 379 for Privacy Policy
  const data = await getPage(379);
  const seoHead = await getRankMathSEO("/privacy");
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
      <PrivacyClient data={data} />
    </>
  );
}
