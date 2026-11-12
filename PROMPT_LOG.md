*Entry 1: set up environment
Prompt:
Help me set up a Node.js + TypeScript backend using Express. Walk me through initializing the project, installing dependencies, configuring TypeScript, and creating a basic health-check endpoint. Explain each step.

Why I chose this prompt:
I wanted to establish the backend development environment and understand the purpose of the dependencies and configuration.

What I kept, changed, rejected:
Kept the suggested Express and TypeScript setup, including the project configuration and health-check endpoint. I followed the implementation incrementally rather than generating the entire backend at once.

*entry 2: connect to yahoo and retrieve raw data
Prompt: Write an http request to query yahoo finance api for last 30 days of a stock's data.

Why I chose this prompt: I need to query intraday data from the last month, and so I had claude write a quick function that I put in my getData.ts file, which runs this request and stores the response in the variable data.

What I kept, changed, rejected: I kept the fetchStockData function.

*entry 3: testing yahoo endpoint
Prompt:help me test this endpoint and inspect the data variable

Why I chose this prompt: wanted to ensure that the data variable is holding the information as expected

What I kept, changed, rejected:
ran this code:
'const data = await fetchStockData("TSLA");
console.log(data.chart.result[0].indicators.quote[0].low);'
and deleted, just to verify results are as expected 

*entry 4: checking json format of yahoo response
Prompt: Are timestamps aligned by index with the low, high, and volume arrays?

Why I chose this prompt: Figure out how to iterate through the data

What I kept, changed, rejected: n/a

*entry 5: how to organize response data
Prompt: How should I iterate over the stock data and store relevant information about each day

Why I chose this prompt: Help me determine the most efficient way to calculate and store the information needed, organized by day

What I kept, changed, rejected: I decided to use a map, mapping the date value to the lowSum 

*entry 6: populate map data
Prompt: Here is my map initialization:
    const dailyData = new Map<string, {
        lowSum: number;
        highSum: number;
        volume: number;
        count: number;
    }>();
Help me iterate through the timestamps array by converting to date and add to lowSum, highSum, volume, and increment count by 1. 

Why I chose this prompt: Helps me populate the map, aggregating the sum of low prices, highs, and trade volume per day.

What I kept, changed, rejected: Claude suggested I add lowCount and highCount instead of just count, because there are nulls in the data which could throw off averages. It also converted timestamps to NY time so that timestamps will align with the real date. I kept this change as well as code blocks that check !null for each quote value before updating the map.

*entry 7:
Prompt: Help me format my express api endpoint that takes in a symbol from the URL and returns the aggregated data from getData.ts, or throws an error if invalid

Why I chose this prompt: I needed help with the syntax for creating the endpoint and catching an invalid stock ticker.

What I kept, changed, rejected: I kept the call for get operation 'router.get("/:symbol", async (req, res) => {' as well as the try catch block, 
and the 'app.use("/api/stocks", stockRouter);' in index.ts

I wrote the try logic:
        const rawData = await fetchStockData(symbol);
        const aggregated = aggregateStockData(rawData);
        res.json(aggregated);
which simply runs the fetchStockData function with the symbol given in URL and returns the json


*entry 8:
Prompt: I need to display different error messages for a 404 error/incorrect stock symbol than a 502 error from yahoo itself

Why I chose this prompt: more robust error checks

What I kept, changed, rejected: 
kept these changes to getData.ts where we initially call on yahoo api:
if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Invalid stock symbol");
        }
        throw new Error(`Yahoo Finance request failed: ${response.status}`);
    }
and this block in the stock.ts where I define my api:
catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Invalid stock symbol") {
        res.status(404).json({ error: "Stock symbol not found" });
        return;
    }

    res.status(502).json({ error: "Failed to retrieve stock data" });
}

*entry 9: frontend environment setup
Prompt: Help me set up a React + TypeScript frontend environment, give command line args to set up vite environment

Why I chose this prompt: set up react

What I kept, changed, rejected:
I ran create-vite@9.3.4

*entry 10: store stock symbol
Prompt:I have the frontend page up with 'Stock Market Dashboard' in <h1> and a textbox for input, help me write a function to store the inserted stock symbol in react. 

Why I chose this prompt: To complete the input form

What I kept, changed, rejected: I kept these lines:
const [symbol, setSymbol] = useState("");
onChange={(e) => setSymbol(e.target.value)}
so that the stock symbol is stored

*entry 11: Need a useState component to save the json result of my backend api
Prompt: Where should i store the stock data

Why I chose this prompt: maintain correct json formatted data for the stock symbol

What I kept, changed, rejected: 
    added this variable to App(): 
    const [stockData, setStockData] = useState<DailyStockData[]>([]);
    which is an array of DailyStockData objects, that I defined at the top of the app.tsx file.
    corrected my call to fetch json from my api, and store it in that variable.

*entry 12: display error messages that the backend stock.ts api returns
Prompt: help me with a function that displays error messages if backend api returns an error

Why I chose this prompt: to show difference between input error and server error

What I kept, changed, rejected:
kept:
if (!response.ok) {
                throw new Error("Invalid stock symbol or API error");
            }
catch (error) {
            setError("Could not retrieve stock data. Please try again.");
        }
and placed '{error && <p>{error}</p>}' in the html body

*entry 13: only display table after submitting stock ticker
Prompt: how to ensure table only is visible after submitting the stock symbol

Why I chose this prompt: important ui feature to only show table once we have the data

What I kept, changed, rejected: I added this check: {stockData.length > 0 && ( )} which ensures that the table only renders when there is stock data

*entry 14: want table to render after clicking 'enter key'
Prompt: how can I run handleSearch() when the user clicks the enter key or submit button

Why I chose this prompt: better usability

What I kept, changed, rejected: wrapped the button in a form so that we can use onSubmit, chcking for 'enter' key and the button

*entry 15: Centering table, UI for button
Prompt: help me edit teh css file to center the table, add boarders, and space out entries, and round out the button and make it larger.

Why I chose this prompt: better UI

What I kept, changed, rejected: 
kept: 
table {
    margin: 25px auto;
    border-collapse: collapse;
}
th, td {
    border: 3px solid #aaaaaa;
    padding: 10px 15px;    
    background-color: #eff5fc;
}
button:hover {
    background-color: #a4bfec;
}
and added these to button {
    border-radius: 6px;
    padding: 8px 17px;
}
