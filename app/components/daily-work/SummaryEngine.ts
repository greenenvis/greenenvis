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
      const work = String(
        item.scope_of_work ||
        item.task_title ||
        "compliance work"
      ).trim();

      const unit = String(item.unit_name || "").trim();

      const description = String(
        item.work_description || ""
      ).trim();

      const nextAction = String(
        item.next_action || ""
      ).trim();

      let sentence = "";

      if (description) {
        sentence = `Work related to ${work}`;

        if (unit) {
          sentence += ` for ${unit}`;
        }

        sentence +=
          ` was carried out as per the current project requirements.`;
      } else {
        sentence = `Work related to ${work}`;

        if (unit) {
          sentence += ` for ${unit}`;
        }

        sentence +=
          ` was undertaken as per the current project requirements.`;
      }

      if (nextAction) {
        sentence += ` The next step is ${nextAction}.`;
      }

      return sentence;
    });

  const officeWorkDone = records
    .filter(
      (item: any) =>
        item.inquiry_type === "Office Work"
    )
    .map((item: any) => {
      const description = String(
        item.work_description || ""
      ).trim();

      const taskTitle = String(
        item.task_title || ""
      ).trim();

      const workType =
        item.office_work_type === "Other"
          ? String(
              item.other_office_work || ""
            ).trim()
          : String(
              item.office_work_type || ""
            ).trim();

      const nextAction = String(
        item.next_action || ""
      ).trim();

      const unit = String(
        item.unit_name || ""
      ).trim();

      let sentence = "";

      if (taskTitle) {
        sentence = `Office and administrative work related to ${taskTitle}`;

        if (unit) {
          sentence += ` for ${unit}`;
        }

        sentence += ` was completed.`;
      } else if (workType) {
        sentence =
          `Office and administrative activities related to ${workType.toLowerCase()} were completed.`;
      } else if (description) {
        sentence =
          `The required office and administrative activities were completed.`;
      } else {
        sentence =
          `The required office and administrative work was completed.`;
      }

      if (nextAction) {
        sentence += ` The next step is ${nextAction}.`;
      }

      return sentence;
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
    .filter(
      (item: any) =>
        item.status === "On Hold"
    )
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