import {Router} from "express";
import {fetchStockData} from "./getData.js";
import {aggregateStockData} from "./getData.js";
const router = Router();

router.get("/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const rawData = await fetchStockData(symbol);
        const aggregated = aggregateStockData(rawData);

        res.json(aggregated);
    } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "Invalid stock symbol") {
        res.status(404).json({ error: "Stock symbol not found" });
        return;
    }

    res.status(502).json({ error: "Failed to retrieve stock data" });
}
});

export default router;