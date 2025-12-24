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
}

export const applicationsData: Record<string, ApplicationData> = {

};
