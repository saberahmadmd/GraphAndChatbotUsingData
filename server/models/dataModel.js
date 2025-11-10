const { db } = require('../config/database');

class DataModel {
  static initializeSampleData() {
    return new Promise((resolve, reject) => {
      // Sample data from the Excel sheet - Lubricant consumption data
      const sampleData = [
        // Passenger Vehicles - Historical
        { year: 2018, category: 'Passenger Vehicles', value: 86.96712047391755, type: 'historical', },
        { year: 2019, category: 'Passenger Vehicles', value: 89.75104226906605, type: 'historical', },
        { year: 2020, category: 'Passenger Vehicles', value: 44.057144690999785, type: 'historical', },
        { year: 2021, category: 'Passenger Vehicles', value: 66.21496083089708, type: 'historical', },
        { year: 2022, category: 'Passenger Vehicles', value: 94.89695321287554, type: 'historical', },
        { year: 2023, category: 'Passenger Vehicles', value: 97.24292175156805, type: 'historical', },
        { year: 2024, category: 'Passenger Vehicles', value: 100.21373000000031, type: 'historical', },

        // Passenger Vehicles - Projected
        { year: 2025, category: 'Passenger Vehicles', value: 104.28066727854359, type: 'projected', },
        { year: 2026, category: 'Passenger Vehicles', value: 108.49294009574086, type: 'projected', },
        { year: 2027, category: 'Passenger Vehicles', value: 112.86537472182208, type: 'projected', },
        { year: 2028, category: 'Passenger Vehicles', value: 117.4023593901302, type: 'projected', },
        { year: 2029, category: 'Passenger Vehicles', value: 122.10598523671773, type: 'projected', },
        { year: 2030, category: 'Passenger Vehicles', value: 127.06108109204828, type: 'projected', },

        // Commercial Vehicles - Historical
        { year: 2018, category: 'Commercial Vehicles', value: 132.8099517849728, type: 'historical', },
        { year: 2019, category: 'Commercial Vehicles', value: 136.42425665013354, type: 'historical', },
        { year: 2020, category: 'Commercial Vehicles', value: 137.35914742896435, type: 'historical', },
        { year: 2021, category: 'Commercial Vehicles', value: 142.34747709743291, type: 'historical', },
        { year: 2022, category: 'Commercial Vehicles', value: 143.4190291751984, type: 'historical', },
        { year: 2023, category: 'Commercial Vehicles', value: 147.37365445020242, type: 'historical', },
        { year: 2024, category: 'Commercial Vehicles', value: 150.94963625000008, type: 'historical', },

        // Commercial Vehicles - Projected
        { year: 2025, category: 'Commercial Vehicles', value: 155.4855043135832, type: 'projected', },
        { year: 2026, category: 'Commercial Vehicles', value: 160.16279558802, type: 'projected', },
        { year: 2027, category: 'Commercial Vehicles', value: 164.97619150679682, type: 'projected', },
        { year: 2028, category: 'Commercial Vehicles', value: 169.95529973323568, type: 'projected', },
        { year: 2029, category: 'Commercial Vehicles', value: 175.1001049813956, type: 'projected', },
        { year: 2030, category: 'Commercial Vehicles', value: 180.4189141155865, type: 'projected', },

        // Mining - Historical
        { year: 2018, category: 'Mining', value: 47.73476529924715, type: 'historical', },
        { year: 2019, category: 'Mining', value: 48.40213932115372, type: 'historical', },
        { year: 2020, category: 'Mining', value: 44.120178564586254, type: 'historical', },
        { year: 2021, category: 'Mining', value: 44.92033321019751, type: 'historical', },
        { year: 2022, category: 'Mining', value: 43.93665893400054, type: 'historical', },
        { year: 2023, category: 'Mining', value: 44.59284657126492, type: 'historical', },
        { year: 2024, category: 'Mining', value: 45.05625000000007, type: 'historical', },

        // Mining - Projected
        { year: 2025, category: 'Mining', value: 43.344112500000065, type: 'projected', },
        { year: 2026, category: 'Mining', value: 42.780639037500066, type: 'projected', },
        { year: 2027, category: 'Mining', value: 43.55069054017507, type: 'projected', },
        { year: 2028, category: 'Mining', value: 44.33460296989822, type: 'projected', },
        { year: 2029, category: 'Mining', value: 45.13262582335639, type: 'projected', },
        { year: 2030, category: 'Mining', value: 45.94501308817681, type: 'projected', },

        // Manufacturing & Construction - Historical
        { year: 2018, category: 'Manufacturing & Construction', value: 106.30369436207185, type: 'historical', },
        { year: 2019, category: 'Manufacturing & Construction', value: 108.97797705264853, type: 'historical', },
        { year: 2020, category: 'Manufacturing & Construction', value: 72.4955167505311, type: 'historical', },
        { year: 2021, category: 'Manufacturing & Construction', value: 104.9640758558757, type: 'historical', },
        { year: 2022, category: 'Manufacturing & Construction', value: 103.71403059846, type: 'historical', },
        { year: 2023, category: 'Manufacturing & Construction', value: 103.97827027620552, type: 'historical', },
        { year: 2024, category: 'Manufacturing & Construction', value: 103.41558867177673, type: 'historical', },

        // Manufacturing & Construction - Projected
        { year: 2025, category: 'Manufacturing & Construction', value: 106.803998390211, type: 'projected', },
        { year: 2026, category: 'Manufacturing & Construction', value: 110.15577882081364, type: 'projected', },
        { year: 2027, category: 'Manufacturing & Construction', value: 113.47133054386188, type: 'projected', },
        { year: 2028, category: 'Manufacturing & Construction', value: 116.75220669304146, type: 'projected', },
        { year: 2029, category: 'Manufacturing & Construction', value: 120.12794680382619, type: 'projected', },
        { year: 2030, category: 'Manufacturing & Construction', value: 123.60129384393328, type: 'projected', },

        // Agriculture - Historical
        { year: 2018, category: 'Agriculture', value: 20.322719626157763, type: 'historical', },
        { year: 2019, category: 'Agriculture', value: 21.560964564150137, type: 'historical', },
        { year: 2020, category: 'Agriculture', value: 22.257928, type: 'historical', },
        { year: 2021, category: 'Agriculture', value: 22.665364008084108, type: 'historical', },
        { year: 2022, category: 'Agriculture', value: 22.73898517515572, type: 'historical', },
        { year: 2023, category: 'Agriculture', value: 22.75178796575665, type: 'historical', },
        { year: 2024, category: 'Agriculture', value: 22.904438198649704, type: 'historical', },

        // Agriculture - Projected
        { year: 2025, category: 'Agriculture', value: 23.016217913475128, type: 'projected', },
        { year: 2026, category: 'Agriculture', value: 23.128543142865812, type: 'projected', },
        { year: 2027, category: 'Agriculture', value: 23.24141654907708, type: 'projected', },
        { year: 2028, category: 'Agriculture', value: 23.354840807356766, type: 'projected', },
        { year: 2029, category: 'Agriculture', value: 23.468818606008618, type: 'projected', },
        { year: 2030, category: 'Agriculture', value: 23.583352646456024, type: 'projected', },

        // Others - Historical
        { year: 2018, category: 'Others', value: 7.265049136978206, type: 'historical', },
        { year: 2019, category: 'Others', value: 7.455878372414702, type: 'historical', },
        { year: 2020, category: 'Others', value: 5.786400971463223, type: 'historical', },
        { year: 2021, category: 'Others', value: 7.189573878089902, type: 'historical', },
        { year: 2022, category: 'Others', value: 7.099569779484028, type: 'historical', },
        { year: 2023, category: 'Others', value: 7.138454367217804, type: 'historical', },
        { year: 2024, category: 'Others', value: 7.140678202934453, type: 'historical', },

        // Others - Projected
        { year: 2025, category: 'Others', value: 7.215180366820277, type: 'projected', },
        { year: 2026, category: 'Others', value: 7.336040041715819, type: 'projected', },
        { year: 2027, category: 'Others', value: 7.510976568046431, type: 'projected', },
        { year: 2028, category: 'Others', value: 7.685068769595688, type: 'projected', },
        { year: 2029, category: 'Others', value: 7.863724634716306, type: 'projected', },
        { year: 2030, category: 'Others', value: 8.047069149106932, type: 'projected', }
      ];

      // Clear existing data
      db.run('DELETE FROM lubricant_data', (err) => {
        if (err) {
          console.error('Error clearing table (might not exist yet):', err.message);
          // Continue anyway - table might not exist yet
        }

        // Insert sample data
        const stmt = db.prepare(
          'INSERT INTO lubricant_data (year, category, value, type) VALUES (?, ?, ?, ?)'
        );

        let completed = 0;
        sampleData.forEach((item) => {
          stmt.run([item.year, item.category, item.value, item.type,], (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            }
            completed++;

            if (completed === sampleData.length) {
              stmt.finalize();
              console.log(`✅ Inserted ${sampleData.length} records`);
              resolve(true);
            }
          });
        });
      });
    });
  }

  static getData(type = 'historical', category = 'Passenger Vehicles') {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT year, category, value, type
        FROM lubricant_data
        WHERE type = ? AND category = ?
        ORDER BY year ASC
      `;

      db.all(query, [type, category], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Return data for lubricant consumption - no BEV/PHEV simulation
          const result = rows.map(row => ({
            year: row.year,
            [row.category]: row.value
          }));
          resolve(result);
        }
      });
    });
  }

  static getAllData() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM lubricant_data ORDER BY year ASC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = DataModel;









/*
/**
 * server/models/dataModel.js
 *
 * Robust loader: tries multiple possible paths for Sample_Data.xlsx (and env override SAMPLE_DATA_PATH).
 * Falls back to embedded sample data if no Excel is found or if Excel has no valid rows.
 *

const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const { db } = require('../config/database');

class DataModel {
  // Try multiple candidate paths for the Excel file.
  static resolveExcelPath() {
    // Allow override from env for exact path
    if (process.env.SAMPLE_DATA_PATH && process.env.SAMPLE_DATA_PATH.trim()) {
      const p = path.resolve(process.env.SAMPLE_DATA_PATH.trim());
      if (fs.existsSync(p)) return p;
    }

    // Candidate names/locations relative to this file (models/)
    const candidates = [
      path.join(__dirname, '../data/Sample_Data.xlsx'),   // default used previously
      path.join(__dirname, '../data/Sample Data.xlsx'),  // space in name
      path.join(__dirname, '../../data/Sample_Data.xlsx'), // project root /data/
      path.join(__dirname, '../../data/Sample Data.xlsx'),
      path.join(__dirname, '../data/Sample_Data.xls'),    // alternate extension
      path.join(__dirname, '../data/Sample Data.xls'),
      path.join(process.cwd(), 'data', 'Sample_Data.xlsx'), // CWD-based
      path.join(process.cwd(), 'data', 'Sample Data.xlsx'),
    ];

    for (const c of candidates) {
      try {
        if (fs.existsSync(c)) return c;
      } catch (e) {
        // ignore permission errors, continue
      }
    }

    // No file found
    return null;
  }

  static loadFromExcel() {
    const filePath = this.resolveExcelPath();
    if (!filePath) {
      console.warn('⚠️ Excel file not found. Looked for multiple candidate paths. You can set SAMPLE_DATA_PATH in .env to the exact path.');
      return [];
    }

    console.log('🔎 Using Excel file at:', filePath);

    try {
      const workbook = xlsx.readFile(filePath, { cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const raw = xlsx.utils.sheet_to_json(worksheet, { defval: null });

      if (!Array.isArray(raw) || raw.length === 0) {
        console.warn('⚠️ Excel file appears empty or unreadable:', filePath);
        return [];
      }

      // Helper: case-insensitive / fuzzy header lookup
      const getField = (row, candidates) => {
        const keys = Object.keys(row || {});
        for (const c of candidates) {
          const foundKey = keys.find(k => String(k || '').trim().toLowerCase() === c.toLowerCase());
          if (foundKey !== undefined) return row[foundKey];
        }
        // fuzzy: substring match
        for (const key of keys) {
          for (const c of candidates) {
            if (String(key).toLowerCase().includes(c.toLowerCase())) return row[key];
          }
        }
        return null;
      };

      const parsed = raw.map(rawRow => {
        const yearRaw = getField(rawRow, ['year', 'Year']);
        const catRaw = getField(rawRow, ['category', 'Category', 'sector', 'Sector']);
        const valueRaw = getField(rawRow, ['value', 'Value', 'consumption', 'Consumption', 'liters', 'Liters']);
        const typeRaw = getField(rawRow, ['type', 'Type', 'dataset', 'Dataset']);

        const year = (yearRaw !== null && yearRaw !== '') ? Number(yearRaw) : null;
        const category = (catRaw || '').toString().trim();
        let value = null;
        if (valueRaw !== null && valueRaw !== '') {
          // remove thousands separators & non-numeric chars
          const vstr = String(valueRaw).replace(/,/g, '').replace(/[^\d\.\-]/g, '');
          const num = Number(vstr);
          value = Number.isFinite(num) ? num : null;
        }
        let type = (typeRaw || '').toString().trim().toLowerCase();
        if (!type) type = (year && year >= 2025) ? 'projected' : 'historical';
        else type = type.includes('proj') ? 'projected' : 'historical';

        return { year, category, value, type };
      });

      const valid = parsed.filter(r =>
        Number.isFinite(r.year) &&
        typeof r.category === 'string' && r.category.length > 0 &&
        Number.isFinite(r.value)
      );

      console.log(`ℹ️ Excel parsed rows: raw=${raw.length}, valid=${valid.length}`);
      return valid;
    } catch (err) {
      console.error('❌ Error reading Excel file:', err);
      return [];
    }
  }

  static embeddedSampleData() {
    return [
      { year: 2018, category: 'Passenger Vehicles', value: 86.96712047391755, type: 'historical'},
      { year: 2019, category: 'Passenger Vehicles', value: 89.75104226906605, type: 'historical'},
      { year: 2020, category: 'Passenger Vehicles', value: 44.057144690999785, type: 'historical' },
      { year: 2024, category: 'Commercial Vehicles', value: 150.94963625000008, type: 'historical' },
    ];
  }

  static initializeSampleData() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('🔁 DataModel: loading data from Excel (if present)...');
        const rows = this.loadFromExcel();

        let dataToInsert = rows;
        if (!Array.isArray(rows) || rows.length === 0) {
          console.warn('⚠️ No valid rows found in Excel — using embedded fallback sample data.');
          dataToInsert = this.embeddedSampleData();
        }

        if (!Array.isArray(dataToInsert) || dataToInsert.length === 0) {
          console.error('❌ No data to insert.');
          return resolve(false);
        }

        db.serialize(() => {
          db.run('BEGIN TRANSACTION');
          db.run('DELETE FROM lubricant_data', (delErr) => {
            if (delErr) console.warn('⚠️ Could not clear lubricant_data table before seeding:', delErr.message);

            const stmt = db.prepare(
              'INSERT INTO lubricant_data (year, category, value, type) VALUES (?, ?, ?, ?)'
            );

            let inserted = 0;
            dataToInsert.forEach(item => {
              const y = Number(item.year);
              const cat = (item.category || 'Unknown').toString().trim();
              const val = Number(item.value) || 0;
              const type = (item.type && item.type.toLowerCase().includes('proj')) ? 'projected' : (item.type || 'historical');

              stmt.run([y, cat, val, type], (err) => {
                if (err) console.error('Error inserting row:', err.message);
                inserted++;
              });
            });

            stmt.finalize((fErr) => {
              if (fErr) console.error('Error finalizing statement:', fErr.message);
              db.run('COMMIT', (cErr) => {
                if (cErr) return reject(cErr);
                console.log(`✅ DataModel: Inserted ${inserted} records into lubricant_data`);
                resolve(true);
              });
            });
          });
        });
      } catch (err) {
        console.error('❌ initializeSampleData error:', err);
        reject(err);
      }
    });
  }

  static getData(type = 'historical', category = 'Passenger Vehicles') {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT year, category, value, type
        FROM lubricant_data
        WHERE type = ? AND category = ?
        ORDER BY year ASC
      `;
      db.all(query, [type, category], (err, rows) => {
        if (err) return reject(err);
        const result = rows.map(row => ({
          year: row.year,
          [row.category]: row.value
        }));
        resolve(result);
      });
    });
  }

  static getAllData() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM lubricant_data ORDER BY year ASC, category ASC', (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = DataModel;
*/