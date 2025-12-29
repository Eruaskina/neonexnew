
import { GoogleGenAI } from "@google/genai";
import { Currency, Language } from "../types";

export const getQuantumAnalysis = async (currency: Currency, lang: Language = 'EN') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a futuristic market analyst from the year 2142. 
  Provide a brief "Quantum Pulse Analysis" for ${currency.name} (${currency.symbol}). 
  Current Market Data: Price $${currency.price}, 24h Change ${currency.change24h}%.
  
  IMPORTANT: Response MUST be in ${lang === 'TR' ? 'Turkish' : 'English'}.
  
  Structure your response in JSON with these keys:
  - "sentiment": A sci-fi term for market mood (e.g., "Hyper-Bullish", "Solar Flare Volatility").
  - "prediction": A short futuristic prediction.
  - "riskLevel": 1-10 with a technical-sounding reason.
  - "technobabble": A high-tech explanation of current movement.
  
  Keep it concise and thematic.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const jsonStr = response.text;
    if (!jsonStr) {
      return null;
    }
    return JSON.parse(jsonStr.trim());
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};
