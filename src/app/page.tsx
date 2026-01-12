export const dynamic = "force-dynamic";

import { getHomePage } from "@/lib/wordpress";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrollToTop";
import ScrollProgress from "@/components/scrollProgress";
import Home from "@/components/home";

export default async function HomePage() {
  const initialData = await getHomePage();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ScrollProgress />
      <Navigation />
      <Home initialData={initialData} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
