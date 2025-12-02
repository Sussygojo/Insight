import SidebarWindow from "@/app/dashboard/components/SidebarWindow";
import Topbar from "../components/Topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <SidebarProvider>
        <SidebarWindow />
        <SidebarTrigger />
        <main className=" w-full min-h-screen t p-6">{children}</main>
      </SidebarProvider>
    </div>
  );
}
