export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  language: string;
}

export interface VoiceCommand {
  action: string;
  parameters: Record<string, any>;
  confidence: number;
}

export class SpeechService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening = false;
  private currentLanguage = 'en-US';

  // Language mappings
  private languages = {
    english: 'en-US',
    hindi: 'hi-IN',
    telugu: 'te-IN'
  };

  // Voice command patterns for different languages
  private commandPatterns = {
    'en-US': {
      weather: /weather|temperature|humidity|rain/i,
      irrigation: /water|irrigate|irrigation|moisture/i,
      crops: /crop|plant|harvest|yield/i,
      market: /price|market|sell|buy/i,
      alerts: /alert|notification|warning/i,
      navigate: /go to|open|show|display/i
    },
    'hi-IN': {
      weather: /मौसम|तापमान|नमी|बारिश/i,
      irrigation: /पानी|सिंचाई|नमी/i,
      crops: /फसल|पौधा|कटाई|उत्पादन/i,
      market: /कीमत|बाजार|बेचना|खरीदना/i,
      alerts: /चेतावनी|सूचना|अलर्ट/i,
      navigate: /जाओ|खोलो|दिखाओ/i
    },
    'te-IN': {
      weather: /వాతావరణం|ఉష్ణోగ్రత|తేమ|వర్షం/i,
      irrigation: /నీరు|నీటిపారుదల|తేమ/i,
      crops: /పంట|మొక్క|కోత|దిగుబడి/i,
      market: /ధర|మార్కెట్|అమ్మడం|కొనడం/i,
      alerts: /హెచ్చరిక|నోటిఫికేషన్|అలర్ట్/i,
      navigate: /వెళ్లు|తెరువు|చూపించు/i
    }
  };

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = this.currentLanguage;
    }
  }

  setLanguage(language: 'english' | 'hindi' | 'telugu') {
    this.currentLanguage = this.languages[language];
    if (this.recognition) {
      this.recognition.lang = this.currentLanguage;
    }
  }

  startListening(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event) => {
        const result = event.results[0];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        resolve({
          transcript,
          confidence,
          language: this.currentLanguage
        });
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text: string, language?: 'english' | 'hindi' | 'telugu'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language-specific voice
      const targetLang = language ? this.languages[language] : this.currentLanguage;
      const voices = this.synthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = targetLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

      this.synthesis.speak(utterance);
    });
  }

  parseVoiceCommand(transcript: string): VoiceCommand {
    const patterns = this.commandPatterns[this.currentLanguage as keyof typeof this.commandPatterns];
    
    for (const [action, pattern] of Object.entries(patterns)) {
      if (pattern.test(transcript)) {
        return {
          action,
          parameters: this.extractParameters(transcript, action),
          confidence: 0.8
        };
      }
    }

    return {
      action: 'unknown',
      parameters: { transcript },
      confidence: 0.1
    };
  }

  private extractParameters(transcript: string, action: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    switch (action) {
      case 'navigate':
        if (/dashboard|home/i.test(transcript)) params.page = 'dashboard';
        else if (/profile|farm/i.test(transcript)) params.page = 'profile';
        else if (/irrigation|water/i.test(transcript)) params.page = 'irrigation';
        else if (/crop|plant/i.test(transcript)) params.page = 'crops';
        else if (/market|price/i.test(transcript)) params.page = 'market';
        else if (/alert|notification/i.test(transcript)) params.page = 'alerts';
        else if (/sustainable|green/i.test(transcript)) params.page = 'sustainable';
        break;
      
      case 'weather':
        params.query = 'current_weather';
        break;
      
      case 'irrigation':
        if (/start|begin/i.test(transcript)) params.action = 'start';
        else if (/stop|pause/i.test(transcript)) params.action = 'stop';
        else params.action = 'status';
        break;
    }
    
    return params;
  }

  getAvailableVoices() {
    return this.synthesis.getVoices().filter(voice => 
      voice.lang.startsWith('en') || 
      voice.lang.startsWith('hi') || 
      voice.lang.startsWith('te')
    );
  }

  isSupported(): boolean {
    return !!(this.recognition && this.synthesis);
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }
}