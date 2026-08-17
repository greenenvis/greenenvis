import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function POST(req: Request) {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace(
      "Bearer ",
      ""
    );

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      return Response.json(
        { error: "Invalid or expired session." },
        { status: 401 }
      );
    }

    const body = await req.json();

    const records = Array.isArray(body.records)
      ? body.records
      : [];

    if (records.length === 0) {
      return Response.json({
        technicalWorkDone: [],
        officeWorkDone: [],
        nextDayPlan: [],
        blockers: [],
      });
    }

    const prompt = `
You are an experienced Environmental Consultant preparing a professional Daily Status Report.

Convert the provided work records into clear, professional business English.

IMPORTANT RULES:

1. Do NOT simply repeat or join the input words.
2. If the input contains only one or two words such as:
   "CCA"
   "MOEFCC Renewal"
   "Portal Verification"
   "GPCB Follow-up"
   create a meaningful professional sentence based on the available context.
3. Never invent a specific fact, application number, approval, submission date, authority response, or completed activity that is not supported by the record.
4. Use cautious professional wording such as:
   "Reviewed..."
   "Assessed..."
   "Followed up regarding..."
   "Checked..."
   "Prepared..."
   "Initiated..."
   "Reviewed the available information..."
   when the record contains limited information.
5. Environmental consultancy terminology should be professional and natural.
6. Do not use numbered points inside a sentence.
7. Do not return "Worked on..." unless there is genuinely insufficient context.
8. Do not add unnecessary explanations.
9. Keep each work item to 1–2 professional sentences.
10. Return ONLY valid JSON.
11. Do not use markdown or code fences.

JSON format:

{
  "technicalWorkDone": ["..."],
  "officeWorkDone": ["..."],
  "nextDayPlan": ["..."],
  "blockers": ["..."]
}

Classification:

- Records with inquiry_type other than "Office Work" belong to technicalWorkDone.
- Records with inquiry_type "Office Work" belong to officeWorkDone.
- Incomplete/non-completed work with next_action, next_followup, or due_date can be used for nextDayPlan.
- Records with status "On Hold" belong to blockers.

Available records:

${JSON.stringify(records)}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanedText = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let summary;

    try {
      summary = JSON.parse(cleanedText);
    } catch {
      return Response.json(
        {
          error: "AI returned an invalid summary response.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      technicalWorkDone: Array.isArray(
        summary.technicalWorkDone
      )
        ? summary.technicalWorkDone
        : [],

      officeWorkDone: Array.isArray(
        summary.officeWorkDone
      )
        ? summary.officeWorkDone
        : [],

      nextDayPlan: Array.isArray(
        summary.nextDayPlan
      )
        ? summary.nextDayPlan
        : [],

      blockers: Array.isArray(summary.blockers)
        ? summary.blockers
        : [],
    });
  } catch (error: any) {
    console.error(
      "DAILY SUMMARY AI ERROR =",
      error
    );

    return Response.json(
      {
        error:
          error?.message ||
          "Failed to generate AI summary.",
      },
      { status: 500 }
    );
  }
}