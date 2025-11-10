# 🌍 Global Lubricant Consumption Data Explorer

### Full Stack Developer Assignment — Growth Market Intelligence (GMI)

This project is an **interactive data visualization and chatbot platform** for exploring **global lubricant consumption** across various industrial sectors.  
It includes:
- A **Node.js + Express + SQLite backend**
- A **React (Vite)** frontend with interactive charts, filters, and a local NLP chatbot
- A **PDF report generator**
- Optional **server-side chat API**


## 🧩 Overview

This application visualizes historical and projected lubricant consumption data across multiple sectors (e.g., **Passenger Vehicles**, **Commercial Vehicles**, **Mining**, **Agriculture**, etc.) between **2018–2030**.  

It also features a **local AI chatbot** that answers questions about the dataset, provides insights, and summarizes trends.

## ⚙️ Tech Stack

**Frontend:**
- React (Vite)
- Recharts (data visualization)
- jsPDF + jsPDF-Autotable (PDF export)
- Vanilla CSS modules (no Tailwind)

**Backend:**
- Node.js + Express.js
- SQLite (lightweight local database)
- dotenv, cors, nodemon

**Chatbot:**
- Client-side NLP using `compromise`
- Optional backend chat endpoint (`/api/chat`)

## ✨ Features

✅ Interactive charts for historical and projected data  
✅ Filter by **sector** and **type** (Historical / Projected)  
✅ Download detailed **PDF reports**  
✅ Integrated **chatbot assistant** (rule-based + NLP)  
✅ Responsive React UI  
✅ Modular, extensible architecture  


## 🚀 Quick Start

### 1️⃣ Clone and install

git clone https://github.com/yourusername/gmi-data-explorer.git
cd gmi-data-explorer

Backend setup:
cd server
npm install

Frontend setup:
cd ../client
npm install

2️⃣ Configure environment
Create .env files in both /server and /client.

/server/.env
PORT=5000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173

/client/.env
VITE_API_BASE_URL=http://localhost:5000

3️⃣ Run the app
Start backend:
cd server
node index.js

Start frontend:
cd ../client
npm run dev
Now open 👉 http://localhost:5173

📂 Project Structure
gmi-data-explorer/
├── server/
│   ├── index.js
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── dataModel.js
│   ├── routes/
│   │   ├── dataRoutes.js
│   │   ├── chatRoutes.js
│   │   └── metaRoutes.js
│   ├── data/
│   │   └── ev_data.db
│   └── .env
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── MainComponent/
│   │   │   ├── Charts/
│   │   │   ├── Chatbot/
│   │   │   └── Download/
│   │   ├── assets/
│   │   └── styles/
│   └── .env
└── README.md

🧠 Backend Overview
Key Files
index.js — Main entry point. Loads .env, sets up routes, initializes DB and sample data.
config/database.js — Handles SQLite connection and schema creation.
models/dataModel.js — Data operations: seeding, fetching by category/type.
routes/ — Contains:
/api/data — Data endpoints
/api/meta — Metadata (categories, years, types)
/api/chat — Chatbot endpoint

🗄️ Database Schema
Column	Type	Description
id	INTEGER	Primary key
year	INTEGER	Year (2018–2030)
category	TEXT	Sector name
value	REAL	Consumption in million liters
type	TEXT	historical or projected
region	TEXT	Currently always World

DB is auto-initialized with sample data.

🎨 Frontend Overview
Main Components:
MainComponent — Handles category/type filters and API integration.
LinearCharts — Displays data via Recharts ComposedChart.
DataTables — Tabular data view.
Chatbot — Interactive assistant (client-side NLP).
DownloadPDF — Generates comprehensive PDF report.

💬 Chatbot Architecture
Two modes are supported:
Client-side NLP Chatbot (default):
Uses compromise to parse user text.
Answers basic analytical queries (totals, comparisons, growth, projections).

Server-backed Chatbot:
POST /api/chat with { message }
Backend reads DB and returns structured responses.

Example:
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Show me passenger vehicle data for 2024"}'

📡 API Reference
GET /api/meta
Returns distinct categories, years, types, and regions.
{
  "categories": ["Passenger Vehicles", "Commercial Vehicles", "..."],
  "years": [2018, 2019, 2020, ...],
  "types": ["historical", "projected"],
  "regions": ["World"]
}

GET /api/data
Fetch category-specific data.
/api/data?type=historical&category=Passenger Vehicles

Response:
[
  { "year": 2018, "Passenger Vehicles": 86.967 },
  { "year": 2019, "Passenger Vehicles": 89.012 }
]
GET /api/data/all
Returns entire dataset.

POST /api/chat
Chat endpoint. Request body:
{ "message": "Compare mining and agriculture" }

Response:
{ "response": "In 2024, Mining is expected to reach 22.1 ML while Agriculture 18.4 ML." }
📄 PDF Report Generator
The DownloadPDF component uses:
jsPDF
jspdf-autotable

Features:
Title & executive summary
Tabular dataset
Trend analysis
Multi-page export with footers

🧩 Known Issues & Fixes
Issue	Fix
.env accidentally included sensitive key	✅ Remove & rotate API keys immediately
SQLite concurrency limits	✅ Use WAL mode & indexes
Minor chart misalignment	✅ Normalize key mapping in frontend
No region filter yet	🔧 Region param reserved for v2

🚧 Future Enhancements
Add regional filters (Asia, Europe, etc.)
Add semantic LLM chatbot (server-side)
Add CSV/Excel export
Add authentication & roles
Move to PostgreSQL for production
Dockerize backend & frontend
Add automated tests (Jest, Playwright)

☁️ Deployment Guide
Frontend:
Deploy static build on Netlify or Vercel
npm run build
Backend:
Deploy on Render, Railway, or VPS.
Use .env variables for configuration.
Ensure CORS allows your deployed frontend origin.

💡 Author
Md Saber Ahmad
📧 saberahmadmd123@gmail.com
💻 LinkedIn • GitHub