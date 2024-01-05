import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
         <Sidebar />
         <Topbar />
         {children}
      </section>
   );
}
