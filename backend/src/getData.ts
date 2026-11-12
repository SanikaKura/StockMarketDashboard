
//API call function, connecting to Yahoo fiannce 
export async function fetchStockData(symbol: string) {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    const params = new URLSearchParams({
        interval: "15m",
        period1: oneMonthAgo.toString(),
        period2: now.toString()
    });

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?${params}`;
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Invalid stock symbol");
        }
        throw new Error(`Yahoo Finance request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export interface dailyStockData {
    day: string;
    lowAverage: number;
    highAverage: number;
    volume: number;
}

export function aggregateStockData(data: any): dailyStockData[] {
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0]; //has high low arrays

    const dailyData = new Map<string, {
        lowSum: number;
        lowCount: number;
        highSum: number;
        highCount: number;
        volume: number;
    }>();

    for (let i = 0; i < timestamps.length; i++) {
        const day = new Date(timestamps[i] * 1000)
            .toLocaleDateString("en-CA", { timeZone: "America/New_York" });

        if (!dailyData.has(day)) {
            dailyData.set(day,  { lowSum: 0, lowCount: 0, highSum: 0, highCount: 0, volume: 0 });
        }

        const entry = dailyData.get(day)!;

        if (quote.low[i] != null) {
            entry.lowSum += quote.low[i];
            entry.lowCount++;
        }

        if (quote.high[i] != null) {
            entry.highSum += quote.high[i];
            entry.highCount++;
        }

        if (quote.volume[i] != null) {
            entry.volume += quote.volume[i];
        }
    }

    const res: dailyStockData[] = []; //array of dailyStockData objects 

    for (const [day, values] of dailyData) {
        const lowAverage = Number((values.lowSum / values.lowCount).toFixed(4)); //four decimals
        const highAverage = Number((values.highSum / values.highCount).toFixed(4));

        res.push({
            day,
            lowAverage,
            highAverage,
            volume: values.volume
        });
    }

    return res;

}