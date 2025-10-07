export interface Chalet {
  id: string;
  name: string;
  countryCode: string;
  city: string;
  address: string;
  defaultPrice: number;
  images: string[];
  providerId: string;
  verified: boolean;
  amenities?: string[];
  capacity?: number;
}

export interface ShippingCarrier {
  id: string;
  name: string;
  countryCode: string;
  services: string[];
  contact: string;
  website: string;
  logoPath: string;
}

export interface Provider {
  id: string;
  name: string;
  type: string;
  countryCode: string;
  verified: boolean;
  trustScore: number;
}

// Seed data - Chalets
export const CHALETS: Chalet[] = [
  // UAE Chalets
  {
    id: "ae-001",
    name: "شاليه دبي مارينا الفاخر",
    countryCode: "AE",
    city: "Dubai",
    address: "Dubai Marina - JBR Walk",
    defaultPrice: 850,
    images: ["/placeholder.svg"],
    providerId: "prov-101",
    verified: true,
    amenities: ["WiFi", "إطلالة بحرية", "مسبح خاص", "BBQ", "مواقف سيارات", "تكييف"],
    capacity: 8,
  },
  {
    id: "ae-002",
    name: "شاليه جميرا بيتش",
    countryCode: "AE",
    city: "Dubai",
    address: "Jumeirah Beach Residence",
    defaultPrice: 950,
    images: ["/placeholder.svg"],
    providerId: "prov-101",
    verified: true,
    amenities: ["شاطئ خاص", "WiFi", "مسبح", "جاكوزي", "غرفة ألعاب"],
    capacity: 10,
  },
  {
    id: "ae-003",
    name: "شاليه رأس الخيمة",
    countryCode: "AE",
    city: "Ras Al Khaimah",
    address: "Al Hamra Village",
    defaultPrice: 650,
    images: ["/placeholder.svg"],
    providerId: "prov-102",
    verified: true,
    amenities: ["إطلالة جبلية", "WiFi", "مسبح", "BBQ", "حديقة"],
    capacity: 6,
  },
  {
    id: "ae-004",
    name: "شاليه أم القيوين",
    countryCode: "AE",
    city: "Umm Al Quwain",
    address: "UAQ Marina",
    defaultPrice: 550,
    images: ["/placeholder.svg"],
    providerId: "prov-102",
    verified: true,
    amenities: ["شاطئ", "WiFi", "مطبخ مجهز", "BBQ"],
    capacity: 8,
  },
  // Saudi Arabia Chalets
  {
    id: "sa-001",
    name: "شاليه العلا التراثي",
    countryCode: "SA",
    city: "AlUla",
    address: "مدائن صالح",
    defaultPrice: 750,
    images: ["/placeholder.svg"],
    providerId: "prov-201",
    verified: true,
    amenities: ["إطلالة صحراوية", "WiFi", "مجلس عربي", "موقد نار", "تراس"],
    capacity: 10,
  },
  {
    id: "sa-002",
    name: "شاليه جدة البحري",
    countryCode: "SA",
    city: "Jeddah",
    address: "شاطئ أبحر الشمالية",
    defaultPrice: 800,
    images: ["/placeholder.svg"],
    providerId: "prov-201",
    verified: true,
    amenities: ["شاطئ خاص", "مسبح", "BBQ", "WiFi", "مطبخ", "مواقف"],
    capacity: 12,
  },
  {
    id: "sa-003",
    name: "شاليه الدمام الساحلي",
    countryCode: "SA",
    city: "Dammam",
    address: "كورنيش الدمام",
    defaultPrice: 600,
    images: ["/placeholder.svg"],
    providerId: "prov-202",
    verified: true,
    amenities: ["إطلالة بحرية", "WiFi", "مسبح", "BBQ"],
    capacity: 8,
  },
  {
    id: "sa-004",
    name: "شاليه الطائف الجبلي",
    countryCode: "SA",
    city: "Taif",
    address: "الهدا",
    defaultPrice: 550,
    images: ["/placeholder.svg"],
    providerId: "prov-202",
    verified: false,
    amenities: ["إطلالة جبلية", "WiFi", "مدفأة", "حديقة", "BBQ"],
    capacity: 6,
  },
  // Kuwait Chalets
  {
    id: "kw-001",
    name: "شاليه الخيران الساحلي",
    countryCode: "KW",
    city: "Al Khiran",
    address: "منطقة الخيران",
    defaultPrice: 450,
    images: ["/placeholder.svg"],
    providerId: "prov-301",
    verified: true,
    amenities: ["شاطئ", "WiFi", "مسبح", "BBQ", "مطبخ"],
    capacity: 8,
  },
  {
    id: "kw-002",
    name: "شاليه الفنطاس",
    countryCode: "KW",
    city: "Kuwait City",
    address: "الفنطاس",
    defaultPrice: 400,
    images: ["/placeholder.svg"],
    providerId: "prov-301",
    verified: true,
    amenities: ["إطلالة بحرية", "WiFi", "مسبح", "مواقف"],
    capacity: 6,
  },
  {
    id: "kw-003",
    name: "شاليه الجهراء",
    countryCode: "KW",
    city: "Jahra",
    address: "منطقة الجهراء",
    defaultPrice: 350,
    images: ["/placeholder.svg"],
    providerId: "prov-302",
    verified: true,
    amenities: ["حديقة", "WiFi", "BBQ", "مجلس"],
    capacity: 10,
  },
  // Qatar Chalets
  {
    id: "qa-001",
    name: "شاليه اللؤلؤة الفاخر",
    countryCode: "QA",
    city: "Doha",
    address: "اللؤلؤة - قطر",
    defaultPrice: 900,
    images: ["/placeholder.svg"],
    providerId: "prov-401",
    verified: true,
    amenities: ["WiFi", "مسبح لا متناهي", "شاطئ خاص", "مطعم", "سبا"],
    capacity: 10,
  },
  {
    id: "qa-002",
    name: "شاليه الوكرة البحري",
    countryCode: "QA",
    city: "Al Wakrah",
    address: "الوكرة",
    defaultPrice: 700,
    images: ["/placeholder.svg"],
    providerId: "prov-401",
    verified: true,
    amenities: ["شاطئ", "WiFi", "مسبح", "BBQ"],
    capacity: 8,
  },
  // Oman Chalets
  {
    id: "om-001",
    name: "شاليه مسقط الجبلي",
    countryCode: "OM",
    city: "Muscat",
    address: "قرم - مسقط",
    defaultPrice: 480,
    images: ["/placeholder.svg"],
    providerId: "prov-501",
    verified: true,
    amenities: ["إطلالة جبلية", "WiFi", "مسبح", "BBQ", "حديقة"],
    capacity: 6,
  },
  {
    id: "om-002",
    name: "شاليه صلالة الاستوائي",
    countryCode: "OM",
    city: "Salalah",
    address: "المغسيل - صلالة",
    defaultPrice: 520,
    images: ["/placeholder.svg"],
    providerId: "prov-501",
    verified: true,
    amenities: ["شاطئ", "WiFi", "حديقة استوائية", "BBQ"],
    capacity: 8,
  },
  {
    id: "om-003",
    name: "شاليه نزوى التراثي",
    countryCode: "OM",
    city: "Nizwa",
    address: "نزوى",
    defaultPrice: 400,
    images: ["/placeholder.svg"],
    providerId: "prov-502",
    verified: false,
    amenities: ["تصميم تقليدي", "WiFi", "مجلس عماني", "حديقة"],
    capacity: 8,
  },
  // Bahrain Chalets
  {
    id: "bh-001",
    name: "فيلا درة البحرين الفاخرة",
    countryCode: "BH",
    city: "Manama",
    address: "السيف - المنامة",
    defaultPrice: 650,
    images: ["/placeholder.svg"],
    providerId: "prov-601",
    verified: true,
    amenities: ["إطلالة بحرية", "WiFi", "مسبح خاص", "جاكوزي", "مواقف"],
    capacity: 8,
  },
  {
    id: "bh-002",
    name: "شاليه عراد البحري",
    countryCode: "BH",
    city: "Muharraq",
    address: "عراد",
    defaultPrice: 550,
    images: ["/placeholder.svg"],
    providerId: "prov-601",
    verified: true,
    amenities: ["شاطئ", "WiFi", "مسبح", "BBQ"],
    capacity: 6,
  },
];

