import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarNav from "@/components/SidebarNav";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <SidebarProvider>
            <SidebarNav />
            <main className="w-full">
                <div className="flex items-center w-full p-3 gap-3 text-dspPrimary">
                    <SidebarTrigger />
                    <h1>Hiyoshii Farm</h1>
                </div>
                <hr />
                {children}
            </main>
        </SidebarProvider>
    );
  }
  