import { GoogleGenerativeAI } from "@google/generative-ai";
import { industryCategories } from "@/data/industryCategories";
import {
environmentalClearanceRules,
type ECRule,
} from "@/data/environmentalClearanceRules";

import { sitingCriteria } from "@/data/sitingCriteria";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export type EnvironmentalClearanceStatus =
  | "APPLICABLE"
  | "NOT APPLICABLE"
  | "VERIFICATION REQUIRED";

type RegulatoryStatus =
  | "APPLICABLE"
  | "NOT APPLICABLE"
  | "EXEMPTED"
  | "VERIFICATION REQUIRED";

type CategoryMatch =
  (typeof industryCategories)[number] & {
    score: number;
    exactMatch: boolean;
    matchedWords: number;
  };

type CategoryDecision = {
  status: "CONFIRMED" | "VERIFICATION REQUIRED";
  category: string;
  basis: string;
};

type EnvironmentalClearanceDecision = {
  status: EnvironmentalClearanceStatus;
  matchedRule: ECRule | null;
  reason: string;
};

type SitingDecision = {
  isIndustrialEstate: boolean;
  criteria: string[];
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFieldValue(
  requirement: string,
  fieldLabel: string
) {
  const lines = requirement
    .split("\n")
    .map((line) => line.trim());

  const normalizedLabel =
    normalizeText(fieldLabel);

  const matchedLine = lines.find((line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return false;
    }

    const label = normalizeText(
      line.slice(0, separatorIndex)
    );

    return label === normalizedLabel;
  });

  if (!matchedLine) {
    return null;
  }

  const separatorIndex =
    matchedLine.indexOf(":");

  const value = matchedLine
    .slice(separatorIndex + 1)
    .trim();

  return value.length > 0 ? value : null;
}

function getProjectActivityText(
  requirement: string
) {
  const preferredFields = [
    "Project",
    "Project Name",
    "Proposed Activity",
    "Industry",
    "Industry Name",
    "Manufacturing Activity",
    "Activity",
  ];

  const values = preferredFields
    .map((field) =>
      getFieldValue(requirement, field)
    )
    .filter(
      (value): value is string =>
        Boolean(value)
    );

  if (values.length > 0) {
    return values.join(" ");
  }

  return requirement;
}

function getProjectLocationInGIDC(
  requirement: string
): boolean | null {
  const value = getFieldValue(
    requirement,
    "Plant Location in GIDC / Approved Industrial Estate?"
  );

  if (!value) {
    return null;
  }

  const normalizedValue =
    normalizeText(value);

  if (
    normalizedValue === "yes" ||
    normalizedValue === "y"
  ) {
    return true;
  }

  if (
    normalizedValue === "no" ||
    normalizedValue === "n"
  ) {
    return false;
  }

  return null;
}

function findRelevantIndustryCategory(
  requirement: string
): CategoryMatch | null {
  const projectActivity =
    getProjectActivityText(requirement);

  const normalizedActivity =
    normalizeText(projectActivity);

  if (!normalizedActivity) {
    return null;
  }

  const activityWords =
    normalizedActivity
      .split(" ")
      .filter((word) => word.length >= 3);

  const matches = industryCategories
    .map((item) => {
      const industryText =
        normalizeText(item.industry);

      const sectorText =
        normalizeText(item.sector);

      const searchableText =
        `${industryText} ${sectorText}`;

      const industryWords =
        industryText
          .split(" ")
          .filter(
            (word) => word.length >= 3
          );

      const exactMatch =
        normalizedActivity.includes(
          industryText
        ) ||
        industryText.includes(
          normalizedActivity
        );

      const matchedIndustryWords =
        industryWords.filter((word) =>
          normalizedActivity.includes(word)
        );

      const matchedActivityWords =
        activityWords.filter(
          (word) =>
            searchableText.includes(word)
        );

      const score =
        (exactMatch ? 100 : 0) +
        matchedIndustryWords.length * 10 +
        matchedActivityWords.length * 2;

      return {
        ...item,
        score,
        exactMatch,
        matchedWords:
          matchedIndustryWords.length,
      };
    })
    .filter(
      (item) =>
        item.exactMatch ||
        item.matchedWords >= 2
    )
    .sort(
      (a, b) => b.score - a.score
    );

  return matches[0] ?? null;
}

