import { NextRequest, NextResponse } from "next/server";
import Ollama from "ollama";
import Stream from "stream";

export async function POST(req: Request) {
  try {
    const { stockSymbol, stockData } = await req.json();
    if (!stockSymbol || !stockData) {
      return NextResponse.json(
        { error: "Missing stock data or name" },
        { status: 400 }
      );
    }
    const prompt = ` Analyze the follwing stock data and provide a concise market insight.
    Remember youre providing this information to the user there is no need to mention 
    answers to the prompt given below
        Symbol: ${stockSymbol}
        Open: ${stockData.open}
        High: ${stockData.high}
        Low: ${stockData.low}
        Prev Close: ${stockData.prevClose}
        Volume: ${stockData.volume}
        Week 52 High: ${stockData.week52High}
        Week 52 Low: ${stockData.week52Low}
 Provide a brief and insightful summary (4–6 sentences) in bullet points highlighting:
    1. The current trend or momentum.
    2. Potential investor sentiment.
    3. Any key strengths or risks visible from the numbers.
    4. A neutral tone — don’t give financial advice.
    5. A percentage indicator on investing ( number in green for positive or red for negative)
    give both possiblities 
    
        `;
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b",
        prompt,
        Stream: false,
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error("Ollama error:", errText);
      return NextResponse.json(
        { error: "AI service error", details: errText },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    let insightText: string;

    if (contentType.includes("application/json")) {
      const json = await response.json();
      // adjust keys depending on Ollama's response shape
      insightText = (
        json.response ??
        json.text ??
        json.output ??
        json.result ??
        JSON.stringify(json)
      )
        .toString()
        .trim();
    } else {
      insightText = (await response.text()).trim();
    }

    return NextResponse.json({ insight: insightText }, { status: 200 });
  } catch (err) {
    console.error("Error generating insight:", err);
    return NextResponse.json(
      { error: "Failed to generate insight." },
      { status: 500 }
    );
  }
}
