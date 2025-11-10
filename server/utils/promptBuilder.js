/**
 * server/utils/promptBuilder.js
 * Builds a compact LLM context (small, numeric, safe).
 */

function buildPromptFromRows(rows = [], opts = {}) {
  const { activeCategory = 'All', activeTab = 'historical' } = opts;
  if (!rows || rows.length === 0) return `Category: ${activeCategory}\nType: ${activeTab}\nNo rows available.`;

  // Group by category, sort by year
  const grouped = {};
  rows.forEach(r => {
    const cat = r.category || 'Unknown';
    grouped[cat] = grouped[cat] || [];
    grouped[cat].push({ year: Number(r.year), value: Number(r.value || 0) });
  });

  const lines = [`Category: ${activeCategory}`, `Type: ${activeTab}`, 'Units: million liters', '---'];
  Object.keys(grouped).forEach(cat => {
    const items = grouped[cat].sort((a, b) => a.year - b.year);
    lines.push(`Category: ${cat}`);
    items.forEach(it => lines.push(`${it.year}: ${it.value.toFixed(1)}M`));
    lines.push(''); // blank line
  });
  lines.push('---');
  lines.push('End of CONTEXT.');

  return lines.join('\n');
}

module.exports = { buildPromptFromRows };
