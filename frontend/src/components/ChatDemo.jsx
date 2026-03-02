import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const ChatDemo = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy Rock, tu agente de ventas. Estoy acá para mostrarte cómo puedo ayudar a tu empresa a vender más. ¿Qué te gustaría saber?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: userMessage,
        session_id: sessionId
      });

      setSessionId(response.data.session_id);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.response 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Ups, parece que tuve un problema técnico. ¿Podés intentar de nuevo?' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 w-[90vw] max-w-[400px] h-[500px] bg-black border border-white/10 shadow-2xl z-50 flex flex-col animate-slide-in-right"
      data-testid="chat-demo"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#050505] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse-green" />
          <div>
            <h4 className="font-bold text-sm">ROCK</h4>
            <p className="text-xs text-neutral-500 font-mono">Agente de Ventas • Online</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-neutral-400 hover:text-white transition-colors"
          data-testid="chat-close-button"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 ${
                msg.role === 'user' 
                  ? 'bg-white text-black text-sm' 
                  : 'bg-[#111] text-[#FFD700] font-mono text-sm border-l-2 border-[#FFD700]'
              }`}
              data-testid={`chat-message-${msg.role}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#111] text-[#FFD700] p-3 border-l-2 border-[#FFD700]">
              <Loader2 className="animate-spin" size={16} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-[#050505]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribí tu mensaje..."
            className="flex-1 bg-[#111] border border-white/10 px-4 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-[#FFD700] transition-colors"
            disabled={isLoading}
            data-testid="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-[#FFD700] text-black p-3 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="chat-send-button"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ChatTrigger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-[#FFD700] text-black p-4 hover:bg-white transition-colors shadow-lg glow-green z-40"
      data-testid="chat-trigger"
    >
      <MessageSquare size={24} />
    </button>
  );
};
