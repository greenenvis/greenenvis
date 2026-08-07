import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadIndustryProfile = async (profile: any) => {
  const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
  compress: true,
});

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;
  const MARGIN = 16;
  const HEADER_HEIGHT = 22;
  const FOOTER_Y = PAGE_HEIGHT - 10;
  const PRIMARY: [number, number, number] = [22, 101, 52];
  const DARK: [number, number, number] = [28, 41, 57];
  const GREY: [number, number, number] = [108, 118, 133];
  const LIGHT: [number, number, number] = [245, 247, 250];

  const loadImage = async (src: string): Promise<HTMLImageElement | null> => {
    if (!src) {
      return null;
    }
doc.setProperties({
  title: "Industry Profile Report",
  subject: "Industry Profile Report",
  author: "GreenEnvis",
  creator: "GreenEnvis Environmental Compliance Portal",
  keywords: "GreenEnvis, GPCB, Compliance, Industry Profile",
});
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    return new Promise((resolve) => {
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
    });
  };
  
  const logoImage = await loadImage(profile.company_logo_upload || profile.company_logo || "");

  const isEmptyValue = (value: any): boolean => {
    if (value === null || value === undefined || value === "") {
      return true;
    }
    if (typeof value === "boolean") {
      return false;
    }
    if (Array.isArray(value)) {
      return value.every(isEmptyValue);
    }
    if (typeof value === "object") {
      return Object.values(value).every(isEmptyValue);
    }
    return false;
  };

  const parseMultiValue = (value: any): string[] => {
    if (value === null || value === undefined || value === "") {
      return [];
    }

    if (Array.isArray(value)) {
      return value.flatMap((item) => parseMultiValue(item));
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) {
        return [];
      }

      try {
        const parsed = JSON.parse(trimmed);
        return parseMultiValue(parsed);
      } catch {
        return trimmed
          .split(/[\n,;]+/)
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
          .filter(Boolean);
      }
    }

    if (typeof value === "object") {
      return Object.values(value).flatMap((item) => parseMultiValue(item));
    }

    return [String(value).trim()];
  };

  const normalizeProfileValue = (value: any): string => {
    const items = parseMultiValue(value).filter(Boolean);
    return items.length ? items.join(", ") : "Not Available";
  };

  const resolveProfileValue = (...keys: string[]): any => {
    const orderedKeys = Array.from(new Set(keys.filter(Boolean)));

    for (const key of orderedKeys) {
      const value = profile[key];
      if (!isEmptyValue(value)) {
        return value;
      }
    }

    const aliases: Record<string, string[]> = {
      industry_name: ["industry_name", "company_name", "organization_name"],
      industry_category: ["industry_category", "industry_type", "category"],
      industry_address: ["industry_address", "factory_address", "address"],
      contact_person: ["contact_person", "person_name", "authorized_person"],
      designation: ["designation", "role", "position"],
      mobile_no: ["mobile_no", "mobile", "phone", "contact_number"],
      alternate_mobile: ["alternate_mobile", "alternate_phone"],
      email: ["email", "email_id", "contact_email"],
      survey_no: ["survey_no", "survey_number"],
      village: ["village", "village_name"],
      taluka: ["taluka"],
      district: ["district"],
      state: ["state"],
      pincode: ["pincode", "pin_code", "postal_code", "zip_code"],
      total_area: ["total_area", "total_plot_area", "plot_area", "plot_size", "factory_area", "site_area"],
      built_up_area: ["built_up_area", "builtup_area"],
      open_area: ["open_area"],
      greenbelt_area: ["greenbelt_area", "green_belt_area"],
      total_employees: ["total_employees", "employees", "manpower"],
      working_shift: ["working_shift", "shift"],
      working_days: ["working_days", "days"],
      fresh_water_requirement: ["fresh_water_requirement", "fresh_water", "fresh_water_demand", "water_requirement"],
      total_consumption: ["total_consumption", "water_consumption", "consumption"],
      total_reuse: ["total_reuse", "water_reuse", "reuse"],
      total_wastewater: ["total_wastewater", "wastewater_generation", "wastewater"],
      water_source: ["water_source", "water_sources", "source_of_water", "water_supply_source"],
      treatment_system: ["treatment_system", "treatment_systems", "effluent_treatment", "water_treatment_system", "treatment"],
      final_discharge_point: ["final_discharge_point", "discharge_point", "wastewater_discharge_point"],
      google_map_link: ["google_map_link", "google_map", "google_maps_link", "map_link", "location_link"],
    };

    for (const key of orderedKeys) {
      for (const alias of aliases[key] || []) {
        const value = profile[alias];
        if (!isEmptyValue(value)) {
          return value;
        }
      }
    }

    return null;
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === "") {
      return "Not Available";
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (Array.isArray(value)) {
      const items = value
        .map((item) => {
          if (item === null || item === undefined) {
            return "";
          }
          if (typeof item === "object") {
            return Object.values(item)
              .map((entry) => sanitizeText(entry, ""))
              .filter(Boolean)
              .join(" ");
          }
          return sanitizeText(item, "");
        })
        .filter(Boolean);
      return items.length ? items.join(", ") : "Not Available";
    }
    if (typeof value === "object") {
      return Object.values(value)
        .map((item) => formatValue(item))
        .filter(Boolean)
        .join(" ");
    }
    return sanitizeText(value, "Not Available");
  };

  const getWaterSourceValue = () => {
    const source = resolveProfileValue("water_source", "water_sources", "source_of_water");
    const values = parseMultiValue(source).map((item) => item.trim()).filter(Boolean);
    const sources = values.filter((item) => item.toLowerCase() !== "other");

    if (values.some((item) => item.toLowerCase() === "other") && !isEmptyValue(profile.other_water_source)) {
      sources.push(`Other: ${formatValue(profile.other_water_source)}`);
    }

    return sources.length ? sources.join(", ") : "Not Available";
  };

  const getTreatmentSystemValue = () => {
    const systems = [
      ["ETP", profile.etp],
      ["STP", profile.stp],
      ["RO", profile.ro],
      ["MEE", profile.mee],
      ["ATFD", profile.atfd],
      ["ZLD", profile.zld],
    ]
      .filter(([, enabled]) => enabled)
      .map(([label]) => label);

    const directTreatment = resolveProfileValue("treatment_system", "treatment_systems", "effluent_treatment", "water_treatment_system", "treatment");
    const parsedTreatment = parseMultiValue(directTreatment).map((item) => item.trim()).filter(Boolean);
    const combined = [...systems, ...parsedTreatment];

    return combined.length ? combined.join(", ") : "Not Available";
  };

  const complianceStatus = (value: any) => (value ? "Yes" : "No");

  const countCompliance = () => {
    return [
      profile.cte,
      profile.cca,
      profile.ec_no,
      profile.cgwa_noc,
      profile.factory_license,
      profile.fire_noc,
      profile.peso,
      profile.msihc,
    ].reduce((count, item) => (item ? count + 1 : count), 0);
  };

  const countWasteStreams = () => {
    return [
      profile.hazardous_waste_data,
      profile.non_hazardous_waste_data,
      profile.plastic_waste_data,
      profile.used_oil_data,
      profile.battery_waste_data,
      profile.biomedical_waste_data,
      profile.ewaste_data,
    ].reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
  };

  const drawImage = (image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    try {
      doc.addImage(image, "PNG", x, y, width, height);
    } catch {
      try {
        doc.addImage(image, "JPEG", x, y, width, height);
      } catch {
        // ignore unsupported image data
      }
    }
  };

 const drawHeader = () => {
  const pageNumber = doc.getCurrentPageInfo().pageNumber;

  // No header on cover page
  if (pageNumber === 1) return;

  // Logo (Left)
  if (logoImage) {
    drawImage(
      logoImage,
      MARGIN,
      5,
      16,
      16
    );
  }

  // Company Name (Right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...PRIMARY);

  const headerName = doc.splitTextToSize(
    sanitizeText(formatValue(profile.industry_name)),
    110
  );

  doc.text(
    headerName,
    PAGE_WIDTH - MARGIN,
    10,
    {
      align: "right",
    }
  );

  // Divider
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.35);

  doc.line(
    MARGIN,
    HEADER_HEIGHT,
    PAGE_WIDTH - MARGIN,
    HEADER_HEIGHT
  );
};
  const drawFooter = () => {
    if (doc.getCurrentPageInfo().pageNumber !== 1) {
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.3);
  doc.line(
    MARGIN,
    FOOTER_Y - 4,
    PAGE_WIDTH - MARGIN,
    FOOTER_Y - 4
  );
}

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const generatedOn = new Date().toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});
    doc.setTextColor(...GREY);
    doc.text(
  "Generated using GreenEnvis Environmental Compliance Portal",
  MARGIN,
  FOOTER_Y - 1
);
    doc.setFontSize(8);

