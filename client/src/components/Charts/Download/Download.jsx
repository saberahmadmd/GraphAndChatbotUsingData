import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <- explicit import

/**
 * PDF Download Utility for Lubricant Consumption Data
 * Generates professional PDF reports with tables and charts
 */
class DownloadPDF {
  static generatePDF(data, category, type) {
    const doc = new jsPDF();
    this.addHeader(doc);
    this.addTitle(doc, category, type);
    this.addSummary(doc, data, category, type);
    this.addDataTable(doc, data, category);
    this.addFooter(doc);
    const filename = this.generateFilename(category, type);
    doc.save(filename);
  }

  static addHeader(doc) {
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('GROWTH MARKET INTELLIGENCE', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Lubricant Market Analysis Report', 105, 28, { align: 'center' });
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
  }

  static addTitle(doc, category, type) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);

    let title = '';
    if (category === 'All') {
      title = `${type === 'historical' ? 'Historical' : 'Projected'} Lubricant Consumption - All Sectors`;
    } else {
      title = `${type === 'historical' ? 'Historical' : 'Projected'} Lubricant Consumption - ${category}`;
    }

    doc.text(title, 20, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 58);
  }

  static addSummary(doc, data, category, type) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Report Summary', 20, 75);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);

    if (!data || data.length === 0) {
      doc.text('No data available.', 20, 85);
      return;
    }

    const years = [...new Set(data.map(item => item.year))].sort();
    const startYear = Math.min(...years);
    const endYear = Math.max(...years);
    const summaryText = category === 'All'
      ? `This report shows lubricant consumption data across all sectors for the ${type} period from ${startYear} to ${endYear}.`
      : `This report shows ${category} lubricant consumption data for the ${type} period from ${startYear} to ${endYear}.`;

    const splitText = doc.splitTextToSize(summaryText, 170);
    doc.text(splitText, 20, 85);
  }

  // <-- CHANGED: use autoTable(doc, options) instead of doc.autoTable(...)
  static addDataTable(doc, data) {
    const tableData = this.prepareTableData(data);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Detailed Consumption Data (Million Liters)', 20, 110);

    // autoTable API call (explicit)
    autoTable(doc, {
      startY: 115,
      head: [tableData.headers],
      body: tableData.rows,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 25, fontStyle: 'bold' } // Year column
      },
      margin: { top: 115 }
    });
  }

  static prepareTableData(data) {
    if (!data || data.length === 0) {
      return { headers: ['Year', 'No Data'], rows: [['-', '-']] };
    }

    const years = [...new Set(data.map(item => item.year))].sort((a, b) => a - b);
    // get all non-year keys across the dataset (union)
    const allColsSet = new Set();
    data.forEach(item => {
      Object.keys(item).forEach(k => {
        if (k !== 'year') allColsSet.add(k);
      });
    });
    const allColumns = Array.from(allColsSet);

    const headers = ['Year', ...allColumns.map(col => `${col} (M Liters)`)];
    const rows = years.map(year => {
      const yearData = data.find(item => item.year === year) || {};
      const row = [String(year)];
      allColumns.forEach(column => {
        const value = yearData[column];
        if (typeof value === 'number') {
          row.push(value.toFixed(2));
        } else {
          row.push('-');
        }
      });
      return row;
    });

    return { headers, rows };
  }

  static addFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 280, 190, 280);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Confidential - Growth Market Intelligence', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 190, 285, { align: 'right' });
      doc.text('© 2024 Growth Market Intelligence. All rights reserved.', 105, 290, { align: 'center' });
    }
  }

  static generateFilename(category, type) {
    const date = new Date().toISOString().split('T')[0];
    let categorySlug = category === 'All' ? 'all-sectors' : category.toLowerCase().replace(/\s+/g, '-');
    return `GMI-Lubricant-Consumption-${categorySlug}-${type}-${date}.pdf`;
  }

  static generateComprehensiveReport(data, category, type) {
    const doc = new jsPDF();
    this.addHeader(doc);
    this.addExecutiveSummary(doc, data, category, type);
    doc.addPage();
    this.addTitle(doc, category, type);
    this.addDataTable(doc, data, category);
    if (data && data.length > 1) {
      doc.addPage();
      this.addTrendAnalysis(doc, data, category);
    }
    this.addFooter(doc);
    const filename = this.generateFilename(category, type);
    doc.save(filename);
  }

  static addExecutiveSummary(doc, data, category, type) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Executive Summary', 20, 50);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);

    if (!data || data.length === 0) {
      doc.text('No data available for analysis.', 20, 65);
      return;
    }

    const years = [...new Set(data.map(item => item.year))].sort((a, b) => a - b);
    const startYear = Math.min(...years);
    const endYear = Math.max(...years);

    let summaryLines = [
      `Report Period: ${startYear} - ${endYear}`,
      `Data Type: ${type === 'historical' ? 'Historical Data' : 'Projected Data'}`,
      `Sectors Covered: ${category === 'All' ? 'All Sectors' : category}`,
      '',
      'Key Highlights:'
    ];

    if (data.length > 1 && category !== 'All') {
      const firstYearData = data.find(item => item.year === startYear) || {};
      const lastYearData = data.find(item => item.year === endYear) || {};
      const startValue = firstYearData[category] ?? 0;
      const endValue = lastYearData[category] ?? 0;
      if (startValue && typeof startValue === 'number') {
        const growth = ((endValue - startValue) / startValue * 100);
        summaryLines.push(`• Consumption grew from ${startValue.toFixed(1)}M to ${endValue.toFixed(1)}M liters`);
        summaryLines.push(`• Overall growth: ${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`);
      }
    }

    let yPosition = 65;
    summaryLines.forEach(line => {
      if (line === '') yPosition += 5;
      else {
        doc.text(line, 25, yPosition);
        yPosition += 6;
      }
    });

    yPosition += 10;
    doc.setFont('helvetica', 'italic');
    doc.text('Data Source: GMI Lubricant Market Database', 20, yPosition);
  }

  static addTrendAnalysis(doc, data, category) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('Trend Analysis', 20, 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);

    if (!data || data.length === 0) {
      doc.text('No trend data available.', 20, 45);
      return;
    }

    if (category === 'All') {
      const latestYear = Math.max(...data.map(item => item.year));
      const latestData = data.find(item => item.year === latestYear);
      if (latestData) {
        const sectors = Object.keys(latestData).filter(k => k !== 'year');
        let highestSector = '', highestValue = -Infinity;
        sectors.forEach(s => {
          if ((latestData[s] ?? -Infinity) > highestValue) {
            highestValue = latestData[s];
            highestSector = s;
          }
        });
        const analysisText = [
          `In ${latestYear}, ${highestSector} had the highest lubricant consumption`,
          `at ${highestValue.toFixed(1)} million liters.`,
          '',
          'This comprehensive analysis provides insights into market trends',
          'and consumption patterns across different vehicle and sector types.'
        ];
        let yPos = 45;
        analysisText.forEach(line => {
          doc.text(line, 20, yPos);
          yPos += 6;
        });
      }
    } else {
      if (data.length > 1) {
        const years = data.map(item => item.year).sort((a, b) => a - b);
        const values = years.map(y => (data.find(d => d.year === y) || {})[category] ?? 0);
        const growth = values[0] ? ((values[values.length - 1] - values[0]) / values[0] * 100) : 0;
        const analysisText = [
          `${category} showed ${growth > 0 ? 'growth' : 'decline'} of ${Math.abs(growth).toFixed(1)}%`,
          `from ${years[0]} to ${years[years.length - 1]}.`,
          '',
          'The data indicates consistent market performance with',
          'noticeable trends in consumption patterns.'
        ];
        let yPos = 45;
        analysisText.forEach(line => {
          doc.text(line, 20, yPos);
          yPos += 6;
        });
      }
    }
  }
}

export default DownloadPDF;
