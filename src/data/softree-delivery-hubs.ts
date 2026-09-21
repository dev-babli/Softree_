export type PartnerType = "Technology Partner" | "Delivery Partner" | "Strategic Partner";

export type SoftreeDeliveryHub = {
  id: string;
  partnerName: string;
  city: string;
  country: string;
  region: "India" | "Americas" | "Europe" | "Middle East" | "Asia Pacific";
  lat: number;
  lon: number;
  partnerType: PartnerType;
  areasOfCollaboration: string[];
  description: string;
  label: string;
  detail: string;
  logo?: string;
  isOffice?: boolean;
};

/** Global Technology & Delivery Partners (WGS-84 coordinates). Order = scroll tour. */
export const SOFTREE_DELIVERY_HUBS: SoftreeDeliveryHub[] = [
  {
    id: "sp-marketplace",
    partnerName: "SP Marketplace",
    city: "Penn Valley",
    country: "United States",
    region: "Americas",
    lat: 39.1963,
    lon: -121.1911,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Software development partner supporting Microsoft-based business solutions and enterprise digital transformation initiatives.",
    label: "Technology Partner",
    detail: "Penn Valley, California",
    logo: "/images/logo/sp-marketplace.svg",
  },
  {
    id: "wicked-point",
    partnerName: "Wicked Point",
    city: "Falls Church",
    country: "United States",
    region: "Americas",
    lat: 38.8858,
    lon: -77.1722,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Consumer services partner collaborating on Microsoft-powered business applications and digital service solutions.",
    label: "Technology Partner",
    detail: "Falls Church, Virginia",
    logo: "/images/logo/wickedpoint.svg",
  },
  {
    id: "nuvento-inc",
    partnerName: "Nuvento Inc",
    city: "Overland Park",
    country: "United States",
    region: "Americas",
    lat: 38.9822,
    lon: -94.6708,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "IT services and consulting partner supporting Microsoft technology programs, software development, and enterprise modernization.",
    label: "Technology Partner",
    detail: "12900 Metcalf Avenue, Suite 160",
    logo: "/images/logo/nuvento.svg",
  },
  {
    id: "export-control-group-international",
    partnerName: "Export Control Group International B.V",
    city: "Rotterdam",
    country: "Netherlands",
    region: "Europe",
    lat: 51.9244,
    lon: 4.4777,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Export services partner collaborating on Microsoft-based document management, compliance workflows, and business process automation.",
    label: "Technology Partner",
    detail: "Rotterdam Area",
    logo: "/images/logo/ecg.svg",
  },
  {
    id: "solariescomp",
    partnerName: "SolariesComp LLC",
    city: "Springfield",
    country: "United States",
    region: "Americas",
    lat: 38.7893,
    lon: -77.1872,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "US technology partner supporting Microsoft solutions, enterprise applications, and digital transformation programs.",
    label: "Technology Partner",
    detail: "Springfield, Virginia",
    logo: "/images/logo/solariescomp.svg",
  },
  {
    id: "cubeet",
    partnerName: "Cubeet",
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    lat: 1.3521,
    lon: 103.8198,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Software development partner supporting Microsoft-based applications and digital engineering initiatives across the Asia-Pacific region.",
    label: "Technology Partner",
    detail: "Singapore Partner Hub",
    logo: "/images/logo/cubeet.svg",
  },
  {
    id: "go-erp",
    partnerName: "GO-ERP",
    city: "Bristol",
    country: "United Kingdom",
    region: "Europe",
    lat: 51.4545,
    lon: -2.5879,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "IT services and consulting partner collaborating on Microsoft enterprise solutions, ERP systems, and business application delivery.",
    label: "Technology Partner",
    detail: "Bristol, England",
    logo: "/images/logo/goerp.svg",
  },
  {
    id: "adiva-information-technology",
    partnerName: "Adiva Information Technology LLC",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    region: "Middle East",
    lat: 24.4539,
    lon: 54.3773,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Modern Engineering",
    ],
    description:
      "IT services and consulting partner supporting enterprise technology and digital transformation initiatives in the Middle East.",
    label: "Technology Partner",
    detail: "Abu Dhabi Partner Hub",
    logo: "/images/logo/adiva.svg",
  },
  {
    id: "maxtube",
    partnerName: "MAXTUBE",
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    lat: 25.2048,
    lon: 55.2708,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Oil and gas industry partner collaborating on Microsoft-powered operational systems, workflow automation, and enterprise applications.",
    label: "Technology Partner",
    detail: "Dubai, United Arab Emirates",
    logo: "/images/logo/maxtube.svg",
  },
  {
    id: "jonians-corporation",
    partnerName: "Jonians Corporation",
    city: "Los Angeles",
    country: "United States",
    region: "Americas",
    lat: 34.0522,
    lon: -118.2437,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Microsoft",
    ],
    description:
      "Information technology services partner supporting Microsoft solutions, software engineering, and enterprise digital initiatives.",
    label: "Technology Partner",
    detail: "Los Angeles, California",
    logo: "/images/logo/jonians.svg",
  },
  {
    id: "emscale",
    partnerName: "Emscale",
    city: "Alpharetta",
    country: "United States",
    region: "Americas",
    lat: 34.0754,
    lon: -84.2941,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Modern Engineering",
    ],
    description:
      "Technology and internet partner supporting digital platforms, modern software solutions, and enterprise technology programs.",
    label: "Technology Partner",
    detail: "Alpharetta, Georgia",
    logo: "/images/logo/emscale_logo.png",
  },
  {
    id: "intellectt-inc",
    partnerName: "Intellectt Inc",
    city: "Iselin",
    country: "United States",
    region: "Americas",
    lat: 40.5693,
    lon: -74.3211,
    partnerType: "Technology Partner",
    areasOfCollaboration: [
      "Modern Engineering",
    ],
    description:
      "Engineering services partner supporting technology delivery, specialized engineering programs, and enterprise modernization initiatives.",
    label: "Technology Partner",
    detail: "Iselin, New Jersey",
    logo: "/images/logo/Intellectt_logo.png",
  },
];
