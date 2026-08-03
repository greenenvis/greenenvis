import { parseDocument } from "@/lib/ai/parser";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const bytes = await file.arrayBuffer();

    const base64 = Buffer.from(bytes).toString("base64");
    
    const text = await parseDocument(base64);

let verification_status = "Completed";
let verification_reason = "";

try {
  JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "")
  );
} catch {
  verification_status = "Failed";
  verification_reason = "Processing failed.";
}

return Response.json({
  result: text,
  verification_status,
  verification_reason,
});

  } catch (err: any) {

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