export type LibraryItem = {
  id: string;
  title: string;
  description: string;
  authority: string;
  category: string;
  type: "format" | "checklist";
  details: string[];

  fileName?: string;
  fileUrl?: string;
  fileType?: "pdf" | "docx" | "xlsx";

  source: "uploaded" | "system";
  isPublished: boolean;
};

function checklistFile(fileName: string): Pick<LibraryItem, "fileName" | "fileUrl"> {
  return {
    fileName,
    fileUrl: `/formats-library/checklists/${encodeURIComponent(fileName)}`,
  };
}

export const libraryItems: LibraryItem[] = [
  {
    id: "checklist-001",
    title: "Fresh Consent to Establish Application Checklist",
    description:
      "Document and information checklist for preparation of a Fresh Consent to Establish application.",
    authority: "GPCB",
    category: "Consent & Authorization",
    type: "checklist",
    details: [],
    ...checklistFile("Full Checklist For Fresh CTE.xlsx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-002",
    title: "Fresh / Renewal / Extension CCA Checklist",
    description:
      "Document checklist for Fresh, Renewal and Extension of Consolidated Consent and Authorization.",
    authority: "GPCB",
    category: "Consent & Authorization",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist For Extension or Renewal CCA.xlsx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-003",
    title: "Fresh FSSAI Application Checklist",
    description:
      "Required information and document checklist for Fresh FSSAI application.",
    authority: "FSSAI",
    category: "License & Registration",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist for Fresh FSSAI Application.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-004",
    title: "Plastic Waste Producer under SIMP Checklist",
    description:
      "Document and information checklist for Plastic Waste Producer registration under SIMP.",
    authority: "CPCB",
    category: "EPR",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist For Plastic Waste Producer under SIMP.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-005",
    title: "BMW Clinic Authorization Checklist",
    description:
      "Document checklist for Biomedical Waste authorization for clinics.",
    authority: "GPCB",
    category: "Waste Management",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_BMW Clinic for GPCB Authorization.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-006",
    title: "CGWA NOC Application Checklist",
    description:
      "Required documents and information checklist for CGWA groundwater NOC application.",
    authority: "CGWA",
    category: "Groundwater",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_CGWA NoC Application.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-007",
    title: "CGWA NOC Renewal Checklist",
    description:
      "Document checklist for renewal of CGWA groundwater NOC.",
    authority: "CGWA",
    category: "Groundwater",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_Renewal CGWA NoC.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-008",
    title: "CGWA Self Inspection Checklist",
    description:
      "Self-inspection and compliance checklist related to groundwater requirements.",
    authority: "CGWA",
    category: "Groundwater",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_Self Inspection For CGWA NoC.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-009",
    title: "CRZ Clearance Checklist",
    description:
      "Document and information checklist for CRZ clearance requirements.",
    authority: "MoEFCC",
    category: "Environmental Clearance",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_CRZ Clearance.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-010",
    title: "E-Waste EPR Certificate for Manufacturer Checklist",
    description:
      "Required information and documents for E-Waste EPR registration for manufacturers.",
    authority: "CPCB",
    category: "EPR",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_E-Waste EPR Certificate for Manufacturer.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-011",
    title: "Environmental Clearance Checklist",
    description:
      "Project information and document checklist for Environmental Clearance applications.",
    authority: "MoEFCC",
    category: "Environmental Clearance",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_Environment Clearance.docx"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-012",
    title: "MoEFCC License Checklist",
    description:
      "Required documents and information checklist for applicable MoEFCC license processes.",
    authority: "MoEFCC",
    category: "License & Registration",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_MoEFCC License.pdf"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-013",
    title: "MoEFCC License Renewal Checklist",
    description:
      "Required documents and information checklist for renewal of applicable MoEFCC license.",
    authority: "MoEFCC",
    category: "License & Registration",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_MoEFCC License Renewal.pdf"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-014",
    title: "Preliminary Document List – MoEFCC License Renewal",
    description:
      "Preliminary document list required before initiating the MoEFCC license renewal process.",
    authority: "MoEFCC",
    category: "License & Registration",
    type: "checklist",
    details: [],
    ...checklistFile("Preliminary Document List_MoEFCC License Renewal.pdf"),
    source: "uploaded",
    isPublished: true,
  },
  {
    id: "checklist-015",
    title: "Plastic EPR Certificate for PIBO Checklist",
    description:
      "Required documents and information checklist for Plastic EPR registration for PIBO.",
    authority: "CPCB",
    category: "EPR",
    type: "checklist",
    details: [],
    ...checklistFile("Checklist_Plastic EPR Certificate for PIBO.docx"),
    source: "uploaded",
    isPublished: true,
  },
];
