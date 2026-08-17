"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

type ProjectField = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  required?: boolean;
};

type ReportSection = {
  title: string;
  content: string[];
};

const PROJECT_FIELDS: ProjectField[] = [
    {
    id: "plantLocationType",
    label:
      "Plant Location in GIDC / Approved Industrial Estate?",
    placeholder: "",
    value: "",
    required: true,
  },

  {
    id: "location",
    label: "Project Location",
    placeholder: "Example: Vatra GIDC, Bharuch, Gujarat",
    value: "",
  },
  {
    id: "industry",
    label: "Industry / Manufacturing Activity",
    placeholder:
      "Example: Manufacturing of Aluminium Ingots from Aluminium Scrap",
    value: "",
    required: true,
  },
  {
    id: "manufacturingProcess",
    label: "Complete Manufacturing Process",
    placeholder:
      "Describe the manufacturing process step-by-step from raw material to final product",
    value: "",
    required: true,
  },
  {
    id: "plantCapacity",
    label: "Plant / Production Capacity",
    placeholder: "Example: 2,000 TPA or 100 MT per Month",
    value: "",
  },
  {
    id: "rawMaterials",
    label: "Raw Materials",
    placeholder:
      "Example: Aluminium Scrap - 2,100 TPA, Flux - 20 TPA",
    value: "",
  },
  {
    id: "fuelDetails",
    label: "Fuel / Energy Source and Consumption",
    placeholder:
      "Example: Electricity for process, PNG for heating, Diesel for DG Set",
    value: "",
  },
  {
    id: "waterConsumption",
    label: "Total Water Consumption",
    placeholder: "Example: 2 KLD",
    value: "",
  },
  {
    id: "waterSource",
    label: "Water Source",
    placeholder:
      "Example: GIDC Supply, Municipal Supply, Borewell, Tanker, etc.",
    value: "",
  },
  {
    id: "wastewater",
    label: "Wastewater / Effluent Generation",
    placeholder:
      "Example: Only domestic sewage / Process effluent details, if any",
    value: "",
  },
  {
    id: "airPollution",
    label: "Air Pollution Sources / Emissions",
    placeholder:
      "Example: Furnace fumes, DG Set emissions, dust, process emissions",
    value: "",
  },
  {
    id: "solidWaste",
    label: "Solid / Hazardous Waste Generation",
    placeholder:
      "Example: Slag, used oil, rejected scrap, dust collection waste",
    value: "",
  },
  {
    id: "otherDetails",
    label: "Other Relevant Project Information",
    placeholder:
      "Provide any other environmental or regulatory information relevant to the project",
    value: "",
  },
];

function cleanText(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/g, "")
    .replace(/^[-•–]\s*/g, "")
    .trim();
}

