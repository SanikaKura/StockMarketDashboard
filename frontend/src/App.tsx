import { useState } from "react";
import "./App.css";

interface DailyStockData {
    day: string;
    lowAverage: number;
    highAverage: number;
    volume: number;
}

function App() {
    const [symbol, setSymbol] = useState("");
    const [stockData, setStockData] = useState<DailyStockData[]>([]);
    const [error, setError] = useState("");

    async function handleSearch() {
        setError("");
        setStockData([]);
        try {
            const response = await fetch(`/api/stocks/${symbol.trim().toUpperCase()}`);

            if (!response.ok) {
                throw new Error("Invalid stock symbol or API error");
            }

            setStockData(await response.json());
        } catch (error) {
            setError("Could not retrieve stock data. Please try again.");
        }
    }

    return (
        <div>
            <h1>Stock Market Dashboard</h1>
            <h3>Enter a stock ticker to view market data from the past 30 days</h3>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}>
                <input
                    placeholder="Enter stock symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}

            {stockData.length > 0 && (
                <table>
                      <tr>
                          <th>Day</th>
                          <th>Average Low</th>
                          <th>Average High</th>
                          <th>Volume</th>
                      </tr>
                    <tbody>
                        {stockData.map((row) => (
                            <tr key={row.day}>
                                <td>{row.day}</td>
                                <td>{row.lowAverage}</td>
                                <td>{row.highAverage}</td>
                                <td>{row.volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;