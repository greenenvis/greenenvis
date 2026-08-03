export function extractJson(aiResponse: string) {
  try {
    const clean = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return {
      success: true,
      data: JSON.parse(clean),
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}