function getCategoryDecision(
  requirement: string
): CategoryDecision {
  const categoryMatch =
    findRelevantIndustryCategory(
      requirement
    );

  if (!categoryMatch) {
    return {
      status: "VERIFICATION REQUIRED",
      category: "VERIFICATION REQUIRED",
      basis:
        "The proposed activity could not be matched with the currently configured verified industry category data.",
    };
  }

  return {
    status: "CONFIRMED",
    category: categoryMatch.category,
    basis: categoryMatch.industry,
  };
}

function getConsentStatus(
  category: string
): {
  cte: RegulatoryStatus;
  cca: RegulatoryStatus;
} {
  const normalizedCategory =
    normalizeText(category);

  if (
    normalizedCategory ===
    "verification required"
  ) {
    return {
      cte: "VERIFICATION REQUIRED",
      cca: "VERIFICATION REQUIRED",
    };
  }

  if (normalizedCategory === "white") {
    return {
      cte: "EXEMPTED",
      cca: "EXEMPTED",
    };
  }

  if (
    normalizedCategory === "red" ||
    normalizedCategory === "orange" ||
    normalizedCategory === "green"
  ) {
    return {
      cte: "APPLICABLE",
      cca: "APPLICABLE",
    };
  }

  return {
    cte: "VERIFICATION REQUIRED",
    cca: "VERIFICATION REQUIRED",
  };
}

function hasIndustrialWastewater(
  requirement: string
) {
  const normalizedRequirement =
    normalizeText(requirement);

  const explicitNoWastewater = [
    "no industrial wastewater",
    "nil industrial wastewater",
    "zero industrial wastewater",
    "no process wastewater",
    "nil process wastewater",
    "zero process wastewater",
    "no industrial effluent",
    "nil industrial effluent",
    "zero industrial effluent",
    "zero liquid discharge",
    "zld",
    "closed loop system",
    "100 closed loop",
    "100 percent closed loop",
  ];

  if (
    explicitNoWastewater.some(
      (keyword) =>
        normalizedRequirement.includes(
          normalizeText(keyword)
        )
    )
  ) {
    return false;
  }

  const wastewaterIndicators = [
    "industrial wastewater",
    "process wastewater",
    "trade effluent",
    "industrial effluent",
    "effluent generation",
    "etp",
  ];

  return wastewaterIndicators.some(
    (keyword) =>
      normalizedRequirement.includes(
        normalizeText(keyword)
      )
  );
}
function extractCapacityTPA(
  requirement: string
): number | null {
  const normalizedRequirement =
    requirement.replace(/,/g, "");

  const capacityPatterns = [
    /production capacity\s*:\s*(\d+(?:\.\d+)?)\s*(?:tpa|tonnes?\s*per\s*annum|tons?\s*per\s*annum)/i,
    /capacity\s*:\s*(\d+(?:\.\d+)?)\s*(?:tpa|tonnes?\s*per\s*annum|tons?\s*per\s*annum)/i,
    /(\d+(?:\.\d+)?)\s*(?:tpa|tonnes?\s*per\s*annum|tons?\s*per\s*annum)/i,
  ];

  for (const pattern of capacityPatterns) {
    const match =
      normalizedRequirement.match(pattern);

    if (match?.[1]) {
      const value = Number(match[1]);

      if (
        Number.isFinite(value) &&
        value >= 0
      ) {
        return value;
      }
    }
  }

  const monthlyPatterns = [
    /production capacity\s*:\s*(\d+(?:\.\d+)?)\s*(?:mt|metric\s*tonnes?|tons?)\s*(?:per\s*)?month/i,
    /capacity\s*:\s*(\d+(?:\.\d+)?)\s*(?:mt|metric\s*tonnes?|tons?)\s*(?:per\s*)?month/i,
    /(\d+(?:\.\d+)?)\s*(?:mt|metric\s*tonnes?|tons?)\s*(?:per\s*)?month/i,
  ];

  for (const pattern of monthlyPatterns) {
    const match =
      normalizedRequirement.match(pattern);

    if (match?.[1]) {
      const monthlyValue =
        Number(match[1]);

      if (
        Number.isFinite(monthlyValue) &&
        monthlyValue >= 0
      ) {
        return monthlyValue * 12;
      }
    }
  }

  return null;
}

