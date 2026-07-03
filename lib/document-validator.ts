export interface ValidationResult {
  isValid: boolean;
  documentKey: string;
  documentName: string;
  confidence: number;
  issueDate: string | null;
  validUpto: string | null;
  consentNo: string | null;
  authority: string | null;
}

export function validateDocument(
  expectedKey: string,
  ai: any
): ValidationResult {

  const detectedKey =
    (ai.document_key || "")
      .toLowerCase()
      .trim();

  const expected =
    expectedKey
      .toLowerCase()
      .trim();

  return {
    isValid: detectedKey === expected,

    documentKey: detectedKey,

    documentName:
      ai.document_type || "",

    confidence:
      detectedKey === expected
        ? 100
        : 0,

    issueDate:
      ai.issue_date || null,

    validUpto:
      ai.valid_upto || null,

    consentNo:
      ai.consent_no || null,

    authority:
      ai.issuing_authority || null,
  };
}