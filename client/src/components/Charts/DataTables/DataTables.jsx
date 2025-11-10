import './DataTables.css';

const DataTables = ({ data, category }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No lubricant consumption data available</div>;
  }

  const columns = Object.keys(data[0]).filter(key => key !== 'year');

  return (
    <div className="data-tables">
      <h3 className="table-title">Lubricant Consumption Details - {category}</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              {columns.map(col => (
                <th key={col}>{col} (Million Liters)</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="year-cell">{row.year}</td>
                {columns.map(col => (
                  <td key={col}>
                    {typeof row[col] === 'number'
                      ? row[col].toLocaleString(undefined, { maximumFractionDigits: 2 })
                      : row[col] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-notes">
        <p>Values represent lubricant consumption in million liters for each sector.</p>
      </div>
    </div>
  );
};

export default DataTables;