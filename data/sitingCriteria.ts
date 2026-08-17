export type SitingCriteriaRecord = {
  id: string;
  title: string;
  category?: string[];
  appliesTo: string;
  criteria: string;
  status: "CONFIRMABLE" | "VERIFICATION_REQUIRED";
  source: string;
};

export const sitingCriteria: SitingCriteriaRecord[] = [
  {
    id: "railway-road-bridge-red",
    title: "Railway Area / Road / Bridge",
    category: ["Red"],
    appliesTo: "Red category industrial units outside GIDC / approved industrial estate",
    criteria:
      "Minimum distance: 500 metres.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "railway-road-bridge-orange",
    title: "Railway Area / Road / Bridge",
    category: ["Orange"],
    appliesTo:
      "Orange category industrial units outside GIDC / approved industrial estate",
    criteria:
      "Minimum distance: 200 metres.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "railway-road-bridge-green",
    title: "Railway Area / Road / Bridge",
    category: ["Green"],
    appliesTo:
      "Green category industrial units outside GIDC / approved industrial estate",
    criteria:
      "Minimum distance: 100 metres.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "water-body-red",
    title: "River / Pond / Lake / Reservoir",
    category: ["Red"],
    appliesTo:
      "Red category industrial units outside GIDC / approved industrial estate",
    criteria:
      "Minimum distance: 500 metres from the relevant water body.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "water-body-orange-wastewater",
    title: "River / Pond / Lake / Reservoir",
    category: ["Orange"],
    appliesTo:
      "Orange category industrial units outside GIDC / approved industrial estate where industrial wastewater discharge is involved",
    criteria:
      "Minimum distance: 15 metres from the relevant water body.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "water-body-orange-no-wastewater",
    title: "River / Pond / Lake / Reservoir",
    category: ["Orange"],
    appliesTo:
      "Orange category industrial units outside GIDC / approved industrial estate where industrial wastewater discharge is not involved",
    criteria:
      "Minimum distance: 30 metres from the relevant water body.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "water-body-green",
    title: "River / Pond / Lake / Reservoir",
    category: ["Green"],
    appliesTo:
      "Green category industrial units outside GIDC / approved industrial estate",
    criteria:
      "Minimum distance: 30 metres from the relevant water body.",
    status: "CONFIRMABLE",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "existing-industry-boundary-condition",
    title: "Existing Industrial Unit Boundary Condition",
    appliesTo:
      "Projects proposed near an existing industrial unit where the applicable boundary condition under the siting criteria is triggered",
    criteria:
      "The applicable minimum separation condition and related wastewater discharge condition must be checked as specified in the GPCB siting criteria.",
    status: "VERIFICATION_REQUIRED",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "road-railway-airport-authority-condition",
    title: "Road / Railway / Airport / Port / Defence Infrastructure",
    appliesTo:
      "Projects located near regulated transport or strategic infrastructure",
    criteria:
      "Where applicable, the location must also comply with the requirements prescribed by the concerned competent authority.",
    status: "VERIFICATION_REQUIRED",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "sensitive-area-condition",
    title: "Sensitive Area",
    appliesTo:
      "Projects located near notified sensitive areas or locations subject to specific restrictions",
    criteria:
      "The project location must comply with any distance or location restrictions separately notified by the competent authority.",
    status: "VERIFICATION_REQUIRED",
    source: "GPCB Siting Criteria Circular dated 05-06-2025",
  },

  {
    id: "gidc-approved-industrial-estate",
    title: "GIDC / Approved Industrial Estate",
    appliesTo:
      "Projects located within GIDC or an approved industrial estate",
    criteria:
      "Not Applicable – The proposed unit is located within GIDC / an approved industrial estate.",
    status: "CONFIRMABLE",
    source: "GreenEnvis application rule based on the provided GPCB siting criteria",
  },
];