doc.setTextColor(120);

doc.text(
  `Generated on: ${generatedOn}`,
  MARGIN,
  FOOTER_Y + 4
);
doc.setFontSize(8);
doc.setTextColor(120);

doc.text(
  "Report Version: v1.0",
  PAGE_WIDTH - MARGIN,
  FOOTER_Y + 4,
  {
    align: "right",
  }
);

const pageNumber = doc.getCurrentPageInfo().pageNumber;
const totalPages = doc.getNumberOfPages();

doc.setFont("helvetica", "bold");
doc.setFontSize(8);
doc.setTextColor(...GREY);

const pageText = `Page ${String(pageNumber).padStart(2, "0")} of ${String(totalPages).padStart(2, "0")}`;

doc.text(
  pageText,
  PAGE_WIDTH - MARGIN,
  FOOTER_Y - 1,
  {
    align: "right",
  }
);
  };
  
  const pageTitle = (text: string) => {

  const titleY = HEADER_HEIGHT + 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...PRIMARY);

  doc.text(
    text,
    MARGIN,
    titleY
  );

  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.4);

  doc.line(
    MARGIN,
    titleY + 3,
    PAGE_WIDTH - MARGIN,
    titleY + 3
  );

};

  const sanitizeText = (value: any, fallback = "Not Available"): string => {
    if (value === null || value === undefined || value === "") {
      return fallback;
    }

    const text = String(value).trim();
    if (!text) {
      return fallback;
    }

    const normalized = text
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\u0020-\u007E\u00C0-\u024F]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return normalized || fallback;
  };

  type AutoTableOptions = Parameters<typeof autoTable>[1];

  const tableOptions: AutoTableOptions = {
    startY: HEADER_HEIGHT + 28,
    margin: { left: MARGIN, right: MARGIN, top: HEADER_HEIGHT + 22, bottom: 20 },
    theme: "grid",
    pageBreak: "avoid",
    rowPageBreak: "avoid",
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 5,
      overflow: "linebreak",
      valign: "middle",
      lineColor: [220, 220, 220],
      lineWidth: 0.25,
      textColor: [36, 42, 55],
    },
    headStyles: {
      fillColor: PRIMARY,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    showHead: "everyPage",

    didDrawPage: () => {
      drawHeader();
      drawFooter();
    },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: {
      0: { cellWidth: 70 },
    },
  };

 const addSectionPage = (title: string) => {

  const currentY =
    (doc as any).lastAutoTable?.finalY || 0;

  if (currentY > 190) {
    doc.addPage();
  } else if (doc.getCurrentPageInfo().pageNumber > 1) {
    doc.addPage();
  }

  drawHeader();
  drawFooter();

  pageTitle(title);
const outline = (doc as any).outline;

if (
  outline &&
  typeof outline.add === "function"
) {
  outline.add(null, title, {
    pageNumber: doc.getCurrentPageInfo().pageNumber,
  });
}
};

  const drawKpiCards = (items: Array<{ label?: string; title?: string; value: string | number }>) => {
    const cardWidth = (PAGE_WIDTH - (2 * MARGIN) - 12) / 4;
    const gap = 4;
    const startY = HEADER_HEIGHT + 78;
    const cardLayouts = items.map((item) => {
      const titleText = item.label || item.title || "VALUE";
      const titleLines = doc.splitTextToSize(titleText.toUpperCase(), cardWidth - 16);
      const valueText = item.value !== undefined && item.value !== null && item.value !== "" ? String(item.value) : "Not Available";
      const valueLines = doc.splitTextToSize(sanitizeText(valueText), cardWidth - 16);
      const height = Math.max(
      26,
      12 + (titleLines.length * 3.5) + (valueLines.length * 4)
      );
      return { ...item, titleLines, valueLines, height };
      });

    const rows: Array<typeof cardLayouts> = [];
    for (let index = 0; index < cardLayouts.length; index += 4) {
  rows.push(cardLayouts.slice(index, index + 4));
  }

    rows.forEach((row, rowIndex) => {
      const rowHeight = Math.max(...row.map((card) => card.height));
      row.forEach((card, columnIndex) => {
        const x = MARGIN + columnIndex * (cardWidth + gap);
        const y = startY + rowIndex * (rowHeight + gap);

        doc.setFillColor(...LIGHT);
        doc.setDrawColor(214, 220, 230);
        doc.setLineWidth(0.35);
        doc.roundedRect(x, y, cardWidth, rowHeight, 4, 4, "F");
        doc.setDrawColor(...PRIMARY);
        doc.setLineWidth(0.2);
        doc.roundedRect(x, y, cardWidth, rowHeight, 4, 4);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...PRIMARY);
        doc.text(card.titleLines, x + 4, y + 6, { maxWidth: cardWidth - 16 });

        doc.setFont("helvetica", "bold");
doc.setFontSize(8);
doc.setTextColor(...DARK);

doc.text(
  card.valueLines,
  x + 4,
  y + 14,
  {
    maxWidth: cardWidth - 16,
    baseline: "top",
  }
);
      });
    });
  };

 const renderSeparatedTable = (
  title: string,
  columns: string[],
  rows: any[][]
) => {

  doc.addPage();

  drawHeader();
  drawFooter();

  pageTitle(title);

  autoTable(doc, {
    ...tableOptions,

    startY: HEADER_HEIGHT + 28,

    head: [columns],

    body:
      rows.length
        ? rows
        : [[
         "No Data Available",
         ...Array(columns.length - 1).fill("")
          ]],

    pageBreak: "auto",
    rowPageBreak: "avoid",

    showHead: "everyPage",

    didParseCell: (data) => {

  if (
    rows.length === 0 &&
    data.section === "body" &&
    data.row.index === 0 &&
    data.column.index === 0
  ) {

    data.cell.colSpan = columns.length;
    data.cell.styles.halign = "center";
    data.cell.styles.fontStyle = "italic";
    data.cell.styles.textColor = [120, 120, 120];

  }

},

    didDrawPage: () => {

      drawHeader();
      drawFooter();

      pageTitle(title);

    }

  });

};

  drawHeader();
  doc.setFillColor(...LIGHT);
  doc.rect(0, HEADER_HEIGHT, PAGE_WIDTH, PAGE_HEIGHT - HEADER_HEIGHT, "F");

  if (logoImage) {
  drawImage(
    logoImage,
    (PAGE_WIDTH - 40) / 2,
    38,
    40,
    40
  );
}
  doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.setTextColor(...PRIMARY);

