import "./App.css";
import StockSearcher from "./components/StockSearcher";

// TODO: Create context for list of stock symbols
// TODO: Create in StockSearcher.tsx when the form is submitted, add the stock symbol to the list of stock symbols
// TODO: In a new component placed below StockSearcher, subscribe to the list of stock symbols and display them in a list or as tiles
// TODO: Get an export of every stock symbol available on the stock market and add autocomplete to the input field in StockSearcher.tsx

function App() {
  return (
    <>
      <StockSearcher />
    </>
  );
}

export default App;
