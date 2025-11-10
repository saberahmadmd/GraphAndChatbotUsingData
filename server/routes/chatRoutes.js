const express = require('express');
const router = express.Router();
const DataModel = require('../models/dataModel');

/**
 * POST /api/chat
 * Local chatbot using only our database data
 */
router.post('/chat', async (req, res) => {
  console.log('🤖 Chat request received:', req.body.message);

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text required' });
    }

    // Get all data for context
    const allData = await DataModel.getAllData();
    const categories = [...new Set(allData.map(d => d.category))];
    const lowerMessage = message.toLowerCase().trim();

    console.log('🔍 Analyzing question:', lowerMessage);

    // Intelligent response system
    let response = "";

    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! I'm your Lubricant Market Data Assistant. I can help you analyze consumption data across different sectors from 2018-2030. What would you like to know?";
    }

    // Help
    else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = `I can provide information about lubricant market data for these sectors: ${categories.join(', ')}. You can ask about specific years, compare sectors, or get growth trends. Try asking like "Show me mining data" or "Compare passenger and commercial vehicles".`;
    }

    // Specific sector queries
    else if (lowerMessage.includes('passenger')) {
      const historical = allData.filter(d => d.category === 'Passenger Vehicles' && d.type === 'historical');
      const projected = allData.filter(d => d.category === 'Passenger Vehicles' && d.type === 'projected');

      const latest = historical.find(d => d.year === 2024);
      const future = projected.find(d => d.year === 2030);

      response = `Passenger Vehicles Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected: ${future ? `${future.value.toFixed(1)}M by 2030` : 'N/A'}\n\n` +
        `Growth: ${latest ? `From ${historical.find(d => d.year === 2018)?.value.toFixed(1)}M in 2018 to ${latest.value.toFixed(1)}M in 2024` : 'N/A'}`;
    }

    else if (lowerMessage.includes('commercial')) {
      const historical = allData.filter(d => d.category === 'Commercial Vehicles' && d.type === 'historical');
      const projected = allData.filter(d => d.category === 'Commercial Vehicles' && d.type === 'projected');

      const latest = historical.find(d => d.year === 2024);
      const future = projected.find(d => d.year === 2030);

      response = `Commercial Vehicles Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected: ${future ? `${future.value.toFixed(1)}M by 2030` : 'N/A'}\n\n` +
        `Largest sector, showing steady growth from ${historical.find(d => d.year === 2018)?.value.toFixed(1)}M to ${latest?.value.toFixed(1)}M`;
    }

    else if (lowerMessage.includes('mining')) {
      const historical = allData.filter(d => d.category === 'Mining' && d.type === 'historical');
      const projected = allData.filter(d => d.category === 'Mining' && d.type === 'projected');

      const latest = historical.find(d => d.year === 2024);

      response = `Mining Sector Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected 2030: ${projected.find(d => d.year === 2030)?.value.toFixed(1)}M\n\n` +
        `Note: Relatively stable consumption around 45M liters, with a dip in 2020-2022.`;
    }

    else if (lowerMessage.includes('manufacturing') || lowerMessage.includes('construction')) {
      const historical = allData.filter(d => d.category === 'Manufacturing & Construction' && d.type === 'historical');

      response = `Manufacturing & Construction Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected 2030: ${allData.find(d => d.category === 'Manufacturing & Construction' && d.year === 2030)?.value.toFixed(1)}M\n\n` +
        `Significant dip in 2020 (72.5M) due to pandemic, recovered in 2021.`;
    }

    else if (lowerMessage.includes('agriculture')) {
      const historical = allData.filter(d => d.category === 'Agriculture' && d.type === 'historical');

      response = `Agriculture Sector Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected 2030: ${allData.find(d => d.category === 'Agriculture' && d.year === 2030)?.value.toFixed(1)}M\n\n` +
        `Steady, gradual growth from 20.3M in 2018 to 22.9M in 2024.`;
    }

    else if (lowerMessage.includes('other')) {
      const historical = allData.filter(d => d.category === 'Others' && d.type === 'historical');

      response = `Other Sectors Lubricant Consumption\n\n` +
        `Historical (Million Liters):\n` +
        `${historical.map(d => `${d.year}: ${d.value.toFixed(1)}M`).join(', ')}\n\n` +
        `Projected 2030: ${allData.find(d => d.category === 'Others' && d.year === 2030)?.value.toFixed(1)}M\n\n` +
        `Smallest consumption category, but steady growth projected.`;
    }

    // Year-specific queries
    else if (lowerMessage.includes('2024') || lowerMessage.includes('latest') || lowerMessage.includes('current')) {
      const yearData = allData.filter(d => d.year === 2024 && d.type === 'historical');
      const total = yearData.reduce((sum, item) => sum + item.value, 0);

      response = `2024 Lubricant Consumption (Million Liters)\n\n` +
        `${yearData.map(d => `${d.category}: ${d.value.toFixed(1)}M`).join('\n')}\n\n` +
        `**Total 2024 Consumption: ${total.toFixed(1)}M liters**\n\n` +
        `Commercial Vehicles is the largest sector at ${yearData.find(d => d.category === 'Commercial Vehicles')?.value.toFixed(1)}M liters.`;
    }

    else if (lowerMessage.includes('2020') || lowerMessage.includes('pandemic') || lowerMessage.includes('covid')) {
      const yearData = allData.filter(d => d.year === 2020 && d.type === 'historical');
      const total = yearData.reduce((sum, item) => sum + item.value, 0);

      response = `2020 Lubricant Consumption - Pandemic Impact (Million Liters)\n\n` +
        `${yearData.map(d => `${d.category}: ${d.value.toFixed(1)}M`).join('\n')}\n\n` +
        `**Total 2020 Consumption: ${total.toFixed(1)}M liters**\n\n` +
        `Significant drops in Passenger Vehicles (44.1M vs 89.8M in 2019) and Manufacturing (72.5M vs 109.0M in 2019).`;
    }

    // Comparison queries
    else if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
      const sectors = [];
      if (lowerMessage.includes('passenger') && lowerMessage.includes('commercial')) {
        sectors.push('Passenger Vehicles', 'Commercial Vehicles');
      } else if (lowerMessage.includes('mining') && lowerMessage.includes('agriculture')) {
        sectors.push('Mining', 'Agriculture');
      } else {
        // Default comparison
        sectors.push('Passenger Vehicles', 'Commercial Vehicles');
      }

      const latestData = sectors.map(sector => {
        const data = allData.find(d => d.category === sector && d.year === 2024 && d.type === 'historical');
        return { sector, value: data?.value || 0 };
      });

      response = `2024 Consumption Comparison (Million Liters)\n\n` +
        `${latestData.map(d => `${d.sector}: ${d.value.toFixed(1)}M`).join(' vs ')}\n\n` +
        `Difference: ${Math.abs(latestData[0].value - latestData[1].value).toFixed(1)}M liters`;
    }

    // Total consumption
    else if (lowerMessage.includes('total') || lowerMessage.includes('sum') || lowerMessage.includes('all')) {
      const year = lowerMessage.includes('2024') ? 2024 :
        lowerMessage.includes('2023') ? 2023 :
          lowerMessage.includes('2030') ? 2030 : 2024;

      const yearData = allData.filter(d => d.year === year);
      const total = yearData.reduce((sum, item) => sum + item.value, 0);

      response = `Total Lubricant Consumption ${year}: ${total.toFixed(1)}M liters\n\n` +
        `Breakdown:\n` +
        `${yearData.map(d => `${d.category}: ${d.value.toFixed(1)}M`).join('\n')}`;
    }

    // Growth queries
    else if (lowerMessage.includes('growth') || lowerMessage.includes('trend') || lowerMessage.includes('increase')) {
      const sector = lowerMessage.includes('passenger') ? 'Passenger Vehicles' :
        lowerMessage.includes('commercial') ? 'Commercial Vehicles' :
          lowerMessage.includes('mining') ? 'Mining' :
            lowerMessage.includes('manufacturing') ? 'Manufacturing & Construction' :
              lowerMessage.includes('agriculture') ? 'Agriculture' : 'All';

      if (sector === 'All') {
        const start2018 = allData.filter(d => d.year === 2018 && d.type === 'historical').reduce((sum, item) => sum + item.value, 0);
        const end2024 = allData.filter(d => d.year === 2024 && d.type === 'historical').reduce((sum, item) => sum + item.value, 0);
        const growth = ((end2024 - start2018) / start2018 * 100);

        response = `Overall Market Growth 2018-2024\n\n` +
          `2018 Total: ${start2018.toFixed(1)}M liters\n` +
          `2024 Total: ${end2024.toFixed(1)}M liters\n` +
          `Growth: ${growth.toFixed(1)}% over 6 years`;
      } else {
        const start = allData.find(d => d.category === sector && d.year === 2018 && d.type === 'historical')?.value || 0;
        const end = allData.find(d => d.category === sector && d.year === 2024 && d.type === 'historical')?.value || 0;
        const growth = ((end - start) / start * 100);

        response = `${sector} Growth 2018-2024\n\n` +
          `2018: ${start.toFixed(1)}M liters\n` +
          `2024: ${end.toFixed(1)}M liters\n` +
          `Growth: ${growth.toFixed(1)}% over 6 years`;
      }
    }

    // Projection queries
    else if (lowerMessage.includes('project') || lowerMessage.includes('future') || lowerMessage.includes('2030')) {
      const projected2030 = allData.filter(d => d.year === 2030 && d.type === 'projected');
      const total2030 = projected2030.reduce((sum, item) => sum + item.value, 0);
      const total2024 = allData.filter(d => d.year === 2024 && d.type === 'historical').reduce((sum, item) => sum + item.value, 0);
      const growth = ((total2030 - total2024) / total2024 * 100);

      response = `2030 Projections (Million Liters)\n\n` +
        `${projected2030.map(d => `${d.category}: ${d.value.toFixed(1)}M`).join('\n')}\n\n` +
        `**Total Projected 2030: ${total2030.toFixed(1)}M liters**\n\n` +
        `Projected growth from 2024: ${growth.toFixed(1)}%`;
    }

    // Default response
    else {
      response = `I can help you analyze lubricant market data! Available sectors: ${categories.join(', ')}.\n\n` +
        `Try asking about:\n` +
        `• Specific sectors (e.g., "Show mining data")\n` +
        `• Yearly data (e.g., "2024 consumption")\n` +
        `• Comparisons (e.g., "Compare passenger and commercial")\n` +
        `• Growth trends (e.g., "Growth from 2018 to 2024")\n` +
        `• Future projections (e.g., "2030 projections")`;
    }

    console.log('✅ Sending response');
    res.json({ response });

  } catch (error) {
    console.error('❌ Chat error:', error);
    res.json({
      response: "I'm having trouble accessing the data right now. Please try again or check the charts for the information you need."
    });
  }
});

