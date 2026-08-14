import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type LibraryFile = {
  name: string;
  extension: string;
  url: string;
};

function getFiles(folderName: "formats" | "checklists"): LibraryFile[] {
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "formats-library",
    folderName
  );

  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const extension = path.extname(entry.name).replace(".", "").toLowerCase();

      return {
        name: entry.name,
        extension,
        url: `/formats-library/${folderName}/${encodeURIComponent(entry.name)}`,
      };
    });
}

export async function GET() {
  try {
    const formats = getFiles("formats");
    const checklists = getFiles("checklists");

    return NextResponse.json({
      formats,
      checklists,
    });
  } catch (error) {
    console.error("Formats library API error:", error);

    return NextResponse.json(
      {
        formats: [],
        checklists: [],
        error: "Unable to load formats library.",
      },
      { status: 500 }
    );
  }
}