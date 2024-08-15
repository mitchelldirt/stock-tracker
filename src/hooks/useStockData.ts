import { useQuery } from "@tanstack/react-query";
import { getStock } from "../queries/stocks";

export default function useStockData(symbol: string) {
  return useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => getStock(symbol),
  });
}
