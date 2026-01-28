
import { getHomePage, getRankMathSEO, parseRankMathMetadata, extractJsonLd } from "@/lib/wordpress";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrollToTop";
import ScrollProgress from "@/components/scrollProgress";
import Home from "@/components/home";
import JsonLd from "@/components/JsonLd";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seoHead = await getRankMathSEO("/");
  if (!seoHead) return {};
  return parseRankMathMetadata(seoHead);
}

export default async function HomePage() {
  const initialData = await getHomePage();
  const seoHead = await getRankMathSEO("/");
  const jsonLdData = seoHead ? extractJsonLd(seoHead) : [];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {jsonLdData.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <ScrollProgress />
      <Navigation />
      <Home initialData={initialData} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
