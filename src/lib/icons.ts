import {
    Compass,
    Eye,
    Heart,
    CircleCheckBig,
    BrainCircuit,
    Blocks,
    Lightbulb,
    Facebook,
    Instagram,
    Linkedin,
    MessageCircle,
    Mail,
    Phone,
    MapPin,
    LucideIcon,
    Globe,
} from "lucide-react";

export const getIconComponent = (dashicon: string): LucideIcon => {
    switch (dashicon) {
        case "dashicons-yes-alt":
            return CircleCheckBig;
        case "dashicons-reddit":
            return BrainCircuit;
        case "dashicons-lightbulb":
            return Lightbulb;
        case "dashicons-screenoptions":
            return Blocks;
        case "dashicons-admin-collapse":
            return Compass;
        case "dashicons-hidden":
            return Eye;
        case "dashicons-heart":
            return Heart;
        case "dashicons-facebook-alt":
            return Facebook;
        case "dashicons-instagram":
            return Instagram;
        case "dashicons-linkedin":
            return Linkedin;
        case "dashicons-whatsapp":
            return MessageCircle;
        case "dashicons-email-alt":
            return Mail;
        case "dashicons-phone":
            return Phone;
        case "dashicons-location-alt":
            return MapPin;
        case "dashicons-admin-site":
            return Globe;
        default:
            return CircleCheckBig;
    }
};
