import { extractJson } from "@/lib/ai/extractor";
import { parseDocument } from "@/lib/ai/parser";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { error: "File is required." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const text = await parseDocument(base64);

const parsed = extractJson(text);

if (!parsed.success) {
  return Response.json({
    result: text,
    verification_status: "Failed",
    verification_reason: "Processing failed.",
  });
}

return Response.json({
  result: parsed.data,
  verification_status: "Completed",
  verification_reason: "",
});


  } catch (err: any) {
    return Response.json(
      {
        error: err.message || "AI Parser failed.",
      },
      {
        status: 500,
      }
    );
  }
}