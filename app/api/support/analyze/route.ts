import { analyzeSupportRequirement } from "@/lib/ai/support";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const requirement = body?.requirement;

    if (!requirement || typeof requirement !== "string") {
      return Response.json(
        {
          error: "Please provide a valid requirement.",
        },
        {
          status: 400,
        }
      );
    }

    const trimmedRequirement = requirement.trim();

    if (!trimmedRequirement) {
      return Response.json(
        {
          error: "Please provide a valid requirement.",
        },
        {
          status: 400,
        }
      );
    }

    const analysisResult = await analyzeSupportRequirement(
      trimmedRequirement
    );

    let result: string;

    if (typeof analysisResult === "string") {
      result = analysisResult;
    } else {
      result = JSON.stringify(
        analysisResult,
        null,
        2
      );
    }

    return Response.json({
      result,
    });
  } catch (err: any) {
    return Response.json(
      {
        error:
          err?.message ||
          "Unable to analyze the requirement at this time.",
      },
      {
        status: 500,
      }
    );
  }
}
