import { GoogleGenerativeAI } from "@google/generative-ai";
import { DOCUMENT_PARSER_PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function parseDocument(
  base64: string,
  mimeType: string = "application/pdf"
) {
  const result = await model.generateContent([
    {
      inlineData: {
        mimeType,
        data: base64,
      },
    },
    DOCUMENT_PARSER_PROMPT,
  ]);

  return result.response.text();
}