import axios from "axios";

export const fetchStockData = async (symbol: string, apikey: number) => {
  const res = await axios.get(`http://api.marketstack.com/v2/eod
    ?access_key = ${apikey}
    &symbols = ${symbol}`);
  const result = res.data;
  console.log(result);

  // Example console.log statements for Next.js
  console.log("Server-side log"); // Shows in terminal
  console.debug("Debug message"); // Shows in browser dev tools
  console.error("Error message"); // Shows in red in console
  return result;
};
