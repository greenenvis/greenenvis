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
  const originalDescription =
  cleanText(description) || cleanText(taskTitle);
  const descriptionText = originalDescription.toLowerCase();
  const type = cleanText(workType).toLowerCase();
  const company = companyPhrase(unit);

  const normalizedDescription = originalDescription
    .replace(
      /\bMOEFCC\b/gi,
      "Ministry of Environment, Forest and Climate Change (MoEFCC)"
    )
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedDescription) {
    const title = professionalWorkName(
      taskTitle,
      "assigned office and administrative activity"
    );

    return ensurePeriod(
      `Completed the assigned office and administrative activity related to ${title}${company}`
    );
  }

  if (
    /vendor registration actual users authorized by gpcb under hazardous and other wastes on econexa portal/i.test(
      normalizedDescription
    )
  ) {
    return ensurePeriod(
      "Completed the required vendor registration activity for actual users authorized by GPCB under the applicable Hazardous and Other Wastes requirements through the EcoNexa Portal"
    );
  }

  if (
    /meeting|discussion/.test(descriptionText) ||
    type === "meeting"
  ) {
    return ensurePeriod(
      `Participated in an official discussion regarding ${normalizedDescription}${company}`
    );
  }

  if (
    /verify|verification/.test(descriptionText) ||
    /verify|verification/.test(type)
  ) {
    return ensurePeriod(
      `Reviewed and verified the relevant information and documentation for ${normalizedDescription}${company}`
    );
  }

  if (/portal/.test(descriptionText)) {
    return ensurePeriod(
      `Completed the required portal-related activity for ${normalizedDescription}${company}`
    );
  }

  if (
    /email/.test(descriptionText) ||
    /email/.test(type)
  ) {
    return ensurePeriod(
      `Handled official email communication regarding ${normalizedDescription}${company}`
    );
  }

  if (
    /phone|call/.test(descriptionText) ||
    /phone|call/.test(type)
  ) {
    return ensurePeriod(
      `Conducted official communication and follow-up regarding ${normalizedDescription}${company}`
    );
  }

  return ensurePeriod(
    `Completed the assigned office and administrative activity related to ${normalizedDescription}${company}`
  );
}

function professionalNextDayPlan(item: any): string {
  const isOfficeWork = item.inquiry_type === "Office Work";
  const nextAction = cleanText(item.next_action).toLowerCase();
  const description =
  cleanText(item.work_description) ||
  cleanText(item.task_title);
  const descriptionText = description.toLowerCase();
  const followUpDate = formatDate(item.next_followup);
  const dueDate = formatDate(item.due_date);

  let plan = "";

  if (
    isOfficeWork &&
    /vendor registration actual users authorized by gpcb under hazardous and other wastes on econexa portal/i.test(
      description
    )
  ) {
    plan =
      "Continue the vendor registration process for actual users authorized by GPCB under the applicable Hazardous and Other Wastes requirements through the EcoNexa Portal";
  } else {
    const subject = professionalWorkName(
      isOfficeWork
        ? item.task_title || item.work_description
        : item.scope_of_work || item.task_title || item.work_description,
      isOfficeWork
        ? "the assigned administrative activity"
        : "the assigned compliance activity"
    );

    const company = companyPhrase(item.unit_name);

    if (isOfficeWork) {
      plan = `Continue the scheduled administrative activity related to ${subject}${company}`;
    } else if (
      /await|pending.*approval|authority.*approval/.test(nextAction)
    ) {
      plan = `Monitor the status of ${subject}${company}, as approval from the concerned authority is awaited`;
    } else if (/follow[\s-]?up/.test(nextAction)) {
      plan = `Follow up on ${subject}${company} to facilitate further progress of the activity`;
    } else if (/submit|file/.test(nextAction)) {
      plan = `Prepare and submit the required documentation for ${subject}${company}`;
    } else if (/prepare|document/.test(nextAction)) {
      plan = `Prepare the required documentation for ${subject}${company}`;
    } else {
      plan = `Continue the scheduled work related to ${subject}${company}`;
    }
  }

  if (followUpDate) {
    plan += `, with follow-up scheduled for ${followUpDate}`;
  } else if (dueDate) {
    plan += `, with the activity scheduled for completion by ${dueDate}`;
  }

  if (
    !isOfficeWork &&
    /dgft/.test(descriptionText) &&
    /await|pending.*approval|authority.*approval/.test(nextAction)
  ) {
    plan +=
      ". Preparatory work for the Directorate General of Foreign Trade (DGFT) license application will commence upon receipt of the required approval";
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
