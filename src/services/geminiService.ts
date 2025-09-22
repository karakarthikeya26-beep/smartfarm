import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async getCropRecommendations(farmData: any, weatherData: any) {
    const prompt = `
      As an agricultural AI expert, provide crop recommendations based on:
      
      Farm Details:
      - Location: ${farmData.location}
      - Soil Type: ${farmData.soilType}
      - Farm Size: ${farmData.farmSize} acres
      - Water Source: ${farmData.waterSource}
      - Elevation: ${farmData.elevation}m
      
      Current Weather:
      - Temperature: ${weatherData.temperature}°C
      - Humidity: ${weatherData.humidity}%
      - Wind Speed: ${weatherData.windSpeed} km/h
      
      Please provide:
      1. Top 3 crop recommendations with suitability percentage
      2. Expected yield per hectare
      3. Market profitability assessment
      4. Risk factors
      5. Best planting time
      
      Format as JSON with this structure:
      {
        "recommendations": [
          {
            "crop": "crop name",
            "suitability": 95,
            "expectedYield": "450 quintals/ha",
            "profitability": "High",
            "risk": "Medium",
            "plantingTime": "March-April",
            "reasons": ["reason1", "reason2"]
          }
        ]
      }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return { recommendations: [] };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return { recommendations: [] };
    }
  }

  async getIrrigationAdvice(soilMoisture: number, weatherData: any, cropType: string) {
    const prompt = `
      Provide irrigation advice for:
      - Crop: ${cropType}
      - Current soil moisture: ${soilMoisture}%
      - Temperature: ${weatherData.temperature}°C
      - Humidity: ${weatherData.humidity}%
      - Rain forecast: ${weatherData.rainForecast}
      
      Provide specific irrigation recommendations including timing, duration, and water amount.
      Format as JSON: {"advice": "detailed advice", "action": "increase/decrease/maintain", "percentage": 20}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return { advice: "Maintain current irrigation schedule", action: "maintain", percentage: 0 };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return { advice: "Unable to get AI advice", action: "maintain", percentage: 0 };
    }
  }

  async analyzePestDisease(imageData: string, cropType: string) {
    const prompt = `
      Analyze this crop image for pests or diseases:
      - Crop type: ${cropType}
      
      Provide:
      1. Identified issues
      2. Severity level
      3. Treatment recommendations
      4. Prevention measures
      
      Format as JSON: {
        "issues": ["issue1", "issue2"],
        "severity": "Low/Medium/High",
        "treatment": "treatment advice",
        "prevention": "prevention measures"
      }
    `;

    try {
      const result = await this.model.generateContent([prompt, { inlineData: { data: imageData, mimeType: 'image/jpeg' } }]);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return { issues: [], severity: "Unknown", treatment: "", prevention: "" };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return { issues: [], severity: "Unknown", treatment: "Unable to analyze image", prevention: "" };
    }
  }
}