"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

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

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate insight");
      }

      setInsight(result.insight || "No insight received.");
    } catch (err) {
      setError("Failed to generate insight. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <Card className="mt-6 border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-gray-200">
            {symbol ? `${symbol} Details` : "Stock Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">No data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1115]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {symbol.toUpperCase()} — {name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Stock Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-800 dark:text-gray-300">
          <div>
            <strong className="text-gray-900 dark:text-gray-100">Open:</strong>{" "}
            {data.open}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">High:</strong>{" "}
            {data.high}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">Low:</strong>{" "}
            {data.low}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">
              Prev Close:
            </strong>{" "}
            {data.prevClose}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">
              Volume:
            </strong>{" "}
            {data.volume}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">
              52W High:
            </strong>{" "}
            {data.week52High}
          </div>
          <div>
            <strong className="text-gray-900 dark:text-gray-100">
              52W Low:
            </strong>{" "}
            {data.week52Low}
          </div>
        </div>

        {/* Action + Results */}
        <div className="mt-6 flex flex-col items-center">
          <Button
            onClick={generateInsight}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Insight...
              </>
            ) : (
              "🧠 Generate AI Insight"
            )}
          </Button>

          {/* Error */}
          {error && (
            <Alert
              variant="destructive"
              className="mt-4 max-w-lg bg-red-500/10 border-red-500/50"
            >
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Insight Box */}
          {insight && (
            <div className="mt-6 w-full max-w-3xl bg-gray-100 dark:bg-gray-900 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                AI Insight
              </h3>
              <p className="leading-relaxed text-gray-800 dark:text-gray-300 text-sm">
                {insight}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
