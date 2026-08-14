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
  return text && !/[.!?]$/.test(text) ? `${text}.` : text;
}

function professionalWorkName(value: unknown, fallback: string): string {
  const name = cleanText(value) || fallback;

  return name
    .replace(/\bMOEFCC\b/gi, "Ministry of Environment, Forest and Climate Change (MoEFCC)")
    .replace(/\s*[-–—>]+\s*/g, " ")
    .trim();
}

function companyPhrase(unit: unknown): string {
  const company = cleanText(unit);
  return company ? ` for ${company}` : "";
}

function formatDate(value: unknown): string {
  const text = cleanText(value);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return "";

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function professionalizeTechnicalWork(
  description: unknown,
  work: unknown,
  unit: unknown
): string {
  const descriptionText = cleanText(description).toLowerCase();
  const service = professionalWorkName(work, "assigned compliance activity");
  const company = companyPhrase(unit);

  if (/submit|file|application\s+submitted/.test(descriptionText)) {
    return ensurePeriod(`Submitted the ${service}${company}`);
  }

  if (/prepare|document/.test(descriptionText)) {
    return ensurePeriod(`Prepared the required documentation for ${service}${company}`);
  }

  if (/verify|verification|review/.test(descriptionText)) {
    return ensurePeriod(`Reviewed and verified the requirements for ${service}${company}`);
  }

  if (/follow[\s-]?up/.test(descriptionText)) {
    return ensurePeriod(`Followed up on ${service}${company}`);
  }

  return ensurePeriod(`Initiated the ${service}${company}`);
}

function professionalizeOfficeWork(
  description: unknown,
  taskTitle: unknown,
  workType: unknown,
  unit: unknown
): string {
  const descriptionText = cleanText(description).toLowerCase();
  const title = professionalWorkName(taskTitle, "the assigned administrative activity");
  const type = cleanText(workType).toLowerCase();
  const company = companyPhrase(unit);

  if (/meeting|discussion/.test(descriptionText) || type === "meeting") {
    if (/discipline|conduct/.test(descriptionText)) {
      const organization = cleanText(unit) || "the organization";

      return ensurePeriod(
        `Participated in a discussion regarding the maintenance of professional discipline and conduct within ${organization}`
      );
    }

    return ensurePeriod(`Participated in an official discussion regarding ${title}${company}`);
  }

  if (/verify|verification|portal/.test(descriptionText) || /verify|verification/.test(type)) {
    if (/portal/.test(descriptionText) || /portal/.test(title.toLowerCase())) {
      return ensurePeriod(`Conducted verification and updated the portal using the available information${company}`);
    }

    return ensurePeriod(`Reviewed and verified the relevant documents and information for ${title}${company}`);
  }

  if (/email/.test(descriptionText) || /email/.test(type)) {
    return ensurePeriod(`Prepared and managed official email correspondence regarding ${title}${company}`);
  }

  if (/phone|call/.test(descriptionText) || /phone|call/.test(type)) {
    return ensurePeriod(`Conducted official communication and follow-up regarding ${title}${company}`);
  }

  return ensurePeriod(`Completed the required office and administrative work related to ${title}${company}`);
}

function professionalNextDayPlan(item: any): string {
  const isOfficeWork = item.inquiry_type === "Office Work";
  const subject = professionalWorkName(
    isOfficeWork ? item.task_title : item.scope_of_work || item.task_title,
    isOfficeWork ? "the assigned administrative activity" : "the assigned compliance activity"
  );
  const company = companyPhrase(item.unit_name);
  const nextAction = cleanText(item.next_action).toLowerCase();
  const descriptionText = cleanText(item.work_description).toLowerCase();
  const followUpDate = formatDate(item.next_followup);
  const dueDate = formatDate(item.due_date);

  let plan: string;

  if (isOfficeWork) {
    plan = `Complete the scheduled administrative activity related to ${subject}${company}`;
  } else if (/await|pending.*approval|authority.*approval/.test(nextAction)) {
    plan = `Monitor the ${subject} status${company}, as approval from the authority is awaited`;
  } else if (/follow[\s-]?up/.test(nextAction)) {
    plan = `Follow up on ${subject}${company} to progress the scheduled activity`;
  } else if (/submit|file/.test(nextAction)) {
    plan = `Prepare and submit the required documentation for ${subject}${company}`;
  } else if (/prepare|document/.test(nextAction)) {
    plan = `Prepare the required documentation for ${subject}${company}`;
  } else {
    plan = `Continue work on ${subject}${company} in accordance with the scheduled activity`;
  }

  if (followUpDate) {
    plan += `. A follow-up is scheduled for ${followUpDate}`;
  } else if (dueDate) {
    plan += `. The activity is due on ${dueDate}`;
  }

  if (!isOfficeWork && /dgft/.test(descriptionText) && /await|pending.*approval|authority.*approval/.test(nextAction)) {
    plan += ". Preparatory work for the Directorate General of Foreign Trade (DGFT) license application will commence upon approval";
  }

  return ensurePeriod(plan);
}

export function generateSummary(records: any[]): SummaryResult {
  const safeRecords = Array.isArray(records) ? records : [];

  const technicalWorkDone = safeRecords
    .filter(
      (item: any) =>
        item.inquiry_type !== "Office Work" &&
        (item.scope_of_work || item.task_title || item.work_description)
    )
    .map((item: any) =>
      professionalizeTechnicalWork(
        item.work_description,
        item.scope_of_work || item.task_title,
        item.unit_name
      )
    );

  const officeWorkDone = safeRecords
    .filter((item: any) => item.inquiry_type === "Office Work")
    .map((item: any) => {
      const workType =
        item.office_work_type === "Other"
          ? item.other_office_work
          : item.office_work_type;

      return professionalizeOfficeWork(
        item.work_description,
        item.task_title,
        workType,
        item.unit_name
      );
    });

  const nextDayPlan = safeRecords
    .filter(
      (item: any) =>
        item.status !== "Completed" &&
        (item.next_action || item.next_followup || item.due_date)
    )
    .map(professionalNextDayPlan);

  const blockers = safeRecords
    .filter((item: any) => item.status === "On Hold")
    .map((item: any) => {
      const subject = professionalWorkName(
        item.scope_of_work || item.task_title,
        "assigned work"
      );

      return ensurePeriod(
        `The ${subject}${companyPhrase(item.unit_name)} remains on hold pending further action`
      );
    });

  return {
    technicalWorkDone,
    officeWorkDone,
    nextDayPlan,
    blockers,
  };
}
