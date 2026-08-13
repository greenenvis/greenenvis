export type SummaryResult = {
  technicalWorkDone: string[];
  officeWorkDone: string[];
  nextDayPlan: string[];
  blockers: string[];
};

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
    const work = (
      item.scope_of_work ||
      item.task_title ||
      "assigned work"
    ).trim();

    const unit = (
      item.unit_name ||
      "Client"
    ).trim();

    const description = (
      item.work_description ||
      ""
    ).trim();

    const nextAction = (
      item.next_action ||
      ""
    ).trim();

    // 1. Actual Work Description gets highest priority
    if (description) {
      let sentence = description;

      if (!sentence.endsWith(".")) {
        sentence += ".";
      }

      if (unit && unit !== "Client") {
        sentence += ` (${unit})`;
      }

      if (nextAction) {
        sentence += ` Next step: ${nextAction}.`;
      }

      return sentence;
    }

    // 2. Professional fallback
    let sentence =
      `Worked on ${work}`;

    if (unit && unit !== "Client") {
      sentence += ` for ${unit}`;
    }

    sentence += ".";

    if (nextAction) {
      sentence += ` Next step: ${nextAction}.`;
    }

    return sentence;
  });

  const officeWorkDone = records
  .filter(
    (item: any) =>
      item.inquiry_type === "Office Work"
  )
  .map((item: any) => {
    const description = (
      item.work_description || ""
    ).trim();

    const taskTitle = (
      item.task_title || ""
    ).trim();

    const workType =
      item.office_work_type === "Other"
        ? (
            item.other_office_work || ""
          ).trim()
        : (
            item.office_work_type || ""
          ).trim();

    const nextAction = (
      item.next_action || ""
    ).trim();

    const unit = (
      item.unit_name || ""
    ).trim();

    // 1. Actual Work Description gets highest priority
    if (description) {
      let sentence = description;

      if (!sentence.endsWith(".")) {
        sentence += ".";
      }

      if (unit) {
        sentence += ` (${unit})`;
      }

      if (nextAction) {
        sentence += ` Next step: ${nextAction}.`;
      }

      return sentence;
    }

    // 2. Task Title + Work Type fallback
    if (taskTitle && workType) {
      let sentence =
        `Completed ${workType.toLowerCase()} ` +
        `regarding ${taskTitle}`;

      if (unit) {
        sentence += ` (${unit})`;
      }

      sentence += ".";

      if (nextAction) {
        sentence += ` Next step: ${nextAction}.`;
      }

      return sentence;
    }

    // 3. Work Type fallback
    if (workType) {
      let sentence =
        `Completed office work related to ${workType.toLowerCase()}.`;

      if (nextAction) {
        sentence += ` Next step: ${nextAction}.`;
      }

      return sentence;
    }

    // 4. Final fallback
    return "Completed office and administrative work.";
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
          item.due_date ? ` (Due: ${item.due_date})` : ""
        }`;
      }

      return `${item.scope_of_work}${
        item.next_action ? ` → ${item.next_action}` : ""
      }${
        item.next_followup
          ? ` (Follow-up: ${item.next_followup})`
          : ""
      }`;
    });

  const blockers = records
    .filter((item: any) => item.status === "On Hold")
    .map((item: any) => {
      return `${item.scope_of_work || item.task_title} - Status: On Hold`;
    });

  return {
    technicalWorkDone,
    officeWorkDone,
    nextDayPlan,
    blockers,
  };
}