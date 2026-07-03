export type ComplianceStatus =
  | "Completed"
  | "Upcoming"
  | "Renewal Due"
  | "Missing";

export interface ComplianceResult {
  compliance_name: string;
  document_required: string;
  status: ComplianceStatus;
  due_date: string | null;
  priority: string;
}

export interface ComplianceEngineResult {
  score: number;
  completed: ComplianceResult[];
  upcoming: ComplianceResult[];
  renewalDue: ComplianceResult[];
  missing: ComplianceResult[];
}
export function calculateStatus(
  validUpto: string | null,
  reminderDays: number
): ComplianceStatus {

  if (!validUpto) {
    return "Missing";
  }

  const today = new Date();

  const expiry = new Date(validUpto);

  const diffDays = Math.ceil(
    (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) {
    return "Renewal Due";
  }

  if (diffDays <= reminderDays) {
    return "Upcoming";
  }

  return "Completed";
}
export function calculateComplianceScore(
  completed: number,
  upcoming: number,
  renewalDue: number,
  missing: number
): number {

  const total =
    completed +
    upcoming +
    renewalDue +
    missing;

  if (total === 0) return 0;

  const points =
    completed * 5 +
    upcoming * 4 +
    renewalDue * 2;

  const maxPoints = total * 5;

  return Math.round(
    (points / maxPoints) * 100
  );
}