"use client";
import StockChart from "./components/StockChart";
import Topbar from "../components/Topbar";
import StockDetail, { StockData } from "./components/StockDetail";
import React, { useState } from "react";
export default function DashboardPage() {
  const [stockSymbol, setStockSymbol] = useState<string | null>(null);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [Loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const apikey = process.env.NEXT_PUBLIC_MARKETSTACK_API_KEY;
  const fetchData = async (symbol: string) => {
    try {
      setLoading(true);
      setStockSymbol(symbol);
      const result = await fetch(
        `http://api.marketstack.com/v2/eod?access_key=${apikey}&symbols=${symbol}`
      );
      const data = await result.json();
      console.log("Fetched Data:", data);
      console.log("Data :", data.data);

      if (data?.data?.length > 0) {
        const latest = data.data[0];
        console.log("Latest Data Point:", latest);
        setStockData({
          open: latest.open,
          high: latest.high,
          low: latest.low,
          prevClose: latest.close,
          volume: latest.volume,
          week52High: latest.high,
          week52Low: latest.low,
        });
        const chartPoints = data.data
          .slice(0, data.data.length - 1)
          .reverse()
          .map((item: any) => ({
            time: item.date.slice(0, 10),
            value: item.close,
          }));
        setChartData(chartPoints);
      } else {
        setStockData(null);
        setChartData([]);
      }
    } catch (err) {
      console.error("Error Fetching Stock:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-6">
      <Topbar onSearch={fetchData} />
      {Loading && <p className="text-gray-400"> Fetching data </p>}
      {stockData && chartData.length > 0 ? (
        <>
          <StockChart symbol={stockSymbol || ""} data={chartData} />
          <StockDetail
            symbol={stockSymbol || ""}
            name="Stock Info"
            data={stockData}
          />
        </>
      ) : (
        !Loading && (
          <p className="text-gray-400 mt-4">
            Search for a stock to view details.
          </p>
        )
      )}
    </div>
  );
}
