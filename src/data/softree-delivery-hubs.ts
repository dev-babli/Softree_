export type SoftreeDeliveryHub = {
  id: string;
  city: string;
  country: string;
  region: "India" | "Americas" | "Europe" | "Middle East" | "Asia Pacific";
  lat: number;
  lon: number;
  label: string;
  detail: string;
  isOffice?: boolean;
};

/** Verified Softree offices + active client delivery hubs (WGS-84). Order = scroll tour. */
export const SOFTREE_DELIVERY_HUBS: SoftreeDeliveryHub[] = [
  {
    id: "bengaluru",
    city: "Bengaluru",
    country: "India",
    region: "India",
    lat: 12.9716,
    lon: 77.5946,
    label: "India HQ",
    detail: "Prestige Tech Park",
    isOffice: true,
  },
  {
    id: "cuttack",
    city: "Cuttack",
    country: "India",
    region: "India",
    lat: 20.4625,
    lon: 85.8828,
    label: "India office",
    detail: "Odisha delivery center",
    isOffice: true,
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    country: "India",
    region: "India",
    lat: 17.385,
    lon: 78.4867,
    label: "Delivery hub",
    detail: "Enterprise programs",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    region: "India",
    lat: 19.076,
    lon: 72.8777,
    label: "Delivery hub",
    detail: "Enterprise programs",
  },
  {
    id: "san-francisco",
    city: "San Francisco",
    country: "United States",
    region: "Americas",
    lat: 37.7749,
    lon: -122.4194,
    label: "Americas HQ",
    detail: "28 Geary St, Suite 650",
    isOffice: true,
  },
  {
    id: "toronto",
    city: "Toronto",
    country: "Canada",
    region: "Americas",
    lat: 43.6532,
    lon: -79.3832,
    label: "Client hub",
    detail: "Americas delivery",
  },
  {
    id: "new-jersey",
    city: "New Jersey",
    country: "United States",
    region: "Americas",
    lat: 40.0583,
    lon: -74.4057,
    label: "Client hub",
    detail: "US East Coast",
  },
  {
    id: "bristol",
    city: "Bristol",
    country: "England",
    region: "Europe",
    lat: 51.4545,
    lon: -2.5879,
    label: "Client hub",
    detail: "United Kingdom",
  },
  {
    id: "amsterdam",
    city: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    lat: 52.3676,
    lon: 4.9041,
    label: "Client hub",
    detail: "Europe delivery",
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    region: "Middle East",
    lat: 25.2048,
    lon: 55.2708,
    label: "Middle East hub",
    detail: "UAE delivery",
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    lat: 1.3521,
    lon: 103.8198,
    label: "Client hub",
    detail: "Asia Pacific delivery",
  },
];