function normalizeStatus(value: string) {
  return value
    .replace(/[\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function parseFinalReview(text: string): ReportSection[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const sectionTitles = [
    "PROJECT AT A GLANCE",
    "REGULATORY STATUS",
    "PROJECT APPLICABILITY",
    "ENVIRONMENTAL ASPECTS",
    "OTHER REQUIREMENTS",
    "SITING CRITERIA",
    "VERIFICATION REQUIRED",
    "KEY FINDINGS",
    "WHAT GREENENVIS HAS IDENTIFIED",
    "REGULATORY ITEMS TO VERIFY",
    "APPLICABILITY SUMMARY",
    "ACTION REQUIRED FROM CLIENT / CONSULTANT",
    "NEXT INFORMATION OR ACTION REQUIRED",
    "KEY FINDINGS FOR CLIENT",
    "GREENENVIS FINAL REVIEW",
    "GREENENVIS FINAL CONCLUSION",
    "GREENENVIS REVIEW",
    "GREENENVIS REGULATORY REVIEW",
  ];

  const sections: ReportSection[] = [];
  let currentSection: ReportSection | null = null;

  lines.forEach((rawLine) => {
    const line = cleanText(rawLine);

    const normalizedLine = line
      .replace(/^\d+\.\s*/, "")
      .replace(/:$/, "")
      .trim()
      .toUpperCase();

    const isSection = sectionTitles.includes(normalizedLine);

    if (isSection) {
      currentSection = {
        title: normalizedLine,
        content: [],
      };

      sections.push(currentSection);
      return;
    }

    if (!currentSection) {
      currentSection = {
        title: "GREENENVIS REVIEW",
        content: [],
      };

      sections.push(currentSection);
    }

    currentSection.content.push(line);
  });

  return sections;
}

function getStatusStyle(status: string) {
  const normalizedStatus = normalizeStatus(status);

  if (
    normalizedStatus === "APPLICABLE" ||
    normalizedStatus === "CONFIRMED"
  ) {
    return {
      background: "#ecfdf5",
      border: "#86efac",
      color: "#166534",
    };
  }

  if (
    normalizedStatus === "NOT APPLICABLE" ||
    normalizedStatus === "EXEMPTED"
  ) {
    return {
      background: "#eff6ff",
      border: "#93c5fd",
      color: "#1d4ed8",
    };
  }

  if (
    normalizedStatus.includes("VERIFICATION REQUIRED") ||
    normalizedStatus.includes("REVIEW REQUIRED")
  ) {
    return {
      background: "#fffbeb",
      border: "#fcd34d",
      color: "#92400e",
    };
  }

  if (
    normalizedStatus.includes("NOT DETERMINABLE") ||
    normalizedStatus.includes("NOT IDENTIFIED")
  ) {
    return {
      background: "#f8fafc",
      border: "#cbd5e1",
      color: "#475569",
    };
  }

  if (normalizedStatus === "IDENTIFIED") {
    return {
      background: "#f0f9ff",
      border: "#7dd3fc",
      color: "#0369a1",
    };
  }

  if (normalizedStatus === "ORANGE") {
    return {
      background: "#fff7ed",
      border: "#fdba74",
      color: "#c2410c",
    };
  }

  if (normalizedStatus === "RED") {
    return {
      background: "#fef2f2",
      border: "#fca5a5",
      color: "#b91c1c",
    };
  }

  if (normalizedStatus === "GREEN") {
    return {
      background: "#ecfdf5",
      border: "#86efac",
      color: "#15803d",
    };
  }

  if (normalizedStatus === "WHITE") {
    return {
      background: "#f8fafc",
      border: "#cbd5e1",
      color: "#475569",
    };
  }

  return {
    background: "#f8fafc",
    border: "#cbd5e1",
    color: "#475569",
  };
}

function StatusBadge({ value }: { value: string }) {
  const style = getStatusStyle(value);

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]"
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {value}
    </span>
  );
}

function getKeyValueLine(line: string) {
  const match = line.match(
    /^(Industry Category|CTE|CCA|Environmental Clearance|EC|CGWA|Groundwater Permission|Water Source|Air Emission|Air Emissions|Hazardous Waste|Solid Waste|Wastewater|Siting Criteria|Other Requirements|CATEGORY|STATUS):\s*(.+)$/i
  );

  if (!match) return null;

  return {
    label: match[1].trim(),
    value: match[2].trim(),
  };
}

function isStatusValue(value: string) {
  const normalizedValue = normalizeStatus(value);

  return [
    "APPLICABLE",
    "NOT APPLICABLE",
    "VERIFICATION REQUIRED",
    "EXEMPTED",
    "CONFIRMED",
    "IDENTIFIED",
    "NOT DETERMINABLE",
    "NOT IDENTIFIED FROM AVAILABLE INFORMATION",
    "ORANGE",
    "RED",
    "GREEN",
    "WHITE",
  ].includes(normalizedValue);
}

function ReportLine({ line }: { line: string }) {
  const trimmedLine = line.trim();

  const statusMatch = trimmedLine.match(/^STATUS:\s*(.+)$/i);

  if (statusMatch) {
    return (
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
          Status
        </span>

        <StatusBadge value={statusMatch[1].trim()} />
      </div>
    );
  }

  const itemMatch = trimmedLine.match(/^ITEM:\s*(.+)$/i);

  if (itemMatch) {
    return (
      <div className="mt-5 border-t border-slate-100 pt-5">
        <div className="text-sm font-bold text-slate-900">
          {itemMatch[1].trim()}
        </div>
      </div>
    );
  }

  const keyValue = getKeyValueLine(trimmedLine);

  if (keyValue) {
    const showBadge = isStatusValue(keyValue.value);

    return (
      <div className="mt-3 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {keyValue.label}
        </div>

        {showBadge ? (
          <StatusBadge value={keyValue.value} />
        ) : (
          <div className="text-sm font-semibold text-slate-800 sm:max-w-[70%] sm:text-right">
            {keyValue.value}
          </div>
        )}
      </div>
    );
  }

  const reviewMatch = trimmedLine.match(
    /^(GREENENVIS REVIEW|GREENENVIS FINDING|REVIEW|FINDING):\s*(.+)$/i
  );

  if (reviewMatch) {
    return (
      <div className="mt-3 rounded-xl border-l-4 border-[#0B4F84] bg-[#f4f8fc] px-4 py-3 text-sm leading-6 text-slate-700">
        {reviewMatch[2].trim()}
      </div>
    );
  }

  const verifyMatch = trimmedLine.match(
    /^(WHAT NEEDS TO BE VERIFIED|VERIFICATION NOTE|REASON):\s*(.+)$/i
  );

  if (verifyMatch) {
    return (
      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        {verifyMatch[2].trim()}
      </div>
    );
  }

  const findingHeading =
    trimmedLine.toUpperCase() === "CONFIRMED FINDINGS:" ||
    trimmedLine.toUpperCase() === "ITEMS REQUIRING VERIFICATION:" ||
    trimmedLine.toUpperCase() === "APPLICABLE:" ||
    trimmedLine.toUpperCase() === "NOT APPLICABLE:" ||
    trimmedLine.toUpperCase() === "OTHER VERIFIED REQUIREMENTS:";

  if (findingHeading) {
    return (
      <div className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B4F84]">
        {trimmedLine}
      </div>
    );
  }

  const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/);

  if (numberedMatch) {
    return (
      <div className="mt-2 flex items-start gap-3 text-sm leading-6 text-slate-700">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f1f8] text-[11px] font-bold text-[#0B4F84]">
          {trimmedLine.match(/^(\d+)\./)?.[1]}
        </span>

        <span>{numberedMatch[1]}</span>
      </div>
    );
  }

  const isBullet =
    trimmedLine.startsWith("-") ||
    trimmedLine.startsWith("•") ||
    trimmedLine.startsWith("–");

  if (isBullet) {
    return (
      <div className="mt-2 flex items-start gap-3 text-sm leading-6 text-slate-700">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B4F84]" />

        <span>{cleanText(trimmedLine)}</span>
      </div>
    );
  }

   return (
    <div className="mt-2 flex items-start gap-3 text-sm leading-6 text-slate-700">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B4F84]" />

      <span>{trimmedLine}</span>
    </div>

   );
}

