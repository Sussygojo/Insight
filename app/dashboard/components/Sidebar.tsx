"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", type: "default" },
    { name: "Watchlist", href: "/watchlist", type: "default" },
    { name: "Logout", href: "/logout", type: "danger" },
  ];

  return (
    <aside className="w-56 h-screen bg-[#0f1115] border-r border-gray-800 flex flex-col p-4 relative left-0 top-0">
      <h1 className="text-lg font-bold mb-6 text-white tracking-wide">
        InsightAI
      </h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded-md text-sm transition ${
              item.name === "Logout"
                ? "mt-auto absolute bottom-0 mb-4 px-5"
                : ""
            } ${
              pathname === item.href
                ? item.type === "danger"
                  ? "bg-red-900/30 text-red-400"
                  : "bg-gray-800 text-white"
                : item.type === "danger"
                ? "text-red-400 hover:bg-red-900/40 hover:text-red-300"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
