export default function WatchlistPage() {
  const dummyData = [
    { ticker: "RELIANCE", price: "2,450", change: "+13.325" },
    { ticker: "RELIANCE", price: "6,350", change: "_14.525" },
    { ticker: "RELIANCE", price: "3,650", change: "+14.25" },
    { ticker: "RELIANCE", price: "5,440", change: "-1.425" },
  ];
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
      <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/40 text-gray-400 text-sm">
            <tr>
              <th className="py-3 px-4">Symbol</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Change</th>
              <th className="py-3 px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data, index) => (
              <tr
                key={index}
                className="border-t border-gray-700 hover:bg-gray-800/40 transition"
              >
                <td className="py-3 px-4"> {data.ticker}</td>
                <td className="py-3 px-4"> {data.price}</td>
                <td
                  className={`py-3 px-4 ${
                    data.change.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {" "}
                  {data.change}
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-sm bg-blue-600/20 hover:bg-blue-600/30 px-3 py-1 rounded-md">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
