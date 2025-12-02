"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/app/components/theme-toggle";

const navItems = [
  { name: "Dashboard", href: "/dashboard", type: "default" },
  { name: "Watchlist", href: "/watchlist", type: "default" },
  { name: "Logout", href: "/logout", type: "danger" },
];

export default function SidebarWindow() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-white dark:bg-[#0f1115] border-r border-gray-300 dark:border-gray-800">
      <SidebarHeader>
        <h1 className="text-lg font-bold text-black dark:text-white tracking-wide">
          InsightAI
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems
                .filter((i) => i.name !== "Logout")
                .map((item) => {
                  const isActive = pathname === item.href;
                  const isDanger = item.type === "danger";

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={`
                        text-sm transition rounded-md
                        ${
                          isActive
                            ? "bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
                            : isDanger
                            ? "text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                        }
                      `}
                        >
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ThemeToggle />

        {navItems
          .filter((i) => i.name === "Logout")
          .map((item) => (
            <SidebarMenu key={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={`
                  text-sm transition rounded-md px-5
                  ${
                    pathname === item.href
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                  }
                `}
                  >
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
      </SidebarFooter>
    </Sidebar>
  );
}

//   return (
//     <aside className="w-56  bg-[#0f1115] border-r border-gray-800 flex flex-col p-4 relative left-0 top-0">
//       <h1 className="text-lg font-bold mb-6 text-white tracking-wide">
//         InsightAI
//       </h1>
//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`p-2 rounded-md text-sm transition ${
//               item.name === "Logout"
//                 ? "mt-auto absolute bottom-0 mb-4 px-5"
//                 : ""
//             } ${
//               pathname === item.href
//                 ? item.type === "danger"
//                   ? "bg-red-900/30 text-red-400"
//                   : "bg-gray-800 text-white"
//                 : item.type === "danger"
//                 ? "text-red-400 hover:bg-red-900/40 hover:text-red-300"
//                 : "text-gray-400 hover:bg-gray-800 hover:text-white"
//             }`}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default SidebarWindow;
