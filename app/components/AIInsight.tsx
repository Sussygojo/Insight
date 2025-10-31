"use client";
import React, { useState } from "react";

export default function AIInsight({ stockSymbol, stockData }: any) {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const generateInsight = async () => {
    try {
      setLoading(true);
      setInsight(null);
      const res = await fetch("/api/insight", {
        method: "POST",
        headers: { "COntent-Type": "application/json" },
        body: JSON.stringify({ stockSymbol, stockData }),
      });
      const data = await res.json();
      setInsight(data.insight || "No insight available at this moment.");
    } catch (err) {
      console.error("Error :", err);
    } finally {
      setLoading(false);
    }
  };
  return <div></div>;
}
