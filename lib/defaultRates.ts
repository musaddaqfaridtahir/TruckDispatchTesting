export interface RateItem {
  id?: string;
  equipment_type: string;
  rate_percentage: string;
  flat_fee: string;
  avg_rpm?: string;
  updated_at?: string;
  description?: string;
  badge?: string;
}

export const DEFAULT_RATES: RateItem[] = [
  {
    equipment_type: "53' Dry Van",
    rate_percentage: "5% - 7%",
    flat_fee: "$250 / week",
    avg_rpm: "$3.15/mi avg",
    description: "Full truckload general freight across national high-volume lanes with aggressive Rate Con negotiations.",
    badge: "Highest Demand",
  },
  {
    equipment_type: "Reefer (Temp-Controlled)",
    rate_percentage: "6% - 8%",
    flat_fee: "$275 / week",
    avg_rpm: "$4.90/mi avg",
    description: "Produce, frozen goods, and climate-sensitive freight requiring 24/7 temperature and load tracking.",
    badge: "Top RPM",
  },
  {
    equipment_type: "Flatbed",
    rate_percentage: "6% - 8%",
    flat_fee: "$275 / week",
    avg_rpm: "$4.85/mi avg",
    description: "Building materials, machinery, and open-deck freight with secure strapping/tarping rate premiums.",
    badge: "Industrial Freight",
  },
  {
    equipment_type: "Step Deck",
    rate_percentage: "7% - 9%",
    flat_fee: "$300 / week",
    avg_rpm: "$4.85/mi avg",
    description: "Specialized equipment, taller cargo, and over-dimensional freight maximizing gross load revenue.",
    badge: "Specialized",
  },
  {
    equipment_type: "Box Truck (26')",
    rate_percentage: "8% - 10%",
    flat_fee: "$250 / week",
    avg_rpm: "$1.50 to $1.95/mi avg",
    description: "Regional LTL, expedited freight, dock-high shipments, and local high-turnover cargo runs.",
    badge: "Expedited LTL",
  },
];
