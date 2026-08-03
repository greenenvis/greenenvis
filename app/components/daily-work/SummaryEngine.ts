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
      (item.scope_of_work || item.task_title)
)
  .map((item: any) => {
    const work = item.scope_of_work || item.task_title || "assigned work";
    const unit = item.unit_name || "Client";
    const description = (item.work_description || "").trim();
    const nextAction = (item.next_action || "").trim();

    // 1. જો Work Description ભરેલું હોય તો તેને Priority આપવી
    if (description) {
      let sentence = `${description}`;

      // Full stop ન હોય તો Add કરવો
      if (!sentence.endsWith(".")) {
        sentence += ".";
      }

      // Client Name Add કરવું
      sentence += ` (${unit})`;

      // Next Action Add કરવું
      if (nextAction) {
        sentence += ` Next step: ${nextAction}.`;
      }

      return sentence;
    }

    // 2. Fallback
    return `Worked on ${work} for ${unit}.`;
  });

  const officeWorkDone = records
  .filter((item: any) => item.inquiry_type === "Office Work")
  .map((item: any) => {
    const work =
      item.office_work_type === "Other"
        ? item.other_office_work
        : item.office_work_type;

    switch (work) {
      case "Courier Inward":
        return "Received and recorded incoming courier documents.";

      case "Courier Outward":
        return "Prepared and dispatched outgoing courier documents.";

      case "Meeting":
        return `Attended an official meeting${
          item.task_title ? ` regarding ${item.task_title}` : "."
        }`;

      case "Client Meeting":
        return `Conducted a client meeting${
          item.task_title ? ` regarding ${item.task_title}` : "."
        }`;

      case "Client Follow-up":
        return `Followed up with the client${
          item.task_title ? ` regarding ${item.task_title}` : "."
        }`;

      case "Document Verification":
        return `Verified project documents${
          item.task_title ? ` for ${item.task_title}` : "."
        }`;

      case "Document Collection":
        return `Collected required documents${
          item.task_title ? ` for ${item.task_title}` : "."
        }`;

      case "Email":
        return `Prepared and sent official email correspondence${
          item.task_title ? ` regarding ${item.task_title}` : "."
        }`;

      case "Phone Call":
        return `Communicated through official phone calls${
          item.task_title ? ` regarding ${item.task_title}` : "."
        }`;

      case "Invoice":
        return `Prepared invoice${
          item.task_title ? ` for ${item.task_title}` : "."
        }`;

      case "Payment Follow-up":
        return `Followed up for pending payment${
          item.task_title ? ` related to ${item.task_title}` : "."
        }`;

      case "Data Entry":
        return `Updated office records and data entries${
          item.task_title ? ` for ${item.task_title}` : "."
        }`;

      default:
        return `Completed office work related to ${
          item.task_title || work || "daily operations"
        }.`;
    }
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