function ruleMatchesActivity(
  rule: ECRule,
  projectActivity: string
) {
  const normalizedActivity =
    normalizeText(projectActivity);

  if (!normalizedActivity) {
    return false;
  }

  const keywords =
    rule.activityKeywords ?? [];

  return keywords.some((keyword) => {
    const normalizedKeyword =
      normalizeText(keyword);

    return (
      normalizedKeyword.length > 0 &&
      normalizedActivity.includes(
        normalizedKeyword
      )
    );
  });
}

function getEnvironmentalClearanceDecision(
  requirement: string
): EnvironmentalClearanceDecision {
  const projectActivity =
    getProjectActivityText(requirement);

  const matchedRule =
    environmentalClearanceRules.find(
      (rule) =>
        ruleMatchesActivity(
          rule,
          projectActivity
        )
    ) ?? null;

  if (!matchedRule) {
    return {
      status: "VERIFICATION REQUIRED",
      matchedRule: null,
      reason:
        "The proposed activity could not be matched with a verified Environmental Clearance schedule activity from the currently available project information.",
    };
  }

  if (!matchedRule.hasThreshold) {
    return {
      status: "APPLICABLE",
      matchedRule,
      reason:
        matchedRule.specialConditions ??
        `The identified activity matches Environmental Clearance Schedule Item ${matchedRule.itemNo}: ${matchedRule.activityName}.`,
    };
  }

  const thresholdDetails =
    matchedRule.thresholds;

  if (!thresholdDetails) {
    return {
      status: "VERIFICATION REQUIRED",
      matchedRule,
      reason:
        matchedRule.specialConditions ??
        "Applicable Environmental Clearance threshold details require verification.",
    };
  }

  return {
    status: "VERIFICATION REQUIRED",
    matchedRule,
    reason:
      `The identified activity matches Environmental Clearance Schedule Item ${matchedRule.itemNo}: ${matchedRule.activityName}. ` +
      `Applicable thresholds: Category A – ${thresholdDetails.categoryA}; ` +
      `Category B – ${thresholdDetails.categoryB}. ` +
      `Please provide the required project capacity, area, production details or other applicable threshold parameters for final Environmental Clearance determination.`,
  };
}

function getSitingDecision(
  requirement: string,
  category: string
): SitingDecision {
  const isIndustrialEstate =
    getProjectLocationInGIDC(
      requirement
    );

  if (isIndustrialEstate === true) {
    return {
      isIndustrialEstate: true,
      criteria: [
        "• Not Applicable – The proposed unit is located within GIDC / an approved industrial estate.",
      ],
    };
  }

  const wastewaterGenerated =
    hasIndustrialWastewater(
      requirement
    );

  const criteria = [
  "• Residential Area / School / College: Minimum distance: 200 metres.",

  wastewaterGenerated
    ? "• River / Pond / Lake: Minimum distance: 75 metres where industrial wastewater is generated."
    : "• River / Pond / Lake: Minimum distance: 30 metres where industrial wastewater is not generated.",

  "• Natural Stream (Naala): A minimum distance of 12 metres or the width of the natural stream, whichever is greater, must be maintained. The original status of the natural stream must also be maintained.",

  "• Roads / Railways / Canals / Archaeological Sites: Required distance and other conditions must be maintained as per the norms, guidelines or requirements of the concerned competent authority.",

  "• Forest / Coastal / Sensitive Areas: Applicable siting distance and conditions must be maintained as per the relevant Government notifications and regulations applicable to the concerned area.",

  "• Other General Siting Conditions: Other applicable general siting conditions and project-specific requirements prescribed in the relevant siting criteria shall also be complied with, wherever applicable.",
];

  return {
    isIndustrialEstate: false,
    criteria,
  };
}

function getStatusLabel(
  status: string
) {
  return status
    .replace(/_/g, " ")
    .toUpperCase();
}

