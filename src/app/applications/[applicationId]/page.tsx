import ApplicationTemplate from "@/components/templates/applicationTemplate";
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

export default async function DynamicApplicationPage({
    params,
}: {
    params: Promise<{ applicationId: string }>;
}) {
    const { applicationId } = await params;
    let displayData: ApplicationData | null = null;

    try {
        // Fetch the "applications" page from WordPress by slug
        const wpPage = await getPage("applications");

        if (wpPage && wpPage.acf) {
            const applications = wpPage.acf.applications as WPApplication[];

            if (applications && applications.length > 0) {
                // Find the application by ID or default to the first one for 'businessOne'
                let wpApp: WPApplication | undefined;

                if (applicationId === "businessOne") {
                    wpApp = applications[0];
                } else if (applicationId === "sapDesign") {
                    wpApp = applications[1]; // Assuming SAP Design is the second one in WP as well
                } else {
                    // Attempt to find by hero title if more exist
                    wpApp = applications.find(app =>
                        app.applications_hero?.[0]?.hero_title.toLowerCase().includes(applicationId.toLowerCase())
                    );
                }

                if (wpApp) {
                    displayData = mapWpApplicationData(wpApp, applicationId);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching dynamic application data:", error);
    }

    // Fallback to static data
    if (!displayData) {
        displayData = applicationsData[applicationId];
    }

    if (!displayData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-xl text-gray-600">Application "{applicationId}" not found.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <head>
                <title>{displayData.title}</title>
            </head>
            <ApplicationTemplate data={displayData} />
        </>
    );
}

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
                    .filter(p => p.point_title && p.point_para) // Filter out empty points
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
