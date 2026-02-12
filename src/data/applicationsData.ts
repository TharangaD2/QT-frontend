export interface SubFeature {
    title: string;
    description: string;
}

export interface Feature {
    title: string;
    description: string;
    subFeatures: SubFeature[];
}

export interface CustomerSuccessCard {
    img: string;
    title: string;
    text: string;
}

export interface Tab {
    label: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    image?: string;
}

export interface TabSection {
    tabs: Tab[];
}

export interface ApplicationData {
    title: string;
    hero: {
        title: string;
        description: string;
        bgClass: string;
        heroImage?: string;
    };
    introduction: {
        title: string;
        description: string;
    };
    mainContent: {
        image: string;
        text: string;
        features: Feature[];
    };
    pdfLink: {
        text: string;
        url: string;
    };
    customerSuccess: {
        title: string;
        description: string;
        cards: CustomerSuccessCard[];
    };
    video: {
        title: string;
        youtubeId: string;
    };
    tabSection?: TabSection;
    locationUrl?: string;
    quickContact?: {
        tag: string;
        title: string;
        para: string;
        btnText: string;
        btnLink: string;
    };
}

export const applicationsData: Record<string, ApplicationData> = {

};