function buildProjectAtAGlance(
  requirement: string,
  categoryDecision: CategoryDecision,
  consentStatus: {
  cte: string;
  cca: string;
},
  ecDecision: EnvironmentalClearanceDecision
) {

  return [
    {
      label: "INDUSTRY CATEGORY",
      value:
        categoryDecision.category,
    },
    {
      label: "CTE",
      value: getStatusLabel(
        consentStatus.cte
      ),
    },
    {
      label: "CCA",
      value: getStatusLabel(
        consentStatus.cca
      ),
    },
    {
      label:
        "ENVIRONMENTAL CLEARANCE",
      value: getStatusLabel(
        ecDecision.status
    ),
    },
    {
  label:
    "CGWA PERMISSION",
  value: getStatusLabel(
    getCGWAStatus(requirement)
  ),
  },
  ];
  }

function buildVerificationRequired(
  categoryDecision: CategoryDecision,
  ecDecision: EnvironmentalClearanceDecision
) {
  const items: string[] = [];

  if (
    categoryDecision.status ===
    "VERIFICATION REQUIRED"
  ) {
    items.push(
      "Industry Category: " +
        categoryDecision.basis
    );
  }

  if (
    ecDecision.status ===
    "VERIFICATION REQUIRED"
  ) {
    items.push(
      "Environmental Clearance: " +
        ecDecision.reason
    );
  }

  return items;
}

function buildSitingCriteriaText(
  sitingDecision: SitingDecision
) {
  return sitingDecision.criteria;
}

function buildEnvironmentalClearanceText(
  ecDecision: EnvironmentalClearanceDecision
) {
  if (
    ecDecision.status ===
    "NOT APPLICABLE"
  ) {
    return {
      status: "NOT APPLICABLE",
      text: ecDecision.reason,
    };
  }

  if (
    ecDecision.status ===
    "APPLICABLE"
  ) {
    return {
      status: "APPLICABLE",
      text: ecDecision.reason,
    };
  }

  return {
    status: "VERIFICATION REQUIRED",
    text: ecDecision.reason,
  };
}

function buildIndustryCategoryText(
  categoryDecision: CategoryDecision
) {
  if (
    categoryDecision.status ===
    "VERIFICATION REQUIRED"
  ) {
    return {
      status: "VERIFICATION REQUIRED",
      text: categoryDecision.basis,
    };
  }

  return {
    status: categoryDecision.category,
    text:
      `The proposed activity matches the configured industry category entry: ${categoryDecision.basis}.`,
  };
}

function getCGWAStatus(
  requirement: string
): RegulatoryStatus {
  const waterSource =
    getFieldValue(
      requirement,
      "Water Source"
    ) ??
    "";

  const normalizedSource =
    waterSource.toLowerCase();

  const groundwaterKeywords = [
    "borewell",
    "bore well",
    "tubewell",
    "tube well",
    "groundwater",
    "ground water",
  ];

  const usesGroundwater =
    groundwaterKeywords.some(
      (keyword) =>
        normalizedSource.includes(keyword)
    );

  if (usesGroundwater) {
    return "APPLICABLE";
  }

  const nonGroundwaterKeywords = [
    "tanker",
    "gidc water",
    "municipal water",
    "municipality water",
    "piped water",
    "piping system",
    "water supply",
    "government water supply",
  ];

  const usesNonGroundwater =
    nonGroundwaterKeywords.some(
      (keyword) =>
        normalizedSource.includes(keyword)
    );

  if (usesNonGroundwater) {
    return "NOT APPLICABLE";
  }

  return "VERIFICATION REQUIRED";
}

function getRegulatoryAssessment(
  requirement: string
) {

  const categoryDecision =
    getCategoryDecision(requirement);

  const consentStatus =
    getConsentStatus(
      categoryDecision.category
    );

  const ecDecision =
    getEnvironmentalClearanceDecision(
      requirement
    );

  const sitingDecision =
    getSitingDecision(
      requirement,
      categoryDecision.category
    );

  const projectAtAGlance =
  buildProjectAtAGlance(
    requirement,
    categoryDecision,
    consentStatus,
    ecDecision
  );

  const verificationRequired =
    buildVerificationRequired(
      categoryDecision,
      ecDecision
    );

  return {
    categoryDecision,
    consentStatus,
    ecDecision,
    sitingDecision,
    projectAtAGlance,
    verificationRequired,
  };
}