// Seed data - Shipping Carriers
export const SHIPPING_CARRIERS: ShippingCarrier[] = [
  // UAE Carriers
  {
    id: "car-aramex-ae",
    name: "أرامكس Aramex",
    countryCode: "AE",
    services: ["standard", "express", "cod", "international"],
    contact: "+971-600-544000",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-ae",
    name: "فيديكس FedEx",
    countryCode: "AE",
    services: ["express", "international", "freight"],
    contact: "+971-4-204-5555",
    website: "https://www.fedex.com/ae",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-ae",
    name: "دي إتش إل DHL",
    countryCode: "AE",
    services: ["express", "international", "freight"],
    contact: "+971-800-4004",
    website: "https://www.dhl.com/ae",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-ups-ae",
    name: "يو بي إس UPS",
    countryCode: "AE",
    services: ["express", "standard", "international"],
    contact: "+971-4-407-7444",
    website: "https://www.ups.com/ae",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-empost-ae",
    name: "بريد الإمارات Emirates Post",
    countryCode: "AE",
    services: ["standard", "express", "international"],
    contact: "+971-600-599999",
    website: "https://www.emiratespost.ae",
    logoPath: "/placeholder.svg",
  },
  // Saudi Arabia Carriers
  {
    id: "car-smsa-sa",
    name: "سمسا SMSA Express",
    countryCode: "SA",
    services: ["standard", "express", "cod", "international"],
    contact: "+966-920-003344",
    website: "https://www.smsaexpress.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-aramex-sa",
    name: "أرامكس Aramex",
    countryCode: "SA",
    services: ["standard", "express", "cod", "international"],
    contact: "+966-920-020505",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-sa",
    name: "دي إتش إل DHL",
    countryCode: "SA",
    services: ["express", "international", "freight"],
    contact: "+966-920-004800",
    website: "https://www.dhl.com/sa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-sa",
    name: "فيديكس FedEx",
    countryCode: "SA",
    services: ["express", "international", "freight"],
    contact: "+966-920-033339",
    website: "https://www.fedex.com/sa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-naqel-sa",
    name: "ناقل Naqel Express",
    countryCode: "SA",
    services: ["standard", "express", "cod"],
    contact: "+966-920-000702",
    website: "https://www.naqel.com.sa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-zajil-sa",
    name: "زاجل Zajil",
    countryCode: "SA",
    services: ["standard", "express", "cod"],
    contact: "+966-920-000067",
    website: "https://www.zajil.com.sa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-spl-sa",
    name: "سبل SPL",
    countryCode: "SA",
    services: ["standard", "express", "freight"],
    contact: "+966-11-234-5678",
    website: "https://www.splonline.com",
    logoPath: "/placeholder.svg",
  },
  // Kuwait Carriers
  {
    id: "car-aramex-kw",
    name: "أرامكس Aramex",
    countryCode: "KW",
    services: ["standard", "express", "international"],
    contact: "+965-1-828-338",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-kw",
    name: "دي إتش إل DHL",
    countryCode: "KW",
    services: ["express", "international", "freight"],
    contact: "+965-1-805-805",
    website: "https://www.dhl.com/kw",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-kw",
    name: "فيديكس FedEx",
    countryCode: "KW",
    services: ["express", "international"],
    contact: "+965-2228-8880",
    website: "https://www.fedex.com/kw",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-alfares-kw",
    name: "الفارس AL Fares Cargo",
    countryCode: "KW",
    services: ["freight", "international", "land"],
    contact: "+965-2222-9999",
    website: "https://www.alfarescargo.com",
    logoPath: "/placeholder.svg",
  },
  // Qatar Carriers
  {
    id: "car-qpost-qa",
    name: "بريد قطر Qatar Post",
    countryCode: "QA",
    services: ["standard", "express", "international"],
    contact: "+974-4445-9999",
    website: "https://www.qatarpost.qa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-qa",
    name: "دي إتش إل DHL",
    countryCode: "QA",
    services: ["express", "international", "freight"],
    contact: "+974-4465-7333",
    website: "https://www.dhl.com/qa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-qa",
    name: "فيديكس FedEx",
    countryCode: "QA",
    services: ["express", "international"],
    contact: "+974-4462-9555",
    website: "https://www.fedex.com/qa",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-aramex-qa",
    name: "أرامكس Aramex",
    countryCode: "QA",
    services: ["standard", "express", "international"],
    contact: "+974-4032-7777",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  // Oman Carriers
  {
    id: "car-omanpost-om",
    name: "بريد عمان Oman Post",
    countryCode: "OM",
    services: ["standard", "express", "international"],
    contact: "+968-800-74444",
    website: "https://www.omanpost.om",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-aramex-om",
    name: "أرامكس Aramex",
    countryCode: "OM",
    services: ["standard", "express", "international"],
    contact: "+968-2479-0000",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-om",
    name: "دي إتش إل DHL",
    countryCode: "OM",
    services: ["express", "international", "freight"],
    contact: "+968-800-74345",
    website: "https://www.dhl.com/om",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-om",
    name: "فيديكس FedEx",
    countryCode: "OM",
    services: ["express", "international"],
    contact: "+968-2474-7474",
    website: "https://www.fedex.com/om",
    logoPath: "/placeholder.svg",
  },
  // Bahrain Carriers
  {
    id: "car-bahrainpost-bh",
    name: "بريد البحرين Bahrain Post",
    countryCode: "BH",
    services: ["standard", "express", "international"],
    contact: "+973-1729-6666",
    website: "https://www.bahrainpost.gov.bh",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-dhl-bh",
    name: "دي إتش إل DHL",
    countryCode: "BH",
    services: ["express", "international", "freight"],
    contact: "+973-1732-2222",
    website: "https://www.dhl.com/bh",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-aramex-bh",
    name: "أرامكس Aramex",
    countryCode: "BH",
    services: ["standard", "express", "international"],
    contact: "+973-1729-9333",
    website: "https://www.aramex.com",
    logoPath: "/placeholder.svg",
  },
  {
    id: "car-fedex-bh",
    name: "فيديكس FedEx",
    countryCode: "BH",
    services: ["express", "international"],
    contact: "+973-1733-0330",
    website: "https://www.fedex.com/bh",
    logoPath: "/placeholder.svg",
  },
];

export const getChaletsByCountry = (countryCode: string): Chalet[] => {
  return CHALETS.filter((c) => c.countryCode === countryCode);
};

export const getCarriersByCountry = (countryCode: string): ShippingCarrier[] => {
  return SHIPPING_CARRIERS.filter((c) => c.countryCode === countryCode);
};

export const getChaletById = (id: string): Chalet | undefined => {
  return CHALETS.find((c) => c.id === id);
};
