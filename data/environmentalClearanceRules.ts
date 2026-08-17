export type EnvironmentalClearanceStatus =
  | "APPLICABLE"
  | "NOT APPLICABLE"
  | "VERIFICATION REQUIRED";

export type EnvironmentalClearanceRule = {
  id: string;
  activityKeywords: string[];
  minimumCapacityTPA?: number;
  statusWhenThresholdMet: EnvironmentalClearanceStatus;
  source: string;
  remarks: string;
};

export const environmentalClearanceRules: EnvironmentalClearanceRule[] =
  [
    {
      id: "secondary-metallurgical-processing-3a",
      activityKeywords: [
        "secondary metallurgical processing",
        "secondary processing",
        "secondary reprocessing",
        "metal processing",
        "metal reprocessing",
        "melting",
        "refining",
        "casting",
        "alloy making",
        "aluminium scrap",
        "aluminium ingot",
      ],
      minimumCapacityTPA: 5000,
      statusWhenThresholdMet: "APPLICABLE",
      source:
        "EIA Notification Schedule 3(a) - Secondary Metallurgical Processing Industry",
      remarks:
        "Verified rule: all other non-toxic secondary metallurgical processing industries above 5000 tonnes per annum.",
    },
  ];