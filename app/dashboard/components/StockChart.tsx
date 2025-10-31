"use client";
import { useEffect, useRef } from "react";
import {
  createChart,
  LineSeries,
  ColorType,
  LineData,
  IChartApi,
} from "lightweight-charts";

interface StockChartProps {
  data: LineData[];
  symbol: string;
}

export default function StockChart({ data, symbol }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart: IChartApi = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "rgba(197,202,206,0.2)" },
        horzLines: { color: "rgba(197,202,206,0.2)" },
      },
    });
    const lineSeries = chart.addSeries(LineSeries, {
      color: "#4CAF50",
      lineWidth: 2,
    });
    lineSeries.setData(data);
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);
  return (
    <div>
      <h2>{symbol ? `Stock Chart - ${symbol}` : "Stock Chart"}</h2>
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "300px" }}
      ></div>
    </div>
  );
}
