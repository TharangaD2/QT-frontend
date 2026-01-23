export interface ACFImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
    "1536x1536": string;
    "1536x1536-width": number;
    "1536x1536-height": number;
    "2048x2048": string;
    "2048x2048-width": number;
    "2048x2048-height": number;
  };
}

export interface ACFVideo {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
}

export interface HeroSection {
  acf_fc_layout: "hero_data";
  hero_image: ACFImage | false;
  hero_vedio: ACFVideo | false;
  hero_vedio_url: string;
  hero_tag: string;
  hero_para: string;
  hero_highlight: string;
  hero_btn_text: string;
  hero_btn_link: string;
}

export interface AboutSection {
  acf_fc_layout: "about_section_data";
  aboout_tag: string;
  about_title: string;
  about_para: string;
  about_section_analytics: {
    count: string;
    count_label: string;
  }[];
  about_button_text: string;
  about_btn_link: string;
  about_sec_img: ACFImage;
}

export interface ServiceCard {
  service_image: ACFImage;
  service_title: string;
  card_para: string;
  full_para: FullParaData[] | string | false;
  arrow_img: ACFImage | false;
}

export interface FullParaPoint {
  point: string;
}

export interface FullParaKeyPoint {
  heading: string;
  shortpara: string;
}

export interface FullParaData {
  acf_fc_layout: "full_para_data";
  main_title: string;
  sub_title: string;
  para1: string;
  para2: string;
  point_title1: string;
  points: FullParaPoint[];
  subtitle2: string;
  keypoints: FullParaKeyPoint[];
  point_title2: string;
  booking_title: string;
  booking_para1: string;
  booking_para2: string;
  book_btn_text: string;
  book_btn_link: string;
}

export interface ServicesGrid {
  acf_fc_layout: "dm_services_data";
  service_tag: string;
  highlight_tag: string;
  service_title: string;
  dm_service_card: ServiceCard[];
}

export interface VideoSection {
  acf_fc_layout: "vedio_section_data";
  section_tag: string;
  section_title: string;
  section_btn_text: string;
  btn_link: string;
  vedio_clip: ACFVideo;
  vedio_url: string;
}

export interface ReasonItem {
  reason_title: string;
  reason_para: string;
}

export interface ReasonSection {
  acf_fc_layout: "reason_sec_data";
  tag: string;
  title: string;
  reason_para: string;
  reason_list: ReasonItem[];
}

export interface SubscribeSection {
  acf_fc_layout: "subscribe_data";
  tag: string;
  title: string;
  short_des: string;
  background: ACFVideo | false;
}

export interface DigitalMarketingACF {
  hero_section: HeroSection[];
  about_section: AboutSection[];
  services_grid: ServicesGrid[];
  vedio_section: VideoSection[];
  reason_section: ReasonSection[];
  subscribe_sec: SubscribeSection[];
}

export interface DigitalMarketingPageData {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: DigitalMarketingACF;
}
