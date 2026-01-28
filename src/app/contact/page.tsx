import { Metadata } from 'next';
import { getPage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import ContactClient from "@/components/ContactClient";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const seoHead = await getRankMathSEO("/contact");
  if (!seoHead) return { title: "Contact Us" };
  return parseRankMathMetadata(seoHead);
}

export default async function ContactPage() {
  const data = await getPage("contact");
  const seoHead = await getRankMathSEO("/contact");
  const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Failed to load contact content.</p>
      </div>
    );
  }

  return (
    <>
      {jsonLdData.map((ld, index) => (
        <JsonLd key={index} data={ld} />
      ))}
      <ContactClient data={data} />
    </>
  );
}