function ProjectSummaryContent({
  projectData,
}: {
  projectData: Record<string, string>;
}) {
  const summaryGroups = [
    {
      title: "PROJECT LOCATION & ACTIVITY",
      items: [
        {
          label:
            "Plant Location in GIDC / Approved Industrial Estate",
          value: projectData.plantLocationType,
        },
        {
          label: "Project Location",
          value: projectData.location,
        },
        {
          label: "Industry / Manufacturing Activity",
          value: projectData.industry,
        },
      ],
    },
    {
      title: "MANUFACTURING PROCESS",
      items: [
        {
          label: "Complete Manufacturing Process",
          value: projectData.manufacturingProcess,
        },
      ],
    },
    {
      title: "PLANT & PRODUCTION DETAILS",
      items: [
        {
          label: "Plant / Production Capacity",
          value: projectData.plantCapacity,
        },
      ],
    },
    {
      title: "RAW MATERIALS",
      items: [
        {
          label: "Raw Materials",
          value: projectData.rawMaterials,
        },
      ],
    },
    {
      title: "RESOURCE & ENVIRONMENTAL DETAILS",
      items: [
        {
          label: "Fuel / Energy Source and Consumption",
          value: projectData.fuelDetails,
        },
        {
          label: "Total Water Consumption",
          value: projectData.waterConsumption,
        },
        {
          label: "Water Source",
          value: projectData.waterSource,
        },
        {
          label: "Wastewater / Effluent Generation",
          value: projectData.wastewater,
        },
        {
          label: "Air Pollution Sources / Emissions",
          value: projectData.airPollution,
        },
        {
          label: "Solid / Hazardous Waste Generation",
          value: projectData.solidWaste,
        },
        {
          label: "Other Relevant Project Information",
          value: projectData.otherDetails,
        },
      ],
    },
  ].filter((group) =>
    group.items.some((item) => item.value?.trim())
  );

  return (
    <div className="space-y-6">
      {summaryGroups.map((group) => (
        <div key={group.title}>
          <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#0B4F84]">
            {group.title}
          </h4>

          <div className="space-y-3">
            {group.items
              .filter((item) => item.value?.trim())
              .map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    {item.label}
                  </div>

                  <div className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {item.value}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SupportPage() {

  const [projectFields, setProjectFields] =
    useState<ProjectField[]>(PROJECT_FIELDS);

  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [copied, setCopied] = useState<
    "report" | "whatsapp" | "email" | ""
  >("");

  const [emailDraft, setEmailDraft] =
    useState("");

  const [whatsappDraft, setWhatsappDraft] =
    useState("");

const [selectedInquiry, setSelectedInquiry] =
  useState<string[]>(["COMPLETE REVIEW"]);

  const requirement = useMemo(() => {
    return projectFields
      .filter((field) => field.value.trim())
      .map(
        (field) =>
          `${field.label}: ${field.value.trim()}`
      )
      .join("\n");
  }, [projectFields]);

  const reportSections = useMemo(() => {
  if (!analysis) {
    return [];
  }

  return parseFinalReview(analysis).filter(
    (section) =>
      section.title !== "PROJECT AT A GLANCE" &&
      section.title !== "GREENENVIS REGULATORY REVIEW"
  );
}, [analysis]);

const projectData = useMemo(() => {
    return projectFields.reduce<
      Record<string, string>
    >((result, field) => {
      result[field.id] = field.value.trim();
      return result;
    }, {});
  }, [projectFields]);

  const getReviewValue = (
    labels: string[]
  ) => {
    if (!analysis) return "";

    const lines = analysis
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    for (const label of labels) {
      const match = lines.find((line) =>
        new RegExp(
          `^${label.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          )}:`,
          "i"
        ).test(line)
      );

      if (match) {
        return match
          .replace(
            new RegExp(
              `^${label.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              )}:\\s*`,
              "i"
            ),
            ""
          )
          .trim();
      }
    }

    return "";
  };

  const industryCategory = useMemo(
    () =>
      getReviewValue([
        "Industry Category",
        "Verified Category",
        "Category",
      ]),
    [analysis]
  );

  const cteStatus = useMemo(
    () => getReviewValue(["CTE"]),
    [analysis]
  );

  const ccaStatus = useMemo(
    () => getReviewValue(["CCA"]),
    [analysis]
  );

  const environmentalClearanceStatus =
    useMemo(
      () =>
        getReviewValue([
          "Environmental Clearance",
          "EC",
        ]),
      [analysis]
    );

  const cgwaStatus = useMemo(() => {
  const waterSource =
    projectData.waterSource
      .toLowerCase()
      .trim();

  if (
    waterSource.includes("borewell") ||
    waterSource.includes("bore well") ||
    waterSource.includes("tubewell") ||
    waterSource.includes("tube well")
  ) {
    return "APPLICABLE";
  }

  if (waterSource) {
    return "NOT APPLICABLE";
  }

  return "";
}, [projectData.waterSource]);

  const environmentalHighlights = useMemo(() => {
    const items: {
      title: string;
      detail: string;
      status: string;
    }[] = [];

    if (projectData.waterSource) {
      items.push({
        title: "Water Source",
        detail: projectData.waterSource,
        status: "IDENTIFIED",
      });
    }

    if (cgwaStatus) {
      items.push({
        title: "Groundwater / CGWA",
        detail:
        cgwaStatus === "APPLICABLE"
      ? "Borewell or tubewell is used. CGWA / applicable groundwater permission requirements shall apply."
      : "Water source is other than borewell or tubewell. CGWA permission is not required.",
      status: cgwaStatus,
      });
    }

    if (projectData.waterConsumption) {
      items.push({
        title: "Water Requirement",
        detail: projectData.waterConsumption,
        status: "IDENTIFIED",
      });
    }

    if (projectData.wastewater) {
      items.push({
        title: "Wastewater / Effluent",
        detail: projectData.wastewater,
        status: "IDENTIFIED",
      });
    }

    if (projectData.airPollution) {
      items.push({
        title: "Air Emission",
        detail: projectData.airPollution,
        status: "IDENTIFIED",
      });
    }

    if (projectData.solidWaste) {
      items.push({
        title: "Solid / Hazardous Waste",
        detail: projectData.solidWaste,
        status: "IDENTIFIED",
      });
    }

    return items;
  }, [
    projectData.airPollution,
    projectData.solidWaste,
    projectData.waterConsumption,
    projectData.waterSource,
    projectData.wastewater,
    cgwaStatus,
  ]);

  const projectTitle = useMemo(() => {
    return (
      projectData.industry ||
      "Proposed Project"
    );
  }, [projectData.industry]);

  const locationText = useMemo(() => {
    return projectData.location || "Location not provided";
  }, [projectData.location]);

  const whatsappMessage = useMemo(() => {
    if (!analysis) return "";

    const lines = [
      "GREENENVIS PROJECT REVIEW",
      "",
      `Project: ${projectTitle}`,
      `Location: ${locationText}`,
      "",
      "REGULATORY STATUS",
      `Industry Category: ${
        industryCategory || "Verification Required"
      }`,
      `CTE: ${
        cteStatus || "Verification Required"
      }`,
      `CCA: ${
        ccaStatus || "Verification Required"
      }`,
      `Environmental Clearance: ${
        environmentalClearanceStatus ||
        "Verification Required"
      }`,
    ];

    if (cgwaStatus) {
      lines.push(
        `CGWA / Groundwater: ${cgwaStatus}`
      );
    }

    if (environmentalHighlights.length > 0) {
      lines.push(
        "",
        "PROJECT ENVIRONMENTAL ASPECTS"
      );

      environmentalHighlights.forEach((item) => {
        lines.push(
          `• ${item.title}: ${item.detail}`
        );
      });
    }

    const verificationSection =
      reportSections.find(
        (section) =>
          section.title
            .toUpperCase()
            .includes("VERIFICATION REQUIRED")
      );

    if (
      verificationSection &&
      verificationSection.content.length > 0
    ) {
      lines.push(
        "",
        "PENDING VERIFICATION"
      );

      verificationSection.content.forEach((line) => {
        const cleaned = cleanText(line);

        if (
          cleaned &&
          !cleaned.toUpperCase().startsWith("STATUS:")
        ) {
          lines.push(
            `• ${cleaned.replace(/^[-•–]\s*/, "")}`
          );
        }
      });
    }

    lines.push(
      "",
      "GreenEnvis has prepared this preliminary review based on the project information and verified data currently available.",
      "",
      "For further assistance, please contact GreenEnvis."
    );

    return lines.join("\n");
  }, [
    analysis,
    projectTitle,
    locationText,
    industryCategory,
    cteStatus,
    ccaStatus,
    environmentalClearanceStatus,
    cgwaStatus,
    environmentalHighlights,
    reportSections,
  ]);

  const emailSubject = useMemo(() => {
    return `GreenEnvis Project Review – ${projectTitle}`;
  }, [projectTitle]);

  const emailMessage = useMemo(() => {
    if (!analysis) return "";

    const lines = [
      `Subject: ${emailSubject}`,
      "",
      "Dear Sir/Madam,",
      "",
      "Thank you for sharing the project details with GreenEnvis.",
      "",
      `Please find below the preliminary environmental and regulatory review for the proposed project: ${projectTitle}.`,
      "",
      "PROJECT DETAILS",
      `Project: ${projectTitle}`,
      `Location: ${locationText}`,
    ];

    if (projectData.plantCapacity) {
      lines.push(
        `Production Capacity: ${projectData.plantCapacity}`
      );
    }

    lines.push(
      "",
      "REGULATORY STATUS",
      `Industry Category: ${
        industryCategory || "Verification Required"
      }`,
      `CTE: ${
        cteStatus || "Verification Required"
      }`,
      `CCA: ${
        ccaStatus || "Verification Required"
      }`,
      `Environmental Clearance: ${
        environmentalClearanceStatus ||
        "Verification Required"
      }`
    );

    if (cgwaStatus) {
      lines.push(
        `CGWA / Groundwater: ${cgwaStatus}`
      );
    }

    if (environmentalHighlights.length > 0) {
      lines.push(
        "",
        "KEY ENVIRONMENTAL ASPECTS"
      );

      environmentalHighlights.forEach((item) => {
        lines.push(
          `${item.title}: ${item.detail}`
        );
      });
    }

    const verificationSection =
      reportSections.find(
        (section) =>
          section.title
            .toUpperCase()
            .includes("VERIFICATION REQUIRED")
      );

    if (
      verificationSection &&
      verificationSection.content.length > 0
    ) {
      lines.push(
        "",
        "ITEMS REQUIRING VERIFICATION"
      );

      verificationSection.content.forEach((line) => {
        const cleaned = cleanText(line);

        if (
          cleaned &&
          !cleaned.toUpperCase().startsWith("STATUS:")
        ) {
          lines.push(
            `• ${cleaned.replace(/^[-•–]\s*/, "")}`
          );
        }
      });
    }

    lines.push(
      "",
      "GreenEnvis Final Review",
      "The above review is based on the information provided and the verified data currently available in GreenEnvis. Any item marked as Verification Required should be confirmed using complete project details and the applicable verified regulatory provisions.",
      "",
      "Please feel free to contact us for further assistance.",
      "",
      "Regards,",
      "GreenEnvis",
      "Environmental Compliance & Regulatory Support"
    );

    return lines.join("\n");
  }, [
    analysis,
    emailSubject,
    projectTitle,
    locationText,
    projectData.plantCapacity,
    industryCategory,
    cteStatus,
    ccaStatus,
    environmentalClearanceStatus,
    cgwaStatus,
    environmentalHighlights,
    reportSections,
  ]);

  useEffect(() => {
    setEmailDraft(emailMessage);
  }, [emailMessage]);

  useEffect(() => {
    setWhatsappDraft(whatsappMessage);
  }, [whatsappMessage]);

  const updateProjectField = (
    id: string,
    value: string
  ) => {
    setProjectFields((currentFields) =>
      currentFields.map((field) =>
        field.id === id
          ? {
              ...field,
              value,
            }
          : field
      )
    );

    setMessage("");
    setAnalysis("");
    setCopied("");
  };

  const handleGenerateInformationRequest = () => {
  const requestedItems =
    selectedInquiry.includes("COMPLETE REVIEW")
      ? ["CTE", "CCA", "EC", "CGWA"]
      : selectedInquiry;

  const assessmentNames = requestedItems
    .map((item) => {
      if (item === "CTE") {
        return "Consent to Establish (CTE)";
      }

      if (item === "CCA") {
        return "Consent to Operate / CCA";
      }

      if (item === "EC") {
        return "Environmental Clearance (EC)";
      }

      if (item === "CGWA") {
        return "CGWA / Groundwater Permission";
      }

      return item;
    })
    .join(", ");

  const commonDetails = [
    "• Project / Industry Name",
    "• Complete Project Location",
    "• Whether the project is located in GIDC / an approved industrial estate",
    "• Industry / Manufacturing Activity",
    "• Complete Manufacturing Process",
    "• Plant / Production Capacity",
  ];

  const environmentalDetails = [
    "• Raw Materials and their quantities",
    "• Fuel / Energy Source and Consumption",
    "• Total Water Requirement and Source",
    "• Wastewater / Effluent Generation and Disposal",
    "• Air Pollution Sources / Emissions",
    "• Solid / Hazardous Waste Generation",
  ];

  const specificDetails: string[] = [];

  if (requestedItems.includes("EC")) {
    specificDetails.push(
      "ENVIRONMENTAL CLEARANCE (EC) DETAILS",
      "• Total Project / Land Area",
      "• Proposed Product and Exact Production Capacity",
      "• Project Cost",
      "• Details of Proposed Facilities / Infrastructure",
      "• Any expansion or existing industrial activity, if applicable"
    );
  }

  if (requestedItems.includes("CGWA")) {
    specificDetails.push(
      "CGWA / GROUNDWATER DETAILS",
      "• Proposed Water Source",
      "• Whether Borewell / Tubewell is proposed or existing",
      "• Number of Borewells / Tubewells, if applicable",
      "• Proposed Groundwater Requirement",
      "• Purpose-wise Water Requirement"
    );
  }

  const emailContent = [
    `Subject: Information Required for ${assessmentNames} Assessment`,
    "",
    "Dear Sir/Madam,",
    "",
    "Thank you for your inquiry.",
    "",
    `To assess the applicability of ${assessmentNames} for your proposed project, please provide the following information:`,
    "",
    "PROJECT INFORMATION",
    ...commonDetails,
    "",
    "ENVIRONMENTAL INFORMATION",
    ...environmentalDetails,
    "",
    ...specificDetails,
    "",
    "Once the above information is received, GreenEnvis will conduct a preliminary regulatory applicability assessment based on the available project information and applicable verified decision rules.",
    "",
    "Regards,",
    "GreenEnvis",
  ].join("\n");

  const whatsappContent = [
    "GREENENVIS – INFORMATION REQUIRED",
    "",
    `To assess the applicability of:`,
    assessmentNames,
    "",
    "Please share the following project details:",
    "",
    "• Project / Industry Name",
    "• Complete Project Location",
    "• GIDC / Approved Industrial Estate Status",
    "• Industry / Manufacturing Activity",
    "• Complete Manufacturing Process",
    "• Production Capacity",
    "• Raw Materials",
    "• Water Requirement and Water Source",
    "• Wastewater / Effluent Details",
    "• Air Pollution Sources",
    "• Solid / Hazardous Waste Details",
    "",
    ...(requestedItems.includes("EC")
      ? [
          "For EC Assessment:",
          "• Land Area",
          "• Project Cost",
          "• Exact Product / Activity and Capacity",
          "",
        ]
      : []),
    ...(requestedItems.includes("CGWA")
      ? [
          "For CGWA Assessment:",
          "• Water Source",
          "• Borewell / Tubewell Details, if applicable",
          "• Groundwater Requirement",
          "",
        ]
      : []),
    "After receiving the required details, GreenEnvis will prepare the preliminary regulatory applicability review.",
  ].join("\n");

  setEmailDraft(emailContent);
  setWhatsappDraft(whatsappContent);

  setMessage(
    "Information request email and WhatsApp drafts generated successfully."
  );

  setCopied("");
};

const handleAnalyze = async () => {

    const missingRequiredFields =
      projectFields.filter(
        (field) =>
          field.required &&
          !field.value.trim()
      );

    if (missingRequiredFields.length > 0) {
      setMessage(
        `Please provide: ${missingRequiredFields
          .map((field) => field.label)
          .join(", ")}.`
      );

      setAnalysis("");
      return;
    }

    if (!requirement.trim()) {
      setMessage(
        "Please provide the project details before generating the review."
      );

      setAnalysis("");
      return;
    }

    setIsAnalyzing(true);
    setCopied("");

    setMessage(
      "GreenEnvis is reviewing the project information using the available verified regulatory data."
    );

    setAnalysis("");

    try {
      const response = await fetch(
        "/api/support/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requirement,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to generate the project review at this time."
        );
      }

      if (
        !data?.result ||
        typeof data.result !== "string"
      ) {
        throw new Error(
          "GreenEnvis could not generate a valid project review."
        );
      }

      setAnalysis(data.result);

      setMessage(
        "GreenEnvis project review generated successfully."
      );
    } catch (error: unknown) {
      setAnalysis("");

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to generate the project review at this time."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyText = async (
    type: "report" | "whatsapp" | "email",
    text: string
  ) => {
    if (!text.trim()) return;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(type);

      window.setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setMessage(
        "Unable to copy the content. Please try again."
      );
    }
  };

  const openWhatsApp = () => {
    if (!whatsappMessage.trim()) return;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openInformationWhatsApp = () => {
    if (!whatsappDraft.trim()) return;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        whatsappDraft
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openInformationEmail = () => {
    if (!emailDraft.trim()) return;

    const subjectLine =
      emailDraft
        .split("\n")
        .find((line) =>
          line.startsWith("Subject:")
        ) || "Subject: GreenEnvis Information Request";

    const subject = subjectLine.replace(
      /^Subject:\s*/i,
      ""
    );

    const body = emailDraft
      .replace(subjectLine, "")
      .trim();

    window.location.href =
      `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
  };

  const openEmail = () => {
    if (!emailMessage.trim()) return;

    const subject = emailSubject;

    const body = emailMessage
      .replace(
        /^Subject:.*\n*/i,
        ""
      )
      .trim();

    window.location.href =
      `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
  };
    return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#083f6b] to-[#0B4F84] px-6 py-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100">
                  GreenEnvis Environmental Intelligence
                </div>

                <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Project Applicability Review
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
                  Enter the available project details to generate a
                  clear preliminary environmental and regulatory
                  applicability review based on the verified data
                  available in GreenEnvis.
                </p>
              </div>

            {analysis && (
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      "report",
                      analysis
                    )
                  }
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {copied === "report"
                    ? "✓ Report Copied"
                    : "Copy Full Review"}
                </button>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B4F84] text-xs font-bold text-white">
                i
              </div>

              <div className="text-sm leading-6 text-slate-700">
                Provide complete project information wherever
                available. GreenEnvis will identify only the
                applicability supported by the available verified
                project and regulatory data. Any item that cannot be
                reliably concluded will remain marked as
                <span className="mx-1 font-semibold text-amber-700">
                  Verification Required
                </span>
                rather than being guessed.
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 border-b border-slate-200 bg-[#0B4F84] text-xs font-bold uppercase tracking-wide text-white md:grid-cols-[260px_1fr]">
                <div className="border-b border-white/10 px-4 py-3 md:border-b-0 md:border-r md:border-white/10">
                  GreenEnvis Information Required
                </div>

                <div className="px-4 py-3">
                  Client Details
                </div>
              </div>

              <div>
                {projectFields.map(
                  (field) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 border-b border-slate-200 last:border-b-0 md:grid-cols-[260px_1fr]"
                    >
                      <div className="flex items-start border-b border-slate-200 bg-slate-50 px-4 py-4 md:border-b-0 md:border-r">
                        <label
                          htmlFor={field.id}
                          className="text-xs font-semibold text-slate-700"
                        >
                          {field.label}

                          {field.required && (
                            <span className="ml-1 text-red-500">
                              *
                            </span>
                          )}
                        </label>
                      </div>

                      <div className="p-3">

{field.id === "plantLocationType" ? (
  <select
    id={field.id}
    value={field.value}
    onChange={(event) =>
      updateProjectField(
        field.id,
        event.target.value
      )
    }
    className="min-h-[48px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
  >
    <option value="">
      Select Yes or No
    </option>
    <option value="YES">YES</option>
    <option value="NO">NO</option>
  </select>
) : (
                        <textarea
                          id={field.id}
                          value={field.value}
                          onChange={(event) =>
                            updateProjectField(
                              field.id,
                              event.target.value
                            )
                          }
                          placeholder={field.placeholder}
                          rows={
                            field.id ===
                            "manufacturingProcess"
                              ? 4
                              : 2
                          }
                          className="min-h-[48px] w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
                        />
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
<div className="mt-5 border-t border-slate-100 pt-5">
  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    
    {/* LEFT SIDE */}
    <div className="flex-1">
      <label className="mb-3 block text-sm font-bold text-slate-800">
        What would you like to assess?
      </label>

      <div className="flex flex-col gap-3">
  <button
    type="button"
    disabled={isAnalyzing}
    onClick={() => {
      const allSelected =
        selectedInquiry.includes("CTE") &&
        selectedInquiry.includes("CCA") &&
        selectedInquiry.includes("EC") &&
        selectedInquiry.includes("CGWA");

      if (allSelected) {
        setSelectedInquiry([]);
        return;
      }

      setSelectedInquiry([
        "COMPLETE REVIEW",
        "CTE",
        "CCA",
        "EC",
        "CGWA",
      ]);
    }}
    className={`w-fit rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
      selectedInquiry.includes("COMPLETE REVIEW")
        ? "border-[#0B4F84] bg-[#0B4F84] text-white shadow-sm"
        : "border-slate-300 bg-white text-slate-700 hover:border-[#0B4F84] hover:text-[#0B4F84]"
    } disabled:cursor-not-allowed disabled:opacity-60`}
  >
    {selectedInquiry.includes("COMPLETE REVIEW")
      ? "✓ "
      : ""}
    All Regulatory Checking
  </button>

  <div className="flex flex-wrap gap-2">
    {[
      {
        value: "CTE",
        label: "Consent to Establish (CTE)",
      },
      {
        value: "CCA",
        label: "Consent to Operate / CCA",
      },
      {
        value: "EC",
        label: "Environmental Clearance (EC)",
      },
      {
        value: "CGWA",
        label: "CGWA / Groundwater Permission",
      },
    ].map((item) => {
      const isSelected =
        selectedInquiry.includes(item.value);

      return (
        <button
          key={item.value}
          type="button"
          disabled={isAnalyzing}
          onClick={() => {
            setSelectedInquiry((current) => {
              const withoutComplete =
                current.filter(
                  (value) =>
                    value !== "COMPLETE REVIEW"
                );

              if (
                withoutComplete.includes(
                  item.value
                )
              ) {
                return withoutComplete.filter(
                  (value) =>
                    value !== item.value
                );
              }

              return [
                ...withoutComplete,
                item.value,
              ];
            });
          }}
          className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
            isSelected
              ? "border-[#0B4F84] bg-[#0B4F84] text-white shadow-sm"
              : "border-slate-300 bg-white text-slate-700 hover:border-[#0B4F84] hover:text-[#0B4F84]"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isSelected ? "✓ " : ""}
          {item.label}
        </button>
      );
    })}
  </div>
</div>

      <button
        type="button"
        onClick={
          handleGenerateInformationRequest
        }
        disabled={
          isAnalyzing ||
          selectedInquiry.length === 0
        }
        className="mt-4 inline-flex min-w-[260px] items-center justify-center rounded-xl border border-[#0B4F84] bg-white px-5 py-3 text-sm font-bold text-[#0B4F84] shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Information Needed for Applicability Checking
      </button>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex shrink-0 flex-col items-stretch">
      <p className="mb-2 max-w-[320px] text-xs leading-5 text-slate-500">
        Required fields are marked with{" "}
        <span className="font-bold text-red-500">
          *
        </span>
        . Complete project information helps GreenEnvis
        prepare a more accurate preliminary review.
      </p>

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="inline-flex min-w-[240px] items-center justify-center rounded-xl bg-[#0B4F84] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#083f6b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isAnalyzing
          ? "Generating GreenEnvis Review..."
          : "Generate GreenEnvis Final Review"}
      </button>
    </div>

  </div>
</div>  
          {message && (
              <div
                className={`mt-5 rounded-xl border px-4 py-3 text-sm leading-6 ${
                  analysis
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : message.toLowerCase().includes("unable") ||
                        message.toLowerCase().includes("please provide")
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-blue-200 bg-blue-50 text-blue-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>

{!analysis &&
          (emailDraft.trim() || whatsappDraft.trim()) && (
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

              {/* INFORMATION REQUEST EMAIL */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#f8fafc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B4F84]">
                      Client Communication
                    </div>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      📧 Information Request Email
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Review the generated email and send it directly to the client or consultant.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          "email",
                          emailDraft
                        )
                      }
                      className="inline-flex items-center justify-center rounded-lg border border-[#0B4F84] bg-white px-4 py-2 text-xs font-bold text-[#0B4F84] transition hover:bg-blue-50"
                    >
                      {copied === "email"
                        ? "✓ Copied"
                        : "Copy Email"}
                    </button>

                    <button
                      type="button"
                      onClick={openInformationEmail}
                      className="inline-flex items-center justify-center rounded-lg bg-[#0B4F84] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#083f6b]"
                    >
                      Open Email
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <textarea
                    value={emailDraft}
                    onChange={(event) =>
                      setEmailDraft(
                        event.target.value
                      )
                    }
                    rows={18}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* INFORMATION REQUEST WHATSAPP */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#f8fafc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B4F84]">
                      Client Communication
                    </div>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      💬 Information Request WhatsApp
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Ready-to-send WhatsApp message for requesting the required project details.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyText(
                          "whatsapp",
                          whatsappDraft
                        )
                      }
                      className="inline-flex items-center justify-center rounded-lg border border-[#0B4F84] bg-white px-4 py-2 text-xs font-bold text-[#0B4F84] transition hover:bg-blue-50"
                    >
                      {copied === "whatsapp"
                        ? "✓ Copied"
                        : "Copy WhatsApp"}
                    </button>

                    <button
                      type="button"
                      onClick={openInformationWhatsApp}
                      className="inline-flex items-center justify-center rounded-lg bg-[#0B4F84] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#083f6b]"
                    >
                      Open WhatsApp
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <textarea
                    value={whatsappDraft}
                    onChange={(event) =>
                      setWhatsappDraft(
                        event.target.value
                      )
                    }
                    rows={18}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>
          )}

        {analysis && (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0B4F84]">
                      GreenEnvis Final Review
                    </div>

                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      Project Applicability Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      A concise review of the identified regulatory
                      and environmental aspects of the proposed
                      project.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#b8d4e8] bg-[#f4f9fd] px-4 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
                      Project
                    </div>

                    <div className="mt-1 max-w-[340px] text-sm font-bold text-[#083f6b]">
                      {projectTitle}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Industry Category
                    </div>

                    <div className="mt-3">
                      <StatusBadge
                        value={
                          industryCategory ||
                          "VERIFICATION REQUIRED"
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Consent to Establish
                    </div>

                    <div className="mt-3">
                      <StatusBadge
                        value={
                          cteStatus ||
                          "VERIFICATION REQUIRED"
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Consent to Operate
                    </div>

                    <div className="mt-3">
                      <StatusBadge
                        value={
                          ccaStatus ||
                          "VERIFICATION REQUIRED"
                        }
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      Environmental Clearance
                    </div>

                    <div className="mt-3">
                      <StatusBadge
                        value={
                          environmentalClearanceStatus ||
                          "VERIFICATION REQUIRED"
                        }
                      />
                    </div>
                  </div>
                </div>

                {environmentalHighlights.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-8 w-1 rounded-full bg-[#0B4F84]" />

                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Environmental Aspects Identified
                        </h3>

                        <p className="text-xs text-slate-500">
                          Based on the project information provided.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                      {environmentalHighlights.map(
                        (item) => (
                          <div
                            key={item.title}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="text-sm font-bold text-slate-800">
                                {item.title}
                              </div>

                              <StatusBadge
                                value={item.status}
                              />
                            </div>

                            <div className="mt-2 text-sm leading-6 text-slate-600">
                              {item.detail}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  {reportSections.map(
  (section, index) => {
    const isProjectSummary =
      section.title === "GREENENVIS REVIEW";

    return (
      <section
        key={`${section.title}-${index}`}
        className="rounded-xl border border-slate-200 bg-white"
      >
        <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
          <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#083f6b]">
            {isProjectSummary
              ? "PROJECT SUMMARY"
              : section.title}
          </h3>
        </div>

        <div className="px-5 py-5">
          {isProjectSummary ? (
            <ProjectSummaryContent
              projectData={projectData}
            />
          ) : (
            section.content
              .filter(
                (line) =>
                  line.trim().toUpperCase() !==
                  "PROJECT SUMMARY"
              )
              .map((line, lineIndex) => (
                <ReportLine
                  key={`${line}-${lineIndex}`}
                  line={line}
                />
              ))
          )}
        </div>
      </section>
    );
  }
)}
</div>
</div>
     </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* PROFESSIONAL EMAIL DRAFT */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#f8fafc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B4F84]">
                      Client Communication
                    </div>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      📧 Professional Email Draft
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Ready to review, copy and share with the client
                      or consultant.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        "email",
                        emailDraft
                      )
                    }
                    className="inline-flex items-center justify-center rounded-lg border border-[#0B4F84] bg-white px-4 py-2 text-xs font-bold text-[#0B4F84] transition hover:bg-blue-50"
                  >
                    {copied === "email"
                      ? "✓ Copied"
                      : "Copy Email"}
                  </button>
                </div>

                <div className="p-5">
                  <textarea
                    value={emailDraft}
                    onChange={(event) =>
                      setEmailDraft(
                        event.target.value
                      )
                    }
                    rows={18}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* WHATSAPP MESSAGE */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#f8fafc] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B4F84]">
                      Client Communication
                    </div>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      💬 WhatsApp Ready Message
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Short, clear and professional communication for
                      direct client sharing.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        "whatsapp",
                        whatsappDraft
                      )
                    }
                    className="inline-flex items-center justify-center rounded-lg border border-[#0B4F84] bg-white px-4 py-2 text-xs font-bold text-[#0B4F84] transition hover:bg-blue-50"
                  >
                    {copied === "whatsapp"
                      ? "✓ Copied"
                      : "Copy WhatsApp"}
                  </button>
                </div>

                <div className="p-5">
                  <textarea
                    value={whatsappDraft}
                    onChange={(event) =>
                      setWhatsappDraft(
                        event.target.value
                      )
                    }
                    rows={18}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition focus:border-[#0B4F84] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#c9ddec] bg-[#f5faff] px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-4xl">
                  <div className="text-sm font-bold text-[#083f6b]">
                    GreenEnvis Review Status
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This preliminary review is generated only from
                    the project information provided and the verified
                    GreenEnvis decision data available for assessment.
                    Any item shown as Verification Required should be
                    confirmed only after the required project or
                    regulatory information becomes available.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="rounded-xl border border-[#b8d4e8] bg-white px-4 py-3 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Prepared By
                    </div>

                    <div className="mt-1 text-sm font-extrabold text-[#0B4F84]">
                      GREENENVIS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}