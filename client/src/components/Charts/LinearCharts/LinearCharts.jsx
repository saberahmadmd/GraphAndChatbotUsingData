import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './LinearCharts.css';

const DEFAULT_COLORS = [
  '#2563eb', // blue - Passenger Vehicles
  '#34d399', // green - Commercial Vehicles
  '#f59e0b', // amber - Mining
  '#a78bfa', // purple - Manufacturing & Construction
  '#fb7185', // pink - Agriculture
  '#06b6d4', // cyan - Others
  '#f97316', // orange - backup
];

function numberFormatter(value) {
  try {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  } catch (e) {
    return e;
  }
}

function TooltipFormatter(value, name) {
  const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);
  return [`${formatted} million liters`, name];
}

const LinearCharts = ({ data, lines, title, activeCategory }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
        </div>
        <div className="chart-empty">No lubricant consumption data available for the selected filters.</div>
      </div>
    );
  }

  // Single category - use single color, All categories - use different colors
  const isSingleCategory = activeCategory !== 'All';

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={520}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              tickFormatter={numberFormatter}
              width={100}
              label={{ value: 'Lubricant Consumption (Million Liters)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={TooltipFormatter}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend verticalAlign="top" height={36} />

            {lines.map((line, idx) => (
              <Bar
                key={line.key}
                dataKey={line.key}
                name={line.name}
                stackId={isSingleCategory ? undefined : "stack"}
                radius={[6, 6, 0, 0]}
                barSize={isSingleCategory ? 44 : 28}
                fill={isSingleCategory ? '#2563eb' : DEFAULT_COLORS[idx % DEFAULT_COLORS.length]}
                isAnimationActive={false}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-notes">
        <p><strong>Note:</strong> All values are in million liters. Historical data covers 2018-2024, projected data covers 2025-2030.</p>
      </div>
    </div>
  );
};

export default LinearCharts;