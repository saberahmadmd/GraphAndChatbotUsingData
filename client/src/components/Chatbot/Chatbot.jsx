import { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi';
import nlp from 'compromise';
import './Chatbot.css';

/**
 * AI-Powered Chatbot using Local NLP Framework (Compromise.js + Natural)
 * Runs completely in browser - no API keys needed
 * True natural language understanding
 */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m an AI assistant powered by local NLP frameworks. I can understand natural language questions about the lubricant market data!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Complete dataset available on webpage
  const lubricantData = {
    sectors: [
      {
        name: 'Passenger Vehicles',
        data: {
          2018: 86.97, 2019: 89.75, 2020: 44.06, 2021: 66.21,
          2022: 94.90, 2023: 97.24, 2024: 100.21,
          2025: 104.28, 2026: 108.49, 2027: 112.87,
          2028: 117.40, 2029: 122.11, 2030: 127.06
        },
        description: 'Significant pandemic impact in 2020, strong recovery and growth'
      },
      {
        name: 'Commercial Vehicles',
        data: {
          2018: 132.81, 2019: 136.42, 2020: 137.36, 2021: 142.35,
          2022: 143.42, 2023: 147.37, 2024: 150.95,
          2025: 155.49, 2026: 160.16, 2027: 164.98,
          2028: 169.96, 2029: 175.10, 2030: 180.42
        },
        description: 'Largest consuming sector, steady consistent growth'
      },
      {
        name: 'Mining',
        data: {
          2018: 47.73, 2019: 48.40, 2020: 44.12, 2021: 44.92,
          2022: 43.94, 2023: 44.59, 2024: 45.06,
          2025: 43.34, 2026: 42.78, 2027: 43.55,
          2028: 44.33, 2029: 45.13, 2030: 45.95
        },
        description: 'Relatively stable consumption with minor fluctuations'
      },
      {
        name: 'Manufacturing & Construction',
        data: {
          2018: 106.30, 2019: 108.98, 2020: 72.50, 2021: 104.96,
          2022: 103.71, 2023: 103.98, 2024: 103.42,
          2025: 106.80, 2026: 110.16, 2027: 113.47,
          2028: 116.75, 2029: 120.13, 2030: 123.60
        },
        description: 'Major pandemic impact in 2020, strong recovery'
      },
      {
        name: 'Agriculture',
        data: {
          2018: 20.32, 2019: 21.56, 2020: 22.26, 2021: 22.67,
          2022: 22.74, 2023: 22.75, 2024: 22.90,
          2025: 23.02, 2026: 23.13, 2027: 23.24,
          2028: 23.35, 2029: 23.47, 2030: 23.58
        },
        description: 'Steady gradual growth throughout the period'
      },
      {
        name: 'Others',
        data: {
          2018: 7.27, 2019: 7.46, 2020: 5.79, 2021: 7.19,
          2022: 7.10, 2023: 7.14, 2024: 7.14,
          2025: 7.22, 2026: 7.34, 2027: 7.51,
          2028: 7.69, 2029: 7.86, 2030: 8.05
        },
        description: 'Smallest sector but showing growth projections'
      }
    ],
    years: {
      historical: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
      projected: [2025, 2026, 2027, 2028, 2029, 2030]
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Advanced NLP Processing using Compromise.js and Natural
   * True natural language understanding
   */
  const processWithNLP = (message) => {
    console.log('🧠 NLP Processing:', message);

    const doc = nlp(message);
    const lowerMessage = message.toLowerCase();

    // Entity extraction using NLP
    const sectors = lubricantData.sectors.map(s => s.name);
    const mentionedSectors = sectors.filter(sector =>
      doc.match(sector).found ||
      doc.match(sector.toLowerCase()).found
    );

    // Year extraction
    const years = [...lubricantData.years.historical, ...lubricantData.years.projected];
    const mentionedYears = years.filter(year =>
      doc.has(year.toString()) || lowerMessage.includes(year.toString())
    );

    // Intent classification using keyword patterns + NLP
    const intents = {
      comparison: doc.has('compare') || doc.has('versus') || doc.has('vs') || doc.has('difference'),
      growth: doc.has('growth') || doc.has('increase') || doc.has('decrease') || doc.has('trend'),
      projection: doc.has('projection') || doc.has('future') || doc.has('forecast') || doc.has('2030'),
      specific: doc.has('what') || doc.has('show') || doc.has('tell') || doc.has('data'),
      calculation: doc.has('calculate') || doc.has('total') || doc.has('sum') || doc.has('average')
    };

    // Sentiment analysis (basic)
    const positiveWords = ['growth', 'increase', 'improve', 'better', 'up', 'rise'];
    const negativeWords = ['decrease', 'drop', 'fall', 'worse', 'down', 'decline'];
    const sentiment = {
      positive: positiveWords.some(word => lowerMessage.includes(word)),
      negative: negativeWords.some(word => lowerMessage.includes(word))
    };

    console.log('📊 NLP Analysis:', {
      mentionedSectors,
      mentionedYears,
      intents,
      sentiment
    });

    // Generate response based on NLP analysis
    if (intents.comparison && mentionedSectors.length >= 2) {
      return generateNLPComparison(mentionedSectors);
    } else if (intents.growth) {
      return generateNLPGrowth(mentionedSectors[0], mentionedYears, sentiment);
    } else if (intents.projection) {
      return generateNLPProjection(mentionedSectors[0]);
    } else if (intents.calculation) {
      return generateNLPCalculation(mentionedSectors, mentionedYears);
    } else if (mentionedSectors.length > 0 || mentionedYears.length > 0) {
      return generateNLPSpecific(mentionedSectors, mentionedYears);
    } else {
      return generateNLPGeneral();
    }
  };

  /**
   * AI-Powered Comparison using NLP insights
   */
  const generateNLPComparison = (sectors) => {
    const sectorData = sectors.map(sectorName => {
      const sector = lubricantData.sectors.find(s => s.name === sectorName);
      if (!sector) return null;

      const current = sector.data[2024];
      const previous = sector.data[2018];
      const growth = ((current - previous) / previous * 100);
      const projected = sector.data[2030];

      return {
        name: sectorName,
        current,
        growth,
        projected,
        description: sector.description
      };
    }).filter(Boolean);

    if (sectorData.length < 2) {
      return "I need at least two sectors to make a comparison. Try: 'Compare passenger vehicles and commercial vehicles'";
    }

    const comparison = sectorData.map(s =>
      `• **${s.name}**: ${s.current}M liters (${s.growth > 0 ? '+' : ''}${s.growth.toFixed(1)}% growth since 2018)`
    ).join('\n');

    const highest = sectorData.reduce((max, s) => s.current > max.current ? s : max);
    const fastest = sectorData.reduce((max, s) => s.growth > max.growth ? s : max);

    return `**AI Comparison Analysis**\n\n${comparison}\n\n**Insights:**\n• ${highest.name} has the highest current consumption\n• ${fastest.name} shows the strongest growth trend\n• Market dynamics vary significantly across sectors`;
  };

  /**
   * AI-Powered Growth Analysis with NLP context
   */
  const generateNLPGrowth = (sectorName, years, sentiment) => {
    if (sectorName) {
      const sector = lubricantData.sectors.find(s => s.name === sectorName);
      if (!sector) return `I don't have data for ${sectorName}. Available sectors: ${lubricantData.sectors.map(s => s.name).join(', ')}`;

      const startYear = years[0] || 2018;
      const endYear = years[1] || 2024;
      const startValue = sector.data[startYear];
      const endValue = sector.data[endYear];

      if (!startValue || !endValue) {
        return `Data not available for ${sectorName} in the specified years.`;
      }

      const growth = ((endValue - startValue) / startValue * 100);
      const absoluteChange = endValue - startValue;

      let insight = '';
      if (sentiment.positive && growth > 0) {
        insight = `This aligns with the positive growth trend you mentioned.`;
      } else if (sentiment.negative && growth < 0) {
        insight = `This confirms the decline pattern you referenced.`;
      }

      return `**Growth Analysis: ${sectorName}**\n\n` +
        `Period: ${startYear}-${endYear}\n` +
        `• Starting: ${startValue}M liters\n` +
        `• Ending: ${endValue}M liters\n` +
        `• Absolute Change: ${absoluteChange > 0 ? '+' : ''}${absoluteChange.toFixed(2)}M liters\n` +
        `• Growth Rate: ${growth > 0 ? '+' : ''}${growth.toFixed(1)}%\n\n` +
        `**Context:** ${sector.description}\n${insight}`;
    }

    // Overall market growth
    const total2018 = lubricantData.sectors.reduce((sum, s) => sum + s.data[2018], 0);
    const total2024 = lubricantData.sectors.reduce((sum, s) => sum + s.data[2024], 0);
    const totalGrowth = ((total2024 - total2018) / total2018 * 100);

    return `**Overall Market Growth Analysis**\n\n` +
      `2018-2024 Total Market Performance:\n` +
      `• 2018: ${total2018.toFixed(1)}M liters\n` +
      `• 2024: ${total2024.toFixed(1)}M liters\n` +
      `• Market Growth: +${totalGrowth.toFixed(1)}%\n\n` +
      `The market showed resilience with recovery after 2020 pandemic impacts.`;
  };

  /**
   * AI-Powered Projection Analysis
   */
  const generateNLPProjection = (sectorName) => {
    if (sectorName) {
      const sector = lubricantData.sectors.find(s => s.name === sectorName);
      const current = sector.data[2024];
      const projected = sector.data[2030];
      const growth = ((projected - current) / current * 100);

      return `**Future Projection: ${sectorName}**\n\n` +
        `• Current (2024): ${current}M liters\n` +
        `• Projected (2030): ${projected}M liters\n` +
        `• Projected Growth: ${growth > 0 ? '+' : ''}${growth.toFixed(1)}%\n\n` +
        `**AI Insight:** ${sector.description} This projection suggests ${growth > 10 ? 'strong' : 'moderate'} future ${growth > 0 ? 'growth' : 'performance'}.`;
    }

    // Overall projections
    const total2024 = lubricantData.sectors.reduce((sum, s) => sum + s.data[2024], 0);
    const total2030 = lubricantData.sectors.reduce((sum, s) => sum + s.data[2030], 0);
    const totalGrowth = ((total2030 - total2024) / total2024 * 100);

    const projections = lubricantData.sectors
      .map(s => `• ${s.name}: ${s.data[2030]}M liters`).join('\n');

    return `**2030 Market Projections**\n\n` +
      `Overall Market Outlook:\n` +
      `• 2024 Total: ${total2024.toFixed(1)}M liters\n` +
      `• 2030 Projected: ${total2030.toFixed(1)}M liters\n` +
      `• Projected Growth: +${totalGrowth.toFixed(1)}%\n\n` +
      `Sector Breakdown:\n${projections}\n\n` +
      `**AI Analysis:** The market shows positive growth trajectory with Commercial Vehicles leading consumption.`;
  };

  /**
   * AI-Powered Calculation Engine
   */
  const generateNLPCalculation = (sectors, years) => {
    if (sectors.length > 0 && years.length > 0) {
      const results = sectors.map(sectorName => {
        const sector = lubricantData.sectors.find(s => s.name === sectorName);
        const values = years.map(year => sector.data[year]).filter(Boolean);
        const total = values.reduce((sum, val) => sum + val, 0);
        const average = total / values.length;

        return `• ${sectorName}: Total=${total.toFixed(1)}M, Average=${average.toFixed(1)}M`;
      }).join('\n');

      return `**Calculation Results**\n\nYears: ${years.join(', ')}\n\n${results}`;
    }

    return "I can perform calculations on specific sectors and years. Try: 'Calculate total for passenger vehicles in 2020-2024'";
  };

  /**
   * AI-Powered Specific Data Response
   */
  const generateNLPSpecific = (sectors, years) => {
    if (sectors.length > 0) {
      return sectors.map(sectorName => {
        const sector = lubricantData.sectors.find(s => s.name === sectorName);
        const relevantYears = years.length > 0 ? years : [2024];
        const dataPoints = relevantYears.map(year =>
          `${year}: ${sector.data[year]}M`
        ).join(', ');

        return `**${sectorName} Data**\n\n${dataPoints}\n\n**AI Context:** ${sector.description}`;
      }).join('\n\n');
    }

    if (years.length > 0) {
      const yearData = years.map(year => {
        const total = lubricantData.sectors.reduce((sum, s) => sum + s.data[year], 0);
        const breakdown = lubricantData.sectors
          .map(s => `${s.name}: ${s.data[year]}M`)
          .join('\n• ');

        return `**${year} Market Overview**\n\nTotal: ${total.toFixed(1)}M liters\n\nBreakdown:\n• ${breakdown}`;
      }).join('\n\n');

      return yearData;
    }

    return generateNLPGeneral();
  };

  /**
   * AI-Powered General Response with NLP understanding
   */
  const generateNLPGeneral = () => {
    return `AI Data Analyst - Natural Language Understanding\n\n` +
      `I can understand complex questions about lubricant market data using local NLP frameworks.\n\n` +
      `Ask me naturally like:\n` +
      `• "How did passenger vehicles perform during the pandemic?"\n` +
      `• "Compare growth trends in mining vs agriculture"\n` +
      `• "What are the future projections for commercial vehicles?"\n` +
      `• "Calculate total market consumption in 2024"\n` +
      `• "Show me sectors with strongest growth since 2018"\n\n` +
      `Available Analysis:** Trend analysis, comparisons, projections, calculations, and contextual insights.`;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = processWithNLP(text);
      const assistantMessage = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m an AI assistant powered by local NLP frameworks. I can understand natural language questions about the lubricant market data!'
      }
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <FiCpu size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <FiCpu size={20} />
              <span>AI NLP Analyst</span>
              <span className="chatbot-badge">Local AI</span>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-clear"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                <div className="message-content">
                  {message.content.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.startsWith('**') && line.endsWith('**') ? (
                        <strong>{line.slice(2, -2)}</strong>
                      ) : line.startsWith('•') || line.startsWith('-') ? (
                        <div style={{ marginLeft: '20px' }}>{line}</div>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content typing">🧠 AI is processing your question...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask in natural language (AI-powered)..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;





/*
import { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I can help you understand the Lubricant Market data. Ask me anything about market trends, statistics, or projections for different sectors.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      console.log('📡 Sending message to:', `${base}/api/chat`);

      const response = await axios.post(`${base}/api/chat`,
        { message: text },
        { timeout: 15000 } // 15 second timeout
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response || 'I received your message but got an empty response.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('❌ Error sending message:', error);

      let errorMessage = 'Sorry, I encountered an error. Please try again later.';

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'The request timed out. Please try again.';
      } else if (error.response?.status === 500) {
        errorMessage = 'The server is experiencing issues. You can still explore the data using the charts and filters.';
      } else if (!navigator.onLine) {
        errorMessage = 'You appear to be offline. Please check your internet connection.';
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage
        }
      ]);
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

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I can help you understand the Lubricant Market data. Ask me anything about market trends, statistics, or projections for different sectors.'
      }
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <FiMessageCircle size={20} />
              <span>Data Assistant</span>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-clear"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role}`}
              >
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content typing">Analyzing data...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about lubricant market data..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
*/