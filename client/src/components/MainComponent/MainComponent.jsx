import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LinearCharts from '../Charts/LinearCharts/LinearCharts';
import DataTables from '../Charts/DataTables/DataTables';
import DownloadPDF from '../Charts/Download/Download';
import './MainComponent.css';

const MainComponent = () => {
  const [activeTab, setActiveTab] = useState('historical');
  const [activeCategory, setActiveCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState([]);
  const [data, setData] = useState({ dataset: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  // Fetch metadata
  const fetchMeta = useCallback(async () => {
    try {
      console.log('📡 Fetching metadata...');
      const response = await axios.get(`${apiBase}/api/meta`);
      const { categories } = response.data;
      console.log('📋 Available categories:', categories);

      if (Array.isArray(categories) && categories.length > 0) {
        setAvailableCategories(categories);
      } else {
        const defaultCats = [
          'Passenger Vehicles',
          'Commercial Vehicles',
          'Mining',
          'Manufacturing & Construction',
          'Agriculture',
          'Others'
        ];
        setAvailableCategories(defaultCats);
      }
    } catch (error) {
      console.error('❌ Error fetching metadata:', error);
      const defaultCats = [
        'Passenger Vehicles',
        'Commercial Vehicles',
        'Mining',
        'Manufacturing & Construction',
        'Agriculture',
        'Others'
      ];
      setAvailableCategories(defaultCats);
    }
  }, [apiBase]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`📊 Fetching data for: ${activeTab}, ${activeCategory}`);

      if (activeCategory === 'All') {
        const resp = await axios.get(`${apiBase}/api/data/all`);
        const allRows = Array.isArray(resp.data) ? resp.data : [];
        console.log('📦 Total rows received:', allRows.length);

        const rowsForType = allRows.filter(r => r.type === activeTab);
        console.log(`📊 Filtered rows for ${activeTab}:`, rowsForType.length);

        if (rowsForType.length === 0) {
          console.warn('⚠️ No data found for current filters');
          setData({ dataset: [], categories: [] });
          setLoading(false);
          return;
        }

        const years = [...new Set(rowsForType.map(r => Number(r.year)))].sort((a, b) => a - b);
        const cats = [...new Set(rowsForType.map(r => r.category))].sort();

        console.log('📅 Years:', years);
        console.log('🏷️ Categories:', cats);

        const yearMap = {};
        years.forEach(y => { yearMap[y] = { year: y }; });

        rowsForType.forEach(r => {
          const y = Number(r.year);
          const valRaw = Number(r.value) || 0;
          const catKey = r.category || 'Unknown';
          yearMap[y][catKey] = (yearMap[y][catKey] || 0) + valRaw;
        });

        const transformed = years.map(y => yearMap[y]);
        console.log('📈 Transformed data sample:', transformed.slice(0, 3));
        setData({ dataset: transformed, categories: cats });
      } else {
        const resp = await axios.get(`${apiBase}/api/data`, {
          params: { type: activeTab, category: activeCategory }
        });
        const rows = Array.isArray(resp.data) ? resp.data : [];
        console.log(`📊 Single category data:`, rows.length, 'rows');

        const normalized = rows.map(r => ({
          year: Number(r.year),
          [activeCategory]: Number(r[activeCategory] ?? r.value ?? 0)
        }));

        console.log('📈 Normalized data sample:', normalized.slice(0, 3));
        setData({ dataset: normalized, categories: [activeCategory] });
      }
    } catch (err) {
      console.error('❌ Error in fetchData:', err);
      setError(err.message || 'Failed to fetch data');
      setData({ dataset: [], categories: [] });
    } finally {
      setLoading(false);
    }
  }, [activeTab, activeCategory, apiBase]);

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (!data.dataset || data.dataset.length === 0) {
      alert('No data available to download');
      return;
    }

    try {
      // Show loading state
      setLoading(true);

      // Generate comprehensive PDF report
      DownloadPDF.generateComprehensiveReport(
        data.dataset,
        activeCategory,
        activeTab
      );

      console.log('✅ PDF download initiated');
    } catch (error) {
      console.error('❌ Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch metadata once on mount
  useEffect(() => {
    fetchMeta();
  }, [fetchMeta]);

  // Refetch data when filters change
  useEffect(() => {
    if (availableCategories.length > 0) {
      fetchData();
    }
  }, [activeTab, activeCategory, availableCategories, fetchData]);

  const chartProps = (() => {
    if (!data.dataset || data.dataset.length === 0) {
      return { data: [], lines: [], title: 'No Data Available' };
    }

    if (activeCategory === 'All') {
      const cats = data.categories;
      const lines = cats.map(c => ({ key: c, name: c }));
      return {
        data: data.dataset,
        lines,
        title: `Lubricant Consumption - ${activeTab === 'historical' ? 'Historical' : 'Projected'} (All Sectors)`
      };
    } else {
      const lines = [{ key: activeCategory, name: activeCategory }];
      return {
        data: data.dataset,
        lines,
        title: `Lubricant Consumption - ${activeTab === 'historical' ? 'Historical' : 'Projected'} (${activeCategory})`
      };
    }
  })();

  return (
    <section className="main-component">
      <div className="main-container">
        <div className="tabs-section">
          <button
            className={`tab-button ${activeTab === 'historical' ? 'active' : ''}`}
            onClick={() => setActiveTab('historical')}
          >
            Historical (2018-2024)
          </button>
          <button
            className={`tab-button ${activeTab === 'projected' ? 'active' : ''}`}
            onClick={() => setActiveTab('projected')}
          >
            Projected (2025-2030)
          </button>
        </div>

        <div className="filters-section">
          <div className="filter-group categories">
            <label className="filter-label">Vehicle & Sector Types</label>
            <div className="category-buttons">
              <button
                className={`category-button ${activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => setActiveCategory('All')}
              >
                All Sectors
              </button>

              {availableCategories.map(cat => (
                <button
                  key={cat}
                  className={`category-button ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading lubricant consumption data...</div>
        ) : error ? (
          <div className="error">
            Error loading data: {error}
            <br />
            <button onClick={fetchData} style={{ marginTop: '10px', padding: '5px 10px' }}>
              Retry
            </button>
          </div>
        ) : data.dataset.length === 0 ? (
          <div className="error">
            No lubricant consumption data available for the selected filters.
            <br />
            <small>Make sure the backend is running and data is loaded.</small>
          </div>
        ) : (
          <>
            <LinearCharts
              data={chartProps.data}
              lines={chartProps.lines}
              title={chartProps.title}
              activeCategory={activeCategory}
            />
            <DataTables
              data={chartProps.data}
              category={activeCategory}
            />
          </>
        )}

        <div className="download-section">
          <button
            className="download-button"
            onClick={handleDownloadPDF}
            disabled={loading || !data.dataset || data.dataset.length === 0}
          >
            {loading ? 'Generating PDF...' : 'Download Lubricant Consumption Report (PDF)'}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 14L5 9h3V3h4v6h3l-5 5z" />
              <path d="M3 17h14v2H3z" />
            </svg>
          </button>

          {data.dataset && data.dataset.length > 0 && (
            <div className="download-info">
              <small>
                Download includes: Executive summary, detailed data table, and trend analysis for {activeCategory === 'All' ? 'all sectors' : activeCategory}
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainComponent;
