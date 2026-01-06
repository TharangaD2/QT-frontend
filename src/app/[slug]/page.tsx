import ApplicationTemplate from "@/components/templates/applicationTemplate";
import ServiceTemplate from "@/components/templates/serviceTemplate";
import { getPage } from "@/lib/wordpress";
import { applicationsData, ApplicationData, Feature } from "@/data/applicationsData";

interface WPImage {
    url: string;
    alt: string;
    title: string;
}

interface WPHeroData {
    page_title: string;
    hero_title: string;
    hero_para: string;
    hero_image: WPImage;
}

interface WPContentData {
    content_title: string;
    content_para: string;
    content_image: WPImage;
    description: string;
}

interface WPFeaturePoint {
    point_title: string;
    point_para: string;
}

interface WPFeatureData {
    feature_title: string;
    feature_para: string;
    feature_point: WPFeaturePoint[];
}

interface WPButtonData {
    button_label: string;
    button_file: {
        url: string;
    };
}

interface WPCustomerCard {
    customer_logo: WPImage;
    customer_name: string;
    customer_desc: string;
}

interface WPCustomerData {
    customer_sec_title: string;
    sec_para: string;
    customer_card: WPCustomerCard[];
}

interface WPReferenceData {
    reference_title: string;
    youtube_id: string;
}

interface WPApplication {
    applications_hero: WPHeroData[];
    content_section: WPContentData[];
    feature_section: WPFeatureData[];
    button_data: WPButtonData[];
    customer_data: WPCustomerData[];
    reference_section: WPReferenceData[];
}

export default async function CatchAllSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // 1. Try to handle as a Service first (based on known service IDs)
    const serviceIds = ["appDevelopment", "businessConsultancy", "appMaintenance", "ai"];
    if (serviceIds.includes(slug)) {
        try {
            const wpPage = await getPage("service");
            if (wpPage && wpPage.acf) {
                const acf = wpPage.acf;
                const services = acf.services || [];
                let serviceAcf = null;

                if (slug === "appDevelopment") {
                    serviceAcf = services[0];
                } else if (slug === "businessConsultancy") {
                    serviceAcf = services[1];
                } else if (slug === "appMaintenance") {
                    serviceAcf = services[2];
                } else if (slug === "ai") {
                    serviceAcf = services[3];
                }

                if (serviceAcf) {
                    const displayData = mapWpServiceData(serviceAcf, acf.logo_section);
                    if (displayData) {
                        return <ServiceTemplate data={displayData} />;
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching dynamic service data:", error);
        }
    }

    // 2. Try to handle as an Application
    let displayData: ApplicationData | null = null;
    try {
        const wpPage = await getPage("applications");
        if (wpPage && wpPage.acf) {
            const applications = wpPage.acf.applications as WPApplication[];
            if (applications && applications.length > 0) {
                let wpApp: WPApplication | undefined;

                if (slug === "businessOne") {
                    wpApp = applications[0];
                } else if (slug === "sapDesign") {
                    wpApp = applications[1];
                } else {
                    wpApp = applications.find(app =>
                        app.applications_hero?.[0]?.hero_title.toLowerCase().includes(slug.toLowerCase())
                    );
                }

                if (wpApp) {
                    displayData = mapWpApplicationData(wpApp, slug);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching dynamic application data:", error);
    }

    // Fallback to static application data
    if (!displayData) {
        displayData = (applicationsData as any)[slug];
    }

    if (displayData) {
        return (
            <>
                <head>
                    <title>{displayData.title}</title>
                </head>
                <ApplicationTemplate data={displayData} />
            </>
        );
    }

    // 3. 404 if neither
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600">Page "{slug}" not found.</p>
            </div>
        </div>
    );
}

// --- Mapping function for Applications ---
function mapWpApplicationData(wpApp: WPApplication, id: string): ApplicationData {
    const hero = wpApp.applications_hero?.[0];
    const content = wpApp.content_section?.[0];
    const features = wpApp.feature_section || [];
    const button = wpApp.button_data?.[0];
    const customer = wpApp.customer_data?.[0];
    const video = wpApp.reference_section?.[0];

    return {
        title: hero?.page_title || "Application",
        hero: {
            title: hero?.hero_title || "Application",
            description: hero?.hero_para || "",
            bgClass: `bg-${id}`, // Fallback class
            heroImage: hero?.hero_image?.url,
        },
        introduction: {
            title: content?.content_title || "",
            description: content?.content_para || "",
        },
        mainContent: {
            image: content?.content_image?.url || "",
            text: content?.description || "",
            features: features.map((f): Feature => ({
                title: f.feature_title,
                description: f.feature_para,
                subFeatures: (f.feature_point || [])
                    .filter(p => p.point_title && p.point_para)
                    .map(p => ({
                        title: p.point_title,
                        description: p.point_para,
                    })),
            })),
        },
        pdfLink: button ? {
            text: button.button_label,
            url: button.button_file?.url,
        } : undefined as any,
        customerSuccess: {
            title: customer?.customer_sec_title || "",
            description: customer?.sec_para || "",
            cards: (customer?.customer_card || []).map(c => ({
                img: c.customer_logo?.url,
                title: c.customer_name,
                text: c.customer_desc,
            })),
        },
        video: {
            title: video?.reference_title || "",
            youtubeId: video?.youtube_id || "",
        },
    };
}

// --- Mapping function for Services ---
function mapWpServiceData(serviceAcf: any, logoSection: any[]) {
    const hero = serviceAcf.hero_section?.[0];
    if (!hero) return null;

    const mappedSections = (serviceAcf.service_desc || [])
        .flatMap((sd: any) => sd.desc_data || [])
        .map((d: any) => ({
            title: d.desc_title,
            text: d.desc_para,
            image: d.desc_image?.url,
            imageSide: d.image_side,
        }));

    const reasonTitle = serviceAcf.reason_title;
    const featureItems = (serviceAcf.reason_data_section || []).map((r: any) => ({
        title: r.data_title,
        text: r.data_para,
        image: r.data_image?.url,
        imageSide: r.img_side,
    }));

    const logoData = logoSection?.[0];
    const techLogos = (logoData?.logo_icons || []).map((icon: any) => ({
        name: icon.logo_img?.title,
        logo: icon.logo_img?.url,
    }));

    return {
        title: hero.page_title,
        heroTitle: hero.hero_title,
        heroDescription: hero.hero_para,
        heroImage: hero.hero_image?.url,
        sections: mappedSections,
        featureItems: featureItems,
        featureTitle: reasonTitle,
        technologies: techLogos.length > 0 ? techLogos : null,
        technologyTitle: logoData?.logo_title,
    };
}
