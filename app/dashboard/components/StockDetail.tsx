"use client";
import React, { useState } from "react";
export interface StockData {
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  week52High: number;
  week52Low: number;
}
export default function StockDetail({
  symbol,
  name,
  data,
}: {
  symbol: string;
  name: string;
  data: StockData;
}) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const generateInsight = async () => {
    setLoading(true);
    setError(null);
    setInsight(null);
    try {
      const res = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stockSymbol: symbol,
          stockData: data,
        }),
      });
      const result = await res.json();
      console.log("Insight result :", result);
      if (!res.ok) {
        throw new Error(result.error || "Failed to generate insight");
      }
      setInsight(result.insight || "No insight recieved.");
    } catch (err) {
      console.error("Error :", err);
      setError("Failed to generate insight. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (!data) {
    return (
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <h2 className="text-lg text-gray-300 mb-3">
          {symbol ? `${symbol} Details` : "Stock Details"}
        </h2>
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {symbol.toUpperCase()} — {name}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
        <div>
          <strong>Open:</strong> {data.open}
        </div>
        <div>
          <strong>High:</strong> {data.high}
        </div>
        <div>
          <strong>Low:</strong> {data.low}
        </div>
        <div>
          <strong>Prev Close:</strong> {data.prevClose}
        </div>
        <div>
          <strong>Volume:</strong> {data.volume}
        </div>
        <div>
          <strong>52W High:</strong> {data.week52High}
        </div>
        <div>
          <strong>52W Low:</strong> {data.week52Low}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={generateInsight}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-5 py-2 rounded-lg text-white font-medium transition"
        >
          {loading ? "Generating Insight..." : "🧠 Generate AI Insight"}
        </button>

        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        {insight && (
          <div className="bg-gray-800 text-gray-200 mt-6 p-4 rounded-lg w-full max-w-3xl">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">
              AI Insight
            </h3>
            <p className="leading-relaxed text-sm">{insight}</p>
          </div>
        )}
      </div>
    </div>
  );
}
