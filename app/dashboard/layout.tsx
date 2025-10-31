import Sidebar from "@/app/dashboard/components/Sidebar";
import Topbar from "../components/Topbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <Sidebar />
      <main className=" w-full min-h-screen bg-[#0d0f13] text-white p-6">
        {children}
      </main>
    </div>
  );
}
