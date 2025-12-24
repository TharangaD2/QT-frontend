import ServiceTemplate from "@/components/templates/serviceTemplate";
import { getPage } from "@/lib/wordpress";


export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;


  let displayData: any = null;

  try {
    // Fetch the "service" page from WordPress
    const wpPage = await getPage("service");

    if (wpPage && wpPage.acf) {
      const acf = wpPage.acf;
      const services = acf.services || [];

      // Map dynamic data based on serviceId
      let serviceAcf = null;
      if (serviceId === "appDevelopment") {
        serviceAcf = services[0];
      } else if (serviceId === "businessConsultancy") {
        serviceAcf = services[1];
      } else if (serviceId === "appMaintenance") {
        serviceAcf = services[2];
      }

      if (serviceAcf) {
        displayData = mapWpServiceData(serviceAcf, acf.logo_section);
      }
    }
  } catch (error) {
    console.error("Error fetching dynamic service data:", error);
  }

  // Fallback to static data if dynamic data is not available

  if (!displayData) {
    return <div className="p-20 text-center text-2xl">Service Not Found</div>;
  }

  return <ServiceTemplate data={displayData} />;
}

// Helper function to map WP ACF data to ServiceData format
function mapWpServiceData(serviceAcf: any, logoSection: any[]) {
  const hero = serviceAcf.hero_section?.[0];
  if (!hero) return null;

  // Map service sections (service_desc)
  const mappedSections = (serviceAcf.service_desc || [])
    .flatMap((sd: any) => sd.desc_data || [])
    .map((d: any) => ({
      title: d.desc_title,
      text: d.desc_para,
      image: d.desc_image?.url,
      imageSide: d.image_side,
    }));

  // Map reason section (reason_data_section)
  const reasonTitle = serviceAcf.reason_title;
  const featureItems = (serviceAcf.reason_data_section || []).map((r: any) => ({
    title: r.data_title,
    text: r.data_para,
    image: r.data_image?.url,
    imageSide: r.img_side,
  }));

  // Map technologies (logo_section)
  const logoData = logoSection?.[0];
  const techLogos = (logoData?.logo_icons || []).map((icon: any) => ({
    name: icon.logo_img?.title,
    logo: icon.logo_img?.url,
  }));

  return {
    title: hero.page_title,
    heroTitle: hero.hero_title,
    heroDescription: hero.hero_para, // Fixed: use hero_para
    heroImage: hero.hero_image?.url,
    sections: mappedSections,
    featureItems: featureItems,
    featureTitle: reasonTitle,
    technologies: techLogos.length > 0 ? techLogos : null,
    technologyTitle: logoData?.logo_title,
  };
}

