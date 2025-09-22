import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, X, Languages, Send } from 'lucide-react';
import { VoiceChatService, ChatMessage } from '../services/voiceChatService';

interface VoiceChatProps {
  onNavigate?: (page: string) => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi' | 'telugu'>('english');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  const voiceChatService = useRef(new VoiceChatService());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸' },
    { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { id: 'telugu', name: 'తెలుగు', flag: '🇮🇳' }
  ];

  useEffect(() => {
    setIsSupported(voiceChatService.current.isSupported());
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      voiceChatService.current.stopListening();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      const newMessages = await voiceChatService.current.processVoiceInput(currentLanguage);
      setMessages(prev => [...prev, ...newMessages]);
      
      // Handle navigation actions
      const lastBotMessage = newMessages.find(msg => !msg.isUser);
      if (lastBotMessage && onNavigate) {
        // Simple navigation detection - you can enhance this
        const text = lastBotMessage.text.toLowerCase();
        if (text.includes('dashboard') || text.includes('home')) onNavigate('dashboard');
        else if (text.includes('profile') || text.includes('farm')) onNavigate('profile');
        else if (text.includes('irrigation') || text.includes('water')) onNavigate('irrigation');
        else if (text.includes('crop') || text.includes('plant')) onNavigate('crops');
        else if (text.includes('market') || text.includes('price')) onNavigate('market');
        else if (text.includes('alert') || text.includes('notification')) onNavigate('alerts');
        else if (text.includes('sustainable') || text.includes('green')) onNavigate('sustainable');
      }
      
    } catch (error) {
      console.error('Voice input error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: getErrorMessage(error as Error),
        isUser: false,
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsListening(false);
    }
  };

  const handleTextInput = async () => {
    if (!textInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: textInput,
      isUser: true,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setTextInput('');

    try {
      const response = await voiceChatService.current.generateResponse(textInput, currentLanguage);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        language: currentLanguage
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response
      setIsSpeaking(true);
      await voiceChatService.current.speakText(response.text, currentLanguage);
      setIsSpeaking(false);
      
    } catch (error) {
      console.error('Text input error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: getErrorMessage(error as Error),
        isUser: false,
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const getErrorMessage = (error: Error): string => {
    const errorMessages = {
      english: "Sorry, I couldn't understand that. Please try again.",
      hindi: "माफ करें, मैं समझ नहीं पाया। कृपया फिर से कोशिश करें।",
      telugu: "క్షమించండి, నేను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి."
    };
    
    if (error.message.includes('not supported')) {
      return {
        english: "Voice recognition is not supported in your browser.",
        hindi: "आपके ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है।",
        telugu: "మీ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ మద్దతు లేదు."
      }[currentLanguage];
    }
    
    return errorMessages[currentLanguage];
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      voiceChatService.current.stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    voiceChatService.current.clearChatHistory();
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <>
      {/* Voice Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all z-50 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-green-600 hover:bg-green-700'
        } text-white`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {isListening && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Voice Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-xl shadow-2xl border z-40 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-green-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Farm Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value as 'english' | 'hindi' | 'telugu')}
                  className="bg-green-700 text-white text-sm rounded px-2 py-1 border-none"
                >
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={clearChat}
                  className="text-green-100 hover:text-white text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm">
                {currentLanguage === 'english' && "Ask me about farming, weather, crops, or irrigation!"}
                {currentLanguage === 'hindi' && "खेती, मौसम, फसलों या सिंचाई के बारे में पूछें!"}
                {currentLanguage === 'telugu' && "వ్యవసాయం, వాతావరణం, పంటలు లేదా నీటిపారుదల గురించి అడగండి!"}
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
                  placeholder={
                    currentLanguage === 'english' ? "Type your message..." :
                    currentLanguage === 'hindi' ? "अपना संदेश टाइप करें..." :
                    "మీ సందేశాన్ని టైప్ చేయండి..."
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleTextInput}
                  disabled={!textInput.trim()}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-3">
              <button
                onClick={handleVoiceInput}
                disabled={isSpeaking}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isListening
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                <span>
                  {isListening 
                    ? (currentLanguage === 'english' ? 'Listening...' : 
                       currentLanguage === 'hindi' ? 'सुन रहा हूँ...' : 'వింటున్నాను...')
                    : (currentLanguage === 'english' ? 'Speak' :
                       currentLanguage === 'hindi' ? 'बोलें' : 'మాట్లాడండి')
                  }
                </span>
              </button>
              
              <button
                onClick={toggleSpeaking}
                className={`p-2 rounded-lg ${
                  isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceChat;