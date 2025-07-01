import { env } from "@/env";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Break down this task into a numbered list of subtasks of 3 to 5: ${body.query}
      
Format your response as a simple numbered list, one subtask per line.`,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    if (!response.text) {
      throw new Error("No response text received");
    }

    // Parse the response into an array
    const subtasks = response.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => line.replace(/^\d+\.\s*/, "")) // Remove numbering
      .filter((task) => task.length > 0);

    return new Response(JSON.stringify({ subtasks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate subtasks", subtasks: [] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