const companyName = sanitizeText(
  formatValue(profile.industry_name)
);

const companyLines = doc.splitTextToSize(
  companyName,
  PAGE_WIDTH - 30
);

doc.text(
  companyLines,
  PAGE_WIDTH / 2,
  84,
  {
    align: "center",
  }
);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...DARK);
  doc.text(`Industry Category: ${formatValue(profile.industry_category)}`, PAGE_WIDTH / 2, 98, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Prepared For: ${formatValue(profile.industry_name)}`, PAGE_WIDTH / 2, 112, { align: "center" });
  doc.text("Prepared By: GreenEnvis", PAGE_WIDTH / 2, 119, { align: "center" });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, PAGE_WIDTH / 2, 126, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(...GREY);

  doc.text(
    "A premium environmental profile designed for regulatory review, investor reporting and professional compliance assessment.",
    PAGE_WIDTH / 2,
    132,
    { align: "center", maxWidth: PAGE_WIDTH - 2 * MARGIN }
  );
/*
  doc.setFillColor(241, 248, 243);
doc.setDrawColor(...PRIMARY);
doc.setLineWidth(0.4);

doc.roundedRect(
  MARGIN,
  138,
  PAGE_WIDTH - (MARGIN * 2),
  30,
  4,
  4,
  "FD"
);

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text(
  "EXECUTIVE SUMMARY",
  MARGIN + 6,
  147
);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  "Industry Category : " +
    formatValue(
      resolveProfileValue(
        "industry_category",
        "industry_type",
        "category"
      )
    ),
  MARGIN + 6,
  155
);

doc.text(
  "Total Plot Area : " +
    formatValue(
      resolveProfileValue(
        "total_area",
        "total_plot_area",
        "plot_area",
        "plot_size",
        "factory_area",
        "site_area"
      )
    ),
  MARGIN + 6,
  162
);
*/
const executiveCards = [
  {
    title: "Employees",
    value: formatValue(resolveProfileValue("total_employees","employees","manpower")),
  },
  {
    title: "Plot Area",
    value: formatValue(resolveProfileValue("total_area","total_plot_area","plot_area","factory_area","site_area")),
  },
  {
    title: "Water Requirement",
    value: formatValue(resolveProfileValue("fresh_water_requirement","fresh_water","fresh_water_demand","water_requirement")),
  },
  {
    title: "Industry Category",
    value: formatValue(resolveProfileValue("industry_category","industry_type","category")),
  },
  {
    title: "Wastewater",
    value: formatValue(resolveProfileValue("total_wastewater","wastewater_generation","wastewater")),
  },
 
  {
    title: "Water Source",
    value: getWaterSourceValue(),
  },
];

/*
const coverEndY =
  (doc as any).lastAutoTable?.finalY || 235;

if (coverEndY < 270) {
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.6);
  doc.line(
    MARGIN,
    coverEndY + 8,
    PAGE_WIDTH - MARGIN,
    coverEndY + 8
  );
}
*/

doc.addPage();

  pageTitle("Table of Contents");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Section", "Details"]],
    body: [
      ["Executive Summary", "High-level KPIs and performance overview"],
      ["Basic Information", "Company identity and registration details"],
      ["Contact Information", "Primary industry contact details"],
      ["Factory Details", "Site and operational footprint"],
      ["Manufacturing Details", "Product, raw material, by-product and fuel profile"],
      ["Water Management", "Water use, reuse and discharge summary"],
      ["Environmental Compliance", "Permits and approval status"],
      ["Waste Management", "Waste streams and disposal profile"],
      ["GPS", "Location and mapping information"],
      ["Compliance Summary", "Overall compliance assessment"],
      ["Declaration", "Authorized signatory and corporate seal"],
    ],
  });

  addSectionPage("Executive Summary");
 
 doc.setFont("helvetica","bold");

doc.setFontSize(13);

doc.setTextColor(18,92,51);

doc.text(
"Executive Overview",
MARGIN,
HEADER_HEIGHT + 28
);

doc.setFont("helvetica","normal");

doc.setFontSize(10);

doc.setTextColor(...GREY);

doc.text(
  "This report provides a consolidated overview of the industry's infrastructure, manufacturing operations, environmental compliance, water management and waste management status for regulatory and professional assessment.",
  MARGIN,
  HEADER_HEIGHT + 38,
  {
    maxWidth: PAGE_WIDTH - (MARGIN * 2),
  }
);

  doc.setFillColor(248, 250, 249);
  doc.setDrawColor(220, 228, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, HEADER_HEIGHT + 48, PAGE_WIDTH - 2 * MARGIN, 24, 3.5, 3.5, "F");
  doc.roundedRect(MARGIN, HEADER_HEIGHT + 48, PAGE_WIDTH - 2 * MARGIN, 24, 3.5, 3.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY);
  doc.text("Profile Highlights", MARGIN + 6, HEADER_HEIGHT + 56);
  drawKpiCards(executiveCards);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...GREY);
  doc.text(
    `Category: ${formatValue(resolveProfileValue("industry_category", "industry_type", "category"))}  •  Total Area: ${formatValue(resolveProfileValue("total_area", "total_plot_area", "plot_area", "plot_size", "factory_area", "site_area"))}  •  Water Source: ${getWaterSourceValue()}`,
    MARGIN + 6,
    HEADER_HEIGHT + 63,
    { maxWidth: PAGE_WIDTH - 2 * MARGIN - 12 }
  );

  addSectionPage("Basic Information");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Field", "Value"]],
    body: [
      ["Industry Name", formatValue(resolveProfileValue("industry_name", "company_name", "organization_name"))],
      ["Industry Address", formatValue(resolveProfileValue("industry_address", "factory_address", "address"))],
      ["GST Number", formatValue(profile.gst_number)],
      ["PAN Number", formatValue(profile.pan_number)],
      ["CIN Number", formatValue(profile.cin_number)],
      ["Industry Category", formatValue(resolveProfileValue("industry_category", "industry_type", "category"))],
      ["Manufacturing Activity", formatValue(profile.manufacturing_activity)],
      ["Establishment Year", formatValue(profile.factory_establishment_year)],
    ],
  });

  addSectionPage("Contact Information");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Field", "Value"]],
    body: [
      ["Contact Person", formatValue(resolveProfileValue("contact_person", "person_name", "authorized_person"))],
      ["Designation", formatValue(resolveProfileValue("designation", "role", "position"))],
      ["Mobile", formatValue(resolveProfileValue("mobile_no", "mobile", "phone", "contact_number"))],
      ["Alternate Mobile", formatValue(resolveProfileValue("alternate_mobile", "alternate_phone"))],
      ["Email", formatValue(resolveProfileValue("email", "email_id", "contact_email"))],
      ["Survey No.", formatValue(resolveProfileValue("survey_no", "survey_number"))],
      ["Village", formatValue(resolveProfileValue("village", "village_name"))],
      ["Taluka", formatValue(resolveProfileValue("taluka"))],
      ["District", formatValue(resolveProfileValue("district"))],
      ["State", formatValue(resolveProfileValue("state"))],
      ["Pincode", formatValue(resolveProfileValue("pincode", "pin_code", "postal_code", "zip_code"))],
    ],
  });

const contactTable = (doc as any).lastAutoTable;

if (contactTable) {

  const email = resolveProfileValue(
    "email",
    "email_id",
    "contact_email"
  );

  if (email && String(email).includes("@")) {

    const cell = contactTable.body[4].cells[1];

    doc.setTextColor(0, 0, 255);

    doc.link(
      cell.x,
      cell.y,
      cell.width,
      cell.height,
      {
        url: `mailto:${email}`,
      }
    );
  }

  const website = profile.website;

if (
  website &&
  typeof website === "string" &&
  website.startsWith("http")
) {

  const websiteCell = contactTable.body[4].cells[1];

  doc.setTextColor(0, 0, 255);

  doc.link(
    websiteCell.x,
    websiteCell.y,
    websiteCell.width,
    websiteCell.height,
    {
      url: website,
    }
  );
}

}

addSectionPage("Factory Details");

  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Field", "Value"]],
    body: [
      ["Total Area", formatValue(resolveProfileValue("total_area", "total_plot_area", "plot_area", "plot_size", "factory_area", "site_area"))],
      ["Built-up Area", formatValue(resolveProfileValue("built_up_area", "builtup_area"))],
      ["Open Area", formatValue(resolveProfileValue("open_area"))],
      ["Greenbelt Area", formatValue(resolveProfileValue("greenbelt_area", "green_belt_area"))],
      ["Total Employees", formatValue(resolveProfileValue("total_employees", "employees", "manpower"))],
      ["Working Shift", formatValue(resolveProfileValue("working_shift", "shift"))],
      ["Working Days", formatValue(resolveProfileValue("working_days", "days"))],
    ],
  });

  addSectionPage("Manufacturing Details");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Product", "Quantity", "Unit"]],
    body: (profile.products || []).length
      ? (profile.products || []).map((x: any) => [formatValue(x.product_name), formatValue(x.quantity), formatValue(x.unit)])
      : [["-", "-", "-"]],
  });

  autoTable(doc, {
    ...tableOptions,
    startY: (doc as any).lastAutoTable.finalY + 12,
    head: [["Raw Material", "Quantity", "Unit"]],
    body: (profile.raw_materials || []).length
      ? (profile.raw_materials || []).map((x: any) => [formatValue(x.raw_material_name), formatValue(x.quantity), formatValue(x.unit)])
      : [["-", "-", "-"]],
  });

  autoTable(doc, {
    ...tableOptions,
    startY: (doc as any).lastAutoTable.finalY + 12,
    head: [["By Product", "Quantity", "Unit"]],
    body: (profile.byproducts || []).length
      ? (profile.byproducts || []).map((x: any) => [formatValue(x.byproduct_name), formatValue(x.quantity), formatValue(x.unit)])
      : [["-", "-", "-"]],
  });

  autoTable(doc, {
    ...tableOptions,
    startY: (doc as any).lastAutoTable.finalY + 12,
    head: [["Fuel", "Quantity", "Unit"]],
    body: (profile.fuels || []).length
      ? (profile.fuels || []).map((x: any) => [formatValue(x.fuel_name), formatValue(x.quantity), formatValue(x.unit)])
      : [["-", "-", "-"]],
  });

  /* ===========================================================
   WATER MANAGEMENT (NEW DESIGN)
=========================================================== */

addSectionPage("Water Requirement & Water Balance");

let waterY = HEADER_HEIGHT + 30;

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(...PRIMARY);

doc.setFont("helvetica","bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text("Water Source", MARGIN, waterY);

waterY += 8;

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);

const waterSources = [
  "GIDC",
  "Borewell",
  "Tanker",
  "River",
  "Canal",
  "Surface Water",
  "Recycled Water",
  "Other",
];

let sourceX = MARGIN;

waterSources.forEach((source) => {

  const selected =
    Array.isArray(profile.water_source) &&
    profile.water_source.includes(source);

  doc.rect(sourceX, waterY - 3, 3, 3);

  if (selected) {

  doc.setFillColor(22, 101, 52);

  doc.rect(
    sourceX + 0.6,
    waterY - 2.4,
    1.8,
    1.8,
    "F"
  );

}

  doc.text(
    source,
    sourceX + 5,
    waterY
  );

  sourceX += 24;

});

waterY += 12;

doc.setFont("helvetica","bold");
doc.setFontSize(10);

doc.text("Fresh Water Requirement (KLD)", MARGIN, waterY);

doc.rect(70, waterY - 5, 30, 7);

doc.setFont("helvetica","normal");

doc.text(
  formatValue(
    resolveProfileValue(
      "fresh_water_requirement",
      "fresh_water",
      "water_requirement"
    )
  ),
  73,
  waterY
);

waterY += 15;

/* ------------------------------------------
   Auto Page Break
------------------------------------------- */

if (waterY > PAGE_HEIGHT - 95) {

  doc.addPage();

  drawHeader();

  drawFooter();

  waterY = HEADER_HEIGHT + 18;

}

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text("Water Consumption (KLD)", MARGIN, waterY);

const consumptionLeftX = MARGIN;
const consumptionRightX = 110;

waterY += 8;

const drawConsumptionField = (
  x: number,
  y: number,
  label: string,
  value: any
) => {

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);

  doc.text(label, x, y);

  doc.roundedRect(x, y + 2, 32, 7, 1.5, 1.5);

  doc.text(
    formatValue(value),
    x + 2,
    y + 7
  );

};

drawConsumptionField(consumptionLeftX, waterY, "Domestic", profile.domestic_consumption);
drawConsumptionField(consumptionRightX, waterY, "Industrial", profile.industrial_consumption);

waterY += 16;

drawConsumptionField(consumptionLeftX, waterY, "Boiler", profile.boiler_consumption);
drawConsumptionField(consumptionRightX, waterY, "Cooling", profile.cooling_consumption);

waterY += 16;

drawConsumptionField(consumptionLeftX, waterY, "Gardening", profile.gardening_consumption);
drawConsumptionField(consumptionRightX, waterY, "Construction", profile.construction_consumption);

waterY += 16;

drawConsumptionField(consumptionLeftX, waterY, "Other", profile.other_consumption);

waterY += 18;

doc.setFont("helvetica","bold");
doc.setFontSize(10);
doc.setTextColor(...PRIMARY);

doc.text(
  "Total Water Consumption (KLD)",
  MARGIN,
  waterY
);

doc.roundedRect(
  78,
  waterY - 5,
  38,
  8,
  1.5,
  1.5
);

doc.setFont("helvetica","bold");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  formatValue(profile.total_consumption),
  81,
  waterY
);

waterY += 18;

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text("Wastewater Generation (KLD)", MARGIN, waterY);

const wastewaterLeftX = MARGIN;
const wastewaterRightX = 110;

waterY += 8;

const drawWastewaterField = (
  x: number,
  y: number,
  label: string,
  value: any
) => {

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);

  doc.text(label, x, y);

  doc.roundedRect(x, y + 2, 32, 7, 1.5, 1.5);

  doc.text(
    formatValue(value),
    x + 2,
    y + 7
  );

};

drawWastewaterField(
  wastewaterLeftX,
  waterY,
  "Domestic",
  profile.domestic_wastewater
);

drawWastewaterField(
  wastewaterRightX,
  waterY,
  "Industrial",
  profile.industrial_wastewater
);

waterY += 16;

drawWastewaterField(
  wastewaterLeftX,
  waterY,
  "Cooling Blowdown",
  profile.cooling_blowdown
);

drawWastewaterField(
  wastewaterRightX,
  waterY,
  "Boiler Blowdown",
  profile.boiler_blowdown
);

waterY += 16;

drawWastewaterField(
  wastewaterLeftX,
  waterY,
  "RO Reject",
  profile.ro_reject
);

drawWastewaterField(
  wastewaterRightX,
  waterY,
  "Other",
  profile.other_wastewater
);

waterY += 18;

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(...PRIMARY);

doc.text(
  "Total Wastewater (KLD)",
  MARGIN,
  waterY
);

doc.roundedRect(
  78,
  waterY - 5,
  35,
  8,
  1.5,
  1.5
);

doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  formatValue(profile.total_wastewater),
  81,
  waterY
);

waterY += 18;
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text("Treatment System", MARGIN, waterY);

waterY += 8;

const treatmentSystems = [
  ["ETP", profile.etp],
  ["STP", profile.stp],
  ["RO", profile.ro],
  ["MEE", profile.mee],
  ["ATFD", profile.atfd],
  ["ZLD", profile.zld],
] as const;

let treatmentX = MARGIN;

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);

treatmentSystems.forEach(([label, checked]) => {

  doc.rect(treatmentX, waterY - 3, 3, 3);

  if (checked) {
    doc.setFillColor(22, 101, 52);
    doc.rect(treatmentX + 0.5, waterY - 2.5, 2, 2, "F");
  }

  doc.text(label, treatmentX + 5, waterY);

  treatmentX += 28;

});

waterY += 14;

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(...PRIMARY);

doc.text("Final Wastewater Discharge Point", MARGIN, waterY);

doc.roundedRect(78, waterY - 5, 80, 8, 1.5, 1.5);

doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  formatValue(profile.final_discharge_point),
  81,
  waterY
);

waterY += 18;

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

/* ---------- PAGE BREAK BEFORE WATER REUSE ---------- */

if (waterY > 190) {

  doc.addPage();

  drawHeader();
  drawFooter();

  pageTitle("Water Requirement & Water Balance (Continued)");

  waterY = HEADER_HEIGHT + 28;

}

doc.text("Water Reuse (KLD)", MARGIN, waterY);

const reuseLeftX = MARGIN;
const reuseRightX = 110;

waterY += 8;

const drawReuseField = (
  x: number,
  y: number,
  label: string,
  value: any
) => {

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...DARK);

  doc.text(label, x, y);

  doc.roundedRect(x, y + 2, 32, 7, 1.5, 1.5);

  doc.text(
    formatValue(value),
    x + 2,
    y + 7
  );

};

drawReuseField(reuseLeftX, waterY, "Garden", profile.reuse_garden);
drawReuseField(reuseRightX, waterY, "Cooling", profile.reuse_cooling);

waterY += 16;

drawReuseField(reuseLeftX, waterY, "Boiler", profile.reuse_boiler);
drawReuseField(reuseRightX, waterY, "Process", profile.reuse_process);

waterY += 16;

drawReuseField(reuseLeftX, waterY, "Flushing", profile.reuse_flushing);
drawReuseField(reuseRightX, waterY, "Other", profile.reuse_other);

waterY += 18;

doc.setFont("helvetica","bold");
doc.setFontSize(10);
doc.setTextColor(...PRIMARY);

doc.text("Total Reuse (KLD)", MARGIN, waterY);

doc.roundedRect(62, waterY - 5, 35, 8, 1.5, 1.5);

doc.setFont("helvetica","bold");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  formatValue(profile.total_reuse),
  65,
  waterY
);

waterY += 20;

/* ==========================
   FINAL WATER BALANCE
========================== */

doc.setFillColor(248,250,252);
doc.setDrawColor(209,213,219);

doc.roundedRect(
  MARGIN,
  waterY,
  175,
  48,
  3,
  3,
  "FD"
);

doc.setFont("helvetica","bold");
doc.setFontSize(11);
doc.setTextColor(...PRIMARY);

doc.text(
  "Final Water Balance",
  MARGIN + 5,
  waterY + 8
);

doc.setFont("helvetica","normal");
doc.setFontSize(9);
doc.setTextColor(...DARK);

doc.text(
  `Fresh Water : ${formatValue(profile.fresh_water_requirement)} KLD`,
  MARGIN + 5,
  waterY + 16
);

doc.text(
  `Consumption : ${formatValue(profile.total_consumption)} KLD`,
  MARGIN + 5,
  waterY + 23
);

doc.text(
  `Wastewater : ${formatValue(profile.total_wastewater)} KLD`,
  MARGIN + 5,
  waterY + 30
);

doc.text(
  `Reuse : ${formatValue(profile.total_reuse)} KLD`,
  MARGIN + 95,
  waterY + 16
);

doc.setFont("helvetica","bold");
doc.setFontSize(10);
doc.setTextColor(...PRIMARY);

doc.text(
  `Final Discharge : ${formatValue(profile.final_discharge)} KLD`,
  MARGIN + 95,
  waterY + 30
);

waterY += 60;

addSectionPage("Environmental Compliance");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Compliance", "Status", "Reference No.", "Valid Upto"]],
    body: [
      ["Consent to Establish", complianceStatus(profile.cte), formatValue(profile.cte_no), formatValue(profile.cte_valid_upto)],
      ["Consent to Operate", complianceStatus(profile.cca), formatValue(profile.cca_no), formatValue(profile.cca_valid_upto)],
      ["Environmental Clearance", profile.ec_no ? "Yes" : "No", formatValue(profile.ec_no), formatValue(profile.ec_valid_upto)],
      ["CGWA NOC", complianceStatus(profile.cgwa_noc), formatValue(profile.cgwa_noc_no), formatValue(profile.cgwa_valid_upto)],
      ["Factory License", complianceStatus(profile.factory_license), formatValue(profile.factory_license_no), formatValue(profile.factory_license_valid_upto)],
      ["Fire NOC", complianceStatus(profile.fire_noc), formatValue(profile.fire_noc_no), formatValue(profile.fire_noc_valid_upto)],
      ["PESO", complianceStatus(profile.peso), formatValue(profile.peso_license_no), formatValue(profile.peso_valid_upto)],
      ["MSIHC", complianceStatus(profile.msihc), formatValue(profile.msihc_rule), "-"],
      ["Hazardous Chemicals", complianceStatus((profile.hazardous_chemicals || []).length > 0), `Count: ${(profile.hazardous_chemicals || []).length}`, "-"],
    ],
  });

  if ((profile.hazardous_chemicals || []).length) {
    autoTable(doc, {
      ...tableOptions,
      startY: (doc as any).lastAutoTable.finalY + 12,
      head: [["Chemical", "CAS No", "Storage Qty", "Unit", "Threshold Qty"]],
      body: (profile.hazardous_chemicals || []).map((x: any) => [
        formatValue(x.chemical_name),
        formatValue(x.cas_no),
        formatValue(x.storage_qty),
        formatValue(x.unit),
        formatValue(x.threshold_qty),
      ]),
    });
  }

  addSectionPage("Waste Management");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Waste Stream", "Records"]],
    body: [
      ["Hazardous Waste", (profile.hazardous_waste_data || []).length],
      ["Non-Hazardous Waste", (profile.non_hazardous_waste_data || []).length],
      ["Plastic Waste", (profile.plastic_waste_data || []).length],
      ["Used Oil", (profile.used_oil_data || []).length],
      ["Battery Waste", (profile.battery_waste_data || []).length],
      ["Biomedical Waste", (profile.biomedical_waste_data || []).length],
      ["E-Waste", (profile.ewaste_data || []).length],
      ["Disposal Facilities", (profile.disposal_facilities || []).length],
    ],
  });

  renderSeparatedTable(
    "Hazardous Waste",
    ["Category", "Waste Name", "Qty", "Unit", "Disposal", "Recycler"],
    (profile.hazardous_waste_data || []).map((x: any) => [
      formatValue(x.category),
      formatValue(x.waste_name),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.disposal_method),
      formatValue(x.recycler),
    ])
  );

  renderSeparatedTable(
    "Non-Hazardous Waste",
    ["Waste Name", "Qty", "Unit", "Disposal"],
    (profile.non_hazardous_waste_data || []).map((x: any) => [
      formatValue(x.waste_name),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.disposal),
    ])
  );

  renderSeparatedTable(
    "Plastic Waste",
    ["Plastic Type", "Qty", "Unit", "Recycler"],
    (profile.plastic_waste_data || []).map((x: any) => [
      formatValue(x.plastic_type),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.recycler),
    ])
  );

  renderSeparatedTable(
    "Used Oil",
    ["Oil Type", "Qty", "Unit", "Recycler"],
    (profile.used_oil_data || []).map((x: any) => [
      formatValue(x.oil_type),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.recycler),
    ])
  );

  renderSeparatedTable(
    "Battery Waste",
    ["Battery Type", "Qty", "Unit", "Recycler"],
    (profile.battery_waste_data || []).map((x: any) => [
      formatValue(x.battery_type),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.recycler),
    ])
  );

  renderSeparatedTable(
    "Biomedical Waste",
    ["Category", "Waste Name", "Qty", "Unit", "CBWTF"],
    (profile.biomedical_waste_data || []).map((x: any) => [
      formatValue(x.category),
      formatValue(x.waste_name),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.cbwtf_name),
    ])
  );

  renderSeparatedTable(
    "E-Waste",
    ["Category", "Item Name", "Qty", "Unit", "Recycler"],
    (profile.ewaste_data || []).map((x: any) => [
      formatValue(x.category),
      formatValue(x.item_name),
      formatValue(x.quantity),
      formatValue(x.unit),
      formatValue(x.recycler),
    ])
  );

  renderSeparatedTable(
    "Disposal Facilities",
    ["Facility Type", "Facility Name", "Address", "Authorization No"],
    (profile.disposal_facilities || []).map((x: any) => [
      formatValue(x.facility_type),
      formatValue(x.facility_name),
      formatValue(x.address),
      formatValue(x.authorization_no),
    ])
  );

  addSectionPage("GPS");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Field", "Value"]],
    body: [
    
      [
  "Google Map Link",
  resolveProfileValue(
    "google_map_link",
    "google_map",
    "google_maps_link",
    "map_link",
    "location_link"
  ) || "Not Available",
],
      ["Coordinates", profile.latitude && profile.longitude ? `${formatValue(profile.latitude)}, ${formatValue(profile.longitude)}` : "-"],
      ["Latitude", formatValue(profile.latitude)],
      ["Longitude", formatValue(profile.longitude)],
    ],
  });

const gpsTable = (doc as any).lastAutoTable;

const mapLink = resolveProfileValue(
  "google_map_link",
  "google_map",
  "google_maps_link",
  "map_link",
  "location_link"
);

if (
  gpsTable &&
  typeof mapLink === "string" &&
  mapLink.startsWith("http")
) {
  const cell = gpsTable.body[0].cells[1];

  doc.setTextColor(0, 0, 255);

  doc.link(
    cell.x,
    cell.y,
    cell.width,
    cell.height,
    {
      url: mapLink,
    }
  );
}

  addSectionPage("Compliance Summary");
  autoTable(doc, {
    ...tableOptions,
    startY: HEADER_HEIGHT + 28,
    head: [["Section", "Status"]],
    body: [
      ["Basic Information", profile.industry_name ? "Completed" : "Pending"],
      ["Contact Information", profile.contact_person ? "Completed" : "Pending"],
      ["Factory Details", resolveProfileValue("total_area", "total_plot_area", "plot_area", "plot_size", "factory_area", "site_area") ? "Completed" : "Pending"],
      ["Product Details", (profile.products || []).length ? "Completed" : "Pending"],
      ["Water Management", profile.total_consumption ? "Completed" : "Pending"],
      ["Environmental Details", profile.cte_no || profile.cca_no ? "Completed" : "Pending"],
      ["Waste Management", countWasteStreams() ? "Completed" : "Pending"],
      ["GPS", profile.latitude && profile.longitude ? "Completed" : "Pending"],
    ],
  });

  addSectionPage("Declaration");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const declarationLines = [
    "This profile has been prepared based on the information captured in the Industry Profile portal.",
    "The facility is responsible for the accuracy of the information provided and should update the profile whenever conditions change.",
    "This document is intended for statutory compliance, internal review and external submission purposes.",
    "Authorized signatory approval is required for all official use of this report.",
  ];

  let declarationY = HEADER_HEIGHT + 28;
  declarationLines.forEach((line) => {
    doc.text(line, MARGIN, declarationY, { maxWidth: PAGE_WIDTH - 2 * MARGIN });
    declarationY += 8;
  });

  declarationY += 18;
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, declarationY, MARGIN + 70, declarationY);
  doc.line(PAGE_WIDTH - MARGIN - 70, declarationY, PAGE_WIDTH - MARGIN, declarationY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Authorized Signatory", MARGIN, declarationY + 6);
  doc.text("Company Seal", PAGE_WIDTH - MARGIN - 70, declarationY + 6);

  const totalPages = doc.getNumberOfPages();

for (let page = 1; page <= totalPages; page++) {
  doc.setPage(page);
  drawHeader();
  drawFooter();
}

for (let page = 1; page <= totalPages; page++) {
  doc.setPage(page);
  drawHeader();
  drawFooter();
}

  const fileName = `Industry_Profile_${(profile.industry_name || "report").replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`;
  doc.save(fileName);
};
