import express from "express";
import { fetchStockData } from "./getData.js";
import stockRouter from "./stocks.js";

const app = express();
const PORT = 3000;
app.use(express.json());

// backend server check
/*
app.get("/api/health", (req, res) => {
res.status(200).json({
status: "OK",
message: "Stock Market API is running"
});
});*/

app.use("/api/stocks", stockRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
