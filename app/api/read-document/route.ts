import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export const maxDuration = 60;
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const bytes = await file.arrayBuffer();

   const base64 = Buffer.from(bytes).toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64,
        },
      },
      `

Extract only valid JSON.

{
  "document_key":"",
  "document_type":"",
  "consent_no":"",
  "issue_date":"",
  "valid_upto":"",
  "issuing_authority":"",
  "industry_name":"",
  "compliance_report":{

    "applicable_compliances":[],

    "pending_compliances":[],

    "priority_action":""

  }
}

You are an Environmental Compliance Consultant.

DO NOT summarize the uploaded PDF.

DO NOT copy any Consent Conditions.

DO NOT copy legal clauses.

DO NOT explain the document.

Your work is ONLY:

1. Identify document_key.

2. Extract:

- issue_date

- valid_upto

- consent_no

- issuing_authority

3. Based on this document tell ONLY:

Applicable Compliances

Action Required

Highest Priority

Applicable Compliances must contain ONLY compliance names.

Example:

Consent Renewal

Environment Statement (Form-5)

Hazardous Waste Authorization

Hazardous Waste Annual Return

Rules-9 Permission

CGWA Renewal

Plastic EPR

Fire NOC

Factory License

Action Required must contain ONLY actions.

Example:

Renew Consent before expiry.

Submit Form-5 before 30 September.

Apply for Hazardous Waste Authorization.

Renew CGWA NOC.

Highest Priority must be ONLY one short sentence.

Example:

Consent expires in 18 days. Renew immediately.

Never return:

Company Details

Address

Products

Capacity

Consent Conditions

Long Paragraphs

Copy-Paste from PDF

Return ONLY valid JSON.

`,
    ]);

    console.log(result.response.text());

    return Response.json({
      result: result.response.text(),
    });
  } catch (err: any) {
    console.log(err);

    return Response.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}