export function analyzeRegulatoryApplicability(
  requirement: string
) {
  const assessment =
    getRegulatoryAssessment(
      requirement
    );

  const industryCategory =
    buildIndustryCategoryText(
      assessment.categoryDecision
    );

  const environmentalClearance =
    buildEnvironmentalClearanceText(
      assessment.ecDecision
    );

  return {
    industryCategory,
    cte: {
      status: getStatusLabel(
        assessment.consentStatus.cte
      ),
    },
    cca: {
      status: getStatusLabel(
        assessment.consentStatus.cca
      ),
    },
    environmentalClearance,
    sitingCriteria:
      buildSitingCriteriaText(
        assessment.sitingDecision
      ),
    verificationRequired:
      assessment.verificationRequired,
    projectAtAGlance:
      assessment.projectAtAGlance,
  };
}

function cleanAIResponse(
  text: string
) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

async function generateAIText(
  prompt: string
) {
  try {
    const result =
      await model.generateContent(
        prompt
      );

    return cleanAIResponse(
      result.response.text()
    );
  } catch {
    return null;
  }
}

export async function generateProfessionalEmail(
  projectName: string,
  projectLocation: string,
  regulatorySummary: string
) {
  const prompt = `
Write a concise and professional client email.

Project Name:
${projectName}

Project Location:
${projectLocation}

Regulatory Summary:
${regulatorySummary}

Rules:
- Professional tone.
- Do not invent regulatory information.
- Use only the provided information.
- Keep the email clear and client-ready.
`;

  const aiText =
    await generateAIText(prompt);

  if (aiText) {
    return aiText;
  }

  return `Dear Sir/Madam,

Thank you for sharing the project details with GreenEnvis.

Please find below the preliminary environmental and regulatory review for the proposed project: ${projectName}.

Location: ${projectLocation}

${regulatorySummary}

This preliminary review is based on the currently available project information and configured regulatory decision rules. Any item marked as Verification Required should be confirmed after the required project or regulatory information becomes available.

Regards,
GreenEnvis`;
}

export async function generateWhatsAppMessage(
  projectName: string,
  projectLocation: string,
  regulatorySummary: string
) {
  const prompt = `
Write a short and professional WhatsApp message.

Project:
${projectName}

Location:
${projectLocation}

Regulatory Summary:
${regulatorySummary}

Rules:
- Keep it concise.
- Professional tone.
- Do not invent any information.
`;

  const aiText =
    await generateAIText(prompt);

  if (aiText) {
    return aiText;
  }

  return `GREENENVIS PROJECT REVIEW

Project: ${projectName}
Location: ${projectLocation}

${regulatorySummary}

This is a preliminary regulatory review based on the currently available project information. Items marked Verification Required should be confirmed with the required project or regulatory details.`;
}
export async function generateGreenEnvisFinalReview(
  requirement: string
) {
  const assessment =
    analyzeRegulatoryApplicability(
      requirement
    );

  const projectActivity =
    getProjectActivityText(
      requirement
    );

  const location =
    getFieldValue(
      requirement,
      "Plant Location"
    ) ??
    getFieldValue(
      requirement,
      "Location"
    ) ??
    "Not identified from available project information";

  const categoryText =
    assessment.industryCategory.text;

  const cteStatus =
    assessment.cte.status;

  const ccaStatus =
    assessment.cca.status;

  const ecStatus =
    assessment
      .environmentalClearance
      .status;

  const sitingText =
    assessment.sitingCriteria
      .map((item) => `- ${item}`)
      .join("\n");

  const verificationText =
    assessment.verificationRequired
      .map((item) => `- ${item}`)
      .join("\n");

  const regulatorySummary = [
    `Industry Category: ${assessment.industryCategory.status}`,
    `CTE: ${cteStatus}`,
    `CCA: ${ccaStatus}`,
    `Environmental Clearance: ${ecStatus}`,
  ].join("\n");

  const emailDraft =
    await generateProfessionalEmail(
      projectActivity,
      location,
      regulatorySummary
    );

  const whatsappMessage =
    await generateWhatsAppMessage(
      projectActivity,
      location,
      regulatorySummary
    );

  return {
    projectName: projectActivity,
    location,

    industryCategory: {
      status:
        assessment.industryCategory.status,
      details: categoryText,
    },

    cte: {
      status: cteStatus,
    },

    cca: {
      status: ccaStatus,
    },

    environmentalClearance: {
      status: ecStatus,
      details:
        assessment
          .environmentalClearance
          .text,
    },

    sitingCriteria: {
      status:
        assessment.sitingCriteria[0]?.startsWith(
          "Not Applicable"
        )
          ? "NOT APPLICABLE"
          : "APPLICABLE",
      details:
        assessment.sitingCriteria,
      text: sitingText,
    },

    verificationRequired:
      assessment.verificationRequired,

    projectAtAGlance:
      assessment.projectAtAGlance,

    emailDraft,

    whatsappMessage,

    finalReview: [
      `This report summarizes the initial regulatory status for the ${projectActivity}.`,

      `Industry Category: ${assessment.industryCategory.status}.`,

      `CTE: ${cteStatus}.`,

      `CCA: ${ccaStatus}.`,

      `Environmental Clearance: ${ecStatus}.`,

      assessment.verificationRequired
        .length > 0
        ? `Further verification is required for: ${assessment.verificationRequired.join(
            " "
          )}`
        : "The identified regulatory status has been determined from the currently available project information and configured verified decision rules.",
    ].join(" "),
  };
}