// Test endpoint
router.get('/chat/test', (req, res) => {
  res.json({
    status: 'working',
    message: 'Local chatbot is ready',
    timestamp: new Date().toISOString()
  });
});

console.log('✅ Local chatbot routes loaded - No external API needed!');
module.exports = router;




/**
 * /**
 * server/routes/chatRoutes.js
 *
 * POST /api/chat
 * body: { message: string, context?: { activeCategory?: string, activeTab?: 'historical'|'projected' } }
 *
 * Response:
 * { response: string, provenance: 'hf'|'deterministic'|'no_data'|'error', model?: string, usedRows: number }
 *

const express = require('express');
const router = express.Router();
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const DataModel = require('../models/dataModel');
const { buildPromptFromRows } = require('../utils/promptBuilder');

const HF_API_KEY = process.env.HF_API_KEY || '';
const HF_MODEL = process.env.HF_MODEL || 'google/flan-t5-large';
const HF_TIMEOUT_MS = Number(process.env.HF_TIMEOUT_MS || 60000);

// rate limiter for safety
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 40,
  message: { error: 'Too many requests - please slow down.' }
});
router.use('/chat', limiter);

function normalizeCategory(cat) {
  if (!cat) return 'All';
  return String(cat).trim() || 'All';
}

async function fetchRows({ activeCategory = 'All', activeTab = 'historical' }, maxRows = 400) {
  // DataModel.getAllData exists but we implement fetching via DataModel.getAllData then filter or (if needed) implement new method.
  const all = await DataModel.getAllData();
  const filtered = all.filter(r => r.type === activeTab && (activeCategory === 'All' || r.category === activeCategory));
  return filtered.slice(0, maxRows);
}

/** Short deterministic responder using DB rows (no LLM) 
async function deterministicResponder(message, rows, activeCategory, activeTab) {
  const lower = (message || '').toLowerCase();

  const extractYear = (text) => {
    const m = text.match(/\b(20(1[8-9]|2[0-9]|30))\b/);
    return m ? Number(m[0]) : null;
  };

  const year = extractYear(message);
  if (!rows || rows.length === 0) return "I don't have enough data to answer that.";

  // totals for a year
  if (/\b(total|sum|overall|aggregate)\b/.test(lower) && year) {
    const rowsYear = rows.filter(r => Number(r.year) === year);
    const total = rowsYear.reduce((s, r) => s + Number(r.value || 0), 0);
    const top = rowsYear.sort((a, b) => b.value - a.value).slice(0, 3).map(r => `${r.category}: ${Number(r.value).toFixed(1)}M`).join(', ');
    return `Total lubricant consumption in ${year}: ${total.toFixed(1)} million liters. Top contributors: ${top}.`;
  }

  // specific category + year
  if (activeCategory && activeCategory !== 'All' && year) {
    const row = rows.find(r => r.category === activeCategory && Number(r.year) === year);
    if (row) {
      // change from previous year
      const prev = rows.find(r => r.category === activeCategory && Number(r.year) === (year - 1));
      const change = prev ? ((row.value - prev.value) / prev.value * 100) : null;
      return `${activeCategory} in ${year}: ${Number(row.value).toFixed(1)} million liters.` + (change !== null ? ` Change vs ${year - 1}: ${change.toFixed(1)}%` : '');
    }
  }

  // compare two sectors in the same year
  if (/\b(compare|vs|versus)\b/.test(lower) && year) {
    const rowsYear = rows.filter(r => Number(r.year) === year);
    const top2 = rowsYear.sort((a, b) => b.value - a.value).slice(0, 2);
    if (top2.length >= 2) {
      const diff = top2[0].value - top2[1].value;
      const pct = (diff / top2[1].value) * 100;
      return `${top2[0].category}: ${top2[0].value.toFixed(1)}M vs ${top2[1].category}: ${top2[1].value.toFixed(1)}M in ${year}. Difference: ${diff.toFixed(1)}M (${pct.toFixed(1)}%).`;
    }
  }

  // growth/trend for a category
  if (/\b(growth|trend|increase|decrease|since 2018)\b/.test(lower) && activeCategory && activeCategory !== 'All') {
    const catRows = rows.filter(r => r.category === activeCategory).sort((a, b) => a.year - b.year);
    if (catRows.length >= 2) {
      const start = catRows[0];
      const end = catRows[catRows.length - 1];
      const growth = ((end.value - start.value) / start.value * 100);
      return `${activeCategory} change ${start.year} -> ${end.year}: from ${start.value.toFixed(1)}M to ${end.value.toFixed(1)}M (${growth.toFixed(1)}%).`;
    }
    return `Not enough data to compute trend for ${activeCategory}.`;
  }

  // default helpful message
  return `I can answer totals, comparisons, trends and projections from the dataset. Try: "Total 2024", "Compare Passenger Vehicles and Commercial Vehicles in 2024", or "Trend for Mining since 2018".`;
}

/** HF helper: try primary model then fallback models if configured 
const fallbackModels = [HF_MODEL, 'google/flan-t5-small', 'bigscience/bloomz-1b1'].filter(Boolean);

async function callHuggingFace(prompt) {
  if (!HF_API_KEY) throw new Error('HF_API_KEY not present');

  // try models sequentially (stop on first success)
  for (const model of fallbackModels) {
    try {
      const url = `https://api-inference.huggingface.co/models/${model}`;
      const headers = {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
      const payload = {
        inputs: prompt,
        parameters: { max_new_tokens: 384, temperature: 0.0, do_sample: false }
      };
      const resp = await axios.post(url, payload, { headers, timeout: HF_TIMEOUT_MS });
      const data = resp.data;
      // handle various HF return shapes
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        return { text: data[0].generated_text, model };
      }
      if (data.generated_text) return { text: data.generated_text, model };
      if (typeof data === 'string') return { text: data, model };
      if (data.error) throw new Error(`HF error: ${data.error}`);
      return { text: JSON.stringify(data), model };
    } catch (err) {
      const status = err?.response?.status;
      console.warn(`HF model ${model} attempt failed (status=${status || 'unknown'}). ${err.message}`);
      // continue to next model
    }
  }
  throw new Error('All HF model attempts failed');
}

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const context = req.body.context || {};
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message required' });
    }
    const activeCategory = normalizeCategory(context.activeCategory);
    const activeTab = context.activeTab === 'projected' ? 'projected' : 'historical';

    // fetch relevant rows
    const rows = await fetchRows({ activeCategory, activeTab }, 400);
    if (!rows || rows.length === 0) {
      return res.json({ response: "No data available for the selected filters.", provenance: 'no_data', usedRows: 0 });
    }

    // if HF not configured -> deterministic immediately
    if (!HF_API_KEY) {
      const det = await deterministicResponder(message, rows, activeCategory, activeTab);
      return res.json({ response: det, provenance: 'deterministic', usedRows: rows.length });
    }

    // Build short context for LLM
    const ctxText = buildPromptFromRows(rows, { activeCategory, activeTab }); // concise lines like Category: X\n2018: 12.3M ...
    const systemInstruction = `You are a concise data assistant. Use ONLY the numbers and categories in the CONTEXT. Do NOT invent or hallucinate. If insufficient data, reply exactly: "I don't have enough data to answer that." Use 1 decimal place and append "million liters" to numeric answers.`;

    const userPrompt = `
SYSTEM:
${systemInstruction}

CONTEXT:
${ctxText}

USER QUERY:
${message}

RULES:
- Use only CONTEXT values.
- Be concise (<= 180 words).
- If not enough data, reply exactly: "I don't have enough data to answer that."
`;

    // call HF with retries/fallback models
    try {
      const hfRes = await callHuggingFace(userPrompt);
      let answer = String(hfRes.text || '').trim();
      // guard: sometimes LLM echoes prompt; if so, fall back
      if (!answer || answer.length < 4 || answer.toLowerCase().includes('i don\'t have enough data') || answer.toLowerCase().includes('error')) {
        // still return LLM answer if not empty; but if it signals no data, return deterministic
        if (answer.toLowerCase().includes("i don't have enough data")) {
          const det = await deterministicResponder(message, rows, activeCategory, activeTab);
          return res.json({ response: det, provenance: 'deterministic', usedRows: rows.length });
        }
      }
      // sanitize typical echoes of the prompt
      if (answer.startsWith(userPrompt)) answer = answer.slice(userPrompt.length).trim();
      if (!answer) answer = "I don't have enough data to answer that.";
      return res.json({ response: answer, provenance: 'hf', model: hfRes.model, usedRows: rows.length });
    } catch (hfErr) {
      console.warn('HF all-models failed, falling back to deterministic:', hfErr.message);
      const det = await deterministicResponder(message, rows, activeCategory, activeTab);
      return res.json({ response: det, provenance: 'deterministic', usedRows: rows.length });
    }

  } catch (err) {
    console.error('Chat route error:', err);
    return res.status(500).json({ response: 'Server error while processing chat.', provenance: 'error', usedRows: 0 });
  }
});

module.exports = router;
 */