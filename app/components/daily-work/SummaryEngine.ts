export type SummaryResult = {
  technicalWorkDone: string[];
  officeWorkDone: string[];
  nextDayPlan: string[];
  blockers: string[];
};

function cleanText(value: unknown): string {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

function ensurePeriod(value: string): string {
  const text = cleanText(value);

  if (!text) return "";

  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function professionalizeTechnicalWork(
  description: string,
  work: string,
  unit: string,
  nextAction: string
): string {
  const text = cleanText(description);
  const service = cleanText(work);
  const company = cleanText(unit);

  let sentence = "";

  if (text) {
    const lower = text.toLowerCase();

    if (
      lower.startsWith("already proceed") ||
      lower.startsWith("proceed") ||
      lower.startsWith("proceeded")
    ) {
      const cleaned = text
        .replace(/^already\s+/i, "")
        .replace(/^proceed(?:ed)?\s+(?:for|with|on)\s*/i, "")
        .trim();

      sentence = cleaned
        ? `Proceeded with ${cleaned}`
        : `Proceeded with the ${service || "assigned compliance work"}`;
    } else if (
      lower.startsWith("already submit") ||
      lower.startsWith("submit") ||
      lower.startsWith("submitted")
    ) {
      const cleaned = text
        .replace(/^already\s+/i, "")
        .replace(/^submit(?:ted)?\s+(?:for|with|to|on)\s*/i, "")
        .trim();

      sentence = cleaned
        ? `Submitted ${cleaned}`
        : `Submitted the ${service || "required application"} for further processing`;
    } else if (
      lower.startsWith("already prepare") ||
      lower.startsWith("prepare") ||
      lower.startsWith("prepared")
    ) {
      const cleaned = text
        .replace(/^already\s+/i, "")
        .replace(/^prepare(?:d)?\s+(?:for|of|on)\s*/i, "")
        .trim();

      sentence = cleaned
        ? `Prepared ${cleaned}`
        : `Prepared the required documents for ${service || "the assigned work"}`;
    } else if (
      lower.startsWith("verify") ||
      lower.startsWith("verified") ||
      lower.startsWith("verification")
    ) {
      sentence = `Reviewed and verified ${text.replace(
        /^(verify|verified|verification)\s*/i,
        ""
      )}`.trim();
    } else if (
      lower.startsWith("follow up") ||
      lower.startsWith("follow-up") ||
      lower.startsWith("followed up")
    ) {
      const cleaned = text
        .replace(/^follow(?:ed)?[-\s]?up\s*/i, "")
        .trim();

      sentence = cleaned
        ? `Followed up regarding ${cleaned}`
        : `Followed up regarding ${service || "the ongoing work"}`;
    } else {
      sentence = text;
    }
  } else {
    sentence = service
      ? `Worked on ${service}`
      : "Worked on the assigned compliance activities";
  }

  if (company && !sentence.toLowerCase().includes(company.toLowerCase())) {
    sentence += ` for ${company}`;
  }

  sentence = ensurePeriod(sentence);

  if (nextAction) {
    sentence += ` Next step: ${ensurePeriod(nextAction)}`;
  }

  return sentence;
}

function professionalizeOfficeWork(
  description: string,
  taskTitle: string,
  workType: string,
  unit: string,
  nextAction: string
): string {
  const text = cleanText(description);
  const title = cleanText(taskTitle);
  const type = cleanText(workType);

  let sentence = "";

  if (text) {
    const lower = text.toLowerCase();

    console.log("TECHNICAL RAW TEXT =", text);
    console.log("TECHNICAL LOWER TEXT =", lower);

    if (
      lower.includes("meeting") ||
      type.toLowerCase() === "meeting"
    ) {
      const topic =
        text
          .replace(/^(completed|attended|conducted)?\s*(a\s*)?meeting\s*(and\s*)?(discussion)?\s*(for|regarding|about|on)?\s*/i, "")
          .trim() ||
        title;

      sentence = topic
        ? `Participated in a meeting and discussion focused on ${topic}`
        : "Participated in an official meeting and discussion";
    } else if (
      lower.startsWith("verify") ||
      lower.includes("verification")
    ) {
      const topic =
        text.replace(/^(completed\s*)?(document\s*)?verification\s*/i, "").trim() ||
        title;

      sentence = topic
        ? `Reviewed and verified the relevant documents and information related to ${topic}`
        : "Reviewed and verified the relevant documents and information";
    } else if (
      lower.includes("email")
    ) {
      sentence = title
        ? `Prepared and managed official email correspondence regarding ${title}`
        : "Prepared and managed official email correspondence";
    } else if (
      lower.includes("phone") ||
      lower.includes("call")
    ) {
      sentence = title
        ? `Conducted official communication and follow-up regarding ${title}`
        : "Conducted official communication and follow-up";
    } else {
      sentence = text;
    }
  } else if (type && title) {
    sentence = `Completed ${type.toLowerCase()} related to ${title}`;
  } else if (title) {
    sentence = `Completed office and administrative work related to ${title}`;
  } else if (type) {
    sentence = `Completed office and administrative activities related to ${type.toLowerCase()}`;
  } else {
    sentence = "Completed the required office and administrative work";
  }

  if (
    unit &&
    !sentence.toLowerCase().includes(unit.toLowerCase())
  ) {
    sentence += ` for ${unit}`;
  }

  sentence = ensurePeriod(sentence);

  if (nextAction) {
    sentence += ` Next step: ${ensurePeriod(nextAction)}`;
  }

  return sentence;
}

export function generateSummary(records: any[]): SummaryResult {
  const technicalWorkDone = records
    .filter(
      (item: any) =>
        item.inquiry_type !== "Office Work" &&
        (
          item.scope_of_work ||
          item.task_title ||
          item.work_description
        )
    )
    .map((item: any) => {
      const work = cleanText(
        item.scope_of_work ||
        item.task_title ||
        "assigned compliance work"
      );

      return professionalizeTechnicalWork(
        cleanText(item.work_description),
        work,
        cleanText(item.unit_name),
        cleanText(item.next_action)
      );
    });

  const officeWorkDone = records
    .filter(
      (item: any) =>
        item.inquiry_type === "Office Work"
    )
    .map((item: any) => {
      const workType =
        item.office_work_type === "Other"
          ? cleanText(item.other_office_work)
          : cleanText(item.office_work_type);

      return professionalizeOfficeWork(
        cleanText(item.work_description),
        cleanText(item.task_title),
        workType,
        cleanText(item.unit_name),
        cleanText(item.next_action)
      );
    });

  const nextDayPlan = records
    .filter((item: any) => {
      if (item.status === "Completed") return false;

      return (
        item.next_action ||
        item.next_followup ||
        item.due_date
      );
    })
    .map((item: any) => {
      if (item.inquiry_type === "Office Work") {
        return `${item.task_title || "Office Task"}${
          item.due_date
            ? ` (Due: ${item.due_date})`
            : ""
        }`;
      }

      return `${item.scope_of_work || item.task_title || "Compliance Work"}${
        item.next_action
          ? ` → ${item.next_action}`
          : ""
      }${
        item.next_followup
          ? ` (Follow-up: ${item.next_followup})`
          : ""
      }`;
    });

  const blockers = records
    .filter((item: any) => item.status === "On Hold")
    .map((item: any) => {
      return `${
        item.scope_of_work ||
        item.task_title ||
        "Work"
      } - Status: On Hold`;
    });

  return {
    technicalWorkDone,
    officeWorkDone,
    nextDayPlan,
    blockers,
  };
}
