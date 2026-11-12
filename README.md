# Stock Market Dashboard

A full-stack web application that retrieves intraday stock market data from Yahoo Finance and displays aggregated daily statistics for the past 30 days, calculating average low prices, average high prices, and total trading volume.
The backend exposes a GET /api/stocks/:symbol endpoint that returns aggregated daily stock data in JSON format.

### Technologies

- **Backend:** Node.js, TypeScript, Express
- **Frontend:** React, TypeScript, Vite
- **Data Source:** Yahoo Finance Chart API

## Setup and Run

Ensure that Node.js and npm installed.

### 1. Clone the repository

```bash
git clone https://github.com/SanikaKura/StockMarketDashboard.git
cd stockMarketDash
```

### 2. Start the backend

Open a terminal and run:

```bash
cd backend
npm install
npm run dev
```

The backend runs at `http://localhost:3000`.

### 3. Start the frontend

Open a second terminal from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