export function getProjectRegulatoryAssessment(
  requirement: string
) {
  return analyzeRegulatoryApplicability(
    requirement
  );
}

export function getIndustryCategoryDecision(
  requirement: string
) {
  return getCategoryDecision(
    requirement
  );
}

export function getEnvironmentalClearanceStatus(
  requirement: string
) {
  return getEnvironmentalClearanceDecision(
    requirement
  );
}

export function getProjectSitingCriteria(
  requirement: string
) {
  const categoryDecision =
    getCategoryDecision(
      requirement
    );

  return getSitingDecision(
    requirement,
    categoryDecision.category
  );
}
export async function analyzeSupportRequirement(
  requirement: string
): Promise<string> {
  const assessment =
    analyzeRegulatoryApplicability(
      requirement
    );

  const categoryDecision =
    getCategoryDecision(
      requirement
    );

  const ecDecision =
    getEnvironmentalClearanceDecision(
      requirement
    );

  const sitingDecision =
    getSitingDecision(
      requirement,
      categoryDecision.category
    );

  const cteStatus =
    getStatusLabel(
      assessment.cte.status
    );

  const ccaStatus =
    getStatusLabel(
      assessment.cca.status
    );

  const ecStatus =
    getStatusLabel(
      ecDecision.status
    );

  const sitingLines =
    sitingDecision.criteria.length > 0
      ? sitingDecision.criteria
          .map((item) => `- ${item}`)
          .join("\n")
      : "No applicable siting criteria could be identified from the available verified data.";

  const verificationLines =
    assessment.verificationRequired.length > 0
      ? assessment.verificationRequired
          .map((item) => `- ${item}`)
          .join("\n")
      : "No additional verification required from the currently available project information.";

   const otherRequirements =
    "No additional verified requirement identified at this stage.";

  const projectSummary =
    requirement
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        if (line.startsWith("•")) {
          return line;
        }

        const separatorIndex =
          line.indexOf(":");

        if (separatorIndex > -1) {
          const label =
            line
              .slice(0, separatorIndex)
              .trim();

          const value =
            line
              .slice(separatorIndex + 1)
              .trim();

          if (value) {
            return `• ${label}: ${value}`;
          }
        }

        return `  • ${line}`;
      })
      .join("\n");

  return [

    "PROJECT SUMMARY",
    "",
    projectSummary,
    "",
    "GREENENVIS REGULATORY REVIEW",
    "",
    `Industry Category: ${categoryDecision.category}`,
    `CTE: ${cteStatus}`,
    `CCA: ${ccaStatus}`,
    `Environmental Clearance: ${ecStatus}`,
    "",
    "SITING CRITERIA",
    "",
    sitingLines,
    "",
    "OTHER REQUIREMENTS",
    "",
    otherRequirements,
    "",
    "VERIFICATION REQUIRED",
    "",
    verificationLines,
    "",
    "GREENENVIS FINAL CONCLUSION",
    "",
    "Based on the project information provided and the applicable verified regulatory decision rules, the preliminary regulatory review has been completed.",
    "The applicable requirements and any items requiring further verification are listed above.",
  ].join("\n");
}