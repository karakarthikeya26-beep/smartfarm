import { GoogleGenerativeAI } from '@google/generative-ai';
import { SpeechService } from './speechService';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language: 'english' | 'hindi' | 'telugu';
}

export interface VoiceChatResponse {
  text: string;
  action?: {
    type: string;
    parameters: Record<string, any>;
  };
}

export class VoiceChatService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  private speechService: SpeechService;
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.speechService = new SpeechService();
  }

  async processVoiceInput(language: 'english' | 'hindi' | 'telugu'): Promise<ChatMessage[]> {
    try {
      this.speechService.setLanguage(language);
      const result = await this.speechService.startListening();
      
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: result.transcript,
        isUser: true,
        timestamp: new Date(),
        language
      };

      this.chatHistory.push(userMessage);

      const response = await this.generateResponse(result.transcript, language);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        language
      };

      this.chatHistory.push(botMessage);

      // Speak the response
      await this.speechService.speak(response.text, language);

      return [userMessage, botMessage];
    } catch (error) {
      console.error('Voice input processing error:', error);
      throw error;
    }
  }

  async generateResponse(input: string, language: 'english' | 'hindi' | 'telugu'): Promise<VoiceChatResponse> {
    const languageInstructions = {
      english: 'Respond in English',
      hindi: 'Respond in Hindi (Devanagari script)',
      telugu: 'Respond in Telugu script'
    };

    const prompt = `
      You are a helpful AI assistant for a smart farming application. ${languageInstructions[language]}.
      
      The user said: "${input}"
      
      Context: This is a farming application that helps with:
      - Weather monitoring and forecasts
      - Irrigation scheduling and water management
      - Crop planning and recommendations
      - Market prices and insights
      - Farm alerts and notifications
      - Sustainable farming practices
      
      Provide a helpful, concise response (max 2-3 sentences) about farming topics.
      If the user asks about navigation or wants to go to a specific section, mention the action.
      
      If this is a navigation request, also include an action in this format:
      ACTION: {"type": "navigate", "page": "dashboard|profile|irrigation|crops|market|alerts|sustainable"}
      
      Keep responses conversational and farmer-friendly.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Extract action if present
      let action;
      const actionMatch = text.match(/ACTION:\s*({.*})/);
      if (actionMatch) {
        try {
          action = JSON.parse(actionMatch[1]);
          text = text.replace(/ACTION:\s*{.*}/, '').trim();
        } catch (e) {
          console.error('Error parsing action:', e);
        }
      }

      return { text, action };
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback responses in different languages
      const fallbackResponses = {
        english: "I'm here to help with your farming needs. You can ask about weather, irrigation, crops, or market prices.",
        hindi: "मैं आपकी खेती की जरूरतों में मदद करने के लिए यहाँ हूँ। आप मौसम, सिंचाई, फसलों या बाजार की कीमतों के बारे में पूछ सकते हैं।",
        telugu: "నేను మీ వ్యవసాయ అవసరాలతో సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీరు వాతావరణం, నీటిపారుదల, పంటలు లేదా మార్కెట్ ధరల గురించి అడగవచ్చు."
      };

      return { text: fallbackResponses[language] };
    }
  }

  getChatHistory(): ChatMessage[] {
    return this.chatHistory;
  }

  clearChatHistory() {
    this.chatHistory = [];
  }

  async speakText(text: string, language: 'english' | 'hindi' | 'telugu') {
    await this.speechService.speak(text, language);
  }

  stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  stopListening() {
    this.speechService.stopListening();
  }

  isListening(): boolean {
    return this.speechService.isCurrentlyListening();
  }

  isSupported(): boolean {
    return this.speechService.isSupported();
  }
}