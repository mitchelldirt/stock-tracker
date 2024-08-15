type Stock = {
  symbol: string;
  ask: number;
  bid: number;
  timestamp: number;
};

export async function getStock(symbol: string): Promise<Stock> {
  const stock = await fetch(
    `https://api.finage.co.uk/last/stock/${symbol}?apikey=${import.meta.env.VITE_FINAGE_API_KEY}`,
  );

  const stockData = await stock.json();

  // validate the type of the data
  if (!isStock(stockData)) {
    throw new Error("Invalid data");
  }

  return stockData;
}

// Type guard function to validate Stock type
function isStock(data: unknown): data is Stock {
  const stockData = data as Record<string, unknown>;
  return (
    typeof stockData === "object" &&
    stockData !== null &&
    typeof stockData.symbol === "string" &&
    typeof stockData.ask === "number" &&
    typeof stockData.bid === "number" &&
    typeof stockData.timestamp === "number"
  );
}
