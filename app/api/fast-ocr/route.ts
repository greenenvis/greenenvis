import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const maxDuration = 60;

export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Fast OCR not implemented yet."
  });
}