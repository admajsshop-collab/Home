
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateWallpaper(prompt: string): Promise<string> {
  // Use Gemini 2.5 Flash Image for high quality 9:16 wallpapers
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Create a high-resolution smartphone wallpaper (9:16 aspect ratio). Style: ${prompt}. Ensure it has professional lighting, ultra-detail, and aesthetic composition perfect for a mobile lock screen.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "9:16"
      }
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image part found in response");
}

export async function suggestPrompt(category: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a creative, one-sentence prompt for a beautiful smartphone wallpaper in the category: ${category}. Return ONLY the prompt text.`,
  });
  return response.text || "A beautiful abstract wallpaper";
}
