"use client";
import { useEffect, useRef } from "react";
import {
  createChart,
  LineSeries,
  ColorType,
  LineData,
  IChartApi,
} from "lightweight-charts";

import { useTheme } from "next-themes";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StockChartProps {
  data: LineData[];
  symbol: string;
}

export default function StockChart({ data, symbol }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const isDark = theme === "dark";
    const chart: IChartApi = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#e5e7eb" : "#111",
      },
      grid: {
        vertLines: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
        horzLines: {
          color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      timeScale: {
        borderColor: isDark ? "#333" : "#ccc",
      },
      rightPriceScale: {
        borderColor: isDark ? "#333" : "#ccc",
      },
    });
    const lineSeries = chart.addSeries(LineSeries, {
      color: isDark ? "#4CAF50" : "#0e7c3a",
      lineWidth: 2,
    });
    lineSeries.setData(data);
    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, theme]);

  return (
    <Card className="mt-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1115]">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          {symbol ? `Stock Chart — ${symbol.toUpperCase()}` : "Stock Chart"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div
          ref={chartContainerRef}
          className="w-full rounded-md"
          style={{ height: "320px" }}
        />
      </CardContent>
    </Card>
  );
}
