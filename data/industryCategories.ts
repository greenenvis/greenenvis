export type IndustryCategory = {
  id: string;
  sector: string;
  industry: string;
  category: "Red" | "Orange" | "Green" | "White";
  pollutionIndex?: number;
  remarks?: string;
  concernedDivision?: string;
};

export const industryCategories: IndustryCategory[] = [
  {
    id: "orange-secondary-metal-cleaner-fuel",
    sector:
      "Ferrous and Non-ferrous Metal Secondary Processing/Reprocessing",
    industry:
      "Ferrous and Non-ferrous metal (excluding lead, nickel, and manganese) secondary processing/reprocessing units involving different furnaces through melting, refining, casting and alloy-making using cleaner fuels/electricity",
    category: "Orange",
  },
  {
    id: "orange-aluminium-copper-scrap-oil-fired",
    sector:
      "Ferrous and Non-ferrous Metal Secondary Processing/Reprocessing",
    industry:
      "Aluminium and copper extraction from scrap using an oil-fired furnace (dry process only)",
    category: "Orange",
  },
];
